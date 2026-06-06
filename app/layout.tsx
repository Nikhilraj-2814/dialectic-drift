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
  title: {
    default: "Dialectic Drift",
    template: "%s | Dialectic Drift",
  },
  description:
    "Independent Journal of Ideas exploring geopolitics, philosophy, history, technology, and power.",
  keywords: [
    "Dialectic Drift",
    "Geopolitics",
    "Philosophy",
    "History",
    "Technology",
    "Ideas in Motion"
  ],
  openGraph: {
    title: "Dialectic Drift",
    description:
      "Independent Journal of Ideas exploring geopolitics, philosophy, history, technology, and power.",
    type: "website",
    siteName: "Dialectic Drift",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dialectic Drift",
    description:
      "Independent Journal of Ideas exploring geopolitics, philosophy, history, technology, and power.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F14] text-white">{children}</body>
    </html>
  );
}
