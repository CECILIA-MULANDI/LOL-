// Auto-commit update: 2025-07-27 16:28:13
// Auto-commit update: 2025-07-27 16:21:43
// Auto-commit update: 2025-07-25 21:39:48
// Auto-commit update: 2025-07-25 21:35:38
// Auto-commit update: 2025-07-25 21:25:52
"use client";

import * as React from "react";
import { WagmiProvider } from "wagmi";
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
// Auto-commit whitespace: 2025-07-25 23:31:11
// Auto-commit whitespace: 2025-07-25 23:39:24
// Auto-commit whitespace: 2025-07-25 23:43:30
// Auto-commit whitespace: 2025-07-25 23:47:37
// Auto-commit whitespace: 2025-07-26 13:00:01
