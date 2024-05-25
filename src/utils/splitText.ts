import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitRawText = (text: string) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  return textSplitter.splitText(text);
};

export default splitRawText

