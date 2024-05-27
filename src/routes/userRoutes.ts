import {
  authenticateUser,
  createNewUser,
} from "../controllers/user";

import express from "express";

const router = express.Router();

router.post("/signup", createNewUser);
router.post("/login", authenticateUser);

export default router;
