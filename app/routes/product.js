import express from 'express';
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from '../../controllers/product/product.js';

const router = express.Router();


router.get('/getProduct', getProducts);
router.get('/getProduct/:id', getProduct);
router.post('/addProduct', addProduct );
router.patch('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct)


export { router }

