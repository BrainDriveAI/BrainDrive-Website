import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "How to Run AI On Your Own Computer | BrainDrive",
  description:
    "Get the BrainDrive ebook that teaches beginners how to install, own, and customize a private AI system that lives on their computer.",
};

const highlights = [
  "Spin up a BrainDrive that looks like ChatGPT without surrendering your data.",
  "Download open-source models with Ollama and chat entirely offline whenever you choose.",
  "Use personas, custom pages, and plugins to tailor BrainDrive to your workflows.",
  "Decide when (and when not) to connect hosted models through APIs on your terms.",
];

const reasons = [
  {
    title: "Own It All",
    body: "BrainDrive runs on hardware you control. Prompts, documents, and chat history never leave your machine.",
  },
  {
    title: "Ditch the Fees",
    body: "Stop renting access from platforms that raise prices and rewrite policies. BrainDrive is MIT licensed and free.",
  },
  {
    title: "Beginner Friendly",
    body: "Plain-English explanations, humor, and zero jargon. The entire setup clocks in at about 20 minutes.",
  },
];

const essentials = [
  "Laptop or desktop (Mac, Windows, or Linux)",
  "At least 8GB of RAM",
  "10-20GB of free storage space",
  "20 minutes to follow along",
  "No technical experience required",
];

export default function FreeGuidePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <SiteHeader />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-12 sm:pt-20">
        <section className="space-y-8 lg:space-y-10">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_45px_rgba(8,18,36,0.45)] backdrop-blur sm:p-8">
            <div id="cbox-BiSx2ij5EY4iMg6A" />
          </div>

          <div className="space-y-6 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-accent-secondary)]">
              Free Download
            </p>
            <h1 className="header-font text-4xl font-bold leading-tight sm:text-5xl">
              How to Run AI On Your Own Computer Privately and for Free
            </h1>
            <p className="subheader-font text-lg text-white/80 sm:text-xl">
              Dave Waring, BrainDrive co-creator, guides you from the very first
              download to owning a fully private AI system in under 20 minutes.
            </p>
            <p className="text-base text-white/70">
              Host it yourself. Keep your conversations private. Pay nothing in
              monthly fees. This beginner-friendly ebook shows exactly how to
              install BrainDrive, run open-source models with Ollama, customize
              the interface, and stay in complete control of your data.
            </p>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white/80 sm:p-8">
            <h2 className="text-lg font-semibold text-white">Inside you will:</h2>
            <ul className="grid gap-2 text-sm text-white/80 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent-secondary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              &ldquo;We built BrainDrive so regular people could own AI, not rent it
              from Big Tech. This guide gives you the keys.&rdquo; — Dave Waring
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-white">
              What you need before you start
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              {essentials.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white transition hover:border-[var(--color-accent-secondary)] hover:bg-white/[0.08]"
            >
              <h3 className="mb-3 text-xl font-semibold text-white">
                {reason.title}
              </h3>
              <p className="text-sm text-white/75">{reason.body}</p>
            </div>
          ))}
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
