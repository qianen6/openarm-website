"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/site";
import { useLanguage } from "@/lib/language";

const specs = [
  { value: "19 DoF", label: "Degrees of Freedom", labelZh: "自由度" },
  { value: "10 kg", label: "Max Payload", labelZh: "最大负载" },
  { value: "±1 mm", label: "Repeatability", labelZh: "重复定位精度" },
  { value: "1300 mm", label: "Max Reach", labelZh: "最大臂展" },
] as const;

interface StoryStep {
  eyebrow: string;
  eyebrowZh: string;
  title: string;
  titleZh: string;
  body: string;
  bodyZh: string;
  bullets: readonly string[];
  bulletsZh: readonly string[];
}

const storySteps: readonly StoryStep[] = [
  {
    eyebrow: "01 / OVERVIEW",
    eyebrowZh: "01 / 总览",
    title: "A Research Platform for Embodied AI",
    titleZh: "科研级具身智能平台",
    body: "Mobile OpenArm X1 serves as the ultimate solution for embodied AI research: a 19-DoF robotic platform meticulously engineered for high-precision data collection and teleoperation.",
    bodyZh:
      "完整的Mobile OpenArm X1是具身智能科研的起点：一款面向高精度数据采集、远程操作、19自由度的机器人平台。",
    bullets: [
      "Human-scale reach",
      "Research-ready payload",
      "Safe mobile operation",
    ],
    bulletsZh: ["接近人类尺度的臂展", "强大的负载能力", "灵活安全的空间移动能力"],
  },
  {
    eyebrow: "02 / END EFFECTOR",
    eyebrowZh: "02 / 末端执行器",
    title: "Modular grippers for precise manipulation",
    titleZh: "模块化夹爪",
    body: "The end-effector interface follows shared mechanical and electrical standards, supporting custom grippers and multi-position camera mounts.",
    bodyZh:
      "末端接口采用通用物理与电气规范，支持三种核心夹爪的深度定制，以及支持多位点摄像头支架定制。",
    bullets: [
      "Swappable gripper options",
      "Fine manipulation workflows",
      "Close-range precision grasping",
    ],
    bulletsZh: ["可替换夹爪", "可执行精细操作", "支持近距离精准抓取"],
  },
  {
    eyebrow: "03 / SOFTWARE",
    eyebrowZh: "03 / 软件",
    title: "Ready for frontier embodied AI models",
    titleZh: "适配前沿具身大模型",
    body: "The software stack decouples hardware control while connecting upward to AI workflows, turning the machine into an evolvable agent.",
    bodyZh:
      "软件系统通过“向下解耦硬件、向上无缝对接 AI”，将冰冷的机械结构转化为可进化的智能体。",
    bullets: [
      "ROS 2 + Python SDK",
      "MuJoCo and Isaac Sim workflows",
      "LeRobot framework support",
    ],
    bulletsZh: [
      "ROS2 + Python SDK",
      "MuJoCo 与 Isaac Sim 工作流",
      "全面支持LeRobot框架",
    ],
  },
];

const productCopy = {
  en: {
    eyebrow: "FLAGSHIP EDITION",
    title: "Mobile OpenArm X1",
    description:
      "An omnidirectional four-wheel-drive (4WD) AMR integrated with high-precision LiDAR navigation, supporting OpenArm with 12-DoF redundant spatial mobility.",
  },
  zh: {
    eyebrow: "旗舰型号",
    title: "Mobile OpenArm X1",
    description:
      "双臂具备 12 自由度（12DoF）的冗余空间运动能力，融合高精度激光雷达导航的四驱全向移动AMR机器人底盘。",
  },
};

export default function ProductSection() {
  const { language } = useLanguage();
  const t = productCopy[language];
  const isZh = language === "zh";

  return (
    <section
      id="products"
      className="relative scroll-mt-24 bg-canvas overflow-clip"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="warm-tech-field absolute inset-0 opacity-65" />
        <div className="warm-tech-line-field absolute top-[32%] left-[7%] h-px w-[82%] -rotate-[3deg] opacity-35 blur-[16px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-cyan-400 font-mono text-base tracking-[3px] mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-fg leading-tight">
            {t.title}
          </h2>
          <p className="mt-6 text-fg-muted text-xl leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.8fr)] gap-6 lg:gap-12 w-full items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[50vh] min-h-[380px] md:h-[64vh] md:min-h-[520px] rounded-3xl overflow-hidden border border-cyan-300/15 bg-canvas-2/45 shadow-[0_30px_100px_rgba(1,21,20,0.45)]"
          >
            <Image
              src={withBasePath("/images/homepage.png")}
              alt={isZh ? "Mobile OpenArm 具身智能机器人渲染图" : "Mobile OpenArm embodied robotics render"}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-gradient-to-t from-canvas/40 via-transparent to-transparent"
            />
          </motion.div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="warm-tech-field absolute -inset-6 rounded-[2rem] opacity-50 blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-lg border border-line bg-surface/90 p-6 lg:p-7 space-y-5"
            >
              {storySteps.map((step) => (
                <div
                  key={step.eyebrow}
                  className="border-l-2 border-cyan-400/60 pl-4"
                >
                  <p className="text-cyan-400 font-mono text-xs tracking-[2px] mb-1">
                    {isZh ? step.eyebrowZh : step.eyebrow}
                  </p>
                  <h3 className="text-lg lg:text-xl font-bold text-fg leading-snug">
                    {isZh ? step.titleZh : step.title}
                  </h3>
                  <p className="mt-1.5 text-fg-muted text-sm leading-relaxed">
                    {isZh ? step.bodyZh : step.body}
                  </p>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3 pt-2">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-lg border border-line bg-[rgba(228,224,216,0.035)] p-3"
                  >
                    <div className="text-xl font-extrabold text-cyan-400">
                      {spec.value}
                    </div>
                    <div className="mt-0.5 text-xs text-fg-muted">
                      {isZh ? spec.labelZh : spec.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
