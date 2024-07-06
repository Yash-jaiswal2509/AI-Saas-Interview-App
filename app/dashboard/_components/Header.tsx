"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600"] });

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between border-b px-4 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <Image
          src="/website_logo.png"
          alt="logo"
          width={100}
          height={50}
          className="h-14 w-14 rounded-full"
        />
        <h1
          className={cn(
            "text-2xl font-extrabold text-primary",
            (poppins.className = "font-extrabold"),
          )}
        >
          InterviewGenie
        </h1>
      </div>

      <ul className="hidden gap-5 md:flex">
        <li
          className={cn(
            "cursor-pointer transition-all hover:font-bold hover:text-primary",
            pathname === "/dashboard" ? "font-bold text-primary" : "",
          )}
        >
          Dashboard
        </li>
        <li
          className={cn(
            "cursor-pointer transition-all hover:font-bold hover:text-primary",
            pathname === "/questions" ? "font-bold text-primary" : "",
          )}
        >
          Questions
        </li>
        <li
          className={cn(
            "cursor-pointer transition-all hover:font-bold hover:text-primary",
            pathname === "/upgrade" ? "font-bold text-primary" : "",
          )}
        >
          Upgrade
        </li>
        <li
          className={cn(
            "cursor-pointer transition-all hover:font-bold hover:text-primary",
            pathname === "/how-it-works" ? "font-bold text-primary" : "",
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
