import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("bcrypt");
    return config;
  },
};

export default nextConfig;
