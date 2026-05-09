"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/language";

const RobotExplode = dynamic(() => import("./RobotExplode"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-canvas-2">
      <div
        role="status"
        aria-label="Loading 3D model"
        className="w-12 h-12 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"
      />
    </div>
  ),
});

const specs = [
  { value: "7 DOF", label: "Degrees of Freedom", labelZh: "自由度" },
  { value: "20 kg", label: "Max Payload", labelZh: "最大负载" },
  { value: "±0.02mm", label: "Repeatability", labelZh: "重复定位精度" },
  { value: "1300mm", label: "Max Reach", labelZh: "最大臂展" },
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
    title: "A complete research-grade robotic arm.",
    titleZh: "完整的科研级机械臂。",
    body: "Start with the full OpenArm Pro X1 profile: a 7-DOF collaborative arm designed for teleoperation, embodied AI research, and repeatable manipulation experiments.",
    bodyZh:
      "从完整的 OpenArm Pro X1 开始：一款面向远程操作、具身智能研究和可重复操作实验的 7 自由度协作机械臂。",
    bullets: [
      "Human-scale reach",
      "Research-ready payload",
      "Compact integration footprint",
    ],
    bulletsZh: ["接近人类尺度的臂展", "面向科研的负载能力", "紧凑的集成占用空间"],
  },
  {
    eyebrow: "02 / STRUCTURE",
    eyebrowZh: "02 / 结构",
    title: "Expose the modular mechanics.",
    titleZh: "展示模块化机械结构。",
    body: "The exploded view highlights the actuator stack, CNC load-bearing parts, protective shell, and rail system so teams can understand what can be serviced, replaced, or adapted.",
    bodyZh:
      "爆炸图突出执行器堆叠、CNC 承力件、防护外壳和导轨系统，帮助团队快速理解可维护、可替换和可改造的位置。",
    bullets: [
      "Modular actuator stack",
      "Serviceable 3D-printed casing",
      "CNC and sheet-metal load paths",
    ],
    bulletsZh: ["模块化执行器堆叠", "可维护的 3D 打印外壳", "CNC 与钣金承力路径"],
  },
  {
    eyebrow: "03 / END EFFECTOR",
    eyebrowZh: "03 / 末端执行器",
    title: "Focus on the gripper interface.",
    titleZh: "聚焦夹爪接口。",
    body: "The wrist and finger assembly are the fastest path to customization. Labs can swap tooling, test tactile strategies, and tune grasping workflows without redesigning the arm.",
    bodyZh:
      "腕部与手指组件是最快的定制入口。实验室可以更换工具、测试触觉策略，并在不重做整臂的情况下优化抓取流程。",
    bullets: [
      "Swappable gripper geometry",
      "Fine manipulation experiments",
      "Teleoperation-ready wrist layout",
    ],
    bulletsZh: ["可替换夹爪几何", "精细操作实验", "适合远程操作的腕部布局"],
  },
  {
    eyebrow: "04 / SOFTWARE",
    eyebrowZh: "04 / 软件",
    title: "Connect hardware to the AI stack.",
    titleZh: "连接硬件与 AI 栈。",
    body: "OpenArm is more than metal. ROS 2, Python control, simulation hooks, and edge compute support turn the mechanical platform into a deployable robotics system.",
    bodyZh:
      "OpenArm 不只是机械结构。ROS 2、Python 控制、仿真接口和边缘计算支持，让机械平台成为可部署的机器人系统。",
    bullets: [
      "ROS 2 + Python SDK",
      "MuJoCo and Isaac Sim workflows",
      "Jetson-class edge deployment",
    ],
    bulletsZh: [
      "ROS 2 + Python SDK",
      "MuJoCo 与 Isaac Sim 工作流",
      "Jetson 级边缘部署",
    ],
  },
];

const productCopy = {
  en: {
    eyebrow: "FLAGSHIP MODEL",
    title: "OpenArm Pro X1",
    description:
      "Our most advanced collaborative robot. 7 degrees of freedom, 20kg payload capacity, and human-like dexterity powered by our proprietary neural motor control system.",
    stepLabel: "Show story step",
    structureFocusHeading: "Structural focus",
    structureFocus: [
      "Actuator stack",
      "CNC load-bearing path",
      "Protective shell",
      "Linear guide rail",
    ],
  },
  zh: {
    eyebrow: "旗舰型号",
    title: "OpenArm Pro X1",
    description:
      "我们最先进的协作机器人，具备 7 自由度、20kg 负载能力，以及由自研神经运动控制系统驱动的类人灵巧性。",
    stepLabel: "显示故事步骤",
    structureFocusHeading: "结构聚焦",
    structureFocus: ["执行器堆叠", "CNC 承力路径", "防护外壳", "线性导轨系统"],
  },
};

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { language } = useLanguage();
  const t = productCopy[language];
  const isZh = language === "zh";

  useEffect(() => {
    let frame = 0;

    const updateActiveStep = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(
        1,
        section.offsetHeight - window.innerHeight,
      );
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / scrollableDistance),
      );
      const nextStep = Math.min(
        storySteps.length - 1,
        Math.max(0, Math.floor(progress * storySteps.length)),
      );

      setActiveStep((current) => (current === nextStep ? current : nextStep));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveStep);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const currentStep = storySteps[activeStep];

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative min-h-[420vh] scroll-mt-24 bg-canvas overflow-clip"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[12%] left-[8%] w-[420px] h-[420px] rounded-full bg-cyan-400/6 blur-[120px]" />
        <div className="absolute top-[38%] right-[4%] w-[520px] h-[520px] rounded-full bg-violet-500/8 blur-[140px]" />
        <div className="absolute bottom-[14%] left-[20%] w-[460px] h-[460px] rounded-full bg-cyan-300/5 blur-[130px]" />
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

      <div className="relative z-10 sticky top-20 min-h-[calc(100vh-80px)] max-w-7xl mx-auto px-6 lg:px-20 py-8 lg:py-12 flex items-center">
        <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.8fr)] gap-6 lg:gap-12 w-full items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[62vh] min-h-[460px] md:h-[78vh] md:min-h-[680px] rounded-3xl overflow-hidden border border-cyan-300/10 bg-transparent shadow-[0_26px_90px_rgba(0,0,0,0.38)]"
          >
            <RobotExplode activeStep={activeStep} />
          </motion.div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/10 blur-2xl"
            />
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-3xl border border-line bg-canvas-2/85 backdrop-blur-xl p-7 lg:p-8"
            >
              <p className="text-cyan-400 font-mono text-sm tracking-[3px] mb-4">
                {isZh ? currentStep.eyebrowZh : currentStep.eyebrow}
              </p>
              <h3 className="text-2xl md:text-4xl font-bold text-fg leading-tight">
                {isZh ? currentStep.titleZh : currentStep.title}
              </h3>
              <p className="mt-5 text-fg-muted text-base lg:text-lg leading-relaxed">
                {isZh ? currentStep.bodyZh : currentStep.body}
              </p>

              {activeStep === 1 && (
                <div className="mt-5 rounded-xl border border-cyan-300/20 bg-canvas overflow-hidden">
                  <p className="text-cyan-400/90 font-mono text-sm tracking-[3px] px-4 pt-3 pb-2">
                    {t.structureFocusHeading}
                  </p>
                  <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                    {t.structureFocus.map((item) => (
                      <div
                        key={item}
                        className="rounded-lg border border-cyan-300/20 bg-canvas-2 px-3 py-2 text-sm text-fg-muted"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ul className="mt-6 space-y-3">
                {(isZh ? currentStep.bulletsZh : currentStep.bullets).map(
                  (bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-base text-fg-muted leading-snug"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(0,191,255,0.8)] shrink-0"
                      />
                      {bullet}
                    </li>
                  ),
                )}
              </ul>

              <div className="mt-8 hidden lg:grid grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-2xl border border-line bg-white/[0.03] p-4"
                  >
                    <div className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                      {spec.value}
                    </div>
                    <div className="mt-1 text-sm text-fg-muted">
                      {isZh ? spec.labelZh : spec.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                {storySteps.map((step, index) => (
                  <button
                    key={step.eyebrow}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    aria-label={`${t.stepLabel} ${index + 1}`}
                    aria-current={index === activeStep ? "step" : undefined}
                    className={`h-2 rounded-full transition-all ${
                      index === activeStep
                        ? "w-10 bg-cyan-400"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
