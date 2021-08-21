/* eslint-disable */
const withPWA = require("next-pwa");

const nextConfig = {
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    dest: "public",
  },
  crossOrigin: "anonymous",
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    domains: ["images.prismic.io"],
  },
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
