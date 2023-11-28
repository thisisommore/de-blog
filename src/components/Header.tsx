import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Header = () => {
  return (
    <header className="flex w-100 p-2">
      <h2 className="text-2xl">DeBlog</h2>
      <div className="ml-auto">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
