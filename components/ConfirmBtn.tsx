import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "primereact/button";
import React from "react";
import { useAccount } from "wagmi";

function ConfirmBtn({ swapHandler }: Iprops) {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  return (
    <Button
      className="mx-auto my-5 w-3/4 font-bold px-4 py-3 bg-[#2172E5] rounded-2xl"
      label={
        isConnected || address !== undefined ? "Confirm" : "Connect Wallet"
      }
      onClick={() => {
        // if (isConnected || address !== undefined || swapHandler === undefined)
        //   return;
        isConnected || address !== undefined ? swapHandler() : open();
      }}
    />
  );
}

export default ConfirmBtn;

interface Iprops {
  swapHandler: () => void;
}
