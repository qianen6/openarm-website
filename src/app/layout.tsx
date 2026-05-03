import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://openarm.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpenArm — Next-Gen Intelligent Robotics Platform",
    template: "%s · OpenArm Robotics",
  },
  description:
    "Build, deploy, and scale autonomous robotic systems with cutting-edge AI. From industrial automation to collaborative humanoid partners.",
  keywords: [
    "OpenArm",
    "robotic arm",
    "humanoid",
    "teleoperation",
    "ROS 2",
    "embodied AI",
    "research robotics",
  ],
  applicationName: "OpenArm",
  authors: [{ name: "OpenArm Robotics" }],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "zh-CN": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "OpenArm Robotics",
    title: "OpenArm — Next-Gen Intelligent Robotics Platform",
    description:
      "Build, deploy, and scale autonomous robotic systems with cutting-edge AI.",
    url: SITE_URL,
    images: [
      {
        url: "/images/robot-hero.jpg",
        width: 1200,
        height: 630,
        alt: "OpenArm flagship 7-DOF collaborative robotic arm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenArm — Next-Gen Intelligent Robotics Platform",
    description:
      "Build, deploy, and scale autonomous robotic systems with cutting-edge AI.",
    images: ["/images/robot-hero.jpg"],
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
  themeColor: "#0a0a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OpenArm Pro X1",
  description:
    "7-DOF collaborative research-grade robotic arm with 20 kg payload capacity, ±0.02 mm repeatability, and a 1300 mm reach.",
  brand: { "@type": "Brand", name: "OpenArm Robotics" },
  category: "Robotics",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "8900",
    highPrice: "52000",
    priceCurrency: "USD",
    offerCount: "3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
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
