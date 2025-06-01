"use client";
import { networkConfig } from "@/lib/networkConfig";
import { queryClient } from "@/lib/queryClient";
import { SuiClientProvider } from "@mysten/dapp-kit";
import { WalletProvider } from "@mysten/dapp-kit";
import { QueryClientProvider } from "@tanstack/react-query";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default Provider;
