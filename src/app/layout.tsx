import type { Metadata, Viewport } from "next";
import Navigation from "@/components/Navigation";
import { Starfield } from "@/components/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inner Oracle — Go Within, Transform, Become",
  description: "Shadow journal, Tarot, Numerology, Birth Chart, Ouija & esoteric learning. Tools for inner transformation.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Inner Oracle",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#070b14",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased nebula-bg">
        <Starfield />
        <Navigation />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
