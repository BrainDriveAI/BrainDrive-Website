import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 text-sm text-white/70 md:grid-cols-3 md:gap-12">
        <nav className="space-y-3 text-base">
          <Link
            href="/"
            className="block underline decoration-white/40 underline-offset-4 transition hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/trademark-policy"
            className="block underline decoration-white/40 underline-offset-4 transition hover:text-white"
          >
            Trademark Policy
          </Link>
          <Link
            href="/privacy-policy"
            className="block underline decoration-white/40 underline-offset-4 transition hover:text-white"
          >
            Privacy Policy
          </Link>
        </nav>

        <div className="space-y-2 text-base text-white">
          <p className="font-semibold">BrainDrive, LLC</p>
          <address className="not-italic leading-7 text-white/80">
            131 Continental Dr.
            <br />
            Suite 305
            <br />
            Newark, DE 19713
          </address>
          <p className="text-white/60">
            © {new Date().getFullYear()} BrainDrive. All rights reserved.
          </p>
        </div>

        <div className="text-base text-white/80">
          <p>
            We&apos;re on a mission to build a superior, user-owned alternative
            to Big Tech AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
