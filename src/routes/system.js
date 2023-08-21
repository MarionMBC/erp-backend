import express from "express";

import {
	setDates,
	getLicenseStatus,
} from "../controllers/system/systemInfo.js";

const router = express.Router();

router.get("/getLicenseStatus", getLicenseStatus);
router.post("/setDates", setDates);
// router.get("/getNaturalCustomers", getNaturalCustomers);

export { router };
