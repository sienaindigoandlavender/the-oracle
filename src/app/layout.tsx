import type { Metadata, Viewport } from "next";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Oracle — Peer Beyond the Veil",
  description: "Tarot readings, Numerology, Birth Chart, and Ouija board. Vintage occult divination tools.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "The Oracle",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d0a08",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className="antialiased"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(42,33,24,0.4) 0%, var(--ink) 70%)",
          minHeight: "100dvh",
        }}
      >
        <Navigation />
        <main className="pb-20 sm:pb-6">{children}</main>
      </body>
    </html>
  );
}
