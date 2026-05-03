"use client";
import { useLanguage } from "@/lib/language";

const footerLinks = {
  en: [
    {
      heading: "Products",
      items: [
        { label: "TeleBot Lite", href: "#pricing" },
        { label: "TeleBot Pro", href: "#pricing" },
        { label: "TeleBot Enterprise", href: "#pricing" },
        { label: "Vision Module", href: "#features" },
      ],
    },
    {
      heading: "Resources",
      items: [
        { label: "Documentation", href: "#features" },
        { label: "API Reference", href: "#features" },
        { label: "Case Studies", href: "#products" },
        { label: "Blog", href: "#products" },
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
        { label: "TeleBot Lite", href: "#pricing" },
        { label: "TeleBot Pro", href: "#pricing" },
        { label: "TeleBot Enterprise", href: "#pricing" },
        { label: "视觉模块", href: "#features" },
      ],
    },
    {
      heading: "资源",
      items: [
        { label: "文档", href: "#features" },
        { label: "API 参考", href: "#features" },
        { label: "案例研究", href: "#products" },
        { label: "博客", href: "#products" },
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
              <div
                aria-hidden="true"
                className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white font-bold text-xs"
              >
                O
              </div>
              <span className="text-fg font-bold text-lg">OpenArm</span>
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
                      <a
                        href={link.href}
                        className="text-sm text-fg-subtle hover:text-fg transition-colors"
                      >
                        {link.label}
                      </a>
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
