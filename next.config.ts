import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  webpack: (config) => {
    // Ignore hardhat and related packages
    config.externals.push({
      hardhat: "commonjs hardhat",
      "@nomicfoundation/hardhat-toolbox":
        "commonjs @nomicfoundation/hardhat-toolbox",
    });

    return config;
  },
};

export default nextConfig;
