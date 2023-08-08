import express from "express";
import {
	getCustomers,
	getCustomerById,
	addCustomer,
	updateCustomer,
	getCustomerStatistics,
} from "../controllers/customer/customer.js";

import {
	getCustomerTypes,
	addCustomerType,
	updateCustomerType,
	updateCustomerTypeByCustomerId,
} from "../controllers/customer/customerType.js";

import {
	getBusinessCustomers,
	addBusinessCustomerDetails,
	updateBusinessCustomerDetails,
	updateBusinessCustomerDetailsByCustomerId,
} from "../controllers/customer/businessCustomerTypeDetails.js";

import {
	getNaturalCustomers,
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
router.get("/getCustomerStatistics", getCustomerStatistics);

// =================================CUSTOMERCONTACTINFO=====================================
router.post("/addCustomerContactInfo", addCustomerContactInfo);
router.put("/updateCustomerContactInfo", updateCustomerContactInfo);
router.put(
	"/updateCustomerContactInfoByCustomerId",
	updateCustomerContactInfoByCustomerId
);

// ===================================CUSTOMERTYPE==========================================
router.get("/getCustomerTypes", getCustomerTypes);
router.post("/addCustomerType", addCustomerType);
router.post("/addCustomerType", addCustomerType);
router.put("/updateCustomerType", updateCustomerType);
router.put("/updateCustomerTypeByCustomerId", updateCustomerTypeByCustomerId);

// ============================BUSINESSCUSTOMERTYPEDETAILS==================================
router.get("/getBusinessCustomers", getBusinessCustomers);
router.post("/addBusinessCustomerDetails", addBusinessCustomerDetails);
router.put("/updateBusinessCustomerDetails", updateBusinessCustomerDetails);
router.put(
	"/updateBusinessCustomerDetailsByCustomerId",
	updateBusinessCustomerDetailsByCustomerId
);

// ==============================NATURALCUSTOMERTYPEDETAILS=================================
router.get("/getNaturalCustomers", getNaturalCustomers);
router.post("/addNaturalCustomerDetails", addNaturalCustomerDetails);
router.put("/updateNaturalCustomerDetails", updateNaturalCustomerDetails);
router.put(
	"/updateNaturalCustomerDetailsByCustomerId",
	updateNaturalCustomerDetailsByCustomerId
);

export { router };
