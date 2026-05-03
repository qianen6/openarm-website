"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

const copy = {
  en: {
    links: [
      { label: "Products", href: "#products" },
      { label: "Technology", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "About", href: "#contact" },
    ],
    contact: "Join Pre-order",
    toggleLabel: "Switch to Chinese",
    toggleText: "中文",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
  },
  zh: {
    links: [
      { label: "产品", href: "#products" },
      { label: "技术", href: "#features" },
      { label: "价格", href: "#pricing" },
      { label: "关于", href: "#contact" },
    ],
    contact: "加入预售",
    toggleLabel: "切换到英文",
    toggleText: "EN",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单",
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { open: openPreorder } = usePreorder();
  const t = copy[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-canvas/80 backdrop-blur-xl border-b border-line/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20 flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-3" aria-label="OpenArm home">
          <div
            aria-hidden="true"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm"
          >
            O
          </div>
          <span className="text-fg font-bold text-xl tracking-tight">
            OpenArm
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {t.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-fg-subtle hover:text-fg transition-colors text-base"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t.toggleLabel}
            className="px-4 py-2 rounded-lg border border-line bg-white/5 text-fg font-semibold text-base hover:border-cyan-400/40 transition-colors"
          >
            {t.toggleText}
          </button>
          <button
            type="button"
            onClick={openPreorder}
            className="inline-flex px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold text-base hover:opacity-90 transition-opacity"
          >
            {t.contact}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-fg p-2 -mr-2"
          aria-label={menuOpen ? t.menuClose : t.menuOpen}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-canvas/95 backdrop-blur-xl border-b border-line/60"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {t.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-fg-subtle hover:text-fg text-lg"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openPreorder();
                }}
                className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold text-center"
              >
                {t.contact}
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMenuOpen(false);
                }}
                aria-label={t.toggleLabel}
                className="px-6 py-3 rounded-lg border border-line bg-white/5 text-fg font-semibold text-center"
              >
                {t.toggleText}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
