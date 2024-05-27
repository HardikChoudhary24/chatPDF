import dotenv from "dotenv";
import { embeddingModel } from "./gnerativeAI";
dotenv.config();

const generateEmbeddingsForDoc = async (textChunks: string[]) => {
  const chunk_embeddings = [];
  [];
  for (const chunk of textChunks) {
    try {
      const result = await embeddingModel.embedContent(chunk);
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
export const generateEmbedding = async (text: string) => {
  try {
    const result = await embeddingModel.embedContent(text);
    const embedding = result.embedding;
    return embedding;
  } catch (error) {
    console.error("error ",error);
  }
};
export default generateEmbeddingsForDoc;
