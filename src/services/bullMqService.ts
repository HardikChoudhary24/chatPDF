import { Queue, Worker } from "bullmq";
import pdf from "pdf-parse";
import splitRawText from "../utils/splitText";
import generateEmbeddings from "../utils/generateEmbeddings";
import pool from "../database/db";
import { insertEmbeddings } from "../database/projectQueries";

const pdf_processing = new Queue("pdf-processing", {
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

      const chunk_embeddings = await generateEmbeddings(text_chunks);

      for (let chunk of chunk_embeddings) {
        await pool.query(insertEmbeddings, [
          project_id,
          "[" + chunk.embedding + "]",
          chunk.text_content,
        ]);
      }

      await pool.query("Update project set status = 'created' where project_id = $1",[project_id]);

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
