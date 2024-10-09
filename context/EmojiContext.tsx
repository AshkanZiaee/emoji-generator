"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type Emoji = {
  id: string;
  url: string;
  liked: boolean;
};

type EmojiContextType = {
  emojis: Emoji[];
  addEmoji: (url: string) => void;
  toggleLike: (id: string) => void;
};

const EmojiContext = createContext<EmojiContextType | undefined>(undefined);

export const EmojiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    // Load emojis from localStorage when the component mounts
    const storedEmojis = localStorage.getItem("emojis");
    if (storedEmojis) {
      setEmojis(JSON.parse(storedEmojis));
    }
  }, []);

  const addEmoji = (url: string) => {
    const newEmojis = [
      ...emojis,
      { id: Date.now().toString(), url, liked: false },
    ];
    setEmojis(newEmojis);
    localStorage.setItem("emojis", JSON.stringify(newEmojis));
  };

  const toggleLike = (id: string) => {
    const newEmojis = emojis.map((emoji) =>
      emoji.id === id ? { ...emoji, liked: !emoji.liked } : emoji
    );
    setEmojis(newEmojis);
    localStorage.setItem("emojis", JSON.stringify(newEmojis));
  };

  return (
    <EmojiContext.Provider value={{ emojis, addEmoji, toggleLike }}>
      {children}
    </EmojiContext.Provider>
  );
};

export const useEmoji = () => {
  const context = useContext(EmojiContext);
  if (context === undefined) {
    throw new Error("useEmoji must be used within an EmojiProvider");
  }
  return context;
};
