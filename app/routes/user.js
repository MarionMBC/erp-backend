import express from "express";
import { addUser, getUserRolByUid } from "../controllers/user/user.js";

const router = express.Router();

// =====================================USERS===========================================
router.post("/addUser", addUser);
router.post("/getUserRolByUid", getUserRolByUid);

export { router };
