"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex p-4 justify-between items-center border-b shadow-sm">
      <div className="flex gap-2 items-center">
        <Image
          src="/Website Logo.png"
          alt="logo"
          width={100}
          height={50}
          className="h-14 w-14 rounded-full"
        />
        <h1 className="text-2xl font-extrabold text-primary">InterviewGenie</h1>
      </div>

      <ul className="gap-5 hidden md:flex">
        <li
          className={cn(
            "hover:text-primary hover:font-bold  transition-all cursor-pointer",
            pathname === "/dashboard" ? "text-primary font-bold" : ""
          )}
        >
          Dashboard
        </li>
        <li
          className={cn(
            "hover:text-primary hover:font-bold  transition-all cursor-pointer",
            pathname === "/questions" ? "text-primary font-bold" : ""
          )}
        >
          Questions
        </li>
        <li
          className={cn(
            "hover:text-primary hover:font-bold  transition-all cursor-pointer",
            pathname === "/upgrade" ? "text-primary font-bold" : ""
          )}
        >
          Upgrade
        </li>
        <li
          className={cn(
            "hover:text-primary hover:font-bold  transition-all cursor-pointer",
            pathname === "/how-it-works" ? "text-primary font-bold" : ""
          )}
        >
          How It Works?
        </li>
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;
