import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Suppress Edge Runtime warnings for server-only dependencies
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Disable telemetry
  telemetry: false,
};

export default nextConfig;
