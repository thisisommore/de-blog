import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
const Header = () => {
  return (
    <header className="flex w-full p-2 border-b rounder-sm items-center">
      <Link href="/">
        <h2 className="text-2xl font-semibold">DeBlog</h2>
      </Link>
      <div className="ml-auto">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
