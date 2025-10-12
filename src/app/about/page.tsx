import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "About | BrainDrive",
  description:
    "Learn about BrainDrive's mission to build a superior user-owned alternative to Big Tech AI systems.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-4xl px-6 py-16 text-white sm:py-24">
        <div className="space-y-12">
          <header className="space-y-4 text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-accent-secondary)]">
              The Future of AI is User-Owned
            </p>
            <h1 className="header-font text-4xl font-bold sm:text-5xl">
              About BrainDrive
            </h1>
          </header>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <p>
              Our mission is to build a superior <strong>user-owned</strong>{" "}
              alternative to Big Tech AI systems.
            </p>
            <div className="space-y-3">
              <p>A user-owned AI system built on the following pillars:</p>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  <strong>Ownership</strong> - You own your AI system.
                </li>
                <li>
                  <strong>Freedom</strong> - Your AI system is not restricted.
                </li>
                <li>
                  <strong>Empowerment</strong> - Your AI system is easy to use,
                  customize, and build on.
                </li>
                <li>
                  <strong>Sustainability</strong> - Your AI system is financed
                  via value creation, not platform lock-in.
                </li>
              </ol>
            </div>
          </section>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <h2 className="text-2xl font-semibold text-white">Why this mission?</h2>
            <p>
              We lost control of our digital data and knowledge to Big Tech in
              the last phase of the internet, and they have used that control to:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Share our data without our permission</li>
              <li>Earn hundreds of billions by selling our data to advertisers</li>
              <li>Suppress free speech</li>
            </ul>
            <p>
              Big Tech AI platforms like ChatGPT are putting this trend on
              steroids.
            </p>
          </section>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <h2 className="text-2xl font-semibold text-white">
              If we continue using Big Tech platforms it will mean:
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Less Privacy</strong> - They will control our digital
                data and knowledge
              </li>
              <li>
                <strong>Less Freedom</strong> - They will decide what we can and
                cannot do with AI
              </li>
              <li>
                <strong>Less Wealth</strong> - They will be the primary
                beneficiaries of AI wealth creation
              </li>
            </ul>
          </section>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <h2 className="text-2xl font-semibold text-white">
              If we use an AI platform we own and control it will mean:
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>More Privacy</strong> - We will control our digital data
                and knowledge
              </li>
              <li>
                <strong>More Freedom</strong> - We will decide what we do with AI
              </li>
              <li>
                <strong>More Wealth</strong> - We will be the primary
                beneficiaries of AI wealth creation
              </li>
            </ul>
          </section>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <h2 className="text-2xl font-semibold text-white">How we do it</h2>
            <div className="space-y-4">
              <article className="space-y-3">
                <h3 className="text-xl font-semibold text-white">
                  1) An Open, User-Owned Foundation
                </h3>
                <p>
                  A foundation that provides user ownership and control over the
                  five primary components of any AI system:
                </p>
                <ol className="list-decimal space-y-2 pl-6">
                  <li>
                    <strong>The interface</strong> - How you interact with your
                    AI system
                  </li>
                  <li>
                    <strong>The memory</strong> - Your conversation history and
                    how it is stored and retrieved
                  </li>
                  <li>
                    <strong>The intelligence</strong> - The AI models you use
                  </li>
                  <li>
                    <strong>The hosting</strong> - Where your AI system lives
                  </li>
                  <li>
                    <strong>The connections</strong> - How your AI system connects
                    with other systems and tools
                  </li>
                </ol>
                <p>
                  This foundation must be permissionless and easy to build on.
                </p>
              </article>

              <article className="space-y-3">
                <h3 className="text-xl font-semibold text-white">
                  2) Open, Community-Driven Innovation
                </h3>
                <p>
                  Once we own the foundation, we can build an open community on
                  top of that open foundation. An open community that drives
                  innovation for ourselves, instead of for Big Tech companies.
                </p>
                <p>
                  Big Tech is huge, but there is far more capital and talent
                  outside Big Tech than within it. Individuals will be far more
                  motivated to build, innovate, and connect on a platform they
                  own and control. This will allow us to drive more innovation
                  and, as a result, a superior, open alternative to Big Tech's
                  closed AI systems.
                </p>
              </article>

              <article className="space-y-3">
                <h3 className="text-xl font-semibold text-white">
                  3) Open, Free Market Economy
                </h3>
                <p>
                  Big Tech is not competing in the free market. They have
                  captured the digital economy by building a network effect on
                  their closed platforms.
                </p>
                <p>
                  An open, user-owned foundation and community are the key to
                  unlocking the door to these closed platforms. Once open,
                  capital and talent will flow from Big Tech&apos;s extractive
                  systems to ones where creators capture the value they
                  generate.
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <h2 className="text-2xl font-semibold text-white">
              How BrainDrive Fits
            </h2>
            <p>
              We are not starting from zero in this fight. The open source
              community is making real progress across all the components needed
              for a superior user-owned alternative to Big Tech AI systems.
            </p>
            <p>
              It is just that no one has brought it all together in a manner
              that is easy for the average person to use, customize, and build
              on. That is what BrainDrive is working to do.
            </p>
            <p>
              To make it easy for anyone to build, control, and benefit from
              their own AI system. And to participate along with the rest of the
              open source community in building a superior, open alternative to
              Big Tech's closed systems.
            </p>
          </section>

          <section className="space-y-6 text-base leading-relaxed text-white/80">
            <h2 className="text-2xl font-semibold text-white">Join Us</h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>
                <Link
                  href="https://docs.braindrive.ai/core/INSTALL/"
                  className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)]"
                >
                  Install
                </Link>{" "}
                BrainDrive-Core, the user-owned foundation of your AI system.
              </li>
              <li>
                <Link
                  href="https://community.braindrive.ai/"
                  className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)]"
                >
                  Join
                </Link>{" "}
                the BrainDrive Community
              </li>
              <li>
                <Link
                  href="https://docs.braindrive.ai/core/CONTRIBUTING"
                  className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)]"
                >
                  Contribute
                </Link>{" "}
                to the BrainDrive open source project
              </li>
            </ul>
            <p className="text-lg font-semibold text-white">Your AI. Your Rules.</p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
