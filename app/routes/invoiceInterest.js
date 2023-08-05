import express from "express";
import {
	getInterest,
	getInterestById,
	addInterest,
	updateInterest
} from "../controllers/invoice/invoiceInterest.js";


const router = express.Router();

router.get('/getInterest', 	getInterest);
router.get('/getInterestById/:id', getInterestById);
router.post('/addInterest', addInterest);
router.patch('/updateInterest/:id', updateInterest);

export { router };
