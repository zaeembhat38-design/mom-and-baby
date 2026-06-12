import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "MOM & BABY Polyclinic Handwara",
  description:
    "Premium Maternity & Childcare Healthcare - Gynecology, Pediatrics, Laboratory & Medical Shop in Handwara, Kashmir",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mom & Baby",
  },
};

export const viewport: Viewport = {
  themeColor: "#EC4899",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-background min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
