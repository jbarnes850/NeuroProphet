export const proxyAddress = process.env.NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS || "0.minsta.proxy.mintbase.testnet";
export const contractAddress = process.env.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS || "test122212.mintspace2.testnet";
export const network = process.env.NEXT_PUBLIC_NETWORK || "testnet";
export const callbackUrl = network === "testnet" ? "https://testnet.mintbase.xyz/contract/test122212.mintspace2.testnet/nfts/mint" : "https://www.mintbase.xyz/contract/test122212.mintspace2.testnet/nfts/mint";