import { Queue, Worker } from "bullmq";
import pdf from "pdf-parse";
import splitRawText from "../utils/splitText";
import pool from "../database/db";
import { insertEmbeddings, insertMessage } from "../database/projectQueries";
import generateEmbeddingsForDoc from "../utils/generateEmbeddings";

const pdf_processing = new Queue("pdf-processing", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

const add_in_messageHistory = new Queue("add_in_messageHistory", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

export const addJobs = async ({
  project_id,
  pdfFile,
}: {
  project_id: number;
  pdfFile: Buffer;
}) => {
  await pdf_processing.add("process_pdf", { pdfFile, project_id });
};

export const executeJobWorker = new Worker(
  "pdf-processing",
  async (job) => {
    const pdfFileBuffer: Buffer = job.data.pdfFile;
    const project_id: number = job.data.project_id;
    try {
      const raw_text = await pdf(pdfFileBuffer);

      const text_chunks = await splitRawText(raw_text.text);

      const chunk_embeddings = await generateEmbeddingsForDoc(text_chunks);

      for (let chunk of chunk_embeddings) {
        await pool.query(insertEmbeddings, [
          project_id,
          "[" + chunk.embedding + "]",
          chunk.text_content,
        ]);
      }

      await pool.query(
        "Update project set status = 'created' where project_id = $1",
        [project_id]
      );
    } catch (err) {
      console.error(err);
      await pool.query(
        "Update project set status = 'failed' where project_id = $1",
        [project_id]
      );
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);

export const addInMessageHistory = async (
  messages: {
    project_id: string;
    role: "User" | "AI";
    message: string;
  }[]
) => {
  await add_in_messageHistory.add("add_in_messageHistory", {
    messages,
  });
};

export const executeMessageWorker = new Worker(
  "add_in_messageHistory",
  async (job) => {
    const messages = job.data.messages;
    try {
      for (let message of messages) {
        await pool.query(insertMessage, [
          message.project_id,
          message.role,
          message.message,
        ]);
      }
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
