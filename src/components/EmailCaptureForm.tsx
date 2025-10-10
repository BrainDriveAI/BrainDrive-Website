'use client';

import { useState, useTransition } from "react";

type EmailCaptureFormProps = {
  compact?: boolean;
};

export default function EmailCaptureForm({
  compact = false,
}: EmailCaptureFormProps) {
  const inputId = compact ? "guide-email-compact" : "guide-email";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setIsError(false);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/free-guide-subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: trimmed }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(
            data?.error ?? "Unable to subscribe right now. Please try again."
          );
        }

        setEmail("");
        setMessage(
          "Thanks! Check your inbox shortly for the guide. It may land in promotions or spam."
        );
      } catch (error) {
        setIsError(true);
        setMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-2 text-white">
        <h2 className="text-xl font-semibold">
          {compact ? "Get the guide" : "Email me the free guide"}
        </h2>
        {!compact && (
          <p className="text-sm text-white/70">
            Drop your email and we’ll send the Local AI guide plus occasional
            BrainDrive updates. Unsubscribe anytime.
          </p>
        )}
      </div>

      <label
        className="block text-sm font-medium text-white/80"
        htmlFor={inputId}
      >
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:outline-none"
        placeholder="you@example.com"
      />

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-75"
      >
        {isPending ? "Sending…" : "Email Me the Guide"}
      </button>

      <p className="text-xs text-white/60">
        We respect your inbox. No selling, no sharing, just helpful updates.
      </p>

      {message && (
        <p
          role={isError ? "alert" : "status"}
          className={`text-sm ${isError ? "text-[#f87171]" : "text-[var(--color-accent-secondary)]"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
