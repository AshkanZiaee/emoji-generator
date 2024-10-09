import Image from "next/image";
import EmojiGenerator from "@/components/emoji-generator";
import EmojiGrid from "@/components/emoji-grid";
import { EmojiProvider } from "@/context/EmojiContext";

export default function Home() {
  return (
    <EmojiProvider>
      <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex justify-center">
          <Image
            className="dark:invert"
            src="https://nextjs.org/icons/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </header>
        <main className="flex flex-col gap-16 items-center">
          <EmojiGenerator />
          <EmojiGrid />
        </main>
      </div>
    </EmojiProvider>
  );
}
