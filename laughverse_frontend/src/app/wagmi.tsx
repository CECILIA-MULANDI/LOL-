// Auto-commit update: 2025-07-24 18:44:38
// Auto-commit update: 2025-07-24 18:43:36
// Auto-commit update: 2025-07-24 18:42:33
// Auto-commit update: 2025-07-24 18:40:30
"use client";

import * as React from "react";
import { WagmiConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "Laughverse",
  projectId: "YOUR_PROJECT_ID",
  chains: [baseSepolia],
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
// Auto-commit whitespace: 2025-07-24 18:51:53
