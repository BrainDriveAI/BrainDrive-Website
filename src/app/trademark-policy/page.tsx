import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";

export const metadata = {
  title: "Trademark Policy | BrainDrive",
  description:
    "Understand how to reference BrainDrive responsibly and use our trademarks while building in the open ecosystem.",
};

const freedoms = [
  {
    title: "1. You’re Free to Build (Including Your Own Brand)",
    intro:
      "BrainDrive is yours to build on—code, customize, remix, and yes, brand your own way.",
    can: [
      "Run your own BrainDrive instance.",
      "Modify or fork the code for personal or public use.",
      "Create new tools, plugins, or experiences built on BrainDrive.",
      "Build your own brand around the products, services, or experiences you create with BrainDrive.",
    ],
    cannot: [
      "Use “BrainDrive” as the core of your project or company name.",
      "Use the BrainDrive logo or branding in a way that implies your version is the official BrainDrive.",
      "Release a fork named “BrainDrive Pro” or similar.",
      "Brand your business with the BrainDrive name or logo.",
    ],
    examples: [
      "✅ Allowed: “NeuronWorks – Built on BrainDrive”",
      "✅ Allowed: A plugin called “SmartScheduler for BrainDrive”",
      "❌ Not allowed: “BrainDrive Pro” as a product name",
      "❌ Not allowed: Using the BrainDrive logo to brand a new platform",
    ],
  },
  {
    title: "2. You’re Free to Monetize",
    intro: undefined,
    can: [
      "Sell services that use BrainDrive.",
      "Build and sell plugins, templates, or custom solutions.",
      "Offer hosting, training, or support for BrainDrive systems.",
    ],
    cannot: [
      "Market your service as “official BrainDrive hosting”.",
      "Use the name “BrainDrive” as your business or product name.",
    ],
    examples: [
      "✅ Allowed: “Custom BrainDrive installations by [Your Brand]”",
      "❌ Not allowed: “BrainDrive Cloud”",
    ],
  },
  {
    title: "3. You’re Free to Say You’re Powered by BrainDrive",
    intro: undefined,
    can: [
      "Use phrases like “powered by BrainDrive,” “built on BrainDrive,” or “compatible with BrainDrive.”",
      "Share content, tutorials, or tools for the BrainDrive community.",
    ],
    cannot: [
      "Use the BrainDrive name or logo in a way that makes your project look official.",
      "Copy our branding (logo, style, tagline) in ways that cause confusion.",
    ],
    examples: [
      "✅ Allowed: “Powered by BrainDrive” on your plugin site",
      "❌ Not allowed: Using the BrainDrive logo as your app’s icon",
    ],
  },
  {
    title: "4. You Just Can’t Pretend to Be BrainDrive",
    intro: undefined,
    can: [
      "Create and sell awesome stuff.",
      "Join the movement and use the brand respectfully.",
    ],
    cannot: [
      "Use “BrainDrive” in your company or product name without permission.",
      "Imply your offering is officially endorsed, supported, or run by BrainDrive.",
    ],
    examples: [
      "✅ Allowed: “An open-source plugin for BrainDrive”",
      "❌ Not allowed: “The BrainDrive Plugin Marketplace”",
    ],
  },
];

export default function TrademarkPolicy() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-4xl px-6 py-16 text-left text-white sm:py-24">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-accent-secondary)]">
              Protecting Our Promise
            </p>
            <h1 className="header-font text-4xl font-bold sm:text-5xl">
              Trademark Policy
            </h1>
            <p className="text-base text-white/70">
              BrainDrive is a registered trademark of BrainDrive LLC. This
              policy outlines how the brand can be used to protect the integrity
              of our mission while supporting a thriving open ecosystem.
            </p>
          </div>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <p>
              Freedom is one of BrainDrive’s core pillars. That is why our
              software is open-source, free to use, and free to build on—no
              lock-ins, no gatekeepers.
            </p>
            <p>
              So why have a trademark policy at all? Because we want the
              BrainDrive name to represent a clear promise: you own, control,
              and benefit from your AI system. This policy protects that promise.
            </p>
            <p>
              It ensures that when people see “BrainDrive,” they know it is
              aligned with our mission—and not something misleading or off-brand.
              You’re free to build. You’re free to monetize. You’re free to say
              you’re powered by BrainDrive. You just can’t pretend to be
              BrainDrive.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              What You Can (and Can’t) Do
            </h2>
            <p className="text-base leading-relaxed text-white/80">
              BrainDrive is built to empower owners, builders, and entrepreneurs.
              This policy supports that by making sure everyone can use the name
              fairly—without causing confusion or misuse. Below are four key
              freedoms, with examples of what’s allowed and what’s not:
            </p>

            <div className="space-y-8">
              {freedoms.map((freedom) => (
                <section
                  key={freedom.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white/80"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {freedom.title}
                  </h3>
                  {freedom.intro && <p className="mt-2">{freedom.intro}</p>}

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-secondary)]">
                        What You Can Do
                      </h4>
                      <ul className="mt-2 space-y-2 text-sm text-white/75">
                        {freedom.can.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent-secondary)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-[#f87171]">
                        What You Can’t Do
                      </h4>
                      <ul className="mt-2 space-y-2 text-sm text-white/75">
                        {freedom.cannot.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f87171]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-black/30 p-4 text-sm text-white/70">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                      Examples
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {freedom.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <h2 className="text-2xl font-semibold text-white">Policy Updates</h2>
            <p>
              As the BrainDrive ecosystem grows, this policy may need to evolve
              too. If we ever make changes, we will share them clearly—and
              whenever possible, we will seek feedback from the community before
              finalizing updates. Our goal is always to protect the brand and
              support the builders, owners, and entrepreneurs who make BrainDrive
              what it is.
            </p>
          </section>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <h2 className="text-2xl font-semibold text-white">Final Thoughts</h2>
            <p>
              BrainDrive is more than just software—it is a movement built on
              ownership, freedom, empowerment, and sustainability. We created this
              trademark policy not to restrict that movement, but to protect it.
            </p>
            <p>
              If you’re building something on BrainDrive and you’re not sure how to
              describe it, reach out to{" "}
              <Link
                href="mailto:dwaring@braindrive.ai"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)]"
              >
                dwaring@braindrive.ai
              </Link>{" "}
              and we will help.
            </p>
            <p>
              Together, we can grow an open ecosystem that stays free, fair, and
              future-proof.
            </p>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white/75">
              <p className="font-semibold text-white">Thanks for reading!</p>
              <p className="mt-2">Dave Waring</p>
              <p>Co-creator, BrainDrive</p>
              <p>
                <Link
                  href="mailto:dwaring@braindrive.ai"
                  className="text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)]"
                >
                  dwaring@braindrive.ai
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
