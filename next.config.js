/* eslint-disable */
const withPWA = require("next-pwa");

const redirects = async () => [
  {
    source: "/robots.txt",
    destination: "/api/robots",
    permanent: true,
  },
];

const nextConfig = {
  redirects,
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
