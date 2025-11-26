import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { brainImageStyle } from '@/config/brainImageStyle';

export const runtime = 'edge';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function getSystemPrompt() {
  // Convert the brainImageStyle config into a string for the system prompt
  const styleGuide = JSON.stringify(brainImageStyle, null, 2);

  return `You are an expert prompt writer for a text-to-image model, creating on-brand images for BrainDrive.
BrainDrive’s visual style and constraints are defined in this JSON object:
${styleGuide}

Your task is to rewrite the user's rough idea into a single, clear, richly descriptive prompt for a modern image generator like Midjourney or DALL-E 3.

RULES:
- Keep the final prompt to 1-2 paragraphs max.
- Do NOT mention "text-to-image", "prompt", "style", "color palette", or "illustration" in your output. Just describe the image itself.
- Directly incorporate the visual style, personality, and composition rules from the provided style guide.
- Your output must be ONLY the rewritten prompt text. Do not include any other conversational text or markdown.
`;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Anthropic API key is not configured.' }, { status: 500 });
  }

  try {
    const { concept, useCase, includeCharacter } = await request.json();

    if (!concept) {
      return NextResponse.json({ error: 'Concept is required.' }, { status: 400 });
    }

    const userMessage = `
User's rough idea: "${concept}"
Use case: ${useCase}
Include BrainDrive Guide character: ${includeCharacter}
`;

    const msg = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      system: getSystemPrompt(),
      messages: [{ role: 'user', content: userMessage }],
      max_tokens: 1024,
      temperature: 0.5,
    });

    const firstBlock = msg.content[0];
    if (firstBlock.type !== 'text') {
      throw new Error('Expected a text block from the Anthropic API, but did not receive one.');
    }
    const refinedPrompt = firstBlock.text;

    return NextResponse.json({ refinedPrompt });
  } catch (error) {
    console.error('Error generating prompt:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to generate prompt.', details: errorMessage },
      { status: 500 },
    );
  }
}