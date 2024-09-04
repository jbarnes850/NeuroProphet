import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
}

async function initializePinecone() {
  console.log("Initializing Pinecone...");

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  // Initial data for cryptocurrency trends
  const initialData = [
    { id: "1", content: "Bitcoin halving events historically lead to price increases" },
    { id: "2", content: "Ethereum's transition to proof-of-stake reduces energy consumption" },
    { id: "3", content: "DeFi protocols are gaining traction in the crypto ecosystem" },
    { id: "4", content: "Regulatory changes can significantly impact cryptocurrency markets" },
    { id: "5", content: "NFTs are expanding beyond digital art into various industries" },
  ];

  console.log("Generating embeddings and uploading to Pinecone...");

  for (const item of initialData) {
    const embedding = await generateEmbedding(item.content);
    
    await index.upsert([{
      id: item.id,
      values: embedding,
      metadata: { content: item.content }
    }]);
  }

  console.log("Pinecone initialization complete!");
}

initializePinecone().catch((error) => {
  console.error("Error initializing Pinecone:", error);
  process.exit(1);
});