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
  title: "BrainDrive | Cognitive AI Accelerator",
  description:
    "BrainDrive helps product teams turn brain-computer innovations into production-ready experiences.",
  icons: {
    icon: "/Icon-Logo-Dark-Mode.svg",
  },
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
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${questrial.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Script
          id="convertbox-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(w,d){if(d.getElementById("app-convertbox-script"))return;var s=d.createElement("script");s.id="app-convertbox-script";s.async=true;s.dataset.uuid="559fb9d7-75f7-4652-915d-83c53670adfb";s.src="https://cdn.convertbox.com/convertbox/js/embed.js";d.getElementsByTagName("head")[0].appendChild(s);}(window,document);`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
