import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductByCategoryId, getProducts, updateProduct } from '../controllers/product/product.js';
import {
    getProductCategories,
    getProductCategory,
    updateProductCategory
} from "../controllers/product/productCategory.js";

import { getProductProvider, getProductProviders } from "../controllers/product/productProvider.js";

import { getProductBatch, getProductBatches } from '../controllers/product/productBatch.js';
import { getProductUnitMeasurement, getProductUnitMeasurements } from '../controllers/product/productUnitMeasurement.js';

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

router.get('/getProductBatch', getProductBatches);
router.get('/getProductBatch/:id', getProductBatch);
router.post('/addProductBatch', () => { return null });
router.delete('/deleteProductBatch', () => { return null });
router.put('/updateProductBatch', () => { return null });


router.patch('/updateProduct/:id', updateProduct);
router.patch('/updateCategory/:id', updateProductCategory);

//Product unities

router.get('/getProductUnities', getProductUnitMeasurements);



export { router }


