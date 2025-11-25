import { type BrainImageResult } from "@/lib/brainImage";

type GenerateImageParams = {
  prompt: string;
  aspectRatio?: string;
  count?: number;
  seed?: string;
  model?: string;
};

const mockPlaceholders = [
  "/image-studio/mock-1.svg",
  "/image-studio/mock-2.svg",
  "/image-studio/mock-3.svg",
];

function buildMockImages(
  prompt: string,
  count: number = 4
): BrainImageResult[] {
  const timestamp = Date.now();
  return Array.from({ length: count }).map((_, index) => ({
    id: `mock-${timestamp}-${index + 1}`,
    url: mockPlaceholders[index % mockPlaceholders.length],
    promptUsed: prompt,
    createdAt: new Date().toISOString(),
    provider: "mock",
  }));
}

function parseImagesFromResponse(data: unknown): BrainImageResult[] {
  const unknownData = data as Record<string, unknown>;
  const candidates =
    (Array.isArray(unknownData?.images)
      ? unknownData.images
      : Array.isArray(unknownData?.candidates)
        ? unknownData.candidates
        : null) ?? [];

  if (!Array.isArray(candidates)) return [];

  return candidates
    .map((candidate, index) => {
      const entry = candidate as Record<string, unknown>;
      const url =
        typeof entry.url === "string"
          ? entry.url
          : typeof entry.image === "string"
            ? entry.image
            : null;

      if (!url) return null;

      return {
        id:
          typeof entry.id === "string"
            ? entry.id
            : `nano-${Date.now()}-${index + 1}`,
        url,
        promptUsed:
          typeof entry.prompt === "string"
            ? entry.prompt
            : "BrainDrive image prompt",
        createdAt: new Date().toISOString(),
        provider: "nano-banana",
      };
    })
    .filter(Boolean) as BrainImageResult[];
}

export async function generateNanoBananaImages(
  params: GenerateImageParams
): Promise<{ images: BrainImageResult[]; provider: string }> {
  const apiKey = process.env.NANO_BANANA_API_KEY;
  const count = params.count ?? 4;

  if (!apiKey) {
    return { images: buildMockImages(params.prompt, count), provider: "mock" };
  }

  const endpoint =
    process.env.NANO_BANANA_API_URL ??
    "https://generativelanguage.googleapis.com/v1beta/models/imagegeneration:generate";

  const payload = {
    prompt: params.prompt,
    aspectRatio: params.aspectRatio ?? "16:9",
    model: params.model ?? "nano-banana-pro",
    seed: params.seed,
    numImages: count,
  };

  try {
    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Nano banana API responded with status ${response.status}`
      );
    }

    const data = await response.json();
    const parsed = parseImagesFromResponse(data);

    if (!parsed.length) {
      return {
        images: buildMockImages(params.prompt, count),
        provider: "mock-fallback",
      };
    }

    return { images: parsed, provider: "nano-banana" };
  } catch (error) {
    console.error("Nano banana request failed, using mock images:", error);
    return {
      images: buildMockImages(params.prompt, count),
      provider: "mock-fallback",
    };
  }
}

export { mockPlaceholders };
