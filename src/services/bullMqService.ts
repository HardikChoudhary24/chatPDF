import { Queue, Worker } from "bullmq";
import pdf from "pdf-parse";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { s3Client } from "controllers/project";

const pdf_processing = new Queue("pdf-processing", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

export const addJobs = async (pdfFile: Buffer) => {
  await pdf_processing.add("process_pdf", { pdfFile });
  const pdfData = await pdf(pdfFile);
  console.log("inProducer:", pdfData);
};

export const executeJobWorker = new Worker(
  "pdf-processing",
  async (job) => {
    const pdfFileBuffer: Buffer = job.data.pdfFile;
    try {
      const pdfData = await pdf(pdfFileBuffer);
    } catch (err) {
      console.error(err);
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);
