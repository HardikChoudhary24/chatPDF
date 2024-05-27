import { authenticateMiddleware } from "../middlewares/authenticateMiddleware";
import {
  // deleteProjectById,
  queryPDF,
  createProject,
  generateSignedUrl,
  upload,
  getChatHistory,
  getAllProjects,
} from "../controllers/project";

import express from "express";

const router = express.Router();

router.post("/create",upload.single("pdf"), createProject);

// router.delete("/delete/:id", deleteProjectById);

router.get("/signedUrl/:filename", generateSignedUrl);

router.get("/query/:project_id", queryPDF);

router.get("/allProjects", getAllProjects);

router.get("/chat_history/:project_id",getChatHistory)
export default router;
