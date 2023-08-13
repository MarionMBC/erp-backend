import express from "express";
import {
	getInvoices,
	getInvoiceById,
	addInvoice,
	updateInvoice,
} from "../controllers/invoice/invoice.js";


const router = express.Router();

router.get('/getInvoices', getInvoices);
router.get('/getInvoicesById/:id', getInvoiceById);
router.post('/addInvoice', addInvoice);
router.patch('/updateInvoice/:id', updateInvoice);

export { router };
