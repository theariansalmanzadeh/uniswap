/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    domains: ["127.0.0.1"],
  },
};

module.exports = nextConfig;
