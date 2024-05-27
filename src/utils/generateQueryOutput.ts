import { MessageHistoryInterface } from "types/types";
import { queryModel } from "./gnerativeAI";

export const generateQueryOutput = async ({
  query,
  context,
  chat_history,
}: {
  query: string;
  context: string;
  chat_history: string;
}) => {
  const prompt = `Reply to user message with the following context:\n\n**Content Part 1 (Context)**\n\nPDF Text: ${context}\n\nChat History: ${chat_history}\n\n**Content Part 2 User Message:**\n\n${query}`;
  const result = await queryModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};
