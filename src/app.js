import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { image } from "./services/image.js";
import productRoute from './route/product.route.js'
import contactRouter from "./route/contact.route.js";
import adminRouter from "./route/admin.route.js";
import visitorRoute from "./route/visitor.route.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
/* preRequesite for an express app */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()); //Cross origin policy
app.use(express.static('public')); // To serve static files from server
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/careers', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/career.html'));
});

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/product.html'));
});
/* preRequesite for an express app */

/*------Routes------*/
app.use('/admin', adminRouter);
app.use('/contact', contactRouter);
app.use('/image:id', image) //For accessing images from server
app.use('/get/products', productRoute);
app.use('/visitor', visitorRoute);
/*------Routes------*/

app.listen(process.env.PORT | 3000, () => console.log("Server running on 3000"))