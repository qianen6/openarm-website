"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

const copy = {
  en: {
    eyebrow: "PRE-ORDER",
    title: "Join the OpenArm pre-order group",
    description:
      "Scan the QR code with WeChat to enter our pre-order channel. Founding members get an early-bird price, priority shipment, and direct access to the engineering team.",
    perks: [
      "Early-bird discount (up to 20% off list)",
      "Priority production slot",
      "Direct chat with the engineering team",
      "First access to firmware + SDK previews",
    ],
    qrCaption: "WeChat group · Pre-order channel",
    fallback: "WeChat unavailable? Email us at",
    closeLabel: "Close",
  },
  zh: {
    eyebrow: "预售通道",
    title: "扫码加入 OpenArm 预售群",
    description:
      "用微信扫描下方二维码进入预售群。首批成员可享早鸟价、优先生产档期，并可直接与工程团队对接。",
    perks: [
      "早鸟价（最高 8 折）",
      "优先生产档期",
      "直连工程团队",
      "固件 / SDK 抢先体验",
    ],
    qrCaption: "微信群 · 预售通道",
    fallback: "暂时没有微信？发邮件至",
    closeLabel: "关闭",
  },
};

const SUPPORT_EMAIL = "preorder@openarm.example.com";

export default function GroupModal() {
  const { isOpen, close } = usePreorder();
  const { language } = useLanguage();
  const t = copy[language];
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Body scroll lock + initial focus on the close button.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);
    return () => {
      document.body.style.overflow = previous;
      clearTimeout(focusTimeout);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="preorder-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden overscroll-contain py-6 sm:py-10 px-4"
          role="presentation"
        >
          <div
            className="fixed inset-0 z-0 bg-black/70 backdrop-blur-sm cursor-default"
            onClick={close}
            aria-hidden="true"
          />

          {/* Viewport-fixed close so it stays clickable above long / scrolled content */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label={t.closeLabel}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] w-11 h-11 rounded-full flex items-center justify-center border border-line bg-surface/95 text-fg-subtle hover:text-fg hover:bg-white/10 shadow-lg backdrop-blur-md transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative z-10 flex min-h-[min(100%,calc(100dvh-3rem))] items-center justify-center py-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preorder-modal-title"
            aria-describedby="preorder-modal-description"
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-[480px] rounded-3xl border border-line bg-surface p-7 sm:p-9 pt-12 sm:pt-14 shadow-[0_30px_120px_rgba(0,0,0,0.45)] max-h-[min(90dvh,calc(100dvh-5rem))] overflow-y-auto"
            >
              <p className="text-cyan-400 font-mono text-xs tracking-[3px] uppercase">
                {t.eyebrow}
              </p>
              <h2
                id="preorder-modal-title"
                className="mt-2 text-2xl sm:text-3xl font-bold text-fg leading-tight"
              >
                {t.title}
              </h2>
              <p
                id="preorder-modal-description"
                className="mt-3 text-fg-muted text-sm sm:text-base leading-relaxed"
              >
                {t.description}
              </p>

              <div className="mt-6 flex flex-col items-center">
                <div className="relative w-[220px] h-[220px] rounded-2xl overflow-hidden border border-line bg-white p-3">
                  <Image
                    src="/images/wechat-qr-group.png"
                    alt={t.qrCaption}
                    fill
                    sizes="220px"
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-fg-subtle text-xs font-mono tracking-[2px] uppercase">
                  {t.qrCaption}
                </p>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-2">
                {t.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2.5 text-sm text-fg-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"
                    />
                    {perk}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-fg-subtle text-center">
                {t.fallback}{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-cyan-400 hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
