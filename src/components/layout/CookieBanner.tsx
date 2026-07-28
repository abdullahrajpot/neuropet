"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("neuropet-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem("neuropet-cookie-consent", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-card border border-ink-300/60 bg-white p-4 shadow-card md:left-6 md:right-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-sm text-ink-600">
            We use cookies to improve your experience on our site.{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-primary-700 underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="mt-3 rounded-full bg-primary-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-900"
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
