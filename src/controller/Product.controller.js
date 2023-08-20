import connection from '../database/dbconfig.js'
export const categories = async (req, res) => {
    try {
        connection.query('Select * from category', (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach(element => {
                element.img_id='/image'+element.img_id
            });
            res.send(rows);
        });

    } catch (err) {
        res.status(500).send(err);
    }
} 
export const allProduct = async (req, res) => {
    try {
        const {category_id}=req.body;
        connection.query(
            'Select * from Products where category_id=?',[category_id],
            (err,rows)=>{
                if(err) throw err;
                res.send(rows);
            }
        )
    } catch (err) {
        res.status(500).send(err);
    }
}

export const description = async (req, res) => {
    try {


    } catch (err) {
        res.status(500).send(err);
    }

}