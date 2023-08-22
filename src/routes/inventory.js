import express from "express";

import { getInventory } from "../controllers/inventory/inventory.js";

const router = express.Router();

// ==============================NATURALCUSTOMERTYPEDETAILS=================================
router.get("/getInventory", getInventory);

export { router };
