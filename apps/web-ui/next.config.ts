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
    "@paul/search-ranker",
    "@paul/utils",
    "@paul/ui",
    "@paul/http",
    "@paul/entities",
    "framer-motion",
    "lucide-react",
    "react-icons",
    "usehooks-ts",
    "sonner",
    "vaul",
    "react-i18next",
    "i18next",
    "i18next-browser-languagedetector",
  ],
  turbopack: {},
};

export default withSerwist(nextConfig);
