"use client";
import { useLanguage } from "@/lib/language";

const footerLinks = {
  en: [
    {
      heading: "Products",
      items: [
        { label: "Tier 1 · RCB + KK", href: "#pricing" },
        { label: "Tier 2 · Liftable Dual-Battery + KK", href: "#pricing" },
        { label: "Tier 3 · ZPF + Single Joint", href: "#pricing" },
        { label: "Purchase Channels", href: "#channels" },
      ],
    },
    {
      heading: "Resources",
      items: [
        { label: "OpenArm Docs", href: "https://docs.openarm.dev" },
        { label: "OpenArm Purchase", href: "https://docs.openarm.dev/purchase" },
        { label: "OpenArm Software", href: "https://docs.openarm.dev/software/" },
        { label: "OpenArm Hardware", href: "https://docs.openarm.dev/hardware" },
      ],
    },
    {
      heading: "Company",
      items: [
        { label: "About Us", href: "#contact" },
        { label: "Careers", href: "mailto:careers@openarm.example.com" },
        { label: "Contact", href: "#contact" },
        { label: "Press", href: "mailto:press@openarm.example.com" },
      ],
    },
  ],
  zh: [
    {
      heading: "产品",
      items: [
        { label: "一档 · RCB + KK", href: "#pricing" },
        { label: "二档 · 可升降双电池 + KK", href: "#pricing" },
        { label: "三档 · ZPF + 单关节", href: "#pricing" },
        { label: "购买通道", href: "#channels" },
      ],
    },
    {
      heading: "资源",
      items: [
        { label: "OpenArm 文档", href: "https://docs.openarm.dev" },
        { label: "OpenArm 购买页", href: "https://docs.openarm.dev/purchase" },
        { label: "OpenArm 软件", href: "https://docs.openarm.dev/software/" },
        { label: "OpenArm 硬件", href: "https://docs.openarm.dev/hardware" },
      ],
    },
    {
      heading: "公司",
      items: [
        { label: "关于我们", href: "#contact" },
        { label: "招聘", href: "mailto:careers@openarm.example.com" },
        { label: "联系", href: "#contact" },
        { label: "媒体", href: "mailto:press@openarm.example.com" },
      ],
    },
  ],
} as const;

const copy = {
  en: {
    description:
      "Building the future of intelligent robotics. Autonomous systems for a better world.",
    copyright: "© 2026 OpenArm Robotics. All rights reserved.",
  },
  zh: {
    description: "构建智能机器人的未来，让自主系统服务更好的世界。",
    copyright: "© 2026 OpenArm Robotics. 保留所有权利。",
  },
};

const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
] as const;

export default function Footer() {
  const { language } = useLanguage();
  const t = copy[language];
  const groups = footerLinks[language];

  return (
    <footer className="bg-canvas border-t border-line/60 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-fg font-bold text-lg">OpenArm</span>
              <span className="text-fg-subtle">×</span>
              <span className="px-2.5 py-1 rounded-full border border-cyan-300/30 text-cyan-300 text-xs font-mono tracking-[0.1em]">
                C-OPENARM
              </span>
            </div>
            <p className="text-sm text-fg-subtle leading-relaxed">
              {t.description}
            </p>
          </div>

          <nav
            aria-label={language === "zh" ? "页脚导航" : "Footer navigation"}
            className="flex flex-wrap gap-16"
          >
            {groups.map((group) => (
              <div key={group.heading}>
                <h2 className="text-sm font-semibold text-fg mb-4">
                  {group.heading}
                </h2>
                <ul className="space-y-3">
                  {group.items.map((link) => (
                    <li key={link.label}>
                      {(() => {
                        const isExternal = link.href.startsWith("http");
                        return (
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-fg-subtle hover:text-fg transition-colors"
                      >
                        {link.label}
                      </a>
                        );
                      })()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-line/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-fg-subtle">{t.copyright}</p>
          <div className="flex gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                rel="noopener noreferrer"
                target="_blank"
                className="text-fg-subtle hover:text-fg transition-colors text-sm"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
