import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  updateUserById,
} from "../controllers/user";

import express from "express";

const router = express.Router();

router.get("/login", getAllUsers);

router.post("/signup", createNewUser);

export default router;
