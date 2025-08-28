import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "./",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.placeholder.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
