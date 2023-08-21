import express from "express";
import {addUser, getUserRolByUid, getUsersCount} from "../controllers/user/user.js";

const router = express.Router();

// =====================================USERS===========================================
router.post("/addUser", addUser);
router.post("/getUserRolByUid", getUserRolByUid);
router.get("/getUsersCount", getUsersCount);

export { router };
