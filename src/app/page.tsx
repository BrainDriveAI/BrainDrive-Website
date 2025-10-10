import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <header className="header-font relative border-b border-white/10 bg-[#111827] sm:h-[60px]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-6 py-3 sm:h-[60px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0">
          <Link
            href="/"
            className="flex items-center gap-4"
            aria-label="BrainDrive home"
          >
            <Image
              src="/braindrive-logo.png"
              alt="BrainDrive"
              width={220}
              height={60}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav className="nav-font flex items-center gap-6 text-base font-medium text-white/90 sm:h-full">
            <Link
              href="https://docs.braindrive.ai"
              className="transition hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="https://community.braindrive.ai"
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

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-24 pt-3 sm:pt-5">
        <section className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Your AI. Your Rules.
            </h1>
            <p className="subheader-font text-lg font-medium text-white/80 sm:text-xl">
              BrainDrive is the user-owned alternative to Big Tech AI
            </p>
          </div>

          <div className="flex w-full justify-center">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_20px_50px_rgba(14,35,65,0.35)]">
              <Image
                src="/hero-image.png"
                alt="BrainDrive AI dashboard screenshot"
                width={1536}
                height={768}
                className="h-auto w-full rounded-xl"
                priority
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://docs.braindrive.ai/core/INSTALL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(53,120,229,0.35)] transition hover:brightness-110"
            >
              Install BrainDrive
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
