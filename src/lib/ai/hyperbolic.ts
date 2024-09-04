import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_HYPERBOLIC_API_KEY,
  baseURL: 'https://api.hyperbolic.xyz/v1',
});

export async function generatePredictionWithHyperbolic(context: string): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert in cryptocurrency trends and predictions.',
        },
        {
          role: 'user',
          content: `Based on the following context, generate a detailed prediction about cryptocurrency trends:\n\n${context}`,
        },
      ],
      model: 'meta-llama/Meta-Llama-3-70B-Instruct',
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error("Error generating prediction with Hyperbolic:", error);
    throw error;
  }
}
