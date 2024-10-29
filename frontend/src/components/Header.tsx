/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
//
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  useAccount,
  useDisconnect,
  ConnectButton,
} from "@particle-network/connectkit";
// import { truncateString } from "@/utils/function.helper";
// import Link from "next/link";
import Button from "@/components/Button";
import { useKlater } from "@/app/hooks/kaster/useKlasterTransaction";
import { UnifiedBalanceResult } from "klaster-sdk";
import Link from "next/link";

function Header() {
  // const [show, setShow] = useState("upcoming");
  const [bal, setBal] = useState(false);
  const [balance, setBalance] = useState<UnifiedBalanceResult | null>();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { unifiedBalance } = useKlater();

  useEffect(() => {
    console.log(unifiedBalance);
    setBalance(unifiedBalance!);
  }, [unifiedBalance]);

  const ref: any = useRef(null);
  useEffect(() => {
    const closeModal = (e: any) => {
      if (!ref!.current!.contains(e.target)) {
        setBal(false);
      }
    };
    if (typeof window === "object") {
      document.addEventListener("mousedown", closeModal);
    }
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);
  return (
    <header className="m-auto flex w-[90%] items-center justify-between py-8 lg:w-[1000px]">
      {bal && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-[#DEDEDECC]">
          <div
            className="flex h-[200px] w-[95%] flex-col justify-center gap-2 rounded-2xl bg-white p-5 text-black phone:w-[450px]"
            ref={ref!}
          >
            <p className="text-center font-medium">All your wallet ammount</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">Ethereum sepolia: </p>
              <p>${balance?.breakdown[0].amount}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium">Airbitrun sepolia: </p>
              <p>${balance?.breakdown[1].amount}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium">Optimism sepolia: </p>
              <p>${balance?.breakdown[2].amount}</p>
            </div>
          </div>
        </div>
      )}
      <Link href={"/"}>
        <img src="/icons/Logo.svg" alt="" className="h-8 phone:h-10" />
      </Link>

      <div className="flex items-center gap-4">
        {isConnected && (
          <div
            onClick={() => setBal(true)}
            className="hidden cursor-pointer rounded-full border border-[#959595] px-3 py-2 font-medium lowercase phone:block sm:text-xl"
          >
            View bal
          </div>
        )}
        <div>
          {isConnected ? (
            <Button
              onClick={() => {
                disconnect();
              }}
              text={"Disconnect"}
              className="rounded-full bg-white px-3 py-2 font-medium text-black"
            />
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
