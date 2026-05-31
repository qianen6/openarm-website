import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SITE_URL, withBasePath } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mobile OpenArm X1 — AMR x OpenArm Embodied AI Platform",
    template: "%s · Mobile OpenArm X1",
  },
  description:
    "Mobile OpenArm X1 combines dual-arm manipulation, lidar AMR mobility, open-source software, and embodied AI model workflows for research-grade robotics.",
  keywords: [
    "OpenArm",
    "Mobile OpenArm X1",
    "AMR robot",
    "lidar navigation",
    "teleoperation",
    "ROS 2",
    "LeRobot",
    "embodied AI",
    "research robotics",
  ],
  applicationName: "Mobile OpenArm X1",
  authors: [{ name: "NVatom Open Source" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Mobile OpenArm X1",
    title: "Mobile OpenArm X1 — AMR x OpenArm Embodied AI Platform",
    description:
      "A research-grade embodied AI robot platform with dual arms, lidar AMR mobility, open-source software, and simulation workflows.",
    url: SITE_URL,
    images: [
      {
        url: withBasePath("/images/openarm-dualbattery-kk.png"),
        width: 1200,
        height: 630,
        alt: "Mobile OpenArm X1 embodied AI robot platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile OpenArm X1 — AMR x OpenArm Embodied AI Platform",
    description:
      "A research-grade embodied AI robot platform with dual arms, lidar AMR mobility, open-source software, and simulation workflows.",
    images: [withBasePath("/images/openarm-dualbattery-kk.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Mobile OpenArm X1",
  description:
    "19-DOF research-grade embodied AI robot platform with dual-arm manipulation, 10 kg payload capacity, ±1 mm repeatability, and a 1300 mm reach.",
  brand: { "@type": "Brand", name: "NVatom Open Source" },
  category: "Robotics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </body>
    </html>
  );
}
