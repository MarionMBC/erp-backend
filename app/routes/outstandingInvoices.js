import express from "express";
import {
	getOutstandingInvoices,
	getOutstandingInvoiceById,
	addOutstandingInvoice,
	updateOutstandingInvoice
} from "../controllers/invoice/outstandingInvoices.js";


const router = express.Router();

router.get('/getOutstandingInvoices', 	getOutstandingInvoices);
router.get('/getOutstandingInvoiceById/:id', getOutstandingInvoiceById);
router.post('/addOutstandingInvoice', addOutstandingInvoice);
router.patch('/updateOutstandingInvoice/:id', updateOutstandingInvoice);

export { router };
