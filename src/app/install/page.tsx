'use client';

import type { SVGProps } from "react";
import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const macInstallerLink = "#TODO_ADD_MAC_INSTALLER_URL";
const windowsInstallerLink = "#TODO_ADD_WINDOWS_INSTALLER_URL";
const linuxInstallGuideUrl = "https://docs.braindrive.ai/core/INSTALL";

type OsOption = {
  id: string;
  name: string;
  ctaLabel: string;
  ctaHref: string;
  requirement: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  openInNewTab?: boolean;
};

const osOptions: OsOption[] = [
  {
    id: "mac",
    name: "macOS",
    ctaLabel: "Download for macOS",
    ctaHref: macInstallerLink,
    requirement: "Requires macOS 13 Ventura or later",
    icon: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path
          d="M16.74 2.08c-.96.06-2.09.69-2.75 1.5-.6.74-1.13 1.86-.94 2.94 1.07.08 2.17-.54 2.84-1.35.62-.74 1.08-1.85.85-3.09Zm2.06 8.11c-1.53-.09-2.83.87-3.55.87-.73 0-1.87-.83-3.07-.8-1.58.03-3.02.92-3.84 2.34-1.64 2.83-.42 7 1.17 9.31.78 1.12 1.72 2.38 2.95 2.33 1.16-.05 1.6-.75 3-.75 1.4 0 1.79.75 3.03.72 1.25-.02 2.04-1.14 2.8-2.28.87-1.33 1.22-2.5 1.24-2.56-.03-.02-2.37-.91-2.4-3.58-.02-2.24 1.83-3.3 1.91-3.36-1-.47-2.03-.68-2.23-.73Z"
          className="fill-current"
        />
      </svg>
    ),
  },
  {
    id: "linux",
    name: "Linux",
    ctaLabel: "Open Linux install guide",
    ctaHref: linuxInstallGuideUrl,
    requirement: "Opens docs.braindrive.ai",
    icon: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path
          d="M12 2c-1.2 0-2.31.78-2.79 1.9-.26.62-.27 1.31-.2 1.98.07.72.27 1.53.27 2.33-.01 1.15-.38 2.3-.93 3.3-.83 1.51-2.35 2.68-2.35 4.54 0 2.34 1.75 4.95 4.06 4.95.44 0 .96-.17 1.49-.34.44-.14.89-.28 1.45-.28.53 0 .98.14 1.42.28.53.17 1.03.34 1.47.34 2.31 0 4.06-2.61 4.06-4.95 0-1.86-1.51-3.03-2.34-4.54-.55-1-1-2.15-.99-3.3 0-.8.2-1.61.27-2.33.07-.67.06-1.36-.2-1.98C14.31 2.78 13.2 2 12 2Zm-2.45 9.08c.75 0 1.21.99 1.21 1.56 0 .59-.57 1.51-1.33 1.51-.69 0-1.23-.84-1.23-1.54 0-.72.62-1.53 1.35-1.53Zm4.89 0c.73 0 1.35.81 1.35 1.53 0 .7-.54 1.54-1.23 1.54-.76 0-1.33-.92-1.33-1.51 0-.57.46-1.56 1.21-1.56Z"
          className="fill-current"
        />
      </svg>
    ),
    openInNewTab: true,
  },
  {
    id: "windows",
    name: "Windows",
    ctaLabel: "Download for Windows",
    ctaHref: windowsInstallerLink,
    requirement: "Requires Windows 10 21H2 or later",
    icon: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path
          d="M3 4.5 11 3v7H3zm0 8H11v7L3 18zm10-9 8-1.4v8.9h-8zm0 9.4h8V22L13 20.6Z"
          className="fill-current"
        />
      </svg>
    ),
  },
];

export default function InstallPage() {
  const [activeOs, setActiveOs] = useState<string>(osOptions[0].id);
  const selectedOption =
    osOptions.find((option) => option.id === activeOs) ?? osOptions[0];

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 -z-20 bg-[#0b162f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(37,194,160,0.22),rgba(11,22,47,0.1))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(53,120,229,0.35),rgba(11,22,47,0))]" />

      <SiteHeader />

      <main className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 pb-24 pt-12 sm:pt-24">
        <section className="text-center">
          <p className="text-sm uppercase tracking-wide text-white/70">
            Download BrainDrive
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Pick your operating system
          </h1>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {osOptions.map((option) => {
                const Icon = option.icon;
                const isActive = option.id === activeOs;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveOs(option.id)}
                    className={`flex h-24 w-28 flex-col items-center justify-center rounded-3xl border text-sm font-medium text-white transition ${
                      isActive
                        ? "border-white bg-white/10 shadow-[0_10px_30px_rgba(8,15,30,0.55)]"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon
                      className={`mb-3 h-8 w-8 ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                    />
                    <span>{option.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-2">
              <a
                href={selectedOption.ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-10 py-4 text-base font-semibold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                target={selectedOption.openInNewTab ? "_blank" : undefined}
                rel={selectedOption.openInNewTab ? "noreferrer" : undefined}
              >
                {selectedOption.ctaLabel}
              </a>
              <span className="text-sm text-white/70">
                {selectedOption.requirement}
              </span>
            </div>
          </div>
        </section>

        <section>
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_20px_50px_rgba(5,10,25,0.45)]">
            <h2 className="text-2xl font-semibold text-white">
              System requirements
            </h2>
            <p className="mt-3 text-sm text-white/70">
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
                <h3 className="text-lg font-semibold text-white">
                  Windows
                </h3>
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
