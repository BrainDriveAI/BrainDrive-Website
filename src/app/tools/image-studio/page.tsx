'use client';

import { useState } from 'react';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

type UseCase = 'blog-hero' | 'in-article' | 'video-side-graphic' | 'social-tile';

export default function ImageStudioPage() {
  const [concept, setConcept] = useState('');
  const [useCase, setUseCase] = useState<UseCase>('blog-hero');
  const [includeCharacter, setIncludeCharacter] = useState(true);

  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [refinedPrompt, setRefinedPrompt] = useState<string | null>(null);

  const handleGeneratePrompt = async () => {
    if (!concept) {
      alert('Please describe the image you want.');
      return;
    }

    setIsGeneratingPrompt(true);
    setRefinedPrompt(null);

    try {
      const response = await fetch('/api/brain-image/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept, useCase, includeCharacter }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setRefinedPrompt(data.refinedPrompt);
    } catch (error) {
      console.error('Failed to generate prompt:', error);
      alert('There was an error generating the prompt. Please check the console for details.');
    } finally {
      setIsGeneratingPrompt(false);
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
                onChange={(e) => setUseCase(e.target.value as UseCase)}
                className="w-full rounded-lg border border-white/10 bg-[#03050A] p-3 text-white/90 focus:border-white/30 focus:ring-2 focus:ring-white/20"
              >
                <option value="blog-hero">Blog hero (16:9)</option>
                <option value="in-article">In-article graphic (16:9)</option>
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
          </div>

          {/* Right Panel: Generated Images */}
          <div className="flex flex-col gap-6 rounded-2xl bg-[#0A152A]/50 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold">2. Generated Images</h2>
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-[#03050A]">
              <p className="text-white/50">Images will appear here</p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}