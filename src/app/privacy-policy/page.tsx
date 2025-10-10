import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "Privacy Policy | BrainDrive",
  description:
    "BrainDrive Privacy Policy describing how we collect, use, and protect your information.",
};

const sections = [
  {
    heading: "1. No AI Data Collection",
    body: [
      "BrainDrive is a local-first AI system. The AI runs on your computer—not ours. We do not:",
      [
        "Collect or access your conversations with the AI",
        "Store your files, preferences, or usage patterns",
        "Analyze your activity for product improvement",
      ],
      "Your AI system is yours. So is your data. We never touch it.",
    ],
  },
  {
    heading: "2. Email Addresses We Collect",
    body: [
      "We collect your email address only when you:",
      [
        "Sign up for our newsletter",
        "Join the community",
        "Request early access or product updates",
      ],
      "We use it to:",
      [
        "Send occasional updates or important news",
        "Give you access to BrainDrive community features",
        "Respond to support requests",
      ],
      "You can unsubscribe any time using the link in our emails, or by emailing us at dwaring@braindrive.ai.",
    ],
  },
  {
    heading: "3. Third-Party Services",
    body: [
      "We keep third-party tools to a minimum. When we do use them, they are chosen carefully.",
      "Examples include:",
      ["Email tools to manage newsletters", "Community platforms for discussions"],
      "These services only receive your email address. They do not get your AI data, and we never sell or share your email with advertisers.",
      "No selling. No sharing. No surveillance. Just your email, for your use.",
    ],
  },
  {
    heading: "4. Cookies and Tracking",
    body: [
      "We do not use cookies or tracking scripts to monitor your behavior across the web.",
      "If we ever add basic analytics to improve our website, we will:",
      ["Use privacy-respecting tools", "Anonymize all data"],
    ],
  },
  {
    heading: "5. Data Retention",
    body: [
      "We keep your email address only as long as needed to provide the services you have requested.",
      "If you leave the community or unsubscribe, we will delete your data upon request. To request deletion, email us at dwaring@braindrive.ai.",
    ],
  },
  {
    heading: "6. Your Rights",
    body: [
      "Depending on where you live, you may have rights under laws like the GDPR or CCPA, including:",
      ["Accessing your personal data", "Correcting or deleting your data", "Opting out of communications"],
      "We respect these rights no matter where you live. Reach out—we will make it right.",
    ],
  },
  {
    heading: "7. Data Security",
    body: [
      "We use industry-standard safeguards to protect any data we do collect, including:",
      ["Secure storage", "Limited access", "Routine audits of our systems"],
    ],
  },
  {
    heading: "8. Jurisdiction and Compliance",
    body: [
      "BrainDrive LLC is based in Newark, Delaware, USA. We operate under U.S. law and strive to comply with GDPR and CCPA where applicable.",
    ],
  },
  {
    heading: "9. Changes to This Policy",
    body: [
      'If we make changes to this Privacy Policy, we will update the "Last Updated" date above. For major updates, we will notify subscribers directly.',
    ],
  },
  {
    heading: "10. Contact Us",
    body: [
      "Got questions, concerns, or want your data deleted?",
      "Email: dwaring@braindrive.ai",
      "Address: BrainDrive LLC, 131 Continental Dr., Suite 305, Newark, DE 19713",
    ],
  },
];

export default function PrivacyPolicy() {
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
              The Future of AI is Personal
            </p>
            <h1 className="header-font text-4xl font-bold sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-white/70">Last updated: 3/25/25</p>
          </div>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <p>
              At BrainDrive, your privacy is not a feature—it is a foundation.
              We believe your AI system should serve you and only you. That is
              why BrainDrive runs entirely on your device. Your data stays with
              you. We do not want it, and we cannot access it even if we did.
            </p>
            <p>
              Here is what we do—and do not—collect, and how we handle the
              minimal information we store.
            </p>
          </section>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-base leading-relaxed text-white/80">
                  {section.body.map((paragraph, idx) => {
                    if (Array.isArray(paragraph)) {
                      return (
                        <ul
                          key={`${section.heading}-list-${idx}`}
                          className="list-disc space-y-2 pl-6"
                        >
                          {paragraph.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={`${section.heading}-p-${idx}`}>{paragraph}</p>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white/80">
            <h2 className="text-xl font-semibold text-white">Bottom line</h2>
            <p className="mt-3">
              BrainDrive is built on a simple promise: your AI, your rules. Our
              privacy policy is more than legalese—it is philosophical.
            </p>
          </section>

          <p className="text-sm text-white/60">
            Looking for more details?{" "}
            <Link
              href="mailto:dwaring@braindrive.ai"
              className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)]"
            >
              Email us
            </Link>{" "}
            and we will get back to you quickly.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
