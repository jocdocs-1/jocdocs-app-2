
import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.156"],

  serverExternalPackages: ["@sparticuz/chromium"],

  outputFileTracingIncludes: {
    "/api/card-studio-export": [
      "./node_modules/@sparticuz/chromium/bin/**/*",
    ],
  },

  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
