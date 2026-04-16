import type { NextConfig } from "next";
import path from "path";

const repoName = "aca-companion-app";
const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.GH_PAGES === "1" ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
