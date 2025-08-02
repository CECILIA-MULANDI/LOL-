// Auto-commit update: 2025-07-25 21:39:48
// Auto-commit update: 2025-07-25 21:35:38
// Auto-commit update: 2025-07-25 21:25:52
"use client";

import * as React from "react";
import { WagmiProvider } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { CURRENT_NETWORK } from "./smart-contracts/constants";

// Configure chains based on current network
const chains = CURRENT_NETWORK === "mainnet" ? [base] : [baseSepolia];

const config = getDefaultConfig({
  appName: "Laughverse",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const queryClient = new QueryClient();

export function Web3Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
