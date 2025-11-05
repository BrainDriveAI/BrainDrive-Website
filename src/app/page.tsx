import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  const heroFeatures = [
    {
      title: "Own",
      body: "MIT Licensed & Self-Hosted",
      icon: "/icons/own-icon.png",
    },
    {
      title: "Customize",
      body: "Modular & Permissionless",
      icon: "/icons/customize-icon.png",
    },
    {
      title: "Monetize",
      body: "On Your Terms, not Big Tech's",
      icon: "/icons/monetize-icon.png",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <SiteHeader />

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-24 pt-3 sm:pt-5">
        <section className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Your AI. Your Rules.
            </h1>
            <p className="subheader-font text-lg font-medium text-white/80 sm:text-xl">
              BrainDrive is your user-owned alternative to Big Tech AI
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
              href="/install"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(53,120,229,0.35)] transition hover:brightness-110"
            >
              Install BrainDrive
              <span aria-hidden className="text-lg">
                →
              </span>
            </Link>
            <Link
              href="https://docs.braindrive.ai/core/how-to/use-braindrive"
              target="_self"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent-secondary)] hover:text-[var(--color-accent-secondary)]"
            >
              Owner&apos;s Manual
              <span aria-hidden className="text-lg">
                ↗
              </span>
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {heroFeatures.map((item) => (
            <Link
              key={item.title}
              href="https://docs.braindrive.ai/core/how-to/use-braindrive"
              className="group flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center transition hover:border-[var(--color-accent-secondary)] hover:bg-white/[0.07]"
            >
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#050914] ring-1 ring-white/20 sm:h-24 sm:w-24">
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  fill
                  sizes="(min-width: 768px) 96px, 64px"
                  className="scale-[1.75] object-cover sm:scale-[1.5]"
                  style={{ objectPosition: "50% 46%" }}
                />
              </div>
              <h2 className="mb-3 text-xl font-semibold text-white">
                {item.title}
              </h2>
              <p className="text-sm text-[var(--color-muted)]">{item.body}</p>
            </Link>
          ))}
        </section>

        <section className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.08] via-white/[0.02] to-white/[0.08] p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-2">
              <h2 className="text-2xl font-semibold text-white">
                Free Guide to Local AI
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Learn how to run your own AI system privately and securely on
                your own computer.
              </p>
            </div>
            <Link
              href="/free-guide"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Get Your Free Guide
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
