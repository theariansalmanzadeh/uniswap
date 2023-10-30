import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useToken } from "wagmi";
import { InputText } from "primereact/inputtext";
import tokens from "../../assets/contents/tokens.json";
import Image from "next/image";

function TokenSelection({
  isModalOpen,
  setIsModalOpen,
  setSelectToken,
  selectedToken,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setSelectToken: (value: {
    name: string;
    address: string;
    decimals: number;
  }) => void;
  selectedToken: { name: string; address: string; decimals: number };
}) {
  const [tokenIn, setTokenIn] = useState("");
  const { data: token, isLoading } = useToken({
    address: tokenIn as `0x${string}`,
    enabled: tokenIn !== "" ? true : false,
    onSuccess(data) {
      console.log(data);

      // setSelectToken(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  return (
    <div>
      <Dialog
        visible={isModalOpen}
        onHide={() => {
          setTokenIn("");
          setIsModalOpen(false);
        }}
        dismissableMask
        draggable={false}
        header="Tokens"
        pt={{
          root: {
            className:
              "w-1/4  bg-zinc-900 h-4/5 rounded-lg p-3 overflow-hidden",
          },
          header: {
            className: "font-bold text-gray-100",
          },
          mask: { className: "backdrop-blur-sm bg-nuatral-400" },
          content: { className: "flex flex-col items-center justify-start" },
        }}
      >
        <InputText
          placeholder="0X"
          className="my-2 px-2 py-3 bg-zinc-800 rounded-2xl font-semibold text-md w-full outline-none"
          onChange={(e) => {
            console.log(e.target.value);

            setTokenIn(e.target.value as `0x${string}`);
          }}
        />
        {tokenIn === "" && (
          <ul className="w-full">
            {tokens.map((token) => {
              return (
                <li
                  key={token.id}
                  className={`py-8 px-2 flex w-full items-center gap-4 transition transition-hover delay-75 hover:bg-zinc-800 cursor-pointer ${
                    selectedToken.name === token.name && "bg-zinc-800"
                  }`}
                  onClick={() => {
                    setSelectToken({
                      name: token?.name,
                      address: token?.address,
                      decimals: Number(token.decimals),
                    });
                    setIsModalOpen(false);
                  }}
                >
                  <Image
                    src={`/${token.name}.png`}
                    width={40}
                    height={40}
                    alt={token.name}
                  />
                  <span>{token.name.toUpperCase()}</span>
                </li>
              );
            })}
          </ul>
        )}
        {!isLoading && tokenIn !== "" && (
          <div
            className="flex items-center self-start gap-3 px-2 cursor-pointer"
            onClick={() => {
              setSelectToken({
                name:
                  token?.symbol !== undefined
                    ? (token?.symbol as string)
                    : "notFound",
                address: token?.address as string,
                decimals: token?.decimals ?? 0,
              });
              setTokenIn("");
              setIsModalOpen(false);
            }}
          >
            <Image
              src={`/general.png`}
              width={40}
              height={40}
              alt={token?.name ?? "NotFound"}
              className="bg-white rounded-full p-1"
            />
            <span>{token?.symbol}</span>
          </div>
        )}
        {isLoading && (
          <div className="w-full h-full absolute bg-zinc-700 animate-pulse opacity-80 dutration-75 top-0" />
        )}
      </Dialog>
    </div>
  );
}

export default TokenSelection;
