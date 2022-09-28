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
  },
};

module.exports = withPWA(nextConfig);
