"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Heart } from "lucide-react";

type Emoji = {
  id: string;
  url: string;
  liked: boolean;
};

export default function EmojiGrid() {
  const [emojis, setEmojis] = useState<Emoji[]>([
    // Sample data, replace with actual generated emojis
    { id: "1", url: "https://picsum.photos/200", liked: false },
    { id: "2", url: "https://picsum.photos/201", liked: true },
    { id: "3", url: "https://picsum.photos/202", liked: false },
  ]);

  const toggleLike = (id: string) => {
    setEmojis(
      emojis.map((emoji) =>
        emoji.id === id ? { ...emoji, liked: !emoji.liked } : emoji
      )
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="relative group">
          <Image
            src={emoji.url}
            alt="Generated Emoji"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <button
              onClick={() => toggleLike(emoji.id)}
              className="p-2 bg-white rounded-full mr-2"
            >
              <Heart
                className={`h-5 w-5 ${
                  emoji.liked ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
            <a href={emoji.url} download className="p-2 bg-white rounded-full">
              <Download className="h-5 w-5 text-gray-600" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
