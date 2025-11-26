'use server';

import { NextResponse } from "next/server";
import {
  aspectRatioForUseCase,
  buildImagePrompt,
  defaultUseCase,
  isBrainImageUseCase,
  type BrainImageUseCase,
} from "@/lib/brainImage";
import { generateNanoBananaImages } from "@/lib/nanoBananaClient";

type GenerateRequestBody = {
  concept?: string;
  prompt?: string; // Accept 'prompt' as an alias for fullPrompt
  fullPrompt?: string;
  useCase?: BrainImageUseCase;
  includeCharacter?: boolean;
  count?: number;
};

export async function POST(request: Request) {
  try {
    const body = ((await request.json().catch(() => ({}))) ??
      {}) as GenerateRequestBody;

    const fullPrompt =
      (typeof body.fullPrompt === 'string' ? body.fullPrompt.trim() : '') ||
      (typeof body.prompt === 'string' ? body.prompt.trim() : '');
    const concept =
      typeof body.concept === "string" ? body.concept.trim() : "";
    const includeCharacter =
      typeof body.includeCharacter === "boolean"
        ? body.includeCharacter
        : true;
    const useCase = isBrainImageUseCase(body.useCase)
      ? body.useCase
      : defaultUseCase;

    if (!fullPrompt && !concept) {
      return NextResponse.json(
        { error: "A prompt or concept is required to generate an image." },
        { status: 400 }
      );
    }

    const resolvedPrompt =
      fullPrompt || (concept ? buildImagePrompt(concept, useCase, includeCharacter) : '');

    const aspectRatio = aspectRatioForUseCase(useCase);
    const count =
      typeof body.count === "number" && body.count > 0 && body.count < 6
        ? Math.floor(body.count)
        : 4;

    const { images, provider } = await generateNanoBananaImages({
      prompt: resolvedPrompt,
      aspectRatio,
      count,
    });

    return NextResponse.json({
      images,
      fullPrompt: resolvedPrompt,
      useCase,
      includeCharacter,
      provider,
      aspectRatio,
    });
  } catch (error) {
    console.error("Error generating BrainDrive images", error);
    return NextResponse.json(
      {
        error:
          "Unable to generate images right now. If you recently added the nano banana key, double-check the endpoint and model.",
      },
      { status: 500 }
    );
  }
}
