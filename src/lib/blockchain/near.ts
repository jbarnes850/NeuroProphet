import { connect, keyStores, Near, ConnectConfig, Contract, WalletConnection } from 'near-api-js';

let near: Near;
let wallet: WalletConnection;
let contract: Contract;

const contractMethods = {
  viewMethods: ['get_prediction', 'get_stakes'],
  changeMethods: ['create_prediction', 'stake_on_prediction'],
};

export async function initializeNear() {
  const config = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://testnet.mynearwallet.com',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };
  near = await connect(config as ConnectConfig);
  wallet = new WalletConnection(near, 'ai-prediction-market');

  if (wallet.isSignedIn()) {
    contract = new Contract(
      wallet.account(),
      process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID!,
      contractMethods
    );
  }
}

export async function signIn() {
  if (!wallet) {
    throw new Error('NEAR has not been initialized');
  }
  await wallet.requestSignIn({
    contractId: process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID,
    methodNames: contractMethods.changeMethods,
  });
}

export async function signOut() {
  if (!wallet) {
    throw new Error('NEAR has not been initialized');
  }
  wallet.signOut();
}

export function isSignedIn() {
  return wallet?.isSignedIn() ?? false;
}

export async function createPrediction(id: string, description: string) {
  if (!contract) {
    throw new Error('Contract is not initialized');
  }
  return await contract.create_prediction({ id, description });
}

export async function stakeOnPrediction(predictionId: string, amount: number) {
  if (!contract) {
    throw new Error('Contract is not initialized');
  }
  return await contract.stake_on_prediction({ prediction_id: predictionId, amount });
}

export async function getPrediction(id: string) {
  if (!contract) {
    throw new Error('Contract is not initialized');
  }
  return await contract.get_prediction({ id });
}

export async function getStakes(predictionId: string) {
  if (!contract) {
    throw new Error('Contract is not initialized');
  }
  return await contract.get_stakes({ prediction_id: predictionId });
}
