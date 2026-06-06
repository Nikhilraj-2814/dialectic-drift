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
    "Geopolitics",
    "Philosophy",
    "History",
    "Technology",
    "Political Theory",
    "Ideas",
    "Dialectic Drift",
  ],
  openGraph: {
    title: "Dialectic Drift",
    description:
      "Independent Journal of Ideas exploring geopolitics, philosophy, history, technology, and power.",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
