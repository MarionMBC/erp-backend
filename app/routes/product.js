import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductByCategoryId, getProducts, updateProduct } from '../controllers/product/product.js';
import {
    getProductCategories,
    getProductCategory,
    updateProductCategory
} from "../controllers/product/productCategory.js";

import { getProductProvider, getProductProviders } from "../controllers/product/productProvider.js";

const router = express.Router();


router.get('/getProduct', getProducts);
router.get('/getProduct/:id', getProduct);
router.post('/addProduct', addProduct);
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/getProductByCategory/:id', getProductByCategoryId);


router.get('/getCategory', getProductCategories);
router.get('/getCategory/:id', getProductCategory);
router.post('/addCategory', () => { return null });
router.delete('/deleteCategory', () => { return null });

router.get('/getProductProviders', getProductProviders);
router.get('/getProductProvider/:id', getProductProvider)





router.patch('/updateProduct/:id', updateProduct);
router.patch('/updateCategory/:id', updateProductCategory);



export { router }

