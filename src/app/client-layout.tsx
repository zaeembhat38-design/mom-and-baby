"use client";

import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/InstallPrompt";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="pt-16 min-h-screen">{children}</main>
      <Footer />
      <InstallPrompt />
    </AuthProvider>
  );
}
