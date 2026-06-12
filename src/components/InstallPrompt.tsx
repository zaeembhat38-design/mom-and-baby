"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const dismissed = localStorage.getItem("pwa_install_dismissed");
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa_install_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary-100 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">Install App</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Install MOM & BABY Polyclinic for quick access and offline support
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleInstall}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 text-white text-xs font-medium hover:bg-primary-600 transition-all"
                >
                  <Download size={14} />
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 rounded-xl text-gray-500 text-xs font-medium hover:bg-gray-100 transition-all"
                >
                  Later
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
