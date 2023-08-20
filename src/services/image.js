import connection from '../database/dbconfig.js'
export const image = async (req, res) => {
    try {
        connection.query('Select img from images where img_id=?', [req.params.id], (err, rows) => {
            if (err) {
                throw err;
            }
            else if(rows.length>0) {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(rows[0].img);
            }else{
                res.send("Image not found")
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
}