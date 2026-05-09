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
    key: "jd",
    name: "JD Store",
    nameZh: "京东店铺",
    type: "E-commerce",
    typeZh: "电商通道",
    handle: "Official account: pending",
    handleZh: "官方账号：待补充",
    href: "#",
    cta: "Add JD Link",
    ctaZh: "补充京东链接",
  },
  {
    key: "taobao",
    name: "Taobao",
    nameZh: "淘宝店铺",
    type: "E-commerce",
    typeZh: "电商通道",
    handle: "Official account: pending",
    handleZh: "官方账号：待补充",
    href: "https://docs.openarm.dev/purchase",
    cta: "View Purchase Guide",
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
    cta: "Add XHS Account",
    ctaZh: "补充小红书账号",
  },
  {
    key: "douyin",
    name: "Douyin",
    nameZh: "抖音",
    type: "Social channel",
    typeZh: "内容通道",
    handle: "Official account: pending",
    handleZh: "官方账号：待补充",
    href: "#",
    cta: "Add Douyin Account",
    ctaZh: "补充抖音账号",
  },
];

const sectionCopy = {
  en: {
    eyebrow: "OFFICIAL CHANNELS",
    title: "Buy and Follow Through Official Channels",
    description:
      "Use the official e-commerce and social channels to purchase robots, track updates, and verify the latest collaboration announcements with OpenArm.",
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
        <div className="absolute top-0 left-[10%] w-[360px] h-[360px] rounded-full bg-cyan-400/12 blur-[120px]" />
        <div className="absolute bottom-0 right-[8%] w-[420px] h-[420px] rounded-full bg-violet-500/10 blur-[140px]" />
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
              className={`rounded-[1.6rem] p-1 bg-white/[0.03] border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.26)] ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="rounded-[1.2rem] h-full border border-white/10 bg-canvas/75 p-6 flex flex-col">
                <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-cyan-300 to-violet-500 mb-5" />
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
