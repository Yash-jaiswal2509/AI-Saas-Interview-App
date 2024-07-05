import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["600"],
  subsets: ["latin-ext"],
});

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e11d48]/55 to-[#e11d48]">
      {/* html, body,:root { height: 100%; } */}
      <h1 className={cn("text-4xl text-white", poppins.className)}>
        Welcome to your AI Integrated
      </h1>
      <h1 className={cn("my-4 text-5xl text-white", poppins.className)}>
        Mock Interview App
      </h1>
      <h1 className={cn("text-6xl text-white", poppins.className)}>
        InterviewGenie
      </h1>
      <Link href={"/dashboard"}>
        <Button className="flex gap-2 text-xl mt-4 font-semibold" >
          <LayoutDashboard />
          Get Started
        </Button>
      </Link>
    </div>
  );
}
