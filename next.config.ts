import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  images: { unoptimized: true, formats: ["image/avif", "image/webp"], qualities: [75, 90] },
};
export default config;
