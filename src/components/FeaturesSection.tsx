"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/site";
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
    title: "Global Localization and Dynamic Perception",
    titleZh: "全域定位与动态感知能力",
    desc: "Advancing from \"teach-and-play\" to \"spatial adaptability\", the LiDAR-guided mobile robot equips the embodied agent with centimeter-level positioning.",
    descZh: "从“固定示教”进化为“空间自适应”，激光导航底盘赋予了具身智能机器人厘米级的空间定位精度。",
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
    title: "Unbounded Operational Radius & Multi-Agent Collaboration",
    titleZh: "无限作业半径与多点任务协同",
    desc: "Integrating dual-arm dexterity with LiDAR-based long-range motion planning reducing physical constraints on workspace.",
    descZh: "双臂的灵巧度与激光雷达的远程路径规划结合，消除了物理作业范围的限制。",
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
    title: "Industrial-Grade Sensing & Millisecond-Level Reaction",
    titleZh: "工业级安全感知与毫秒级决策",
    desc: "Continuous LiDAR tracking enables real-time identification of dynamic obstacles—including pedestrians and pets—maintaining operational safety at high velocities.",
    descZh: "激光导航能确保机器人在高速移动中精准识别动态障碍物（如行人或宠物），保障操作安全。",
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
    title: "Unified Spatial-Action Co-Training Architecture",
    titleZh: "“空间-动作”联合训练架构",
    desc: "The fusion of odometry, LiDAR point clouds, and manipulator joint states delivers high-dimensional, spatio-temporally consistent data to train neural networks for advanced behavior learning.",
    descZh: "底盘的里程计数据、激光点云与机械臂的关节位姿深度融合，为训练 AI 模型提供了更高维度的时空一致性数据，使机器人能学习到更复杂的行为。",
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
    title: "Deep Openness & Full Open Source",
    titleZh: "深度开放，全栈开源",
    desc: "Delivering both comprehensive APIs and low-level driver source code to ensure developers maintain complete, low-level control.",
    descZh: "不仅提供 API 接口，更提供完整的底层驱动源码，开发者拥有 100% 控制权。",
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
    title: "Embodied Models and Simulator Integration",
    titleZh: "集成具身大模型与仿真接口",
    desc: "Integration with Isaac Gym and MuJoCo simulation frameworks alongside pre-configured VLA (Vision-Language-Action) model pipelines.",
    descZh: "内置 Isaac Gym / MuJoCo 仿真接口与 VLA（视觉-语言-动作）模型插件。",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "AMR x OpenArm",
    title: "Empowering OpenArm with Spatial Autonomy",
    description:
      "Advancing desktop robotic arms into fully autonomous, ubiquitous agents. This effectively bridges the gap between controlled laboratory demonstrations and the execution of complex tasks in real-world environments.",
  },
  zh: {
    eyebrow: "AMR x OpenArm",
    title: "为OpenArm注入空间自由意志",
    description:
      "将困在桌面上的“工具手臂”进化为拥有自由意志的“全域智能体”，真正实现了从实验室 Demo 到解决真实世界复杂任务的跨越",
  },
};

const showcaseImages = [
  {
    src: withBasePath("/images/openarm-spatial-autonomy-frame.jpg"),
    label: "Mobile OpenArm X1 embodied AI platform visual",
    labelZh: "Mobile OpenArm X1 具身智能平台视觉图",
  },
  {
    src: withBasePath("/images/showcase-02.png"),
    label: "Dual-battery with wheel-arm setup",
    labelZh: "双电池 + 轮臂构型",
  },
  {
    src: withBasePath("/images/showcase-03.png"),
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
      className="relative bg-canvas-2 py-24 overflow-hidden scroll-mt-28"
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
          <div className="features-showcase-shell relative overflow-hidden rounded-3xl border border-line p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-2 md:aspect-[1600/775]">
              <Image
                src={showcaseImages[0].src}
                alt={language === "zh" ? showcaseImages[0].labelZh : showcaseImages[0].label}
                fill
                sizes="(max-width: 768px) 96vw, (max-width: 1280px) 80vw, 1000px"
                className="features-showcase-image object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="features-showcase-vignette absolute inset-0"
              />
            </div>
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
              className="group p-8 rounded-lg bg-surface border border-line hover:border-cyan-400/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/15 to-amber-400/10 flex items-center justify-center text-cyan-400 mb-5 group-hover:from-cyan-400/25 group-hover:to-amber-400/15 transition-all duration-300">
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
