import SiteHeader from "@/components/SiteHeader";
import EmailCaptureForm from "@/components/EmailCaptureForm";

export const metadata = {
  title: "Free Guide to Local AI | BrainDrive",
  description:
    "Download BrainDrive's free guide to running AI 100% locally. Learn hardware requirements, model selection, customization, and more.",
};

const learnTopics = [
  "What local AI is (and why it beats hosted AI for privacy, control, and cost)",
  "The three main components every local AI system needs",
  "Hardware requirements explained in plain English",
  "Where to find, download, and run your first local AI model",
  "How to work with local models from the command line and friendly interfaces like BrainDrive",
  "Ways to customize models with system prompts, temperature, plugins, and agents",
  "How to discover, fine-tune, and share models from Hugging Face",
  "Communities and resources that keep you learning long after the guide",
];

const reasons = [
  {
    title: "Privacy First",
    body: "Keep prompts, documents, and personal data on your machine—no surveillance, no vendor lock-in.",
  },
  {
    title: "Total Control",
    body: "Choose the models, interfaces, and plugins you want. Change them anytime without waiting on Big Tech.",
  },
  {
    title: "Practical and Accessible",
    body: "Step-by-step walkthroughs, real-world hardware advice, and zero jargon so anyone can get started quickly.",
  },
];

const modules = [
  {
    title: "Local AI Foundations",
    bullets: [
      "What “local AI” really means and how it differs from hosted tools",
      "Understanding AI model sizes, parameters, and quantization",
      "Assessing your hardware (CPU, RAM, GPU, storage) in minutes",
    ],
  },
  {
    title: "Hands-On Setup",
    bullets: [
      "Choosing your first model with Ollama",
      "Downloading and running a model in the terminal",
      "Unplug-the-internet moment: prove you are 100% offline",
    ],
  },
  {
    title: "Customize & Extend",
    bullets: [
      "Give your AI a role using system prompts and temperature",
      "Expand the context window for long-form workflows",
      "Use BrainDrive and other UIs to go beyond the command line",
    ],
  },
  {
    title: "Advanced Exploration",
    bullets: [
      "Discover specialized models on Hugging Face",
      "Fine-tune models for your own use cases",
      "Tap into local AI communities and future-proof your skills",
    ],
  },
];

export default function FreeGuidePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <SiteHeader />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-12 sm:pt-20">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-accent-secondary)]">
              Free Download
            </p>
            <h1 className="header-font text-4xl font-bold leading-tight sm:text-5xl">
              Free Guide to Local AI
            </h1>
            <p className="subheader-font text-lg text-white/80 sm:text-xl">
              Learn how to run your own AI system privately and securely—no
              technical expertise required.
            </p>
            <p className="text-base text-white/70">
              This field-tested guide walks you through the exact steps to pick
              the right hardware, download your first model, run it locally,
              customize it for your workflow, and keep improving with the wider
              ecosystem. It is everything we wish existed when we started.
            </p>

            <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white/80">
              <h2 className="text-lg font-semibold text-white">
                Inside the guide, you will learn:
              </h2>
              <ul className="grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {learnTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent-secondary)]" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_45px_rgba(8,18,36,0.45)] backdrop-blur">
            <EmailCaptureForm />
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

        <section className="mt-20 space-y-10">
          <div className="max-w-3xl space-y-4 text-white">
            <h2 className="header-font text-3xl font-semibold sm:text-4xl">
              What you will build as you go
            </h2>
            <p className="text-base text-white/75">
              By the time you finish the guide you will have a private AI
              assistant running on your machine, tuned to your needs, and ready
              to grow alongside your projects. Each chapter layers on the next
              so you stay in control at every step.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white"
              >
                <h3 className="mb-3 text-lg font-semibold text-white">
                  {module.title}
                </h3>
                <ul className="space-y-2 text-sm text-white/75">
                  {module.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4 text-white">
            <h2 className="header-font text-3xl font-semibold sm:text-4xl">
              Take back control of AI
            </h2>
            <p className="text-base text-white/75">
              Stop renting access to someone else&apos;s AI. With local AI you
              own the models, the data, and the outcomes. This guide shows you
              how to do it safely, efficiently, and without guesswork.
            </p>
            <p className="text-base text-white/75">
              Ready to get started? Drop your email and we will send the guide
              straight to your inbox along with occasional BrainDrive updates.
              No spam, ever.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_45px_rgba(8,18,36,0.45)] backdrop-blur">
            <EmailCaptureForm compact />
          </div>
        </section>
      </main>
    </div>
  );
}
