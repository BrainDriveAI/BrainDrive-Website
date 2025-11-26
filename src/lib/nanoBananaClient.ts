import { BrainImageResult } from './brainImage';

type NanoBananaRequest = {
  prompt: string;
  aspectRatio: string;
  count: number;
};

type NanoBananaResponse = {
  data: {
    id: string;
    url: string;
    seed: number;
    prompt: string;
    created_at: string;
  }[];
  provider: string;
};

export async function generateNanoBananaImages(
  request: NanoBananaRequest,
): Promise<{ images: BrainImageResult[]; provider: string }> {
  const apiKey = process.env.NANO_BANANA_API_KEY;
  if (!apiKey) {
    throw new Error('NANO_BANANA_API_KEY is not configured.');
  }

  const response = await fetch('https://api.nanobanana.dev/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      prompt: request.prompt,
      aspect_ratio: request.aspectRatio,
      n: request.count,
      model: 'nano-banana-pro',
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Nano Banana API Error: ${response.statusText} - ${errorBody}`);
  }

  const result: NanoBananaResponse = await response.json();

  const images: BrainImageResult[] = result.data.map((img) => ({
    id: img.id,
    url: img.url,
    promptUsed: img.prompt,
    createdAt: img.created_at,
  }));

  return { images, provider: result.provider };
}