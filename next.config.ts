import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
