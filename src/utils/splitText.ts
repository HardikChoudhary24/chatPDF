import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import dotenv from "dotenv";
import { queryModel } from "./gnerativeAI";
dotenv.config();

const splitRawText = (text: string) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  return textSplitter.splitText(text);
};

export default splitRawText;
