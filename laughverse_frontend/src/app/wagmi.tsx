"use client";

import * as React from "react";
import { WagmiConfig, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "Laughverse",
  projectId: "YOUR_PROJECT_ID",
  chains: [baseSepolia], // Using Base Sepolia testnet
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

// Auto-commit spacing update: 2025-07-23 15:25:40
// Auto-commit whitespace: 2025-07-23 15:32:16

// Auto-commit spacing update: 2025-07-23 15:36:36
// Auto-commit whitespace: 2025-07-23 15:37:38

// Auto-commit spacing update: 2025-07-23 16:33:53
// Auto-commit whitespace: 2025-07-23 16:43:14
// Auto-commit whitespace: 2025-07-23 23:50:57
// Auto-commit whitespace: 2025-07-23 23:51:58
// Auto-commit whitespace: 2025-07-23 23:54:03

// Auto-commit spacing update: 2025-07-24 00:00:15
