import express from "express";

import { getPurchaseOrderProducts,addProductToPurchaseOrder } from "../controllers/sales/purchaseOrderProducts.js";

const router = express.Router();

// =====================================CUSTOMERS===========================================
router.get("/getPurchaseOrderProducts", getPurchaseOrderProducts);
router.post("/addProductToPurchaseOrder", addProductToPurchaseOrder);
// router.post("/addCustomer", addCustomer);
// router.put("/updateCustomer", updateCustomer);
// router.get("/getCustomerStatistics", getCustomerStatistics);

export { router };
