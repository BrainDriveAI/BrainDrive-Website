'use server';

import { NextResponse } from "next/server";
import {
  brandStyleAsText,
  buildImagePrompt,
  defaultUseCase,
  isBrainImageUseCase,
  refineConceptWithLLM,
  refineConceptToPrompt,
  type BrainImageUseCase,
} from "@/lib/brainImage";

type PromptRequestBody = {
  concept?: string;
  useCase?: BrainImageUseCase;
  includeCharacter?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = ((await request.json().catch(() => ({}))) ??
      {}) as PromptRequestBody;

    const concept =
      typeof body.concept === "string" ? body.concept.trim() : "";
    const includeCharacter =
      typeof body.includeCharacter === "boolean"
        ? body.includeCharacter
        : true;
    const useCase = isBrainImageUseCase(body.useCase)
      ? body.useCase
      : defaultUseCase;

    if (!concept) {
      return NextResponse.json(
        { error: "Please describe the image you want to generate." },
        { status: 400 }
      );
    }

    const refined =
      (await refineConceptWithLLM({
        concept,
        useCase,
        includeCharacter,
      })) ??
      (await refineConceptToPrompt({
        concept,
        useCase,
        includeCharacter,
      }));

    const fullPrompt = buildImagePrompt(
      refined.refinedPrompt,
      useCase,
      includeCharacter
    );

    return NextResponse.json({
      useCase,
      includeCharacter,
      refinedPrompt: refined.refinedPrompt,
      negativePrompt: refined.negativePrompt,
      fullPrompt,
      brandStyle: brandStyleAsText(),
    });
  } catch (error) {
    console.error("Error refining BrainDrive prompt", error);
    return NextResponse.json(
      { error: "Unable to create an image prompt right now." },
      { status: 500 }
    );
  }
}
