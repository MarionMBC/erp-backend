import express from "express";
import {
	getCustomers,
	getCustomerById,
	addCustomer,
	updateCustomer,
} from "../controllers/customer/customer.js";

import { addCustomerType } from "../controllers/customer/customerType.js";

const router = express.Router();

router.get("/getCustomers", getCustomers);
router.get("/getCustomerById", getCustomerById);
router.post("/addCustomer", addCustomer);
router.post("/addCustomerType", addCustomerType);
router.put("/updateCustomer", updateCustomer);

export { router };
