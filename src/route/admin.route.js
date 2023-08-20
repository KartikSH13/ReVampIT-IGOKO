import express from 'express'
import { body } from 'express-validator';
import { addCategory, addProduct } from '../controller/admin.controller.js'
import multer from 'multer';
import connection from '../database/dbconfig.js'
import { validationResult } from 'express-validator';
const upload = multer({ dest: 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/' });
const adminRouter = express.Router();
adminRouter.post('/add/category',
    [body("image").notEmpty().withMessage("Image can't be Empty"), body("categoryName").notEmpty().withMessage("Category name can't be empty")],
    upload.single('image'),
    async (req, res) => {
        try {
            const errors = validationResult();
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: "false", message: errors.array() });
            }
            const image = req.file;
            connection.beginTransaction();
            const sql = `INSERT INTO images(img) VALUES(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${image.filename}'))`
            connection.query(sql, (err, result) => {
                if (err) throw err;
                const imgId = result.insertId;
                connection.query('INSERT INTO category (category_name, img_id) VALUES (?, ?)', [req.body.categoryName, imgId], (err, result2) => {
                    if (err) throw err;
                });
                connection.commit();
            });
            res.json({msg: "Image and category uploaded successfully" })
        } catch (err) {
            connection.rollback();
            res.status(500).json({ error: 'An error occurred while inserting data', err: err });
        }

    });

adminRouter.post('/add/product',upload.single("image"), async (req, res) => {
    try {
        const image = req.file;
        const { name, price, description, category_id, stock_quantity } = req.body;
        connection.beginTransaction();
        const cate_sql = `INSERT INTO images(img) VALUES(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${image.filename}'))`;
        const prod_sql = 'INSERT INTO products (name,price,image_id,description,category_id,stock_quantity) VALUES (?, ?, ?, ?, ?, ?)'
        connection.query(cate_sql, (err, result) => {
            if (err) throw err;
            console.log("Image insertion successfully");
            const imgId = result.insertId;
            connection.query(prod_sql, [name, price, imgId, description, category_id, stock_quantity], (err, result2) => {
                if (err) throw err;
                console.log("Product insertion successfully");
            });
            connection.commit();
        });
        res.json({msg: "Image and category uploaded successfully" })
    } catch (err) {
        connection.rollback();
        res.status(500).json({ error: 'An error occurred while inserting data', err: err });
    }
});
export default adminRouter;





/*

BEGIN TRANSACTION;

INSERT INTO images (img) VALUES (load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/'));
SET @img_id = LAST_INSERT_ID(); -- Retrieve the generated img_id
INSERT INTO category (category_name, img_id) VALUES ('', @img_id);

COMMIT;

*/