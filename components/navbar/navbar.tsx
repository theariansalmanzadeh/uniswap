"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import Link from "next/link";
import ConnectButton from "../ConnectWallet";
import { navbarItems } from "./content";

function Navbar() {
  const styles = {
    wrapper: "w-screen h-15 flex justify-between items-center pt-5 px-10",
    links:
      "flex gap-8 opacity-70 bg-[#191B1F] px-6 py-3 rounded-2xl font-semibold",
    link: "hover:opacity-100 hover:bg-[#20242A] transition-all duration-300 py-2 px-3 rounded-2xl",
    activeLinkItem: "bg-[#20242A]",
  };

  const [acitve, setActive] = useState("swap");
  return (
    <div className={styles.wrapper}>
      <Image src={logo} width={40} height={40} alt="uniswap logo" />

      <div className={styles.links}>
        {navbarItems.map((item, indx) => {
          return (
            <Link
              key={indx}
              className={`${styles.link} ${
                acitve === item.link && styles.activeLinkItem
              }`}
              href={`/${item.link.toLocaleLowerCase()}`}
              onClick={() => {
                setActive(item.link);
              }}
            >
              {item.link}
            </Link>
          );
        })}
      </div>
      <ConnectButton />
    </div>
  );
}

export default Navbar;
