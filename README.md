# NeuroProphet: AI-Powered Prediction Market for Crypto Trends

This project demonstrates an AI-powered prediction market for crypto trends using the NEAR AI Stack. It leverages advanced AI capabilities, including Retrieval Augmented Generation (RAG) and specialized search APIs, to analyze crypto-related data and generate information-rich and timely cryptocurrency trends. The project is designed to be a fun and educational tool for understanding AI-powered prediction markets and the intersection of AI, blockchain, and web3.

![NeuroProphet](/public/NeuroProphet.png)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-AI%20Prediction%20Market-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-NEAR,Hyperbolic,Mintbase,Exa,Pinecone,OpenAI-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js-blue)](#)

## Key Features

1. RAG-powered analysis of crypto trends using historical and real-time data
2. Exa API integration for comprehensive web content retrieval
3. Hyperbolic API for advanced AI inference and prediction generation
4. Mintbase integration for creating prediction NFTs
5. Pinecone vector database for storing and retrieving relevant historical data
6. OpenAI for generating embeddings
7. User-friendly interface for browsing and generating predictions

## Technical Architecture

- **Frontend**: Next.js with React and TypeScript
- **AI Stack**:
  - Hyperbolic API for AI inference
  - OpenAI API for embeddings
  - Pinecone for vector storage and retrieval (implementing RAG)
- **Web3 Stack**: 
  - NEAR Protocol
  - Mintbase for NFT creation and management
- **External APIs**:
  - Exa for web content retrieval

## Prerequisites

1. Node.js 14+ and npm
2. A NEAR account and wallet
3. API keys for:
   - Hyperbolic
   - Exa
   - Pinecone
   - OpenAI
   - Mintbase (API key and store ID)

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/ai-crypto-prediction-market.git
   cd ai-crypto-prediction-market
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required API keys and configuration values:
     ```
     NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS=your_proxy_contract_address
     NEXT_PUBLIC_MINT_CONTRACT_ADDRESS=your_mint_contract_address
     NEXT_PUBLIC_NETWORK=testnet_or_mainnet
     NEXT_PUBLIC_HYPERBOLIC_API_KEY=your_hyperbolic_api_key
     EXA_API_KEY=your_exa_api_key
     PINECONE_API_KEY=your_pinecone_api_key
     PINECONE_ENVIRONMENT=your_pinecone_environment
     PINECONE_INDEX_NAME=your_pinecone_index_name
     OPENAI_API_KEY=your_openai_api_key
     NEAR_CONTRACT_ID=your_near_contract_id
     ```

4. Initialize Pinecone:
   - Create a Pinecone account and set up a new index
   - Run the initialization script:
     ```
     npx ts-node scripts/initializePinecone.ts
     ```

## Running the Project

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Code Structure

- `src/app`: Next.js app router components
- `src/components`: React components including PredictionForm and PredictionList
- `src/lib`: Core logic for AI, blockchain, and data management
  - `ai`: Hyperbolic and OpenAI integrations, RAG implementation
  - `blockchain`: NEAR and Mintbase integrations
  - `data`: Pinecone and Exa data management
- `src/config`: Configuration files
- `scripts`: Utility scripts for setup and initialization

## Key Components

- `src/components/PredictionForm.tsx`: Handles user input and prediction generation
- `src/lib/ai/rag.ts`: Implements the RAG system
- `src/lib/blockchain/mintbase.ts`: Manages NFT creation with Mintbase
- `src/lib/data/pinecone.ts`: Handles vector storage and retrieval with Pinecone

## Deployment

1. Fork this repository
2. Connect your forked repo to Vercel
3. Set up the environment variables in Vercel
4. Deploy!

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
