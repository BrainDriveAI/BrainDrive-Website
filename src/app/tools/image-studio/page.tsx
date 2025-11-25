/* eslint-disable @next/next/no-img-element */
'use client';

import { useMemo, useState } from "react";
import { type BrainImageUseCase, useCasePresets } from "@/config/brainImageStyle";
import type { BrainImageResult } from "@/lib/brainImage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type PromptState = {
  refinedPrompt: string;
  negativePrompt: string;
  fullPrompt: string;
};

const defaultNegativePrompt =
  "No corporate stock photography. Avoid neon chaos or over-busy scenes.";

const useCaseOptions = Object.entries(useCasePresets).map(([value, meta]) => ({
  value: value as BrainImageUseCase,
  label: meta.label,
  description: meta.promptHint,
}));

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0f1b32]/80 p-5 shadow-[0_20px_50px_rgba(8,15,30,0.5)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-white/70">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

function statusTone(status?: string) {
  if (!status) return "";
  if (status.includes("mock")) return "text-amber-300";
  return "text-emerald-300";
}

export default function ImageStudioPage() {
  const [concept, setConcept] = useState("");
  const [useCase, setUseCase] = useState<BrainImageUseCase>("blog-hero");
  const [includeCharacter, setIncludeCharacter] = useState(true);
  const [promptState, setPromptState] = useState<PromptState>({
    refinedPrompt: "",
    negativePrompt: defaultNegativePrompt,
    fullPrompt: "",
  });
  const [images, setImages] = useState<BrainImageResult[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const selectedImage = useMemo(
    () => images.find((item) => item.id === selectedImageId) ?? null,
    [images, selectedImageId]
  );

  const handlePromptRequest = async (): Promise<string | null> => {
    if (!concept.trim()) {
      setError("Tell me what you want to see first.");
      return null;
    }

    setIsGeneratingPrompt(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch("/api/brain-image/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept,
          useCase,
          includeCharacter,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Could not generate a prompt.");
        return null;
      }

      const refinedPrompt = data.refinedPrompt ?? "";
      const negativePrompt = data.negativePrompt ?? defaultNegativePrompt;
      const fullPrompt = data.fullPrompt ?? refinedPrompt;

      setPromptState({
        refinedPrompt,
        negativePrompt,
        fullPrompt,
      });
      setStatus("Prompt ready");
      return fullPrompt;
    } catch (err) {
      console.error(err);
      setError("Something went wrong building the prompt.");
      return null;
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const handleGenerateImage = async () => {
    setError(null);
    setStatus(null);
    setIsGeneratingImage(true);
    try {
      const readyPrompt =
        promptState.fullPrompt || (await handlePromptRequest()) || "";
      if (!readyPrompt) {
        return;
      }

      const response = await fetch("/api/brain-image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullPrompt: readyPrompt,
          concept,
          useCase,
          includeCharacter,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Could not generate images.");
        return;
      }

      setImages(data.images ?? []);
      setSelectedImageId(
        data.images?.length ? data.images[0].id ?? null : null
      );
      setPromptState((prev) => ({
        ...prev,
        fullPrompt: data.fullPrompt ?? prev.fullPrompt,
      }));
      setStatus(
        data.provider
          ? `Images ready (${data.provider === "mock" ? "mock preview" : data.provider})`
          : "Images ready"
      );
    } catch (err) {
      console.error(err);
      setError("Image generation failed. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleEdit = async () => {
    if (!editText.trim()) {
      setError("Describe what you want changed.");
      return;
    }
    const previousPrompt =
      selectedImage?.promptUsed || promptState.fullPrompt || promptState.refinedPrompt;

    if (!previousPrompt) {
      setError("Generate an image first so we have a prompt to edit.");
      return;
    }

    setIsEditing(true);
    setError(null);
    setStatus(null);
    try {
      const response = await fetch("/api/brain-image/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previousPrompt,
          editInstruction: editText,
          useCase,
          includeCharacter,
          targetImageId: selectedImage?.id,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Could not apply edits.");
        return;
      }

      setImages(data.images ?? []);
      setPromptState((prev) => ({
        ...prev,
        fullPrompt: data.updatedPrompt ?? prev.fullPrompt,
      }));
      setSelectedImageId(
        data.images?.length ? data.images[0].id ?? null : null
      );
      setEditText("");
      setStatus(
        data.provider
          ? `Edit applied (${data.provider === "mock" ? "mock preview" : data.provider})`
          : "Edit applied"
      );
    } catch (err) {
      console.error(err);
      setError("Edit request failed. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">
      <div className="absolute inset-0 -z-20 bg-[#03050a]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(124,167,209,0.15),rgba(3,5,10,0.3))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_20%_20%,rgba(50,93,135,0.22),rgba(3,5,10,0))]" />

      <SiteHeader />

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 pb-24 pt-10 sm:pt-14">
        <header className="space-y-4 text-center sm:text-left">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            BrainDrive tools
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                BrainDrive Image Studio
              </h1>
              <p className="max-w-2xl text-base text-white/70 sm:text-lg">
                Turn rough concepts into on-brand marketing art. We bake the
                BrainDrive palette, composition rules, and character into every
                prompt.
              </p>
            </div>
            {status ? (
              <span
                className={`inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium ${statusTone(status)}`}
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                {status}
              </span>
            ) : null}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-5">
            <SectionCard
              title="Describe the image"
              subtitle="Give us the rough idea. The brand guardrails and composition hints are added automatically."
            >
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-white/80">
                  Rough concept
                  <textarea
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b162f]/70 px-4 py-3 text-sm text-white shadow-inner shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] focus:border-[var(--color-accent)] focus:outline-none"
                    rows={4}
                    placeholder="e.g. blog hero about freedom vs big tech ai, side-by-side comparison"
                  />
                </label>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="flex flex-col text-sm font-medium text-white/80">
                    Use case
                    <select
                      value={useCase}
                      onChange={(e) =>
                        setUseCase(e.target.value as BrainImageUseCase)
                      }
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b162f]/70 px-3 py-2 text-sm text-white focus:border-[var(--color-accent)] focus:outline-none"
                    >
                      {useCaseOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span className="mt-1 text-xs text-white/60">
                      {
                        useCaseOptions.find((option) => option.value === useCase)
                          ?.description
                      }
                    </span>
                  </label>

                  <label className="flex min-h-[92px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0b162f]/70 px-4 py-4 text-sm font-medium text-white/80">
                    <span className="leading-snug">
                      Include BrainDrive Guide character
                    </span>
                    <button
                      type="button"
                      onClick={() => setIncludeCharacter((prev) => !prev)}
                      className={`flex h-9 w-16 items-center rounded-full border border-white/10 px-1 transition ${
                        includeCharacter
                          ? "bg-[var(--color-accent)]"
                          : "bg-white/10"
                      }`}
                      aria-pressed={includeCharacter}
                    >
                      <span
                        className={`inline-block h-7 w-7 rounded-full bg-white transition ${
                          includeCharacter ? "translate-x-7" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </label>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handlePromptRequest}
                    disabled={isGeneratingPrompt}
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
                  >
                    {isGeneratingPrompt ? "Building prompt..." : "Generate prompt"}
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]/30 disabled:opacity-50"
                  >
                    {isGeneratingImage ? "Generating..." : "Generate image"}
                  </button>
                  <span className="text-xs text-white/60">
                    Uses Google nano banana pro (mocked locally if no key set).
                  </span>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Prompt preview"
              subtitle="We always bake in the BrainDrive palette, composition, and labels."
            >
              <div className="space-y-3 text-sm text-white/80">
                <label className="block rounded-2xl border border-white/10 bg-[#0b162f]/80 p-3">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Refined prompt (editable)
                  </span>
                  <textarea
                    value={promptState.refinedPrompt}
                    onChange={(e) =>
                      setPromptState((prev) => ({
                        ...prev,
                        refinedPrompt: e.target.value,
                        fullPrompt: e.target.value || prev.fullPrompt,
                      }))
                    }
                    placeholder="Generate a prompt to edit it, or start typing."
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b162f]/50 px-3 py-2 text-sm text-white focus:border-[var(--color-accent)] focus:outline-none"
                  />
                </label>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-3 text-white/70">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Negative prompt
                  </p>
                  <textarea
                    value={promptState.negativePrompt}
                    onChange={(e) =>
                      setPromptState((prev) => ({
                        ...prev,
                        negativePrompt: e.target.value,
                      }))
                    }
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b162f]/50 px-3 py-2 text-sm text-white focus:border-[var(--color-accent)] focus:outline-none"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Request edits"
              subtitle="Tell us what to tweak; we will revise the last prompt and re-generate."
            >
              <div className="space-y-3">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-white/10 bg-[#0b162f]/70 px-4 py-3 text-sm text-white focus:border-[var(--color-accent)] focus:outline-none"
                  placeholder="e.g. brighten the BrainDrive side and leave more negative space on the left."
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleEdit}
                    disabled={isEditing || images.length === 0}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50"
                  >
                    {isEditing ? "Applying edits..." : "Apply edits & regenerate"}
                  </button>
                  <span className="text-xs text-white/60">
                    Select an image first to guide edits (defaults to the latest).
                  </span>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-white">
                Generated images
              </h2>
              {images.length ? (
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                  Click a card to select. {images.length} shown.
                </span>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {isGeneratingImage || isEditing ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-44 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1b32] to-[#081022] opacity-70"
                  >
                    <div className="h-full w-full animate-pulse rounded-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5" />
                  </div>
                ))
              ) : images.length ? (
                images.map((image) => {
                  const isSelected = selectedImageId === image.id;
                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImageId(image.id)}
                      className={`group relative overflow-hidden rounded-2xl border transition ${
                        isSelected
                          ? "border-[var(--color-accent)] shadow-[0_0_30px_rgba(53,120,229,0.35)]"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-[#0b162f]">
                        <img
                          src={image.url}
                          alt="Generated BrainDrive artwork"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-3 py-2 text-xs text-white/80">
                          <span>
                            {new Date(image.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {image.provider ? (
                            <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em]">
                              {image.provider}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-2 flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 text-center text-sm text-white/70">
                  <p className="font-semibold text-white">No images yet</p>
                  <p className="mt-2 max-w-sm text-white/60">
                    Generate a prompt and click &quot;Generate image&quot; to see results. We use
                    local mock art if the nano banana key is not configured.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
