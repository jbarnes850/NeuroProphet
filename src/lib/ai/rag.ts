import { queryEmbeddings } from '../data/pinecone';
import { generatePredictionWithHyperbolic } from './hyperbolic';
import { getExaData } from '../data/exa';

export async function generatePrediction(query: string) {
  try {
    // 1. Retrieve relevant info from Pinecone
    const relevantData = await queryEmbeddings(query);

    // 2. Get fresh data from Exa
    const exaData = await getExaData(query);

    // Combine all data sources
    const context = `
      Relevant historical data: ${JSON.stringify(relevantData)}
      Recent web content: ${exaData}
    `;

    // 3. Use Hyperbolic to generate prediction
    const prediction = await generatePredictionWithHyperbolic(context);

    return prediction;
  } catch (error) {
    console.error("Error generating prediction:", error);
    throw new Error("Failed to generate prediction");
  }
}