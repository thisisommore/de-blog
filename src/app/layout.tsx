import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Chains, wagmiConfig } from "@/config/wallet";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeBlog",
  description: "Publish your thoughts permanently",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={Chains}>
            <Header />
            {children}
            <Toaster />
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
