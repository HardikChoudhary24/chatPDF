import {
  allUserProjects,
  getProjectDetails,
  insertProjectDetails,
  messageHistory,
  selectNearest,
} from "../database/projectQueries";
import pool from "../database/db";
import express from "express";
import { addInMessageHistory, addJobs } from "../services/bullMqService";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import multer from "multer";
import { generateEmbedding } from "../utils/generateEmbeddings";
import { generateQueryOutput } from "../utils/generateQueryOutput";
import { AuthenticatedRequest } from "types/types";
dotenv.config();

export const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const createProject = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    const { pdfUrl, name } = req.body;
    const { user } = req;
    const file = req.file;
    const result = await pool.query(insertProjectDetails, [
      name,
      pdfUrl,
      user.id,
      "creating",
    ]);
    const project_id = result.rows[0].project_id;
    addJobs({ pdfFile: file.buffer, project_id });
    res.json({ project: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ details: error });
  }
};


export const queryPDF = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { query } = req.query;
  const { project_id } = req.params;
  if (!query) res.json({ details: "Failed to generate response." });
  try {
    const embedding = await generateEmbedding(query as string);
    const result = await pool.query(selectNearest, [
      project_id,
      "[" + embedding.values + "]",
    ]);
    const context = result.rows.map((row) => row.text_content).join(" ");
    const chat_history = await pool.query(messageHistory, [project_id]);
    const response = await generateQueryOutput({ query:query as string, context,chat_history:chat_history.rows.map(chat=>chat.message).join("\n") });
    addInMessageHistory([
      { role: "User", message: query as string, project_id },
      { role: "AI", message: response, project_id },
    ]);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ details: error });
  }
};

export const generateSignedUrl = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { filename } = req.params;
  const pdfFileName = filename.replace(" ", "_");

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}/pdf/${pdfFileName}`,
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand);
  res.status(200).json({ url: signedUrl });
};

export const getChatHistory = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { project_id } = req.params;
  try {
    const project = await pool.query(getProjectDetails, [project_id]);
    if(project.rowCount==0) throw new Error("No projects found!")
    const result = await pool.query(messageHistory, [project_id]);
    res.status(200).json({ projectDetails: project.rows[0], chatHistory: result.rows });
  } catch (error) {
    res.status(500).json({ details: error });
  }
};

export const getAllProjects = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { user } = req;
  const result = await pool.query(allUserProjects, [user.id]);
  res.status(200).json({ projects: result.rows });
};


export const retryCreatingProject = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { user } = req;
  const result = await pool.query(allUserProjects, [user.id]);
  res.status(200).json({ projects: result.rows });
};