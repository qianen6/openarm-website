"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/site";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

const copy = {
  en: {
    headline: "Personal Robot PR X1\nA Smart Family Member",
    subtitle:
      "Accelerating embodied AI robots into the home, leaving chores to technology and time to love.",
    primaryCta: "Pre-order Now",
    secondaryCta: "Product Details",
    imageAlt: "Mobile OpenArm X1 AMR robot platform",
  },
  zh: {
    headline: "个人机器人 PR X1\n让每一个家庭拥抱智慧新成员",
    subtitle:
      "加速具身智能机器人融入家庭，\n把琐碎留给科技，把时间留给爱。",
    primaryCta: "加入预售群",
    secondaryCta: "查看产品详情",
    imageAlt: "Mobile OpenArm X1 全向移动 AMR 机器人平台",
  },
};

const heroVideo = {
  src: withBasePath("/videos/research-box-demo.mp4"),
  poster: withBasePath("/videos/research-box-demo.jpg"),
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
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#070808] pt-28">
      {prefersReducedMotion ? (
        <Image
          src={heroVideo.poster}
          alt={t.imageAlt}
          fill
          sizes="100vw"
          className="hero-media-tone absolute inset-0 object-cover object-[50%_center]"
          priority
        />
      ) : (
        <video
          aria-hidden="true"
          className="hero-media-tone absolute inset-0 h-full w-full object-cover object-[50%_center]"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={heroVideo.poster}
        >
          <source src={heroVideo.src} type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden="true"
        className="hero-readability-shade absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="hero-atmosphere absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="tech-grid absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="hero-bottom-fade absolute inset-x-0 bottom-0 h-40 md:h-48"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pb-16">
        <div className="flex min-h-[calc(100dvh-8rem)] items-center">
          <div className="max-w-3xl">
            <motion.h1
              {...fadeIn(0.3)}
              className="max-w-[680px] whitespace-pre-line text-[30px] md:text-[44px] lg:text-[52px] font-[720] tracking-normal text-[#f4f0e8] leading-[1.06] drop-shadow-[0_2px_18px_rgba(0,0,0,0.42)]"
            >
              {t.headline}
            </motion.h1>

            <motion.p
              {...fadeIn(0.5)}
              className="mt-5 max-w-xl whitespace-pre-line text-[17px] md:text-[19px] font-[450] text-[#d1c8bb] leading-[1.65]"
            >
              {t.subtitle}
            </motion.p>

            <motion.div {...fadeIn(0.7)} className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={open}
                className="primary-cyan-gradient group inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-3 rounded-full px-6 py-2.5 text-canvas text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              >
                <span>{t.primaryCta}</span>
                <span className="w-7 h-7 rounded-full bg-canvas/15 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  →
                </span>
              </button>
              <a
                href="#products"
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-2.5 text-[#f4f0e8] text-sm font-medium hover:border-cyan-300/50 transition-colors text-center"
              >
                {t.secondaryCta}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
