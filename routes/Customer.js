import express from "express";
import { getCustomers } from '../controllers/customers.js';

const router = express.Router();

router.get("/", getCustomers);

export { router };
