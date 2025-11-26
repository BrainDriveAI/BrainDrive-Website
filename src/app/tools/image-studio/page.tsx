'use client';

import { useState } from 'react';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import type { BrainImageUseCase } from '@/config/brainImageStyle';
import type { BrainImageResult } from '@/lib/brainImage';

const defaultUseCase: BrainImageUseCase = 'blog-hero';

type ApiError = { error?: string; details?: string };
type StudioImage = BrainImageResult & {
  label: string;
  generationType: 'original' | 'edit';
  parentId?: string;
};

export default function ImageStudioPage() {
  const [concept, setConcept] = useState('');
  const [useCase, setUseCase] = useState<BrainImageUseCase>(defaultUseCase);
  const [includeCharacter, setIncludeCharacter] = useState(true);

  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<StudioImage[]>([]);
  const [refinedPrompt, setRefinedPrompt] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [editInstruction, setEditInstruction] = useState('');

  const handleGeneratePrompt = async () => {
    if (!concept) {
      alert('Please describe the image you want.');
      return;
    }

    setIsGeneratingPrompt(true);
    setRefinedPrompt(null);
    setGeneratedImages([]);

    try {
      const response = await fetch('/api/brain-image/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept, useCase, includeCharacter }),
      });

      const data = (await response.json().catch(() => null)) as (ApiError & { refinedPrompt?: string }) | null;

      if (!response.ok) {
        const message =
          data?.details ||
          data?.error ||
          response.statusText ||
          'Unknown error while generating the prompt.';
        throw new Error(message);
      }

      if (!data?.refinedPrompt) {
        throw new Error('Prompt API did not return a prompt.');
      }

      setRefinedPrompt(data.refinedPrompt);
    } catch (error) {
      console.error('Failed to generate prompt:', error);
      const message = error instanceof Error ? error.message : 'There was an error generating the prompt.';
      alert(message);
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!refinedPrompt) {
      alert('Please generate a prompt first.');
      return;
    }

    setIsGeneratingImage(true);
    setGeneratedImages([]);
    setSelectedImageId(null);

    try {
      const response = await fetch('/api/brain-image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: refinedPrompt, useCase, includeCharacter }),
      });

      const data = (await response.json().catch(() => null)) as (ApiError & { images?: BrainImageResult[] }) | null;

      if (!response.ok) {
        const message =
          data?.details ||
          data?.error ||
          response.statusText ||
          'Unknown error while generating the image.';
        throw new Error(message);
      }

      const images = data?.images;
      if (!images || images.length === 0) {
        throw new Error('Image API did not return any images.');
      }

      const mapped = images.map((img, idx) => ({
        ...img,
        label: images.length > 1 ? `Original ${idx + 1}` : 'Original',
        generationType: 'original' as const,
      }));

      setGeneratedImages(mapped);
      if (mapped[0]) {
        setSelectedImageId(mapped[0].id);
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      const message = error instanceof Error ? error.message : 'There was an error generating the image.';
      alert(message);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleEditImage = async () => {
    const trimmedInstruction = editInstruction.trim();
    if (!selectedImageId) {
      alert('Select an image to edit first.');
      return;
    }
    if (!trimmedInstruction) {
      alert('Describe what you want to change.');
      return;
    }

    const sourceImage = generatedImages.find((img) => img.id === selectedImageId);
    if (!sourceImage) {
      alert('Selected image not found.');
      return;
    }

    setIsEditingImage(true);

    try {
      const response = await fetch('/api/brain-image/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previousPrompt: sourceImage.promptUsed,
          editInstruction: trimmedInstruction,
          useCase,
          includeCharacter,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | (ApiError & { images?: BrainImageResult[]; updatedPrompt?: string; previousPrompt?: string })
        | null;

      if (!response.ok) {
        const message = data?.details || data?.error || response.statusText || 'Unknown error while editing the image.';
        throw new Error(message);
      }

      const images = data?.images;
      if (!images || images.length === 0) {
        throw new Error('Edit API did not return any images.');
      }

      const editCount = generatedImages.filter((img) => img.generationType === 'edit').length;
      const now = Date.now();

      const mapped = images.map((img, idx) => ({
        ...img,
        label: images.length > 1 ? `Edit ${editCount + idx + 1}` : `Edit ${editCount + 1}`,
        generationType: 'edit' as const,
        parentId: sourceImage.id,
        // Spread prompt info from response when available
        promptUsed: data.updatedPrompt ?? img.promptUsed ?? sourceImage.promptUsed,
        createdAt: img.createdAt || new Date(now).toISOString(),
      }));

      setGeneratedImages((prev) => [...prev, ...mapped]);
      if (mapped[0]) {
        setSelectedImageId(mapped[0].id);
        if (data?.updatedPrompt) {
          setRefinedPrompt(data.updatedPrompt);
        }
      }
      setEditInstruction('');
    } catch (error) {
      console.error('Failed to edit image:', error);
      const message = error instanceof Error ? error.message : 'There was an error editing the image.';
      alert(message);
    } finally {
      setIsEditingImage(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <div className="absolute inset-0 -z-20 bg-[#03050A]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.1),rgba(3,5,10,0))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.2),rgba(3,5,10,0))]" />

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-7xl flex-1 gap-16 px-6 pb-24 pt-12 sm:pt-24">
        <header className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            BrainDrive Image Studio
          </h1>
          <p className="mt-3 text-lg text-white/70">
            Generate on-brand images for BrainDrive in a few seconds.
          </p>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left Panel: Concept -> Prompt */}
          <div className="flex flex-col gap-6 rounded-2xl bg-[#0A152A]/50 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold">1. Describe your concept</h2>
            <div className="flex flex-col gap-4">
              <label htmlFor="concept" className="text-sm font-medium text-white/80">
                Describe the image you want
              </label>
              <textarea
                id="concept"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g., blog hero about freedom vs big tech ai, side by side comparison"
                className="min-h-[120px] w-full rounded-lg border border-white/10 bg-[#03050A] p-3 text-white/90 focus:border-white/30 focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="use-case" className="text-sm font-medium text-white/80">
                Use case
              </label>
              <select
                id="use-case"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value as BrainImageUseCase)}
                className="w-full rounded-lg border border-white/10 bg-[#03050A] p-3 text-white/90 focus:border-white/30 focus:ring-2 focus:ring-white/20"
              >
                <option value="blog-hero">Blog hero (16:9)</option>
                <option value="in-article-graphic">In-article graphic (16:9)</option>
                <option value="video-side-graphic">Video side graphic (16:9 with safe left side)</option>
                <option value="social-tile">Social tile (square)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="include-character" className="text-sm font-medium text-white/80">
                Include BrainDrive Guide character
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={includeCharacter}
                onClick={() => setIncludeCharacter(!includeCharacter)}
                className={`${
                  includeCharacter ? 'bg-blue-500' : 'bg-gray-600'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    includeCharacter ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            <div className="border-t border-white/10" />

            <button
              onClick={handleGeneratePrompt}
              disabled={isGeneratingPrompt || !concept}
              className="flex h-12 items-center justify-center rounded-lg bg-blue-600 px-6 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingPrompt ? 'Generating...' : 'Generate Prompt'}
            </button>

            {refinedPrompt && (
              <div className="flex flex-col gap-4">
                <label htmlFor="refined-prompt" className="text-sm font-medium text-white/80">
                  Refined Prompt
                </label>
                <textarea
                  id="refined-prompt"
                  value={refinedPrompt}
                  onChange={(e) => setRefinedPrompt(e.target.value)}
                  className="min-h-[150px] w-full rounded-lg border border-white/10 bg-[#03050A] p-3 text-sm text-white/70 focus:border-white/30 focus:ring-2 focus:ring-white/20"
                />
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="flex h-12 items-center justify-center rounded-lg bg-green-600 px-6 text-lg font-semibold text-white shadow-lg transition-all hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isGeneratingImage ? 'Generating...' : 'Generate Image'}
                </button>
              </div>
            )}
          </div>

          {/* Right Panel: Generated Images */}
          <div className="flex flex-col gap-6 rounded-2xl bg-[#0A152A]/50 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold">2. Generated Images</h2>
            {isGeneratingImage ? (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-[#03050A]">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="h-8 w-8 animate-spin text-white/50"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <p className="text-white/50">Generating images...</p>
                </div>
              </div>
            ) : generatedImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {generatedImages.map((image) => {
                  const isSelected = selectedImageId === image.id;
                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImageId(image.id)}
                      className={`group flex w-full flex-col overflow-hidden rounded-lg border ${
                        isSelected ? 'border-green-400 ring-2 ring-green-500/40' : 'border-white/10'
                      } bg-[#03050A] text-left transition hover:border-white/30`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.url} alt={refinedPrompt || 'Generated image'} className="w-full object-cover" />
                      <div className="flex items-center justify-between px-3 py-2 text-xs text-white/70">
                        <span className="font-semibold text-white/80">{image.label}</span>
                        <span className="text-white/50">{image.generationType === 'edit' ? 'Edited' : 'Original'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-[#03050A]">
                <p className="text-white/50">Images will appear here</p>
              </div>
            )}
          </div>
        </div>

        {generatedImages.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-[#0A152A]/50 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold">3. Request edits</h2>
            <p className="text-white/60">
              Select an image above, describe what to change, and we’ll generate a new version without replacing the
              original.
            </p>
            <textarea
              value={editInstruction}
              onChange={(e) => setEditInstruction(e.target.value)}
              placeholder="e.g., make the background darker and add a small lock icon near the user data block."
              className="min-h-[100px] w-full rounded-lg border border-white/10 bg-[#03050A] p-3 text-white/90 focus:border-white/30 focus:ring-2 focus:ring-white/20"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleEditImage}
                disabled={isEditingImage}
                className="flex h-12 items-center justify-center rounded-lg bg-purple-600 px-6 text-lg font-semibold text-white shadow-lg transition-all hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isEditingImage ? 'Generating edit...' : 'Generate edit'}
              </button>
              <span className="text-sm text-white/60">
                Currently selected: {selectedImageId ? generatedImages.find((img) => img.id === selectedImageId)?.label : 'None'}
              </span>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
