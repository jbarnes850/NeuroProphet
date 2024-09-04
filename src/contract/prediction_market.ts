import { NearBindgen, near, call, view, initialize } from 'near-sdk-js';

@NearBindgen({})
class PredictionMarket {
  predictions: Map<string, Prediction> = new Map();
  stakes: Map<string, Map<string, number>> = new Map();

  @initialize({})
  init() {
    // Initialization logic if needed
  }

  @call({})
  create_prediction({ id, description }: { id: string, description: string }): void {
    near.log(`Creating prediction ${id}`);
    this.predictions.set(id, { id, description, resolved: false });
  }

  @call({})
  stake_on_prediction({ prediction_id, amount }: { prediction_id: string, amount: number }): void {
    const sender = near.signerAccountId();
    near.log(`Staking ${amount} on prediction ${prediction_id} by ${sender}`);
    
    if (!this.stakes.has(prediction_id)) {
      this.stakes.set(prediction_id, new Map());
    }
    const predictionStakes = this.stakes.get(prediction_id)!;
    const currentStake = predictionStakes.get(sender) || 0;
    predictionStakes.set(sender, currentStake + amount);
  }

  @view({})
  get_prediction({ id }: { id: string }): Prediction | null {
    return this.predictions.get(id) || null;
  }

  @view({})
  get_stakes({ prediction_id }: { prediction_id: string }): { [key: string]: number } {
    const stakes = this.stakes.get(prediction_id);
    if (!stakes) return {};
    return Object.fromEntries(stakes);
  }
}

interface Prediction {
  id: string;
  description: string;
  resolved: boolean;
}
