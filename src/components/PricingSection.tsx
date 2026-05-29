"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/site";
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
    name: "M-OpenArm Edu",
    nameZh: "M-OpenArm Edu",
    badge: "Education",
    badgeZh: "教育基础版",
    preorderPriceUsd: "$9,600",
    listPriceUsd: "$9,600",
    preorderPriceCny: "¥69,000",
    listPriceCny: "¥69,000",
    target: "Designed for school teaching and geek beginners, it comes with standard open-source courses, serving as a lightweight starting point for embodied AI teaching and research.",
    targetZh: "高校教学与极客入门，配备标准开源课程，是具身智能教研的轻量化起点",
    features: [
      "Lidar navigation + OpenArm",
      "Open documentation",
      "Open source demos",
      "ROS + Python support",
      "Community support and deployment guidance",
    ],
    featuresZh: [
      "激光雷达导航 + OpenArm",
      "开放文档与软件上手支持",
      "开源教学案例支持",
      "ROS+Python支持",
      "开源社区支持与部署指导",
    ],
    cta: "Early Bird Inquiry",
    ctaZh: "早鸟价预定咨询",
    popular: false,
    imageSrc: withBasePath("/images/openarm-rcb-kk-20260512.png"),
    imageAlt: "M-OpenArm Edu robot rendering",
    imageAltZh: "M-OpenArm Edu 教育基础版机器人渲染图",
  },
  {
    name: "M-OpenArm Pro",
    nameZh: "M-OpenArm Pro",
    badge: "Professional",
    badgeZh: "专业科研版",
    preorderPriceUsd: "$13,800",
    listPriceUsd: "$13,800",
    preorderPriceCny: "¥99,000",
    listPriceCny: "¥99,000",
    target: "Designed for algorithm teams and advanced research. High-efficiency algorithm verification. A core productivity tool for laboratory publications.",
    targetZh: "适用算法团队与进阶研究，侧重算法验证，实验室产出论文的生产力工具。",
    features: [
      "Lidar navigation + silent lift platform",
      "High-frequency data collection",
      "Embodied AI policy validation",
      "ACT and Diffusion Policy adaptation",
      "Software stack aligned with OpenArm and LeRobot",
    ],
    featuresZh: [
      "激光雷达导航 + 静音升降台",
      "支持高频数据采集",
      "支持具身智能算法验证",
      "适配 ACT、Diffusion Policy",
      "软件栈与OpenArm对齐",
    ],
    cta: "Early Bird Inquiry",
    ctaZh: "早鸟价预定咨询",
    popular: true,
    imageSrc: withBasePath("/images/openarm-dualbattery-kk.png"),
    imageAlt: "M-OpenArm Pro robot rendering",
    imageAltZh: "M-OpenArm Pro 专业科研版机器人渲染图",
  },
  {
    name: "M-OpenArm Max",
    nameZh: "M-OpenArm Max",
    badge: "Max Ultimate",
    badgeZh: "至尊具身版",
    preorderPriceUsd: "$17,900",
    listPriceUsd: "$17,900",
    preorderPriceCny: "¥129,000",
    listPriceCny: "¥129,000",
    target: "Overcoming challenges in omnidirectional mobility and long-horizon, multi-scenario manipulation.",
    targetZh: "攻克全向移动与转动、长序列（Long-Horizon）全场景操作任务",
    features: [
      "Lidar navigation + bending structure",
      "360° spatial turning",
      "360° waist rotation",
      "Full-Scenario algorithm validation",
      "VR teleoperation and LeRobot framework support",
    ],
    featuresZh: [
      "激光雷达导航 + 弯腰结构",
      "支持360度空间自由转向",
      "支持360腰部转向",
      "支持全场景算法验证",
      "支持 VR 遥操作与LeRobot框架",
    ],
    cta: "Early Bird Inquiry",
    ctaZh: "早鸟价预定咨询",
    popular: false,
    imageSrc: withBasePath("/images/openarm-zpf-singlejoint.png"),
    imageAlt: "M-OpenArm Max robot rendering",
    imageAltZh: "M-OpenArm Max 至尊具身版机器人渲染图",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "PRE-ORDER PRICING",
    title: "NVatom x OpenArm x ROS Education Foundation",
    description:
      "Our embodied AI robots are co-developed in partnership with OpenArm. Users can choose from three tiers of solutions based on their deployment needs and refer to the official documentation to complete the software and hardware integration.",
    popular: "MOST POPULAR",
    preorderTag: "PRE-SALE",
    listLabel: "List price",
  },
  zh: {
    eyebrow: "预售价格",
    title: "智谷原子 X OpenArm X ROS教育基金会 联手共建",
    description:
      "我们的具身智能机器人与 OpenArm 联名共建。用户可以按部署需求选择三档方案，并参考官方文档完成软硬件对接。",
    popular: "最受欢迎",
    preorderTag: "预售",
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
              className={`relative p-8 rounded-lg bg-surface transition-all duration-300 ${
                tier.popular
                  ? "shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
                  : "border border-line hover:border-cyan-400/20"
              }`}
              style={
                tier.popular
                  ? {
                      backgroundImage:
                        "linear-gradient(var(--color-surface), var(--color-surface)), linear-gradient(180deg, #76efe4, #31c8be)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      border: "2px solid transparent",
                    }
                  : undefined
              }
            >
              {tier.popular && (
                <div className="primary-cyan-gradient absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-bold text-canvas tracking-wide">
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
                      ? "text-cyan-400"
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
                <div className="relative flex h-[320px] w-full items-center justify-center rounded-lg bg-canvas/25 p-4 md:h-[340px]">
                  <Image
                    src={tier.imageSrc}
                    alt={isZh ? tier.imageAltZh : tier.imageAlt}
                    width={960}
                    height={720}
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 30vw, 420px"
                    className="h-full w-full rounded-lg object-contain drop-shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
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
                    ? "primary-cyan-gradient text-canvas hover:opacity-95"
                    : "border border-line bg-[rgba(228,224,216,0.04)] text-fg hover:border-line-strong"
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
