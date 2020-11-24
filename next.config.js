/* eslint-disable */
const withPWA = require("next-pwa");

const redirects = async () => [
  {
    source: "/robots.txt",
    destination: "/api/robots",
    permanent: true,
  },
  {
    source: "/sitemap.xml",
    destination: "/api/sitemap",
    permanent: true,
  },
];

let nextConfig = {
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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};

module.exports = withPWA(nextConfig);
