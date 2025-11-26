import { BrainImageResult } from './brainImage';

type NanoBananaRequest = {
  prompt: string;
  aspectRatio: string;
  count: number;
};

type GeminiInlineData = { mimeType?: string; data?: string };
type GeminiFileData = { fileUri?: string; mimeType?: string };
type GeminiPart = { inlineData?: GeminiInlineData; fileData?: GeminiFileData; text?: string };
type GeminiCandidate = { content?: { parts?: GeminiPart[] } };
type GeminiResponse = { candidates?: GeminiCandidate[] };

export async function generateNanoBananaImages(
  request: NanoBananaRequest,
): Promise<{ images: BrainImageResult[]; provider: string }> {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.NANO_BANANA_API_KEY;
  const modelId = process.env.NANO_BANANA_MODEL ?? 'gemini-3-pro-image-preview';
  const apiUrl =
    process.env.NANO_BANANA_API_URL ??
    `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`;

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY (or NANO_BANANA_API_KEY). Add it to your environment to generate images.');
  }

  let response: Response;
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: request.prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: request.aspectRatio },
          // The model does not support multiple candidates; omit candidateCount to default to 1.
        },
      }),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown network error';
    throw new Error(`Failed to reach Gemini image endpoint at ${apiUrl}: ${reason}`);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    const statusLabel = response.statusText || `status ${response.status}`;
    const trimmedBody = errorBody.length > 400 ? `${errorBody.slice(0, 400)}…` : errorBody;
    throw new Error(`Gemini API error (${statusLabel}): ${trimmedBody || 'no response body'}`);
  }

  const result = (await response.json()) as GeminiResponse;
  const candidates = result.candidates ?? [];

  const now = new Date().toISOString();
  const images: BrainImageResult[] = [];

  candidates.forEach((candidate, idx) => {
    const parts = candidate.content?.parts ?? [];
    parts.forEach((part, partIdx) => {
      const inline = part.inlineData;
      if (inline?.data) {
        const mime = inline.mimeType || 'image/png';
        const url = `data:${mime};base64,${inline.data}`;
        images.push({
          id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `gemini-${idx}-${partIdx}`,
          url,
          promptUsed: request.prompt,
          createdAt: now,
          provider: modelId,
        });
      } else if (part.fileData?.fileUri) {
        images.push({
          id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `gemini-${idx}-${partIdx}`,
          url: part.fileData.fileUri,
          promptUsed: request.prompt,
          createdAt: now,
          provider: modelId,
        });
      }
    });
  });

  if (images.length === 0) {
    throw new Error('Gemini API did not return any image data.');
  }

  return { images, provider: modelId };
}
