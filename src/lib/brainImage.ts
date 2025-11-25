import {
  brandStyleSummary,
  brainImageStyle,
  type BrainImageUseCase,
  useCasePresets,
} from "@/config/brainImageStyle";
import { callAnthropicForText } from "@/lib/anthropicClient";

export type { BrainImageUseCase } from "@/config/brainImageStyle";

type RefineInput = {
  concept: string;
  useCase: BrainImageUseCase;
  includeCharacter: boolean;
};

export type BrainImageResult = {
  id: string;
  url: string;
  promptUsed: string;
  createdAt: string;
  provider?: string;
};

export const defaultUseCase: BrainImageUseCase = "blog-hero";
export const fallbackNegativePrompt =
  "No corporate stock photography; avoid neon chaos; avoid cluttered, busy scenes.";

export function isBrainImageUseCase(
  value: unknown
): value is BrainImageUseCase {
  return (
    value === "blog-hero" ||
    value === "in-article-graphic" ||
    value === "video-side-graphic" ||
    value === "social-tile"
  );
}

export function brandStyleAsText(): string {
  return brandStyleSummary.join(" ");
}

export function buildImagePrompt(
  basePrompt: string,
  useCase: BrainImageUseCase,
  includeCharacter: boolean
): string {
  const { palette, personality, composition, character, textLabels } =
    brainImageStyle;
  const useCaseHint = useCasePresets[useCase]?.promptHint;
  const characterLine = includeCharacter
    ? `Include the BrainDrive Guide: ${character.description}`
    : "Do not include any human character; focus on abstract but clear metaphor.";

  return `
Dark-mode marketing illustration for BrainDrive, an open-source, user-owned AI system.
Style: ${personality.adjectives.join(", ")}; minimal, warm, human.
Color palette: deep blue primary background (${palette.primaryBg}), midnight blue secondary (${palette.secondaryBg}), steel and sky blue accents (${palette.accent1}, ${palette.accent2}), light blue text/UI (${palette.accentText}), white CTAs (${palette.cta}).
Composition: ${composition.guidance.join(" ")}
Metaphor-first, one clear idea, 2-4 supporting elements max.
Allow short text labels when they clarify ideas (e.g., ${textLabels.examples.join(
    ", "
  )}); keep labels minimal.
Use case focus: ${useCaseHint}
Concept: ${basePrompt}
${characterLine}
`;
}

export async function refineConceptToPrompt(
  input: RefineInput
): Promise<{ refinedPrompt: string; negativePrompt: string }> {
  const trimmedConcept = input.concept.trim();
  const useCaseHint = useCasePresets[input.useCase]?.promptHint;
  const characterLine = input.includeCharacter
    ? "Feature the BrainDrive Guide in a friendly, builder pose when it helps communicate the idea."
    : "Avoid including characters or humans; rely on abstract visual metaphors.";

  const refinedPrompt = [
    `BrainDrive visual: ${trimmedConcept}`,
    `Use case: ${useCaseHint}`,
    "Focus on a single metaphor with 2-4 supporting elements, generous negative space.",
    "Use clean vector or painterly-illustration style with confident lighting.",
    characterLine,
    "Favor calm, empowering mood over hype; keep structure clear for marketing use.",
  ]
    .filter(Boolean)
    .join(" ");

  const negativePrompt = fallbackNegativePrompt;

  return { refinedPrompt, negativePrompt };
}

export async function refineConceptWithLLM(
  input: RefineInput
): Promise<{ refinedPrompt: string; negativePrompt: string } | null> {
  const systemPrompt = `You are an expert marketing illustration prompt writer for BrainDrive. Always follow these brand rules: ${brandStyleAsText()}. Keep the output concise, vivid, and ready for a text-to-image model. Do not mention that you are creating a prompt.`;
  const useCaseHint = useCasePresets[input.useCase]?.promptHint;
  const characterLine = input.includeCharacter
    ? "Include the BrainDrive Guide when helpful: realistic cartoon builder, friendly, casual hoodie or t-shirt with jeans."
    : "Do not include people or characters; use abstract metaphor.";

  const userPrompt = [
    `Concept: ${input.concept.trim()}`,
    `Use case: ${useCaseHint}`,
    "Keep one clear focal idea with 2-4 supporting elements max and generous negative space.",
    characterLine,
    "Return a single prompt paragraph only.",
  ]
    .filter(Boolean)
    .join(" ");

  const responseText = await callAnthropicForText({
    system: systemPrompt,
    user: userPrompt,
    maxTokens: 320,
    temperature: 0.3,
  });

  if (!responseText) return null;

  return {
    refinedPrompt: responseText,
    negativePrompt: fallbackNegativePrompt,
  };
}

export function buildEditedPrompt(options: {
  previousPrompt: string;
  editInstruction: string;
  useCase: BrainImageUseCase;
  includeCharacter: boolean;
}): string {
  const { previousPrompt, editInstruction, useCase, includeCharacter } =
    options;
  const useCaseHint = useCasePresets[useCase]?.promptHint;
  const characterGuardrail = includeCharacter
    ? "Keep the BrainDrive Guide present in a friendly, realistic cartoon style."
    : "Keep the image free of people or characters.";

  return `
${previousPrompt}

Refine the above BrainDrive prompt with these edits: ${editInstruction.trim()}.
Respect the BrainDrive style: ${brandStyleAsText()}
Use case reminder: ${useCaseHint}
${characterGuardrail}
Keep the scene tidy with one focal concept and minimal supporting elements.`;
}

export async function editPromptWithLLM(options: {
  previousPrompt: string;
  editInstruction: string;
  useCase: BrainImageUseCase;
  includeCharacter: boolean;
}): Promise<string | null> {
  const { previousPrompt, editInstruction, useCase, includeCharacter } =
    options;
  const useCaseHint = useCasePresets[useCase]?.promptHint;
  const characterGuardrail = includeCharacter
    ? "Preserve the BrainDrive Guide in a friendly, realistic cartoon style."
    : "Keep the image free of people or characters.";

  const systemPrompt = `You are refining a marketing illustration prompt for BrainDrive. Always follow these brand rules: ${brandStyleAsText()}. Return only the updated prompt text.`;
  const userPrompt = `
Original prompt:
${previousPrompt}

Edits requested: ${editInstruction.trim()}
Use case: ${useCaseHint}
${characterGuardrail}
Keep one focal idea with minimal supporting elements and clear negative space. Return only the revised prompt.
`;

  const responseText = await callAnthropicForText({
    system: systemPrompt,
    user: userPrompt,
    maxTokens: 320,
    temperature: 0.3,
  });

  return responseText ? responseText.trim() : null;
}

export function aspectRatioForUseCase(useCase: BrainImageUseCase): string {
  return useCasePresets[useCase]?.aspectRatio ?? "16:9";
}
