"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

const copy = {
  en: {
    links: [
      { label: "Solutions", href: "#features" },
      { label: "Products", href: "#products" },
      { label: "Pricing", href: "#pricing" },
      { label: "Follow Us", href: "#channels" },
      { label: "About Us", href: "#contact" },
    ],
    channelsCta: "Purchase Channels",
    contact: "Pre-order",
    brandBadge: "NVatom",
    toggleLabel: "Switch to Chinese",
    toggleText: "中文",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    coBrand: "NVatom x OpenArm",
  },
  zh: {
    links: [
      { label: "技术", href: "#features" },
      { label: "产品", href: "#products" },
      { label: "价格", href: "#pricing" },
      { label: "购买通道", href: "#channels" },
      { label: "关于", href: "#contact" },
    ],
    channelsCta: "购买通道",
    contact: "加入预售",
    brandBadge: "智谷原子",
    toggleLabel: "切换到英文",
    toggleText: "EN",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单",
    coBrand: "智谷原子 x OpenArm",
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
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 px-3 md:px-6"
    >
      <div
        className={`max-w-7xl mx-auto px-5 lg:px-7 flex items-center justify-between h-16 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? "bg-canvas/80 backdrop-blur-2xl border-line shadow-[0_20px_60px_rgba(0,0,0,0.36)]"
            : "bg-canvas/50 backdrop-blur-xl border-line"
        }`}
      >
        <a href="#" className="flex items-center gap-3" aria-label="Mobile OpenArm X1 home">
          <span className="text-fg font-bold text-xl tracking-tight">OpenArm</span>
          <span className="text-fg-subtle text-sm">×</span>
          <span className="px-3.5 py-1.5 rounded-full border border-cyan-300/30 text-cyan-300 text-sm font-semibold tracking-[0.08em]">
            {t.brandBadge}
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
            className="px-4 py-2 rounded-lg border border-line bg-[rgba(228,224,216,0.04)] text-fg font-semibold text-base hover:border-cyan-400/40 transition-colors"
          >
            {t.toggleText}
          </button>
          <button
            type="button"
            onClick={openPreorder}
            className="primary-cyan-gradient group inline-flex items-center gap-2 px-5 py-2 rounded-full text-canvas font-semibold text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            <span>{t.contact}</span>
            <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-canvas/15 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
              →
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-fg p-3 -mr-2 touch-manipulation"
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
            className="pointer-events-none"
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
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    const id = link.href.replace(/^#/, "");
                    setTimeout(() => {
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 80);
                  }}
                  className="text-fg-subtle hover:text-fg text-lg py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#channels"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setTimeout(() => {
                    document
                      .getElementById("channels")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 80);
                }}
                className="px-6 py-3 rounded-lg border border-line bg-[rgba(228,224,216,0.04)] text-fg font-semibold text-center"
              >
                {t.channelsCta}
              </a>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openPreorder();
                }}
                className="primary-cyan-gradient mt-2 px-6 py-3 rounded-lg text-canvas font-semibold text-center"
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
                className="px-6 py-3 rounded-lg border border-line bg-[rgba(228,224,216,0.04)] text-fg font-semibold text-center"
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
