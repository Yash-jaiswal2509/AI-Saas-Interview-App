import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex p-4 justify-between items-center border-b shadow-sm">
      <Image src="/Website Logo.png" alt="logo" width={100} height={50} className="h-14 w-14 rounded-full" />
      <ul className="flex gap-5">
        <li className="hover:text-primary hover:font-bold  transition-all cursor-pointer">Dashboard</li>
        <li className="hover:text-primary hover:font-bold  transition-all cursor-pointer">Questions</li>
        <li className="hover:text-primary hover:font-bold  transition-all cursor-pointer">Upgrade</li>
        <li className="hover:text-primary hover:font-bold  transition-all cursor-pointer">How It Works?</li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
