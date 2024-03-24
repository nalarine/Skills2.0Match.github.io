import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUser, updateUser, allUsers } from "../controllers/userController.js";

const router = express.Router();

// GET user
router.post("/get-user", userAuth, getUser);

router.get("/allusers", allUsers);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

export default router;
