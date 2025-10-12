'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header-font relative border-b border-white/10 bg-[#111827] sm:h-[60px]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-6 py-3 sm:h-[60px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0">
        <div className="flex w-full items-center justify-between sm:w-auto sm:justify-start sm:gap-6">
          <Link href="/" className="flex items-center gap-4" aria-label="BrainDrive home" onClick={closeMenu}>
            <Image
              src="/braindrive-logo.png"
              alt="BrainDrive"
              width={220}
              height={60}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white/90 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 sm:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="primary-nav"
          >
            <span className="sr-only">Toggle navigation</span>
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <nav
          id="primary-nav"
          className={`nav-font ${isMenuOpen ? "flex bg-[#0f172a] shadow-lg" : "hidden"} absolute left-0 right-0 top-full z-50 flex-col gap-3 border-t border-white/10 px-6 pb-4 pt-3 text-base font-medium text-white/90 sm:static sm:flex sm:h-full sm:flex-row sm:items-center sm:gap-6 sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none`}
        >
          <Link href="/about" className="transition hover:text-white" onClick={closeMenu}>
            About
          </Link>
          <Link href="https://docs.braindrive.ai" className="transition hover:text-white" onClick={closeMenu}>
            Docs
          </Link>
          <Link href="https://community.braindrive.ai" className="transition hover:text-white" onClick={closeMenu}>
            Community
          </Link>
        </nav>
      </div>
    </header>
  );
}
