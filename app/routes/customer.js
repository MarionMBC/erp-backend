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

import {
	addBusinessCustomerDetails,
	updateBusinessCustomerDetails,
	updateBusinessCustomerDetailsByCustomerId,
} from "../controllers/customer/businessCustomerTypeDetails.js";

import {
	addNaturalCustomerDetails,
	updateNaturalCustomerDetails,
	updateNaturalCustomerDetailsByCustomerId,
} from "../controllers/customer/naturalCustomerTypeDetails.js";

import {
	addCustomerContactInfo,
	updateCustomerContactInfo,
	updateCustomerContactInfoByCustomerId,
} from "../controllers/customer/customerContactInfo.js";

const router = express.Router();

// =====================================CUSTOMERS===========================================
router.get("/getCustomers", getCustomers);
router.get("/getCustomerById", getCustomerById);
router.post("/addCustomer", addCustomer);
router.put("/updateCustomer", updateCustomer);

// =================================CUSTOMERCONTACTINFO=====================================
router.post("/addCustomerContactInfo", addCustomerContactInfo);
router.put("/updateCustomerContactInfo", updateCustomerContactInfo);
router.put("/updateCustomerContactInfoByCustomerId", updateCustomerContactInfoByCustomerId);

// ===================================CUSTOMERTYPE==========================================
router.post("/addCustomerType", addCustomerType);
router.post("/addCustomerType", addCustomerType);
router.put("/updateCustomerType", updateCustomerType);
router.put("/updateCustomerTypeByCustomerId", updateCustomerTypeByCustomerId);

// ============================BUSINESSCUSTOMERTYPEDETAILS==================================
router.post("/addBusinessCustomerDetails", addBusinessCustomerDetails);
router.put("/updateBusinessCustomerDetails", updateBusinessCustomerDetails);
router.put(
	"/updateBusinessCustomerDetailsByCustomerId",
	updateBusinessCustomerDetailsByCustomerId
);

// ==============================NATURALCUSTOMERTYPEDETAILS=================================
router.post("/addNaturalCustomerDetails", addNaturalCustomerDetails);
router.put("/updateNaturalCustomerDetails", updateNaturalCustomerDetails);
router.put(
	"/updateNaturalCustomerDetailsByCustomerId",
	updateNaturalCustomerDetailsByCustomerId
);

export { router };
