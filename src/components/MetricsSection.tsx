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
  if (Number.isInteger(target)) return Math.round(value).toLocaleString("en-US");

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
      className="text-cyan-400"
    >
      {formatValue(count, target)}
      {suffix}
    </span>
  );
}

const copy = {
  en: {
    eyebrow: "Trusted by Leading Robotics Developers and Open-Source Communities Worldwide",
    metrics: [
      { value: 1000, suffix: "+", label: "Global Open-source Contributors" },
      { value: 100, suffix: "%", label: "Full-Stack Transparency" },
      { value: 24, suffix: "/7", label: "Real-Time Community Response" },
      { value: 50, suffix: "+", label: "Global Communities Engaged" },
    ],
  },
  zh: {
    eyebrow: "受到全球顶尖机器人开发者与开源社区信赖",
    metrics: [
      { value: 1000, suffix: "+", label: "全球开源贡献者" },
      { value: 100, suffix: "%", label: "软硬件完全代码透明" },
      { value: 24, suffix: "/7", label: "开源社区实时响应" },
      { value: 50, suffix: "+", label: "影响国家与地区开源社区" },
    ],
  },
};

export default function MetricsSection() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="relative bg-canvas">
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
              className="flex flex-col items-center text-center p-6 rounded-lg bg-surface/70 border border-line"
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
