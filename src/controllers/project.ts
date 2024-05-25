import { insertProjectDetails } from "../database/projectQueries";
import pool from "../database/db";
import express from "express";
import { addJobs } from "../services/bullMqService";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import multer from "multer";
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
  req: express.Request,
  res: express.Response
) => {
  try {
    // const { pdfUrl, name } = req.body;
    // console.log(pdfUrl,name);
    const file = req.file;
    console.log(file);
    // const result = pool.query(insertProjectDetails, [name, pdfUrl, 1]);
    addJobs(file.buffer);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ details: error });
  }
};

export const deleteProjectById = async (
  req: express.Request,
  res: express.Response
) => {};

export const queryPDF = async (req: express.Request, res: express.Response) => {
  console.log("hellow");
  res.json({ success: true });
};

export const generateSignedUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const { pdfFileName } = req.body;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}/pdf/${pdfFileName}`,
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand);
  res.status(200).json({ url: signedUrl });
};
