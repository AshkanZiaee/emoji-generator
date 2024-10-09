"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function EmojiGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedEmojiUrl, setGeneratedEmojiUrl] = useState<string | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setGeneratedEmojiUrl(null);

    const fullPrompt = `A TOK emoji of a ${prompt}`;

    try {
      const response = await fetch("/api/generate-emoji", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Generated emoji URL:", data.emojiUrl);
        setGeneratedEmojiUrl(data.emojiUrl);
      } else {
        throw new Error(data.error || "Failed to generate emoji");
      }
    } catch (error) {
      console.error("Error generating emoji:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter your emoji description (e.g., 'man')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Emoji"
            )}
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {generatedEmojiUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Generated Emoji:</h3>
          <Image
            src={generatedEmojiUrl}
            alt="Generated Emoji"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
