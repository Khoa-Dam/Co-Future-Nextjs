"use client";

import { HyperText } from "@/components/magicui/hyper-text";
import { Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-background">
      <div className="flex flex-col items-center justify-center  gap-10 mt-10">
        <HyperText className="text-center text-7xl font-bold">
          Send Messages to the Future
        </HyperText>
        <HyperText className="text-center items-center  text-2xl w-[80%] ">
          Create blockchain-secured time capsules on Sui Network. Lock messages,
          tokens, and NFTs to be revealed at the perfect moment
        </HyperText>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => router.push("/send")}
            className="px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Capsule
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/capsules")}
            className=" text-black px-8 py-4 font-semibold transition-all duration-300"
          >
            <Archive className="mr-2 h-5 w-5" />
            View Capsules
          </Button>
        </div>
      </div>
    </div>
  );
}
