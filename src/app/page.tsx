import { RetroGrid } from "@/components/magicui/retro-grid";
import { HyperText } from "@/components/magicui/hyper-text";
import { WordRotate } from "@/components/magicui/word-rotate";
export default function Home() {
  return (
    <div className="bg-background">
      <RetroGrid className="min-h-3/4" />
      <div className="flex flex-col items-center justify-start h-[300px] gap-10 mt-10">
        <HyperText className="text-center text-7xl font-bold">
          Send Messages to the Future
        </HyperText>
        <WordRotate
          className="text-center text-2xl"
          words={[
            "Create blockchain-secured time capsules on Sui Network. Lock messages, tokens, and NFTs to be revealed at the perfect moment.",
          ]}
        />
      </div>
    </div>
  );
}
