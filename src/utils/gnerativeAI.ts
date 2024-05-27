import { ContentEmbedding, GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
export const embeddingModel = genAI.getGenerativeModel({
  model: "embedding-001",
});
export const queryModel = genAI.getGenerativeModel({ model: "gemini-pro" });
