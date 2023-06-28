import express from "express";
import { getCustomers, getCustomerById } from "../controllers/customers.js";

const router = express.Router();

router.get("/getCustomers", getCustomers);
router.get("/getCustomerById", getCustomerById);

export { router };
