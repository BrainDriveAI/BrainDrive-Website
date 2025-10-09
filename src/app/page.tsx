import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <header className="relative border-b border-white/10 backdrop-blur-sm bg-black/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-[var(--color-accent-secondary)]">
              BD
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--color-accent-secondary)]">
                BrainDrive
              </p>
              <p className="text-lg font-semibold text-white">
                Cognitive AI Accelerator
              </p>
            </div>
          </div>

          <nav className="flex gap-4 text-sm font-medium text-[var(--color-muted)]">
            <Link
              href="https://docs.braindrive.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="https://community.braindrive.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Community
            </Link>
            <Link
              href="mailto:hello@braindrive.ai"
              className="transition hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-24 pt-16 sm:pt-24">
        <section className="max-w-3xl space-y-8">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-accent-secondary)]">
            Neural Native
          </span>

          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Build neural interfaces that feel effortless&mdash;from prototype to
            production.
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl">
            BrainDrive helps you orchestrate brain-computer inputs, adaptive AI
            models, and real-time safety controls so teams can ship cognitive
            products with confidence.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="https://docs.braindrive.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(53,120,229,0.35)] transition hover:brightness-110"
            >
              Explore the Docs
              <span aria-hidden className="text-lg">
                →
              </span>
            </Link>
            <Link
              href="https://community.braindrive.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent-secondary)] hover:text-[var(--color-accent-secondary)]"
            >
              Join the Community
              <span aria-hidden className="text-lg">
                ↗
              </span>
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Composable SDKs",
              body: "Use modular data pipelines, event routers, and guardrails tailored to neural signals.",
            },
            {
              title: "Adaptive Intelligence",
              body: "Blend on-device inference with cloud tuning and safety rules that adapt in real time.",
            },
            {
              title: "Community Insights",
              body: "Swap implementation patterns, security practices, and research with builders shipping today.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-[var(--color-accent-secondary)] hover:bg-white/[0.07]"
            >
              <div className="mb-4 h-10 w-10 rounded-full bg-[var(--color-accent-soft)] transition group-hover:bg-[var(--color-accent-secondary)]/20" />
              <h2 className="mb-3 text-xl font-semibold text-white">
                {item.title}
              </h2>
              <p className="text-sm text-[var(--color-muted)]">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.08] via-white/[0.02] to-white/[0.08] p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-2">
              <h2 className="text-2xl font-semibold text-white">
                Stay in the loop
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Subscribe to product updates and early release notes from the
                BrainDrive engineering team.
              </p>
            </div>
            <Link
              href="mailto:hello@braindrive.ai?subject=BrainDrive%20Updates"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Request updates
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BrainDrive. All rights reserved.</p>
          <p>
            Looking for documentation?{" "}
            <Link
              href="https://docs.braindrive.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition hover:text-[var(--color-accent)]"
            >
              Visit docs.braindrive.ai
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
