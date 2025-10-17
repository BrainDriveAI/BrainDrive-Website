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

const ownershipComponents = [
  {
    title: "The Interface",
    description:
      "BrainDrive ships with a beautiful, open-source chat UI that you own outright. No one can monitor or revoke it.",
  },
  {
    title: "The Intelligence",
    description:
      "Download open-source models like Gemma or Llama to your computer. Connect cloud APIs only when you decide.",
  },
  {
    title: "The Memory",
    description:
      "Your conversation history lives locally. Upcoming RAG features keep documents and knowledge grounded on your machine.",
  },
  {
    title: "The Hosting",
    description:
      "Run BrainDrive on a laptop, desktop, or private cloud. You pick the environment and who can access it.",
  },
  {
    title: "The Connections",
    description:
      "Model Context Protocol integrations make it easy to link BrainDrive with Gmail, accounting tools, and more—without giving away control.",
  },
];

const essentials = [
  "Laptop or desktop (Mac, Windows, or Linux)",
  "At least 8GB of RAM",
  "10-20GB of free storage space",
  "20 minutes to follow along",
  "No technical experience required",
];

const steps = [
  {
    title: "Download and install BrainDrive",
    description:
      "Visit BrainDrive.ai, choose your operating system, and run the installer. The app opens in your browser automatically.",
  },
  {
    title: "Create your local login",
    description:
      "Sign up on http://localhost:5173 and keep your Wi-Fi off if you want proof everything stays on your device.",
  },
  {
    title: "Install Ollama",
    description:
      "Grab Ollama to manage open-source AI models without the command line. It is free and runs locally.",
  },
  {
    title: "Pull your first model",
    description:
      "Open the BrainDrive settings, pick Gemma:1B (or another starter model), and click install while you grab a coffee.",
  },
  {
    title: "Celebrate with an offline chat",
    description:
      "Visit the AI Chat page, ask for a joke, and watch your new AI reply without Big Tech watching over your shoulder.",
  },
  {
    title: "Create a persona",
    description:
      "Use the Persona builder to wrap system prompts in a friendly UI. Start with a pirate persona to see how tone control works.",
  },
  {
    title: "Build a custom page",
    description:
      "Drag-and-drop the AI Chat Interface inside Page Builder to create dedicated workspaces for email rewrites, poetry, research, and more.",
  },
  {
    title: "Optionally connect API models",
    description:
      "Blend in GPT-4, Claude, or Gemini via API keys when you want maximum horsepower while still steering the experience.",
  },
  {
    title: "Show off your new superpower",
    description:
      "Call a friend and let them know you run your own AI stack. Enjoy the bragging rights—your secret is safe with us.",
  },
  {
    title: "Join the BrainDrive community",
    description:
      "Hop into community.braindrive.ai for Q&A, new plugins, and fellow owners who are building the future together.",
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
        <section className="space-y-8 lg:space-y-10">
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

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_45px_rgba(8,18,36,0.45)] backdrop-blur sm:p-8">
            <div id="cbox-BiSx2ij5EY4iMg6A" />
          </div>
        </section>

        <section className="mt-14">
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

        <section className="mt-20 space-y-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-4 text-white">
              <h2 className="header-font text-3xl font-semibold sm:text-4xl">
                Why own your AI system?
              </h2>
              <p className="text-base text-white/75">
                Hosted AI platforms log every prompt, sell access back to you,
                and can change the rules overnight. BrainDrive flips the script
                so you own the interface, the models, the memory, the hosting,
                and the integrations.
              </p>
              <p className="text-base text-white/75">
                The guide explains how Big Tech uses your conversations, why the
                open-source community now beats walled gardens, and how to bring
                that power home without becoming a systems engineer.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white">
              <h3 className="mb-4 text-lg font-semibold text-white">
                The five components BrainDrive hands back to you:
              </h3>
              <ul className="space-y-4 text-sm text-white/75">
                {ownershipComponents.map((component) => (
                  <li key={component.title} className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {component.title}
                    </span>
                    <span>{component.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white">
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
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Get it running in 10 easy steps
              </h3>
              <ol className="space-y-4 text-sm text-white/75">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-secondary)] text-xs font-semibold text-[#0b162f]">
                      {index + 1}
                    </span>
                    <div className="space-y-1">
                      <p className="font-semibold text-white">{step.title}</p>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4 text-white">
            <h2 className="header-font text-3xl font-semibold sm:text-4xl">
              Ready to own your AI?
            </h2>
            <p className="text-base text-white/75">
              When you finish the guide you will have a private AI assistant
              running locally, tuned to your needs, and free from monthly plans
              or data mining.
            </p>
            <p className="text-base text-white/75">
              Drop your email and we will send the ebook straight to your inbox,
              along with occasional BrainDrive updates on new plugins, memory
              upgrades, and community events. No spam—only tools that keep you
              in control.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_45px_rgba(8,18,36,0.45)] backdrop-blur">
            <div id="cbox-BiSx2ij5EY4iMg6A" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
