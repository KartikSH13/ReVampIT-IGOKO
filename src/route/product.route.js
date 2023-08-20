import express from 'express'
import {allProduct,description,categories} from '../controller/Product.controller.js'
const router = express.Router();
router.get('/categories',categories);
router.post('/all',allProduct);
router.get('/description/',description);
export default router;