import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.156"],

  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;