"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

const copy = {
  en: {
    eyebrow: "PRE-ORDER NOW",
    title: "Reserve your slot in the first batch.",
    description:
      "Founding members get early-bird pricing, priority production, and a direct line to the engineering team. Scan into the WeChat group to claim a slot.",
    primaryCta: "Scan to Join Pre-order Group",
    secondaryCta: "Email Sales",
  },
  zh: {
    eyebrow: "首批预售开启",
    title: "锁定首批名额。",
    description:
      "创始会员享早鸟价、优先生产档期，并可直连工程团队。扫码进入预售群即可锁定名额。",
    primaryCta: "扫码进入预售群",
    secondaryCta: "邮件咨询销售",
  },
};

export default function CTASection() {
  const { language } = useLanguage();
  const { open: openPreorder } = usePreorder();
  const t = copy[language];

  return (
    <section
      id="contact"
      className="relative bg-canvas py-28 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-canvas-2 via-transparent to-transparent opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-400/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-violet-500/6 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] left-[8%] w-[700px] h-[3px] bg-gradient-to-r from-cyan-400/30 to-transparent rotate-[6deg] blur-[30px]" />
        <div className="absolute top-[55%] right-[3%] w-[900px] h-[2px] bg-gradient-to-l from-violet-500/25 to-transparent -rotate-[4deg] blur-[25px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-cyan-400 font-mono text-sm tracking-[3px] mb-4"
        >
          {t.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-fg via-cyan-300 to-fg bg-clip-text text-transparent"
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg text-fg-subtle leading-relaxed max-w-xl mx-auto"
        >
          {t.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            type="button"
            onClick={openPreorder}
            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,191,255,0.25)]"
          >
            {t.primaryCta}
          </button>
          <a
            href="mailto:sales@openarm.example.com?subject=Sales%20Inquiry"
            className="px-8 py-3.5 rounded-lg border border-line bg-white/5 text-fg font-medium hover:border-line-strong transition-colors text-center"
          >
            {t.secondaryCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
