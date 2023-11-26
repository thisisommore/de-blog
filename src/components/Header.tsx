import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Header = () => {
  return (
    <header className="flex w-100 p-2">
      <div className="ml-auto">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
