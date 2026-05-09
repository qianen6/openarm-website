"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language";

const features = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a8 8 0 0 0-8 8c0 3.4 2.1 6.3 5 7.4V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.6c2.9-1.1 5-4 5-7.4a8 8 0 0 0-8-8z" />
        <line x1="10" y1="22" x2="14" y2="22" />
        <path d="M9 9h.01M15 9h.01M9.5 13a3.5 3.5 0 0 0 5 0" />
      </svg>
    ),
    title: "AI-Powered Autonomy",
    titleZh: "AI 驱动的自主能力",
    desc: "Self-learning neural networks enable real-time decision making, object recognition, and adaptive behavior in dynamic environments.",
    descZh: "自学习神经网络支持实时决策、目标识别和动态环境中的自适应行为。",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    title: "Precision Engineering",
    titleZh: "高精度工程设计",
    desc: "Sub-millimeter accuracy with 6-axis motion control. Every joint calibrated for maximum payload capacity and repeatability.",
    descZh: "亚毫米级精度与多轴运动控制，每个关节都针对负载能力和重复定位精度完成校准。",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Safety-First Design",
    titleZh: "安全优先设计",
    desc: "ISO 10218 compliant with force-torque sensing, collision detection, and programmable safety zones for human-robot collaboration.",
    descZh: "符合 ISO 10218 思路，集成力矩感知、碰撞检测和可编程安全区域，适合人机协作。",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12h6M16 12h6" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Edge Computing & IoT",
    titleZh: "边缘计算与物联网",
    desc: "On-device processing with 5G connectivity. Real-time telemetry, fleet management, and cloud-sync for continuous improvement.",
    descZh: "设备端计算结合 5G 连接，支持实时遥测、机群管理和云端同步优化。",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
    title: "Open SDK & APIs",
    titleZh: "开放 SDK 与 API",
    desc: "Python, ROS 2, and REST APIs. Build custom workflows, integrate with existing systems, and extend capabilities with our developer toolkit.",
    descZh: "提供 Python、ROS 2 和 REST API，方便构建自定义流程、集成现有系统并扩展能力。",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Rapid Deployment",
    titleZh: "快速部署",
    desc: "From unboxing to production in under 48 hours. Pre-trained models, guided calibration, and plug-and-play hardware integration.",
    descZh: "从开箱到投入使用最快 48 小时内完成，内置预训练模型、引导式校准和即插即用硬件集成。",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "CAPABILITIES",
    title: "Built for the Next Era of Automation",
    description:
      "Our platform combines advanced AI, precision hardware, and seamless integration to deliver autonomous robotic systems.",
  },
  zh: {
    eyebrow: "核心能力",
    title: "面向下一代自动化而生",
    description:
      "OpenArm 将先进 AI、精密硬件和顺畅集成结合在一起，交付可落地的自主机器人系统。",
  },
};

const showcaseImages = [
  {
    src: "/images/openarm-user-shot.png",
    label: "Immersive OpenArm visual",
    labelZh: "OpenArm 沉浸式视觉图",
  },
  {
    src: "/images/showcase-02.png",
    label: "Dual-battery with wheel-arm setup",
    labelZh: "双电池 + 轮臂构型",
  },
  {
    src: "/images/showcase-03.png",
    label: "ZPF mobility with wheel-arm module",
    labelZh: "ZPF 机动底盘 + 轮臂模块",
  },
] as const;

export default function FeaturesSection() {
  const { language } = useLanguage();
  const t = sectionCopy[language];

  return (
    <section
      id="features"
      className="relative bg-canvas py-24 overflow-hidden scroll-mt-28"
    >
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
          <h2 className="text-3xl md:text-5xl font-bold text-fg leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-fg-subtle max-w-2xl mx-auto text-xl leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative max-w-6xl mx-auto mb-16"
        >
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <Image
              src={showcaseImages[0].src}
              alt={language === "zh" ? showcaseImages[0].labelZh : showcaseImages[0].label}
              width={1200}
              height={900}
              sizes="(max-width: 768px) 96vw, (max-width: 1280px) 80vw, 1000px"
              className="h-auto w-full object-cover rounded-[2.5rem]"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group p-8 rounded-xl bg-surface border border-line hover:border-cyan-400/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/10 flex items-center justify-center text-cyan-400 mb-5 group-hover:from-cyan-400/30 group-hover:to-violet-500/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-fg mb-3">
                {language === "zh" ? feature.titleZh : feature.title}
              </h3>
              <p className="text-fg-subtle text-base leading-relaxed">
                {language === "zh" ? feature.descZh : feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
