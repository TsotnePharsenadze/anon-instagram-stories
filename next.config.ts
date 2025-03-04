import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent-iad3-2.cdninstagram.com",
      },
    ],
  },
};

export default nextConfig;
