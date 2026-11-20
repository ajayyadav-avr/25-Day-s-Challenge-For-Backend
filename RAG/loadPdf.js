import dotenv from 'dotenv';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from '@pinecone-database/pinecone';
dotenv.config()

// 1. Initialize Pinecone
const pc = new Pinecone({apiKey : process.env.PINECONE_API_KEY})
const index = pc.index("learn-rag")


// 2. Load PDF
const loader = new PDFLoader(`./story.pdf`);
const data = await loader.load()

// 3. Initialize Gemini embeddings
const embeddingsModel = new GoogleGenerativeAIEmbeddings({
  apiKey : process.env.GOOGLE_API_KEY,  
  model: "gemini-embedding-001"
});

// 4. Split PDF into chunks
const splitter = new RecursiveCharacterTextSplitter({ 
    chunkSize: 500, 
    chunkOverlap: 0 
})
const chunks = await splitter.splitDocuments(data)
console.log("Total chunks:", chunks.length);

// 5. Extract text from chunks
const texts = chunks.map((chunk) => chunk.pageContent);

// 6. Generate embeddings
const docs = await embeddingsModel.embedDocuments(texts)
console.log(docs);

