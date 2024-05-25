import { ContentEmbedding, GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "embedding-001" });

const generateEmbeddings = async (textChunks: string[]) => {
  const chunk_embeddings = [];
  [];
  for (const chunk of textChunks) {
    try {
      const result = await model.embedContent(chunk);
      const embedding = result.embedding;
      chunk_embeddings.push({
        text_content: chunk,
        embedding: embedding.values,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return chunk_embeddings;
};
export default generateEmbeddings;
