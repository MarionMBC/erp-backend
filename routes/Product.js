import express from 'express';
import { getProducts } from '../controllers/products.js';

const router = express.Router();

// Definir las rutas para este archivo en particular
router.get('/getPerson', getProducts)


export { router }

