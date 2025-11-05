import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Questrial } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: ["400"],
});
export const metadata: Metadata = {
  title: "BrainDrive | Your AI. Your Rules.",
  description:
    "BrainDrive is the open source, user-owned alternative to Big Tech AI systems that's easy to own, customize, and monetize.",
  icons: {
    icon: "/Icon-Logo-Dark-Mode.svg",
  },
  openGraph: {
    title: "BrainDrive | Your AI. Your Rules.",
    description:
      "BrainDrive is the open source, user-owned alternative to Big Tech AI systems that's easy to own, customize, and monetize.",
    url: "https://braindrive.ai",
    siteName: "BrainDrive",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainDrive | Your AI. Your Rules.",
    description:
      "BrainDrive is the open source, user-owned alternative to Big Tech AI systems that's easy to own, customize, and monetize.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${questrial.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Script
          id="app-convertbox-script"
          src="https://cdn.convertbox.com/convertbox/js/embed.js"
          strategy="beforeInteractive"
          data-uuid="559fb9d7-75f7-4652-915d-83c53670adfb"
        />
        {children}
      </body>
    </html>
  );
}
