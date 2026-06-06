import type { Metadata } from "next";
import "./globals.css";

const siteDescription =
  "An independent digital publication of long-form essays on power, history, philosophy, geopolitics, technology, and public life.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dialecticdrift.com"),
  title: {
    default: "Dialectic Drift",
    template: "%s | Dialectic Drift",
  },
  description: siteDescription,
  keywords: [
    "Dialectic Drift",
    "Geopolitics",
    "Philosophy",
    "History",
    "Technology",
    "Essays",
    "Digital publication",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dialectic Drift",
    description: siteDescription,
    type: "website",
    url: "/",
    siteName: "Dialectic Drift",
    images: [{ url: "/logo.png", alt: "Dialectic Drift" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dialectic Drift",
    description: siteDescription,
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#0b0f14] font-body text-white">{children}</body>
    </html>
  );
}
