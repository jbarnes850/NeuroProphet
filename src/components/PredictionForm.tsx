import React, { useState } from 'react';
import { generatePrediction } from '../lib/ai/rag';
import { createPredictionNFT } from '../lib/blockchain/mintbase';
import { storeEmbedding } from '../lib/data/pinecone';
import { Button } from './ui/button';
import { Input } from './ui/input';

const PredictionForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const generatedPrediction = await generatePrediction(query);
      setPrediction(generatedPrediction);

      // Create NFT
      const nftResult = await createPredictionNFT(generatedPrediction);

      // Store in Pinecone
      await storeEmbedding(generatedPrediction, { query, nftId: nftResult.id });

    } catch (error) {
      console.error("Error generating prediction:", error);
      setError("Failed to generate prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your crypto-related query"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Prediction'}
      </Button>
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
      {prediction && (
        <div className="mt-4">
          <h3 className="font-bold">Generated Prediction:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </form>
  );
};

export default PredictionForm;
