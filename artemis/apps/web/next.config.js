/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@artemis/ui", "@artemis/database"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

module.exports = nextConfig;
