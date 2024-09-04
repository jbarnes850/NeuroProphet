import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '../ai/openai';

let pinecone: Pinecone;

export async function initializePinecone() {
  pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });
}

export async function storeEmbedding(text: string, metadata: any) {
  try {
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    const embedding = await OpenAIEmbeddings.embed(text);

    await index.upsert([{
      id: `prediction_${Date.now()}`,
      values: embedding,
      metadata: metadata,
    }]);

    console.log("Embedding stored successfully");
  } catch (error) {
    console.error("Error storing embedding:", error);
    throw new Error("Failed to store embedding in Pinecone");
  }
}

export async function queryEmbeddings(query: string, topK: number = 5) {
  try {
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    const queryEmbedding = await OpenAIEmbeddings.embed(query);

    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
    });

    return queryResponse.matches?.map(match => match.metadata) || [];
  } catch (error) {
    console.error("Error querying embeddings:", error);
    throw new Error("Failed to query embeddings from Pinecone");
  }
}

export async function initializePineconeWithData(initialData: { text: string; metadata: any }[]) {
  try {
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    const batchSize = 100; // Adjust based on Pinecone's limits and your needs

    for (let i = 0; i < initialData.length; i += batchSize) {
      const batch = initialData.slice(i, i + batchSize);
      const embeddings = await OpenAIEmbeddings.embedBatch(batch.map(item => item.text));

      const vectors = embeddings.map((embedding, idx) => ({
        id: `initial_data_${i + idx}`,
        values: embedding,
        metadata: batch[idx].metadata,
      }));

      await index.upsert(vectors);
    }

    console.log("Pinecone initialized with initial data");
  } catch (error) {
    console.error("Error initializing Pinecone with data:", error);
    throw new Error("Failed to initialize Pinecone with initial data");
  }
}
