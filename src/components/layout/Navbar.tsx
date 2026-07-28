"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, cn } from "@/components/ui/shared";
import { navLinks, siteConfig } from "@/lib/site-config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-cream/95 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-20 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white">
                <PawPrint className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="font-display text-xl text-primary-900">
                {siteConfig.name}
              </span>
            </Link>

            <ul className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) =>
                link.children ? (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1 font-sans text-sm text-ink-900 transition-colors hover:text-primary-700"
                      aria-expanded={openDropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 8 }
                          }
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full z-50 mt-2 min-w-[280px] rounded-card border border-ink-300/60 bg-white p-2 shadow-card"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-xl px-4 py-3 text-sm text-ink-900 transition-colors hover:bg-primary-100 hover:text-primary-700"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-ink-900 transition-colors hover:text-primary-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <Button href="/book" variant="primary">
                Book a Consultation
              </Button>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 text-primary-900 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-primary-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 right-0 top-0 z-[70] w-[min(100%,320px)] bg-cream p-6 shadow-card lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg text-primary-900">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </div>
              <ul className="space-y-1">
                {navLinks.flatMap((link, i) => {
                  const items = link.children
                    ? link.children.map((child) => (
                        <motion.li
                          key={child.href}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-xl px-3 py-3 text-ink-900 hover:bg-primary-100"
                          >
                            {child.label}
                          </Link>
                        </motion.li>
                      ))
                    : [
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link
                            href={link.href!}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-xl px-3 py-3 text-ink-900 hover:bg-primary-100"
                          >
                            {link.label}
                          </Link>
                        </motion.li>,
                      ];
                  return items;
                })}
              </ul>
              <div className="mt-8">
                <Button href="/book" className="w-full">
                  Book a Consultation
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
