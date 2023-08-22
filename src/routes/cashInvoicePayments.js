import express from "express";
import {
	getCashInvoicePayments,
	getCashPaymentById,
	addCashPayment,
	updateCashPayment,
} from "../controllers/payment/cashInvoicePayments.js";


const router = express.Router();

router.get('/getCashInvoicePayments', getCashInvoicePayments);
router.get('/getCashPaymentById/:id', getCashPaymentById);
router.post('/addCashPayment', addCashPayment);
router.patch('/updateCashPayment/:id', updateCashPayment);

export { router };
