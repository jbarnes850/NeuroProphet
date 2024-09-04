import Exa from 'exa-js';

const exa = new Exa(process.env.EXA_API_KEY);

export async function getExaData(query: string): Promise<string> {
  try {
    const result = await exa.searchAndContents(query, {
      type: "neural",
      useAutoprompt: true,
      numResults: 5,
      text: true,
    });

    // Extract relevant information from the results
    const relevantInfo = result.results.map(item => {
      return `Title: ${item.title}\nSummary: ${item.text.slice(0, 200)}...\n`;
    }).join('\n');

    return relevantInfo;
  } catch (error) {
    console.error("Error fetching data from Exa:", error);
    throw new Error("Failed to fetch data from Exa");
  }
}
