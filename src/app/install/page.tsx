import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const macInstallerLink = "#TODO_ADD_MAC_INSTALLER_URL";
const windowsInstallerLink = "#TODO_ADD_WINDOWS_INSTALLER_URL";
const cliReferenceUrl = "https://docs.braindrive.ai/core/INSTALL";
const supportUrl = "https://docs.braindrive.ai/support";
const communityUrl = "https://braindrive.ai/community";
const adminGuideUrl = "#TODO_ADD_ADMIN_DEPLOYMENT_CHECKLIST_URL";

export default function InstallPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <SiteHeader />

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-6 pb-24 pt-12 sm:pt-16">
        <section className="text-center text-white">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-white/70">
              Install BrainDrive
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Install BrainDrive in minutes
            </h1>
            <p className="subheader-font mx-auto max-w-3xl text-base font-medium text-white/80 sm:text-lg">
              Choose the one-click desktop installer for macOS or Windows, or
              stay with the command line setup. Either way, you will be up and
              running in just a few minutes.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={macInstallerLink}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(53,120,229,0.35)] transition hover:brightness-110"
            >
              Download for macOS
              <span className="text-xs font-normal uppercase text-white/80">
                (link pending)
              </span>
            </a>
            <a
              href={windowsInstallerLink}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-secondary)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Download for Windows
              <span className="text-xs font-normal uppercase text-white/80">
                (link pending)
              </span>
            </a>
            <Link
              href="#cli-install"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent-secondary)] hover:text-[var(--color-accent-secondary)]"
            >
              Prefer the CLI? Jump to commands
              <span aria-hidden className="text-lg">
                ↓
              </span>
            </Link>
          </div>
        </section>

        <section className="grid gap-6 text-white md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-[0_20px_50px_rgba(14,35,65,0.25)]">
            <p className="text-xs uppercase tracking-wide text-white/70">
              Option 1
            </p>
            <h2 className="mt-1 text-2xl font-semibold">One-click installers</h2>
            <p className="mt-3 text-sm text-white/80">
              Download the desktop installer, sign in, and BrainDrive handles
              the setup. Recommended for most teams who want a guided
              experience.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/80">
              <p className="font-semibold text-white">
                What you&apos;ll need from us:
              </p>
              <ul className="space-y-2">
                <li>• macOS installer URL (DMG or PKG)</li>
                <li>• Windows installer URL (EXE or MSI)</li>
                <li>• SHA256 checksum for each build</li>
                <li>• Confirmed OS support matrix</li>
                <li>• Optional: screenshots or quickstart video</li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_50px_rgba(14,35,65,0.15)]">
            <p className="text-xs uppercase tracking-wide text-white/70">
              Option 2
            </p>
            <h2 className="mt-1 text-2xl font-semibold">Command-line setup</h2>
            <p className="mt-3 text-sm text-white/80">
              Keep the familiar scripted workflow for automation or power users.
              We&apos;ll surface the curl, Homebrew, and PowerShell paths
              alongside prerequisites.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/80">
              <p className="font-semibold text-white">
                Still needed to finalize:
              </p>
              <ul className="space-y-2">
                <li>• Final CLI script URLs for each platform</li>
                <li>• Notes on any environment variables or flags</li>
                <li>• Link to CLI reference documentation</li>
                <li>• Troubleshooting steps for common failures</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-10 text-white">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-[0_20px_40px_rgba(14,35,65,0.2)]">
            <h2 className="text-2xl font-semibold">Inside the installers</h2>
            <p className="mt-3 text-sm text-white/80">
              This section will reassure new users about what the installers do
              on their machine. Replace the placeholder bullets below when the
              flow is finalized.
            </p>
            <ul className="mt-6 grid gap-4 text-sm text-white/80 md:grid-cols-2">
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                Guided sign-in and workspace linking (confirm copy)
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                Automated service install &amp; launch (list background agents)
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                Menu bar / system tray controls (mention capabilities)
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                Auto-update channel with release notes (confirm cadence)
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_40px_rgba(14,35,65,0.18)]">
            <h2 className="text-2xl font-semibold">System requirements</h2>
            <p className="mt-3 text-sm text-white/80">
              Replace the placeholder copy below once OS support and hardware
              minimums are confirmed.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">macOS</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>• macOS version: TODO (e.g., Monterey 12.6+)</li>
                  <li>• Architecture: TODO (Apple Silicon? Intel?)</li>
                  <li>• Disk space: TODO MB free</li>
                  <li>• Network: HTTPS to *.braindrive.ai ports (confirm)</li>
                  <li>• Permissions: Admin rights? (confirm)</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">Windows</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>• Windows version: TODO (e.g., 10 21H2+)</li>
                  <li>• Architecture: TODO (x64? ARM? confirm)</li>
                  <li>• Disk space: TODO MB free</li>
                  <li>• Network: HTTPS to *.braindrive.ai ports (confirm)</li>
                  <li>• Permissions: Needs admin during install? (confirm)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_40px_rgba(14,35,65,0.18)]">
            <h2 className="text-2xl font-semibold">Verify your download</h2>
            <p className="mt-3 text-sm text-white/80">
              Once filenames and checksums are final, replace the placeholders
              below.
            </p>
            <div className="mt-6 space-y-4 text-sm text-white/80">
              <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-white">
                  macOS installer checksum
                </span>
                <code className="rounded-lg bg-black/40 px-3 py-2 text-xs text-[var(--color-accent)]">
                  TBD_MACOS_SHA256
                </code>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-white">
                  Windows installer checksum
                </span>
                <code className="rounded-lg bg-black/40 px-3 py-2 text-xs text-[var(--color-accent)]">
                  TBD_WINDOWS_SHA256
                </code>
              </div>
              <p>
                Provide instructions on generating a checksum (
                <span className="text-white">shasum -a 256</span> /
                <span className="text-white">Get-FileHash</span>) and where to
                compare it.
              </p>
            </div>
          </div>
        </section>

        <section id="cli-install" className="space-y-10 text-white">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_40px_rgba(14,35,65,0.18)]">
            <h2 className="text-2xl font-semibold">Command-line installation</h2>
            <p className="mt-3 text-sm text-white/80">
              The commands below use placeholder script locations. Update them
              with the final URLs and flags before launch.
            </p>
            <div className="mt-6 space-y-6 text-left">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  macOS &amp; Linux (curl)
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Placeholder script URL to replace with the production installer
                  script.
                </p>
                <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-white">
                  <code>{`curl -fsSL https://braindrive.ai/TODO/install.sh | bash`}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  macOS (Homebrew)
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Confirm tap name and formula before publishing.
                </p>
                <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-white">
                  <code>{`brew install braindrive/tap/braindrive\nbraindrive login`}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Windows (PowerShell)
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Replace with signed script location. Mention execution policy
                  requirements if any.
                </p>
                <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-white">
                  <code>{`iwr https://braindrive.ai/TODO/install.ps1 -UseBasicParsing | iex`}</code>
                </pre>
              </div>
            </div>
            <div className="mt-6 text-sm text-white/80">
              <p>
                Document environment variables, advanced flags, or offline
                install steps as needed. Link the CLI reference once it is ready.
              </p>
              <p className="mt-3">
                <a
                  href={cliReferenceUrl}
                  className="font-semibold text-[var(--color-accent)] transition hover:text-white"
                >
                  Placeholder CLI reference link
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_40px_rgba(14,35,65,0.18)]">
            <h2 className="text-2xl font-semibold">Before you install</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                • BrainDrive account required (link signup once confirmed).
              </li>
              <li>
                • Ensure you have rights to install software on the target
                device.
              </li>
              <li>
                • Confirm firewall / proxy rules (provide ports and hostnames).
              </li>
              <li>
                • Review release notes (link to changelog when ready).
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_40px_rgba(14,35,65,0.18)]">
            <h2 className="text-2xl font-semibold">Need help?</h2>
            <p className="mt-3 text-sm text-white/80">
              Direct users to the support surfaces you prefer. Replace links
              with final destinations.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a
                href={supportUrl}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-semibold text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Support Center (placeholder)
              </a>
              <a
                href={communityUrl}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-semibold text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Community chat (placeholder)
              </a>
              <a
                href="mailto:hello@braindrive.ai?subject=BrainDrive%20Install%20Help"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-semibold text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Email support
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 text-white shadow-[0_20px_40px_rgba(14,35,65,0.18)]">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div>
              <h2 className="text-lg font-semibold">
                Rolling BrainDrive out to your team?
              </h2>
              <p className="text-sm text-white/80">
                Link a deployment checklist or release note once it&apos;s
                published.
              </p>
            </div>
            <a
              href={adminGuideUrl}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Admin deployment checklist (placeholder)
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
