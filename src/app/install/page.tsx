'use client';

import type { ReactElement, SVGProps } from "react";
import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const macInstallerLink = "#TODO_ADD_MAC_INSTALLER_URL";
const windowsInstallerLink =
  "https://github.com/BrainDriveAI/BrainDrive-Install-System/releases/latest/download/BrainDriveInstaller-win-x64.exe";
const linuxInstallGuideUrl = "https://docs.braindrive.ai/core/INSTALL";

type OsOption = {
  id: string;
  name: string;
  ctaLabel: string;
  ctaHref: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  openInNewTab?: boolean;
};

const osOptions: OsOption[] = [
  {
    id: "mac",
    name: "macOS",
    ctaLabel: "Download for macOS",
    ctaHref: macInstallerLink,
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
    icon: (props) => (
      <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
        <g fill="none" fillRule="evenodd">
          <ellipse cx="32" cy="18" rx="11" ry="12" fill="#0F172A" />
          <ellipse cx="32" cy="40" rx="16" ry="20" fill="#0F172A" />
          <path
            fill="#F8FAFC"
            d="M32 11c-5.6 0-9.7 4.6-9.7 10.5v1.9c0 1.5-.3 3-1 4.4-2 3.8-3.6 7.9-3.6 12.3C17.7 50.3 24 57 32 57s14.3-6.7 14.3-16.9c0-4.4-1.6-8.5-3.6-12.3-.7-1.4-1-2.9-1-4.4v-1.9C41.7 15.6 37.6 11 32 11Z"
          />
          <path
            fill="#E2E8F0"
            d="M23.1 26.6c-.5 1.4-1.2 2.8-1.9 4.1 2.8 1.1 6.1 1.7 10.8 1.7 4.7 0 8-.6 10.8-1.7-.7-1.3-1.4-2.7-1.9-4.1-1.8 1.1-4.7 1.9-8.9 1.9s-7.1-.8-8.9-1.9Z"
          />
          <path
            fill="#FFFFFF"
            d="M32 10.5c-4.1 0-7.5 3.6-7.5 8.1 0 3.2 1.2 6.2 3.3 8.5h8.4c2.1-2.3 3.3-5.3 3.3-8.5 0-4.5-3.4-8.1-7.5-8.1Z"
          />
          <ellipse cx="27.5" cy="17.5" rx="3.3" ry="3.8" fill="#FFFFFF" />
          <ellipse cx="36.5" cy="17.5" rx="3.3" ry="3.8" fill="#FFFFFF" />
          <ellipse cx="28.3" cy="18.2" rx="1.4" ry="1.7" fill="#0F172A" />
          <ellipse cx="35.7" cy="18.2" rx="1.4" ry="1.7" fill="#0F172A" />
          <circle cx="28.8" cy="17" r=".6" fill="#FFFFFF" opacity=".85" />
          <circle cx="36.2" cy="17" r=".6" fill="#FFFFFF" opacity=".85" />
          <path
            fill="#FDB022"
            d="M26.6 23.5c1.6 1.2 3.5 1.9 5.4 1.9s3.8-.7 5.4-1.9c-1.1-1.9-3.3-3.2-5.4-3.2s-4.3 1.3-5.4 3.2Z"
          />
          <path
            fill="#F79009"
            d="M28.5 27.2c1.1.8 2.4 1.2 3.5 1.2s2.4-.4 3.5-1.2c.2 1.5-.7 3-2.1 3.6a3.6 3.6 0 0 1-2.8 0c-1.3-.6-2.2-2.1-2.1-3.6Z"
          />
          <path
            fill="#FDB022"
            d="M17.4 47.8c-2.6 1-4.3 3.8-3.6 6.6.4 1.9 1.8 3.4 3.6 4.1 2 .8 4.3.8 6.4.2 1.6-.5 2.5-2.3 1.8-3.9-1-2.3-1.9-4.9-3.8-6.1-1.4-.9-3.1-1.2-4.4-.9Z"
          />
          <path
            fill="#FDB022"
            d="M46.6 47.8c-1.3-.3-3 .1-4.4.9-1.9 1.2-2.8 3.8-3.8 6.1-.7 1.6.2 3.4 1.8 3.9 2.1.6 4.4.6 6.4-.2 1.8-.7 3.2-2.2 3.6-4.1.7-2.8-.9-5.6-3.6-6.6Z"
          />
        </g>
      </svg>
    ),
    openInNewTab: true,
  },
  {
    id: "windows",
    name: "Windows",
    ctaLabel: "Download for Windows 11",
    ctaHref: windowsInstallerLink,
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
                        isActive
                          ? "text-white opacity-100"
                          : "text-white/70 opacity-70"
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
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
