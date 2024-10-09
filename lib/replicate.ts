import Replicate from "replicate";

export async function generateEmoji(prompt: string): Promise<string> {
  if (typeof window !== "undefined") {
    throw new Error("This function should only be called from the server side");
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN is not set");
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const input = {
    prompt: prompt,
    apply_watermark: false,
  };

  try {
    const output = await replicate.run(
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      { input }
    );

    if (Array.isArray(output) && output.length > 0) {
      return output[0] as string;
    }

    throw new Error("Unexpected output format from Replicate");
  } catch (error) {
    console.error("Error in generateEmoji:", error);
    throw error;
  }
}
