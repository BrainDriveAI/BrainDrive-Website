import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="header-font relative border-b border-white/10 bg-[#111827] sm:h-[60px]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-6 py-3 sm:h-[60px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0">
        <Link href="/" className="flex items-center gap-4" aria-label="BrainDrive home">
          <Image
            src="/braindrive-logo.png"
            alt="BrainDrive"
            width={220}
            height={60}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="nav-font flex items-center gap-6 text-base font-medium text-white/90 sm:h-full">
          <Link href="https://docs.braindrive.ai" className="transition hover:text-white">
            Docs
          </Link>
          <Link href="https://community.braindrive.ai" className="transition hover:text-white">
            Community
          </Link>
        </nav>
      </div>
    </header>
  );
}
