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
  const apiUrl =
    process.env.NANO_BANANA_API_URL ??
    'https://api.nanobanana.dev/v1/images/generations';

  if (!apiKey) {
    throw new Error('Missing NANO_BANANA_API_KEY. Add it to your environment to generate images.');
  }

  let response: Response;
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        prompt: request.prompt,
        aspect_ratio: request.aspectRatio,
        n: request.count,
        model: 'nano-banana-pro',
      }),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown network error';
    throw new Error(`Failed to reach Nano Banana API at ${apiUrl}: ${reason}`);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    const statusLabel = response.statusText || `status ${response.status}`;
    const trimmedBody = errorBody.length > 400 ? `${errorBody.slice(0, 400)}…` : errorBody;
    throw new Error(`Nano Banana API error (${statusLabel}): ${trimmedBody || 'no response body'}`);
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
