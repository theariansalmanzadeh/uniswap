"use client";
import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { InputNumber } from "primereact/inputnumber";
import { MdOutlineSwapHoriz } from "react-icons/md";
import TokenBtn from "./TokenBtn";
import TokenSelection from "./tokenSelection/TokenSelection";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  usePublicClient,
} from "wagmi";
import {
  quoteUniswap,
  routerUniswap,
} from "../assets/contents/contractAddresses";
import quoterAbi from "../assets/ABI/abiQuoter.json";
import routerAbi from "../assets/ABI/abiRouter.json";
import { formatUnits, parseUnits } from "viem";
import ConfirmBtn from "./ConfirmBtn";

function Swap() {
  const styles = {
    container: "bg-[#191B1F] w-2/5 rounded-xl border-[1px] border-stone-500",
    heading:
      "flex items-center justify-between font-semibold text-lg pt-4 pb-2 px-8",
    swapContainer: "w-full flex flex-col items-center gap-[1px] mt-2",
    switchTokens:
      "w-10 h-10 flex justify-center items-center rounded-md cursor-pointer transition-hover delay-100 hover:bg-neutral-900 bg-neutral-800 rotate-90",
    inputContainer: "relative h-full w-full mx-auto",
    swapInput: "w-full py-4 px-2 text-right bg-[#20242A] rounded-2xl",
    button: "mx-auto my-5 w-3/4 font-bold px-4 py-3 bg-[#2172E5] rounded-2xl",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [toValue, setTovalue] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const tokenOut = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  const [selectedToken, setSelectedToken] = useState({
    name: "weth",
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    decimals: 18,
  });

  const { address } = useAccount();

  const deadline = (amountMin: number) => {
    return Date.now() + amountMin * 60 * 1000;
  };

  console.log(deadline(30));

  const { config, error } = usePrepareContractWrite({
    address: routerUniswap,
    abi: routerAbi,
    functionName: "exactInputSingle",
    args: [
      {
        tokenIn: selectedToken.address,
        tokenOut,
        fee: 3000,
        recipient: address,
        deadline: deadline(30),
        amountIn: inputValue,
        amountOutMinimum: toValue,
        sqrtPriceLimitX96: 0,
      },
    ],
  });

  const contractWriting = useContractWrite(config);

  const publicClient = usePublicClient();

  useEffect(() => {
    console.log("ok");
    if (inputValue === 0) return;

    (async () => {
      setIsLoadingPrice(true);
      try {
        const { result: price }: { result: string | unknown } =
          await publicClient.simulateContract({
            address: quoteUniswap,
            abi: quoterAbi,
            functionName: "quoteExactInputSingle",
            args: [
              selectedToken.address,
              tokenOut,
              3000,
              parseUnits(inputValue.toString(), selectedToken.decimals),
              0,
            ],
          });
        setTovalue(Number(formatUnits(BigInt(price as string), 6)));
        setIsLoadingPrice(false);
      } catch (e) {
        setIsLoadingPrice(false);
      }
    })();
  }, [inputValue, publicClient, selectedToken]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Swap</h2>
        <FiSettings size={22} />
      </div>
      <div className={styles.swapContainer}>
        <div className={styles.inputContainer}>
          <InputNumber
            maxFractionDigits={2}
            placeholder="0.0"
            inputClassName={styles.swapInput}
            min={0}
            onChange={(e) => setInputValue(e.value ?? 0)}
            pt={{
              root: {
                className: "w-4/5 mx-auto block py-1 text-lg font-semibold",
              },
            }}
          />
          <TokenBtn
            isdisabled={false}
            token={selectedToken.name}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <div className={styles.switchTokens}>
          <MdOutlineSwapHoriz size={24} />
        </div>
        <div className={styles.inputContainer}>
          <InputNumber
            maxFractionDigits={2}
            placeholder="0.0"
            inputClassName={styles.swapInput}
            disabled
            value={toValue === 0 ? null : toValue}
            pt={{
              root: {
                className:
                  "w-4/5 mx-auto block py-1 h-full text-lg font-semibold",
              },
            }}
          />
          {isLoadingPrice && (
            <div className="animate-pulse h-[3.6rem] left-16 top-1 absolute w-4/5">
              <div className="bg-gray-700 h-full rounded-2xl opacity-60 w-full"></div>
            </div>
          )}
          <TokenBtn
            isdisabled={true}
            token={"usdt"}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <TokenSelection
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setSelectToken={setSelectedToken}
          selectedToken={selectedToken}
        />
        <ConfirmBtn swapHandler={contractWriting.write as () => void} />
      </div>
    </div>
  );
}

export default Swap;
