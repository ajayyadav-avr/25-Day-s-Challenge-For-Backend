import dotenv from "dotenv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
dotenv.config();

// 1. Initialize Pinecone
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pc.index("learn-rag-cohere").namespace("pdf-docs");

// 2. Load PDF
const loader = new PDFLoader(`./story.pdf`);
const data = await loader.load();

// 3. Split PDF into chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});
const chunks = await splitter.splitDocuments(data);

console.log("Total chunks:", chunks.length);

// 4. Prepare documents for Pinecone
const documents = chunks.map((chunk, i) => ({
  _id: `doc-${i}`,
  chunk_text: chunk.pageContent,
}));

// 5. Upload documents to Pinecone
const uploadResult = await index.documents.upsert({
  documents,
});

console.log("Upload Result:", uploadResult);

// 6. User query
const question = "How was the internship experience?";

// 7. Retrieve relevant documents
const result = await index.documents.search({
  scoreBy: [
    {
      type: "embed",
      field: "chunk_text",
      query: question,
    },
  ],
  topK: 2,
  includeFields: ["chunk_text"],
});

// 8. Display retrieved results
console.log("\nUser Question:", question);
console.log("\nRetrieved Results:");

for (const match of result.matches) {
  console.log("\nID:", match._id);
  console.log("Score:", match._score);
  console.log("Text:", match.chunk_text);
}
