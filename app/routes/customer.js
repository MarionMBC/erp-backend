import express from "express";
import {
	getCustomers,
	getCustomerById,
	addCustomer,
	updateCustomer,
} from "../controllers/customer/customer.js";

import {
	addCustomerType,
	updateCustomerType,
	updateCustomerTypeByCustomerId,
} from "../controllers/customer/customerType.js";

const router = express.Router();

// GET
router.get("/getCustomers", getCustomers);
router.get("/getCustomerById", getCustomerById);

// POST
router.post("/addCustomer", addCustomer);
router.post("/addCustomerType", addCustomerType);

// PUT
router.put("/updateCustomer", updateCustomer);
router.put("/updateCustomerType", updateCustomerType);
router.put("/updateCustomerTypeByCustomerId", updateCustomerTypeByCustomerId);

export { router };
