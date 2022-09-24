const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV !== "production",
  dest: "public",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
