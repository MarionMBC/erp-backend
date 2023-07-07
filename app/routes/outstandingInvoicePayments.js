import express from "express";
import {
	getOutstandingPayment,
	getOutstandingPaymentById,
	addOutstandingPayment,
	updateOutstandingPayments,
} from "../controllers/payment/outstandingInvoicePayments.js";


const router = express.Router();

router.get('/getOutstandingPayment', getOutstandingPayment);
router.get('/getOutstandingPaymentById', getOutstandingPaymentById);
router.post('/addOutstandingPayment', addOutstandingPayment);
router.patch('/updateOutstandingPayments', updateOutstandingPayments);

export { router };
