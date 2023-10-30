"use client";

import React from "react";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygon, arbitrum } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_PORJECT_ID as string;

const metadataWeb3 = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["/uniswap-clone/public/vercel.svg"],
};

// const chains = [polygon, arbitrum];
const { chains, publicClient } = configureChains(
  [polygon, arbitrum],
  [publicProvider()]
);
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: metadataWeb3,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  // connector:[],
  themeVariables: {
    "--w3m-accent": "#1b1b1b",
    "--w3m-color-mix": "#2D242F",
    "--w3m-color-mix-strength": 40,
    "--w3m-font-size-master": "12px",
  },
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      {/* {children} */}
    </div>
  );
}

export default Wrapper;
