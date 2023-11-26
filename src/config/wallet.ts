"use client";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { polygonMumbai } from "viem/chains";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "DeBlog",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  chains,
});

export const Chains = chains;

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
