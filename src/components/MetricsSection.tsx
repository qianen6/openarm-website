"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/lib/language";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function formatValue(value: number, target: number) {
  // Preserve the same decimal precision as the target so animation reads
  // "60.00 → 99.97" rather than "60 → 99.97".
  if (Number.isInteger(target)) return Math.round(value).toString();

  const decimals = Math.min(
    4,
    (target.toString().split(".")[1] ?? "").length || 0,
  );
  return value.toFixed(decimals);
}

function AnimatedCounter({ target, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    // Effective duration of 0 = jump straight to target on the next frame
    // (used when the user prefers reduced motion).
    const effectiveDuration = prefersReducedMotion ? 0 : duration;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      if (effectiveDuration === 0) {
        setCount(target);
        return;
      }
      const t = Math.min(1, (now - start) / (effectiveDuration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      if (t < 1) {
        setCount(target * eased);
        frame = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span
      ref={ref}
      className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
    >
      {formatValue(count, target)}
      {suffix}
    </span>
  );
}

const copy = {
  en: {
    eyebrow: "Trusted by leading research institutions worldwide",
    metrics: [
      { value: 500, suffix: "+", label: "Robots Deployed" },
      { value: 99.97, suffix: "%", label: "Uptime Reliability" },
      { value: 24, suffix: "/7", label: "Support Coverage" },
      { value: 40, suffix: "+", label: "Countries Served" },
    ],
  },
  zh: {
    eyebrow: "受到全球领先科研机构信赖",
    metrics: [
      { value: 500, suffix: "+", label: "已部署机器人" },
      { value: 99.97, suffix: "%", label: "运行可靠性" },
      { value: 24, suffix: "/7", label: "技术支持覆盖" },
      { value: 40, suffix: "+", label: "服务国家与地区" },
    ],
  },
};

export default function MetricsSection() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="relative bg-canvas-2">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-fg-muted text-base mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          {t.eyebrow}
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-surface/50 border border-line/60"
            >
              <div className="text-4xl md:text-5xl font-extrabold">
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>
              <p className="mt-3 text-base text-fg-muted leading-snug">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
