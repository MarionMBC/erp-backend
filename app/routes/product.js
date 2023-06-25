import express from 'express';
import { getProducts } from '../controllers/products.js';
import {authMiddleware} from "../middlewares/auth.js";

const router = express.Router();

// Definir las rutas para este archivo en particular
router.get('/getProduct', getProducts)


export { router }

