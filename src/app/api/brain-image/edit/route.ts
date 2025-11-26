'use server';

import { NextResponse } from 'next/server';
import {
  aspectRatioForUseCase,
  defaultUseCase,
  editPromptWithLLM,
  isBrainImageUseCase,
  type BrainImageUseCase,
} from '@/lib/brainImage';
import { generateNanoBananaImages } from '@/lib/nanoBananaClient';

type EditRequestBody = {
  previousPrompt?: string;
  editInstruction?: string;
  useCase?: BrainImageUseCase;
  includeCharacter?: boolean;
  count?: number;
};

export async function POST(request: Request) {
  try {
    const body = ((await request.json().catch(() => ({}))) ?? {}) as EditRequestBody;

    const { previousPrompt, editInstruction } = body;

    if (!previousPrompt || !editInstruction) {
      return NextResponse.json(
        { error: 'A previous prompt and an edit instruction are required.' },
        { status: 400 },
      );
    }

    const useCase = isBrainImageUseCase(body.useCase) ? body.useCase : defaultUseCase;
    const includeCharacter = typeof body.includeCharacter === 'boolean' ? body.includeCharacter : true;

    const updatedPrompt = await editPromptWithLLM({
      previousPrompt,
      editInstruction,
      useCase,
      includeCharacter,
    });

    if (!updatedPrompt) {
      return NextResponse.json({ error: 'Failed to generate edited prompt.' }, { status: 500 });
    }

    const aspectRatio = aspectRatioForUseCase(useCase);
    const count = typeof body.count === 'number' && body.count > 0 && body.count < 5 ? Math.floor(body.count) : 2;

    const { images, provider } = await generateNanoBananaImages({
      prompt: updatedPrompt,
      aspectRatio,
      count,
    });

    return NextResponse.json({
      images,
      updatedPrompt,
      previousPrompt,
      useCase,
      includeCharacter,
      provider,
      aspectRatio,
    });
  } catch (error) {
    console.error('Error editing BrainDrive image', error);
    return NextResponse.json(
      {
        error:
          'Unable to edit image right now. If you recently added the nano banana key, double-check the endpoint and model.',
      },
      { status: 500 },
    );
  }
}