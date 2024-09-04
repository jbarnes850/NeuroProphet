import { Wallet } from '@mintbase-js/wallet';
import { execute, mint, mbjs } from '@mintbase-js/sdk';
import { proxyAddress, contractAddress, network, callbackUrl } from '../../config/setup';

export async function createPredictionNFT(predictionText: string) {
  try {
    const wallet = await Wallet.init({ networkId: network, callbackUrl });

    if (!wallet.connected) {
      await wallet.connect({ requestSignIn: true });
    }

    const args = {
      metadata: {
        title: 'Crypto Prediction',
        description: predictionText,
      },
      amount: 1,
    };

    const result = await execute(
      { wallet, args },
      mint(contractAddress, proxyAddress)
    );

    console.log("NFT created for prediction:", predictionText);
    return result;
  } catch (error) {
    console.error("Error creating NFT:", error);
    throw error;
  }
}

// Initialize Mintbase
export function initializeMintbase() {
  mbjs.config({
    network: network,
    callbackUrl: callbackUrl,
  });
}