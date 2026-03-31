import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "@done/search-ranker",
    "@done/utils",
    "@done/ui",
    "@done/http",
  ],
  turbopack: {},
};

export default withSerwist(nextConfig);
