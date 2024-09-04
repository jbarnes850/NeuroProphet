import PredictionList from '../components/PredictionList';
import PredictionForm from '../components/PredictionForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">NeuroPropet: AI Prediction Market</h1>
      <PredictionForm />
      <PredictionList />
    </main>
  );
}
