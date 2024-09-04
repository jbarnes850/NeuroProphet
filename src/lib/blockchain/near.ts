import { connect, keyStores, Near } from 'near-api-js';

let near: Near;

export async function initializeNear() {
  const config = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://testnet.mynearwallet.com',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };

  near = await connect(config);
}

export async function signIn() {
  const wallet = new (near.wallet as any)();
  await wallet.requestSignIn({
    contractId: process.env.NEAR_CONTRACT_ID,
    methodNames: ['create_prediction', 'stake_on_prediction'],
  });
}

export async function signOut() {
  const wallet = new (near.wallet as any)();
  wallet.signOut();
}

export async function isSignedIn() {
  const wallet = new (near.wallet as any)();
  return wallet.isSignedIn();
}
