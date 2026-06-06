import type { Metadata } from "next";
import "./globals.css";

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
    "Ideas in Motion",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#0B0F14] text-white">{children}</body>
    </html>
  );
}
