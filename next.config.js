/** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa');
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    domains: ["127.0.0.1"],
  },
};

module.exports = withPWA(nextConfig);
