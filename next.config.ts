import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  webpack: (config, { isServer }) => {
    // Ignore hardhat and contract files during build
    config.externals = config.externals || [];
    config.externals.push({
      hardhat: "commonjs hardhat",
      "@nomicfoundation/hardhat-toolbox":
        "commonjs @nomicfoundation/hardhat-toolbox",
    });

    // Ignore .sol files and hardhat artifacts
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.sol$/,
      use: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;
