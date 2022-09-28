const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV !== "production",
  dest: "public",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.prismic.io"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

module.exports = withPWA(nextConfig);
