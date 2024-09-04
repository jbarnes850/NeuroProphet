import React from 'react';

interface PredictionCardProps {
  prediction: string;
  // Add more props as needed
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-bold">Prediction</h3>
      <p>{prediction}</p>
      {/* Add more details and functionality */}
    </div>
  );
};

export default PredictionCard;