import express from "express";
import {
	getOutstandingInvoices,
	getOutstandingInvoiceById,
	addOutstandingInvoice,
	updateOutstandingInvoice
} from "../controllers/invoice/outstandingInvoices.js";


const router = express.Router();

router.get('/getOutstandingInvoices', 	getOutstandingInvoices);
router.get('/getOutstandingInvoiceById', getOutstandingInvoiceById);
router.post('/addOutstandingInvoice', addOutstandingInvoice);
router.patch('/updateOutstandingInvoice', updateOutstandingInvoice);

export { router };
