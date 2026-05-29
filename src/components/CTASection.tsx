"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { usePreorder } from "@/lib/preorder";

const copy = {
  en: {
    eyebrow: "",
    title: "NVatom x Open Hardware",
    description:
      "We believe that the future of robotics should not be locked behind proprietary walls or driven by premium markups. Our mission is to democratize hard tech by bringing the transparency and collaborative power of open-source to hardware. By offering decoupled, transparent, and modular hardware platforms, we lower the financial and technical barriers for innovators everywhere. We stand to build the open foundations that empower global developers to iterate faster, collaborate freely, and collectively bring embodied AI into everyday reality.",
    primaryCta: "Join Our Community",
    secondaryCta: "Contact Us",
  },
  zh: {
    eyebrow: "首批预售开启",
    title: "智谷原子 x 开源硬件",
    description:
      "我们致力于打破硬科技领域的行业垄断与高价壁垒。通过构建全栈解耦、软硬件完全代码透明的开源生态，将复杂的机器人底层技术转化为模块化的“原子能力”，赋能全球每一位具身智能科研人员、高校师生和极客开发者，加速通用人工智能走向真实世界。",
    primaryCta: "扫码进入 QQ 群",
    secondaryCta: "邮件咨询",
  },
};

export default function CTASection() {
  const { language } = useLanguage();
  const { open: openPreorder } = usePreorder();
  const t = copy[language];

  return (
    <section
      id="contact"
      className="relative bg-canvas py-28 overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-canvas-2 via-transparent to-transparent opacity-60" />
        <div className="warm-tech-field absolute inset-0 opacity-80" />
        <div className="warm-tech-line-field absolute top-[24%] left-[8%] h-px w-[78%] rotate-[4deg] opacity-55 blur-[16px]" />
        <div className="warm-tech-line-field absolute bottom-[26%] right-[4%] h-px w-[70%] -rotate-[3deg] opacity-40 blur-[14px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {t.eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-cyan-400 font-mono text-sm tracking-[3px] mb-4"
          >
            {t.eyebrow}
          </motion.p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold text-fg"
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg text-fg-subtle leading-relaxed max-w-xl mx-auto"
        >
          {t.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            type="button"
            onClick={openPreorder}
            className="primary-cyan-gradient px-8 py-3.5 rounded-full text-canvas font-semibold hover:opacity-95 transition-opacity"
          >
            {t.primaryCta}
          </button>
          <a
            href="mailto:contact@nvatom.com?subject=Mobile%20OpenArm%20X1%20Consultation"
            className="px-8 py-3.5 rounded-full border border-line bg-[rgba(228,224,216,0.04)] text-fg font-medium hover:border-cyan-400/40 transition-colors text-center"
          >
            {t.secondaryCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
