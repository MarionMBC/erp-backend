import express from "express";
import { addUser } from "../controllers/user/user.js";

const router = express.Router();

// =====================================USERS===========================================
router.post("/getCustomers", addUser);

export { router };
