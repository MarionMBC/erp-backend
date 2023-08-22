import express from "express";
import {
	addUser,
	getUserRolByUid,
	getUsersCount,
	getSellers,
	getAllUsers,
} from "../controllers/user/user.js";

const router = express.Router();

// =====================================USERS===========================================
router.post("/addUser", addUser);
router.post("/getUserRolByUid", getUserRolByUid);
router.get("/getUsersCount", getUsersCount);
router.get("/getSellers", getSellers);
router.get("/getUsers", getAllUsers);

export { router };
