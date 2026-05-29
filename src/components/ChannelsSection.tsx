"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language";

interface ChannelItem {
  key: string;
  name: string;
  nameZh: string;
  type: string;
  typeZh: string;
  handle: string;
  handleZh: string;
  href: string;
  cta: string;
  ctaZh: string;
}

const channels: readonly ChannelItem[] = [
  {
    key: "taobao",
    name: "Taobao",
    nameZh: "淘宝店铺",
    type: "Shop",
    typeZh: "电商通道",
    handle: "https://roseducation.taobao.com/",
    handleZh: "官方账号：待补充",
    href: "https://docs.openarm.dev/purchase",
    cta: "Visit Store",
    ctaZh: "查看购买指引",
  },
  {
    key: "xiaohongshu",
    name: "Xiaohongshu",
    nameZh: "小红书",
    type: "Social channel",
    typeZh: "内容通道",
    handle: "Official account: pending",
    handleZh: "官方账号：待补充",
    href: "#",
    cta: "Add Xiaohongshu Account",
    ctaZh: "补充小红书账号",
  },
  {
    key: "douyin",
    name: "TikTok",
    nameZh: "抖音",
    type: "Video Channel",
    typeZh: "内容通道",
    handle: "Official account: pending",
    handleZh: "官方账号：待补充",
    href: "#",
    cta: "Add TikTok Account",
    ctaZh: "补充抖音账号",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "OFFICIAL CHANNELS",
    title: "Purchase and Connect via Official Channels",
    description:
      "You can complete your purchase, track product updates, and stay informed on the latest co-development milestones with Mobile OpenArm by connecting with us through our official e-commerce and media channels.",
  },
  zh: {
    eyebrow: "官方通道",
    title: "通过官方通道购买与关注",
    description:
      "你可以通过官方电商与内容通道完成购买、关注进展，并查看与 OpenArm 联名共建的最新动态。",
  },
};

export default function ChannelsSection() {
  const { language } = useLanguage();
  const t = sectionCopy[language];
  const isZh = language === "zh";

  return (
    <section id="channels" className="relative bg-canvas-2 py-28 scroll-mt-24 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="warm-tech-field absolute inset-0" />
        <div className="warm-tech-line-field absolute left-[10%] top-[18%] h-px w-[72%] rotate-[3deg] opacity-45 blur-[16px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-cyan-400 font-mono text-base tracking-[3px] mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-fg leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-fg-subtle max-w-3xl mx-auto text-lg leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] gap-5">
          {channels.map((channel, i) => (
            <motion.article
              key={channel.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-lg border border-line bg-surface p-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-cyan-400/30 ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="h-full flex flex-col">
                <div className="h-1.5 w-16 rounded-full bg-cyan-300 mb-5" />
                <p className="text-xs font-mono tracking-[2px] text-cyan-300 mb-2">
                  {isZh ? channel.typeZh : channel.type}
                </p>
                <h3 className="text-xl font-semibold text-fg">
                  {isZh ? channel.nameZh : channel.name}
                </h3>
                <p className="mt-3 text-sm text-fg-subtle leading-relaxed min-h-11">
                  {isZh ? channel.handleZh : channel.handle}
                </p>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-6 inline-flex justify-center px-4 py-2.5 rounded-full border border-line text-fg hover:border-cyan-400/40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                >
                  {isZh ? channel.ctaZh : channel.cta}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
