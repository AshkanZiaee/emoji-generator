import { NextResponse } from "next/server";
import { generateEmoji } from "@/lib/replicate";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const emojiUrl = await generateEmoji(prompt);
    return NextResponse.json({ emojiUrl });
  } catch (error) {
    console.error("Error generating emoji:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate emoji" },
      { status: 500 }
    );
  }
}
