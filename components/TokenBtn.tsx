import Image from "next/image";
import { Button } from "primereact/button";
import React from "react";

function TokenBtn({
  token,
  setIsModalOpen,
  isdisabled,
}: {
  token: string;
  setIsModalOpen: (value: boolean) => void;
  isdisabled: boolean;
}) {
  return (
    <Button
      className={`absolute left-[4rem] top-[10px] py-3 px-3 bg-neutral-500 rounded-2xl gap-1 w-[8vw] ${
        isdisabled && "bg-neutral-600 opacity-70"
      }`}
      disabled={isdisabled}
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <Image src={`/${token}.png`} width={20} height={20} alt={token} />
      <span>{token.toUpperCase()}</span>
    </Button>
  );
}

export default TokenBtn;
