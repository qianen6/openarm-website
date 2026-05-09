"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

interface Tier {
  name: string;
  nameZh: string;
  badge: string;
  badgeZh: string;
  preorderPriceUsd: string;
  listPriceUsd: string;
  preorderPriceCny: string;
  listPriceCny: string;
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
    name: "OpenArm Co-build RCB + KK",
    nameZh: "OpenArm 联名 RCB + KK 上半身",
    badge: "TIER 1",
    badgeZh: "一档",
    preorderPriceUsd: "$9,600",
    listPriceUsd: "$9,600",
    preorderPriceCny: "¥69,000",
    listPriceCny: "¥69,000",
    target: "Maker teams, universities, and first-time embodied AI labs",
    targetZh: "创客团队、高校与首次搭建具身智能实验室",
    features: [
      "OpenArm collaborative arm stack",
      "RCB base + KK upper-body structure",
      "Open docs access and software onboarding",
      "ROS 2 + Python SDK workflow",
      "Community support + deployment guidance",
    ],
    featuresZh: [
      "OpenArm 协作机械臂方案",
      "RCB 底盘 + KK 上半身结构",
      "开放文档与软件上手支持",
      "ROS 2 + Python SDK 工作流",
      "社区支持与部署指导",
    ],
    cta: "Join Pre-order Group",
    ctaZh: "加入预售群",
    popular: false,
    imageSrc: "/images/openarm-rcb-kk.png",
    imageAlt: "Tier 1 RCB + KK upper-body robot rendering",
    imageAltZh: "一档 RCB + KK 上半身机器人渲染图",
  },
  {
    name: "OpenArm Co-build Liftable Dual-Battery + KK",
    nameZh: "OpenArm 联名 可升降双电池 + KK",
    badge: "TIER 2",
    badgeZh: "二档",
    preorderPriceUsd: "$13,800",
    listPriceUsd: "$13,800",
    preorderPriceCny: "¥99,000",
    listPriceCny: "¥99,000",
    target: "Research teams needing adjustable operating height",
    targetZh: "需要可升降工作高度的科研团队",
    features: [
      "OpenArm co-branded build with liftable architecture",
      "Dual-battery platform + KK upper-body assembly",
      "Expanded endurance for longer sessions",
      "Software stack aligned with OpenArm docs",
      "Priority integration support",
    ],
    featuresZh: [
      "OpenArm 联名可升降架构方案",
      "双电池平台 + KK 上半身组合",
      "续航能力增强，适合长时段实验",
      "软件栈与 OpenArm 文档对齐",
      "优先集成支持",
    ],
    cta: "Reserve a Slot",
    ctaZh: "预订名额",
    popular: true,
    discount: "Co-build package: includes OpenArm alignment support",
    discountZh: "联名套件：含 OpenArm 方案对齐支持",
    imageSrc: "/images/openarm-dualbattery-kk.png",
    imageAlt: "Tier 2 liftable dual-battery + KK robot rendering",
    imageAltZh: "二档 可升降双电池 + KK 机器人渲染图",
  },
  {
    name: "OpenArm Co-build ZPF + Single Joint",
    nameZh: "OpenArm 联名 ZPF + 单关节",
    badge: "TIER 3",
    badgeZh: "三档",
    preorderPriceUsd: "$17,900",
    listPriceUsd: "$17,900",
    preorderPriceCny: "¥129,000",
    listPriceCny: "¥129,000",
    target: "Compact deployment scenarios and rapid prototyping teams",
    targetZh: "紧凑部署场景与快速原型验证团队",
    features: [
      "OpenArm-aligned control stack",
      "ZPF chassis + single-joint configuration",
      "Compact footprint for constrained spaces",
      "Fast setup for pilot and demo scenarios",
      "Engineering handoff support",
    ],
    featuresZh: [
      "与 OpenArm 对齐的控制方案",
      "ZPF 底盘 + 单关节配置",
      "占地紧凑，适合空间受限场景",
      "快速部署，适合试点与演示",
      "工程交付支持",
    ],
    cta: "Talk to Engineering",
    ctaZh: "联系工程团队",
    popular: false,
    imageSrc: "/images/openarm-zpf-singlejoint.png",
    imageAlt: "Tier 3 ZPF + single-joint robot rendering",
    imageAltZh: "三档 ZPF + 单关节机器人渲染图",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "PRE-ORDER PRICING",
    title: "OpenArm Co-build · Three Purchase Tiers",
    description:
      "These robots are co-built with OpenArm. Pick the tier that matches your deployment needs and use the official OpenArm docs for hardware/software references.",
    popular: "MOST POPULAR",
    preorderTag: "PRE-ORDER",
    listLabel: "List price",
  },
  zh: {
    eyebrow: "预售价格",
    title: "OpenArm 联名共建 · 三档采购方案",
    description:
      "我们的机器人与 OpenArm 联名共建。你可以按部署需求选择三档方案，并参考 OpenArm 官方文档完成软硬件对接。",
    popular: "最受欢迎",
    preorderTag: "预售价",
    listLabel: "原价",
  },
};

export default function PricingSection() {
  const { language } = useLanguage();
  const { open: openPreorder } = usePreorder();
  const t = sectionCopy[language];
  const isZh = language === "zh";
  const getPreorderPrice = (tier: Tier) =>
    isZh ? tier.preorderPriceCny : tier.preorderPriceUsd;
  const getListPrice = (tier: Tier) =>
    isZh ? tier.listPriceCny : tier.listPriceUsd;

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
          <p className="mt-4 text-sm text-fg-subtle">
            {isZh ? "OpenArm 官方链接：" : "Official OpenArm links:"}{" "}
            <a
              href="https://docs.openarm.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              docs.openarm.dev
            </a>{" "}
            ·{" "}
            <a
              href="https://docs.openarm.dev/purchase"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isZh ? "购买页" : "Purchase"}
            </a>
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
                  {isZh ? tier.badgeZh : tier.badge}
                </p>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-400 text-[10px] font-mono tracking-[2px] uppercase">
                  {t.preorderTag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-fg mt-2">{isZh ? tier.nameZh : tier.name}</h3>
              <div className="mt-4 flex items-end gap-2">
                <span
                  className={`text-4xl font-extrabold ${
                    tier.popular
                      ? "bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
                      : "text-cyan-400"
                  }`}
                >
                  {getPreorderPrice(tier)}
                </span>
              </div>
              {getListPrice(tier) !== getPreorderPrice(tier) && (
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="text-fg-subtle line-through">
                    {getListPrice(tier)}
                  </span>
                  <span className="text-fg-subtle">·</span>
                  <span className="text-fg-subtle">{t.listLabel}</span>
                </div>
              )}
              <p className="text-base text-fg-muted mt-3 leading-relaxed">
                {isZh ? tier.targetZh : tier.target}
              </p>

              <div className="mt-5 flex justify-center">
                <div className="relative flex h-[300px] w-full items-center justify-center rounded-xl bg-canvas/20 p-1 md:h-[340px] md:p-2">
                  <Image
                    src={tier.imageSrc}
                    alt={isZh ? tier.imageAltZh : tier.imageAlt}
                    width={960}
                    height={720}
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 30vw, 420px"
                    className="h-auto w-auto max-h-[95%] max-w-[96%] rounded-lg object-contain scale-[1.08] drop-shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
                  />
                </div>
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
