'use server';

import { NextResponse } from "next/server";
import {
  aspectRatioForUseCase,
  buildEditedPrompt,
  defaultUseCase,
  editPromptWithLLM,
  isBrainImageUseCase,
  type BrainImageUseCase,
} from "@/lib/brainImage";
import { generateNanoBananaImages } from "@/lib/nanoBananaClient";

type EditRequestBody = {
  previousPrompt?: string;
  editInstruction?: string;
  useCase?: BrainImageUseCase;
  includeCharacter?: boolean;
  targetImageId?: string;
};

export async function POST(request: Request) {
  try {
    const body = ((await request.json().catch(() => ({}))) ??
      {}) as EditRequestBody;

    const previousPrompt =
      typeof body.previousPrompt === "string"
        ? body.previousPrompt.trim()
        : "";
    const editInstruction =
      typeof body.editInstruction === "string"
        ? body.editInstruction.trim()
        : "";

    const includeCharacter =
      typeof body.includeCharacter === "boolean"
        ? body.includeCharacter
        : true;
    const useCase = isBrainImageUseCase(body.useCase)
      ? body.useCase
      : defaultUseCase;

    if (!previousPrompt || !editInstruction) {
      return NextResponse.json(
        {
          error:
            "Both the previous prompt and an edit instruction are required to request an edit.",
        },
        { status: 400 }
      );
    }

    const updatedPrompt =
      (await editPromptWithLLM({
        previousPrompt,
        editInstruction,
        useCase,
        includeCharacter,
      })) ||
      buildEditedPrompt({
        previousPrompt,
        editInstruction,
        useCase,
        includeCharacter,
      });

    const aspectRatio = aspectRatioForUseCase(useCase);
    const { images, provider } = await generateNanoBananaImages({
      prompt: updatedPrompt,
      aspectRatio,
    });

    return NextResponse.json({
      images,
      updatedPrompt,
      previousPrompt,
      useCase,
      includeCharacter,
      provider,
      targetImageId: body.targetImageId ?? null,
    });
  } catch (error) {
    console.error("Error editing BrainDrive prompt", error);
    return NextResponse.json(
      { error: "Unable to update the image prompt right now." },
      { status: 500 }
    );
  }
}
