import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrainDrive | Cognitive AI Accelerator",
  description:
    "BrainDrive helps product teams turn brain-computer innovations into production-ready experiences.",
  openGraph: {
    title: "BrainDrive | Cognitive AI Accelerator",
    description:
      "Explore BrainDrive, connect with the community, and dive into technical docs.",
    url: "https://braindrive.ai",
    siteName: "BrainDrive",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainDrive | Cognitive AI Accelerator",
    description:
      "Explore BrainDrive, connect with the community, and dive into technical docs.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
