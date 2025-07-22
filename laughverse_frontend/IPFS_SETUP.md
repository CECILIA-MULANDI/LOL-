# IPFS Setup Guide

## Setting up Pinata for IPFS Upload

### 1. Get Pinata API Keys

1. Go to [Pinata Cloud](https://app.pinata.cloud/)
2. Sign up or log in
3. Go to "API Keys" in your dashboard
4. Create a new API key
5. Copy your **API Key** and **Secret Key**

### 2. Create Environment File

Create a file called `.env.local` in the `laughverse_frontend` directory with:

```env
# Pinata IPFS API Keys
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key_here
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key_here
```

### 3. Replace the Placeholders

Replace `your_pinata_api_key_here` and `your_pinata_secret_key_here` with your actual Pinata API keys.

### 4. Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## How it Works

- **File Upload**: When you upload a file, it gets uploaded to IPFS via Pinata
- **Metadata Upload**: The NFT metadata (title, description, file URI) gets uploaded to IPFS
- **Smart Contract**: The metadata URI is passed to your smart contract for minting

## Security Note

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore` to keep your keys secure
