"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

const copy = {
  en: {
    badge: "Pre-order Now · Limited First Batch",
    headlinePrefix: "Redefining the Future of",
    headlineHighlight: "Intelligent Robotics",
    subtitle:
      "Build, deploy, and scale autonomous robotic systems with cutting-edge AI. From industrial automation to collaborative humanoid partners.",
    primaryCta: "Join Pre-order Group",
    secondaryCta: "Explore Products",
    imageAlt: "OpenArm TeleBot",
  },
  zh: {
    badge: "首批预售 · 名额有限",
    headlinePrefix: "重新定义",
    headlineHighlight: "智能机器人未来",
    subtitle:
      "用前沿 AI 构建、部署并规模化自主机器人系统，覆盖工业自动化、科研验证和协作式人形伙伴。",
    primaryCta: "加入预售群",
    secondaryCta: "查看产品详情",
    imageAlt: "OpenArm 远程操作机器人",
  },
};

export default function HeroSection() {
  const { language } = useLanguage();
  const { open } = usePreorder();
  const t = copy[language];
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = (delay: number) =>
    prefersReducedMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-canvas">
      <div
        aria-hidden="true"
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/8 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-40 left-1/4 w-[600px] h-[300px] bg-cyan-400/6 rounded-full blur-[100px] pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="absolute top-[20%] -left-10 w-[600px] h-[3px] bg-cyan-400/30 rotate-[8deg] blur-[40px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-[40%] right-0 w-[800px] h-[4px] bg-violet-500/25 -rotate-[5deg] blur-[50px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-[60%] left-[20%] w-[500px] h-[2px] bg-cyan-300/20 rotate-[12deg] blur-[35px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <motion.div
          {...fadeIn(0.2)}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-line bg-white/5 mb-8"
        >
          <span aria-hidden="true" className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-base font-mono tracking-wide">
            {t.badge}
          </span>
        </motion.div>

        <motion.h1
          {...fadeIn(0.4)}
          className="text-5xl md:text-7xl font-extrabold text-center text-fg leading-[1.1] max-w-4xl"
        >
          {t.headlinePrefix}{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            {t.headlineHighlight}
          </span>
        </motion.h1>

        <motion.p
          {...fadeIn(0.6)}
          className="mt-6 text-xl text-fg-muted text-center max-w-2xl leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        <motion.div {...fadeIn(0.8)} className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={open}
            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-white text-base font-semibold hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,191,255,0.25)]"
          >
            {t.primaryCta}
          </button>
          <a
            href="#products"
            className="px-8 py-3.5 rounded-lg border border-line bg-white/5 text-fg text-base font-medium hover:border-line-strong transition-colors text-center"
          >
            {t.secondaryCta}
          </a>
        </motion.div>

        <motion.div
          {...(prefersReducedMotion
            ? { initial: false, animate: { opacity: 1 } }
            : {
                initial: { opacity: 0, y: 40, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { duration: 1, delay: 1 },
              })}
          className="mt-16 relative w-full max-w-4xl"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cyan-400/10 blur-[80px] rounded-full pointer-events-none"
          />
          <div className="relative rounded-2xl overflow-hidden border border-line shadow-[0_0_80px_rgba(0,191,255,0.1)]">
            <Image
              src="/images/robot-hero.jpg"
              alt={t.imageAlt}
              width={1200}
              height={672}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
