import express from "express";
import {
	getInvoices,
	getInvoiceById,
	addInvoice,
	updateInvoice,
} from "../controllers/invoices/invoices.js";


const router = express.Router();

router.get('/getInvoices', getInvoices);
router.get('/getInvoicesById', getInvoiceById);
router.post('/addInvoice', addInvoice);
router.patch('/updateInvoice', updateInvoice);

export { router };
