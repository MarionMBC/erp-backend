import express from "express";
import {
	addUser,
	getUserRolByUid,
	getUsersCount,
	getSellers,
	getAllUsers,
	getAllRoles,
	updateRole,
	updateRoleAndStatus,
} from "../controllers/user/user.js";

const router = express.Router();

// =====================================USERS===========================================
router.post("/addUser", addUser);
router.post("/getUserRolByUid", getUserRolByUid);
router.get("/getUsersCount", getUsersCount);
router.get("/getSellers", getSellers);
router.get("/getUsers", getAllUsers);
router.get("/getRoles", getAllRoles);
router.patch("/updateRole", updateRole);
router.patch("/updateUser", updateRoleAndStatus);


export { router };
