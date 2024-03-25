import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUser, updateUser, allUsers, createUser, editUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// GET user
router.post("/get-user", userAuth, getUser);

router.get("/allusers", allUsers);

router.post("/create", createUser);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

router.put("/edit-user/:id", editUser);

router.delete("/delete/:id", deleteUser);

export default router;
