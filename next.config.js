const notProduction = process.env.NODE_ENV !== "production";

const withPWA = require("next-pwa")({
  disable: notProduction,
  dest: "public",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  reactStrictMode: true,
  images: {
    domains: ["images.prismic.io"],
  },
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Accept-CH",
            value: "Sec-CH-Prefers-Color-Scheme",
          },
          {
            key: "Vary",
            value: "Sec-CH-Prefers-Color-Scheme",
          },
          {
            key: "Critical-CH",
            value: "Sec-CH-Prefers-Color-Scheme",
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
