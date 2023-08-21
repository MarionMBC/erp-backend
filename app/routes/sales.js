import express from "express";

import {
	getPurchaseOrderProducts,
	addProductToPurchaseOrder,
} from "../controllers/sales/purchaseOrderProducts.js";
import {
	getPurchaseOrders,
	getPurchaseOrderById,
	addPurchaseOrder,
} from "../controllers/sales/purchaseOrder.js";

const router = express.Router();

// =====================================PURCHASEORDER===================================================
router.get("/getPurchaseOrders", getPurchaseOrders);
router.post("/getPurchaseOrderById", getPurchaseOrderById);
router.post("/addPurchaseOrder", addPurchaseOrder);

// =====================================PURCHASEORDERPRODUCTS===========================================
router.get("/getPurchaseOrderProducts", getPurchaseOrderProducts);
router.post("/addProductToPurchaseOrder", addProductToPurchaseOrder);
// router.post("/addCustomer", addCustomer);
// router.put("/updateCustomer", updateCustomer);
// router.get("/getCustomerStatistics", getCustomerStatistics);

export { router };
