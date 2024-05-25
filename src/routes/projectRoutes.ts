import {
  deleteProjectById,
  queryPDF,
  createProject,
  generateSignedUrl,
  upload,
} from "../controllers/project";

import express from "express";

const router = express.Router();

router.post("/create", upload.single("pdf"), createProject);

router.delete("/delete/:id", deleteProjectById);

router.get("/signedUrl", generateSignedUrl);

router.get("/query/:project_id", queryPDF);

export default router;
