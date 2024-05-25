import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  updateUserById,
} from "../controllers/user";

import express from "express";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createNewUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
