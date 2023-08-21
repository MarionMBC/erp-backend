import express from "express";

import {
	getBinacle,
	addAction,
	updateActionById,
} from "../controllers/binacle/binacle.js";

const router = express.Router();

// ==============================NATURALCUSTOMERTYPEDETAILS=================================
router.get("/getBinacle", getBinacle);
router.post("/addAction", addAction);
router.put("/updateActionById", updateActionById);

export { router };
