import type { NextConfig } from "next";

const longTermAssetCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: longTermAssetCache,
      },
      {
        source: "/videos/:path*",
        headers: longTermAssetCache,
      },
      {
        source: "/models/:path*",
        headers: longTermAssetCache,
      },
      {
        source: "/fonts/:path*",
        headers: longTermAssetCache,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "@react-three/drei"],
  },
};

export default nextConfig;
