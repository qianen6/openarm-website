"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

interface Tier {
  name: string;
  badge: string;
  preorderPrice: string;
  listPrice: string;
  priceCnyApprox: string;
  target: string;
  targetZh: string;
  features: readonly string[];
  featuresZh: readonly string[];
  cta: string;
  ctaZh: string;
  popular: boolean;
  discount?: string;
  discountZh?: string;
  imageSrc: string;
  imageAlt: string;
  imageAltZh: string;
}

const tiers: readonly Tier[] = [
  {
    name: "TeleBot Lite",
    badge: "LITE",
    preorderPrice: "$7,500",
    listPrice: "$8,900",
    priceCnyApprox: "≈ ¥54,000",
    target: "Universities, startups, student projects",
    targetZh: "高校、创业团队、学生项目",
    features: [
      "Single 7-DOF OpenArm",
      "Differential drive base",
      "720p monocular camera",
      "ROS 2 + Python SDK",
      "1-year warranty + community support",
    ],
    featuresZh: [
      "单臂 7 自由度 OpenArm",
      "差速驱动底盘",
      "720p 单目相机",
      "ROS 2 + Python SDK",
      "1 年质保与社区支持",
    ],
    cta: "Join Pre-order Group",
    ctaZh: "加入预售群",
    popular: false,
    imageSrc: "/images/telebot-render-base-80.png",
    imageAlt: "TeleBot Lite reference: compact mobile base",
    imageAltZh: "TeleBot Lite 示意：紧凑型移动底盘",
  },
  {
    name: "TeleBot Pro",
    badge: "PRO EDU",
    preorderPrice: "$19,900",
    listPrice: "$24,900",
    priceCnyApprox: "≈ ¥143,000",
    target: "Research labs, AI labs, enterprise R&D",
    targetZh: "科研实验室、AI 实验室、企业研发",
    features: [
      "Dual 7-DOF OpenArm",
      "Omni-directional base (Mecanum)",
      "4K stereo camera + depth sensor",
      "Bilateral force feedback system",
      "NVIDIA Jetson Orin NX",
      "MuJoCo + Isaac Sim integration",
      "2-year warranty + dedicated support",
    ],
    featuresZh: [
      "双 7 自由度 OpenArm",
      "麦克纳姆全向底盘",
      "4K 双目相机与深度传感器",
      "双向力反馈系统",
      "NVIDIA Jetson Orin NX",
      "MuJoCo + Isaac Sim 集成",
      "2 年质保与专属支持",
    ],
    cta: "Reserve a Slot",
    ctaZh: "预订名额",
    popular: true,
    discount: "Academic users: extra 15% off → $16,915",
    discountZh: "学术用户：再享 85 折 → $16,915 (≈ ¥122,000)",
    imageSrc: "/images/telebot-render-full-dual.png",
    imageAlt: "TeleBot Pro reference: dual-arm lift configuration",
    imageAltZh: "TeleBot Pro 示意：双臂升降整机方案",
  },
  {
    name: "TeleBot Enterprise",
    badge: "ENTERPRISE",
    preorderPrice: "$45,000",
    listPrice: "$52,000",
    priceCnyApprox: "≈ ¥324,000",
    target: "National labs, large enterprises, defense R&D",
    targetZh: "国家实验室、大型企业、国防研发",
    features: [
      "Enhanced dual arms (8kg payload)",
      "All-terrain base + 3D LiDAR",
      "Jetson AGX Orin 64GB",
      "Force/tactile feedback + SLAM",
      "On-site installation + 3-day training",
      "3-year warranty + custom development",
      "Commercial license + paper collaboration",
    ],
    featuresZh: [
      "增强型双臂（8kg 负载）",
      "全地形底盘与 3D LiDAR",
      "Jetson AGX Orin 64GB",
      "力/触觉反馈 + SLAM",
      "现场安装与 3 天培训",
      "3 年质保与定制开发",
      "商业授权与论文合作",
    ],
    cta: "Talk to Engineering",
    ctaZh: "联系工程团队",
    popular: false,
    imageSrc: "/images/telebot-render-rcb.png",
    imageAlt:
      "TeleBot Enterprise reference: high-capacity chassis with perception stack",
    imageAltZh: "TeleBot Enterprise 示意：大空间底盘与感知布局",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "PRE-ORDER PRICING",
    title: "First batch · Founding-member pricing",
    description:
      "Pre-order any tier through the WeChat group. Founding members lock in early-bird pricing, priority production slots, and direct access to the engineering team.",
    popular: "MOST POPULAR",
    currency: "USD",
    preorderTag: "PRE-ORDER",
    listLabel: "List price",
  },
  zh: {
    eyebrow: "预售价格",
    title: "首批 · 创始会员专属价",
    description:
      "通过预售群下单任意配置，创始会员可锁定早鸟价、优先生产档期，并与工程团队直接对接。",
    popular: "最受欢迎",
    currency: "美元",
    preorderTag: "预售价",
    listLabel: "原价",
  },
};

export default function PricingSection() {
  const { language } = useLanguage();
  const { open: openPreorder } = usePreorder();
  const t = sectionCopy[language];
  const isZh = language === "zh";

  return (
    <section id="pricing" className="relative bg-canvas py-24 overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-base tracking-[3px] mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-fg">
            {t.title}
          </h2>
          <p className="mt-4 text-fg-subtle max-w-xl mx-auto text-lg leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative p-8 rounded-xl bg-surface transition-all duration-300 ${
                tier.popular
                  ? "shadow-[0_0_40px_rgba(0,191,255,0.12)]"
                  : "border border-line hover:border-cyan-400/20"
              }`}
              style={
                tier.popular
                  ? {
                      backgroundImage:
                        "linear-gradient(#1a1a24, #1a1a24), linear-gradient(180deg, #00bfff, #7b61ff)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      border: "2px solid transparent",
                    }
                  : undefined
              }
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-sm font-bold text-white tracking-wide">
                  {t.popular}
                </div>
              )}

              <div className="mt-2 flex items-center gap-2">
                <p className="text-sm font-mono tracking-[2px] text-fg-subtle">
                  {tier.badge}
                </p>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-400 text-[10px] font-mono tracking-[2px] uppercase">
                  {t.preorderTag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-fg mt-2">{tier.name}</h3>
              <div className="mt-4 flex items-end gap-2">
                <span
                  className={`text-4xl font-extrabold ${
                    tier.popular
                      ? "bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
                      : "text-cyan-400"
                  }`}
                >
                  {tier.preorderPrice}
                </span>
                <span className="text-fg-subtle text-base mb-1">
                  {t.currency}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="text-fg-subtle line-through">
                  {tier.listPrice}
                </span>
                <span className="text-fg-subtle">·</span>
                <span className="text-fg-subtle">{t.listLabel}</span>
              </div>
              {isZh && (
                <p className="mt-1 text-sm text-fg-subtle font-mono">
                  {tier.priceCnyApprox}
                </p>
              )}
              <p className="text-base text-fg-muted mt-3 leading-relaxed">
                {isZh ? tier.targetZh : tier.target}
              </p>

              <div className="relative mt-5 aspect-[16/10] rounded-lg overflow-hidden border border-line bg-canvas">
                <Image
                  src={tier.imageSrc}
                  alt={isZh ? tier.imageAltZh : tier.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 380px"
                  className="object-contain p-2"
                />
              </div>

              <div className="my-6 h-px bg-line" />

              <ul className="space-y-3">
                {(isZh ? tier.featuresZh : tier.features).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-base text-fg-muted leading-snug"
                  >
                    <svg
                      className="w-5 h-5 mt-0.5 text-cyan-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {(isZh ? tier.discountZh : tier.discount) && (
                <p className="mt-4 text-center text-sm text-cyan-400 font-medium leading-relaxed">
                  {isZh ? tier.discountZh : tier.discount}
                </p>
              )}

              <button
                type="button"
                onClick={openPreorder}
                className={`mt-6 block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-white hover:opacity-90"
                    : "border border-line text-fg hover:border-line-strong"
                }`}
              >
                {isZh ? tier.ctaZh : tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
