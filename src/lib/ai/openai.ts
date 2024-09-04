import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIEmbeddings {
  static async embed(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
      });

      if (response.data && response.data.length > 0) {
        return response.data[0].embedding;
      } else {
        throw new Error("No embedding returned from OpenAI");
      }
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw new Error("Failed to generate embedding");
    }
  }

  static async embedBatch(texts: string[]): Promise<number[][]> {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: texts,
      });

      if (response.data && response.data.length === texts.length) {
        return response.data.map(item => item.embedding);
      } else {
        throw new Error("Unexpected number of embeddings returned from OpenAI");
      }
    } catch (error) {
      console.error("Error generating batch embeddings:", error);
      throw new Error("Failed to generate batch embeddings");
    }
  }
}
