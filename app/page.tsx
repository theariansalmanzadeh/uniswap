import Image from "next/image";
import "../styles/global.scss";
import Swap from "@/components/Swap";
import { Skeleton } from "primereact/skeleton";

export default function Home() {
  return (
    <main className="w-screen flex items-center justify-center pt-[10rem]">
      <Swap />
    </main>
  );
}
