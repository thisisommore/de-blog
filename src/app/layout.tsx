import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Chains, wagmiConfig } from "@/config/wallet";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeBlog",
  description: "Publich your thoughts permanently",
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
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
