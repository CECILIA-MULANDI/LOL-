// Network Configuration for Dual Deployment
const NETWORK_CONFIG = {
  testnet: {
    contractAddress: "0x5f50935eA06250AF8a2a049913DbDFeB2F8629AE", // Base Sepolia
    chainId: 84532,
    networkName: "Base Sepolia Testnet",
  },
  mainnet: {
    contractAddress: "YOUR_MAINNET_CONTRACT_ADDRESS", // Replace after deployment
    chainId: 8453,
    networkName: "Base Mainnet",
  },
};

// Determine network based on branch or environment variable
const isMainnetBranch =
  process.env.VERCEL_GIT_COMMIT_REF === "mainnet" ||
  process.env.NEXT_PUBLIC_NETWORK === "mainnet";

const currentNetwork = isMainnetBranch ? "mainnet" : "testnet";

export const CONTRACT_ADDRESS = NETWORK_CONFIG[currentNetwork].contractAddress;
export const CHAIN_ID = NETWORK_CONFIG[currentNetwork].chainId;
export const NETWORK_NAME = NETWORK_CONFIG[currentNetwork].networkName;
export const CURRENT_NETWORK = currentNetwork;
// Auto-commit whitespace: 2025-07-24 18:35:53
// Auto-commit whitespace: 2025-07-24 18:41:31
// Auto-commit whitespace: 2025-07-24 18:46:43

// Auto-commit spacing update: 2025-07-24 18:49:49
// Auto-commit whitespace: 2025-07-24 18:55:01

// Auto-commit spacing update: 2025-07-24 18:57:07

// Auto-commit spacing update: 2025-07-25 21:24:52
// Auto-commit whitespace: 2025-07-25 21:31:15
// Auto-commit whitespace: 2025-07-25 21:37:43
// Auto-commit whitespace: 2025-07-25 21:42:54

// Auto-commit spacing update: 2025-07-25 23:32:13

// Auto-commit spacing update: 2025-07-25 23:37:21

// Auto-commit spacing update: 2025-07-25 23:38:22

// Auto-commit spacing update: 2025-07-25 23:41:27

// Auto-commit spacing update: 2025-07-25 23:44:32

// Auto-commit spacing update: 2025-07-26 12:47:41

// Auto-commit spacing update: 2025-07-26 12:51:48

// Auto-commit spacing update: 2025-07-27 16:23:55

// Auto-commit spacing update: 2025-07-27 16:26:06

// Auto-commit spacing update: 2025-07-27 16:30:22
// Auto-commit whitespace: 2025-07-27 23:47:26

// Auto-commit spacing update: 2025-07-27 23:48:27
// Auto-commit whitespace: 2025-07-27 23:53:36
