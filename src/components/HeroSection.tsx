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
    <section className="relative min-h-[100dvh] overflow-hidden bg-canvas pt-28">
      <div aria-hidden="true" className="mesh-ambient" />
      <div aria-hidden="true" className="tech-grid" />
      <div aria-hidden="true" className="scanline-overlay" />
      <div
        aria-hidden="true"
        className="absolute top-16 left-[15%] w-[560px] h-[340px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 right-[8%] w-[600px] h-[300px] bg-cyan-400/8 rounded-full blur-[100px] pointer-events-none"
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] gap-10 items-center min-h-[calc(100dvh-8rem)]">
          <div>
            <motion.div
              {...fadeIn(0.2)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-line bg-white/5 mb-8"
            >
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 text-sm font-mono tracking-[0.18em] uppercase">
                {t.badge}
              </span>
            </motion.div>

            <motion.h1
              {...fadeIn(0.4)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-fg leading-[1.03] max-w-3xl"
            >
              {t.headlinePrefix}{" "}
              <span className="text-cyan-300">{t.headlineHighlight}</span>
            </motion.h1>

            <motion.p
              {...fadeIn(0.6)}
              className="mt-6 text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed"
            >
              {t.subtitle}
            </motion.p>

            <motion.div {...fadeIn(0.8)} className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={open}
                className="group inline-flex items-center justify-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 text-canvas text-base font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              >
                <span>{t.primaryCta}</span>
                <span className="w-7 h-7 rounded-full bg-canvas/15 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  →
                </span>
              </button>
              <a
                href="#products"
                className="px-8 py-3 rounded-full border border-line bg-white/5 text-fg text-base font-medium hover:border-cyan-400/40 transition-colors text-center"
              >
                {t.secondaryCta}
              </a>
            </motion.div>
          </div>

          <motion.div
            {...(prefersReducedMotion
              ? { initial: false, animate: { opacity: 1 } }
              : {
                  initial: { opacity: 0, y: 36, scale: 0.96 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 0.9, delay: 0.7 },
                })}
            className="relative"
          >
            <div className="rounded-[2rem] p-1.5 bg-white/[0.02] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              <div className="rounded-[1.6rem] overflow-hidden">
                <Image
                  src="/images/openarm-dualbattery-kk.png"
                  alt={t.imageAlt}
                  width={1080}
                  height={1080}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="w-full h-auto object-contain bg-gradient-to-b from-[#f4f6fb] to-[#dfe4ee] p-4 md:p-8"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
