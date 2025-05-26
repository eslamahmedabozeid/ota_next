import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.lorem.space",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "backend.saudi-skills.mtjrsahl-ksa.com",
      },
 
      {
        protocol: "https",
        hostname: "backend.saudi-skills.com",
      },
      {
        protocol: "https",
        hostname: "backend.ota.mtjrsahl-ksa.com",
      },
      {
        protocol: "https",
        hostname: "saldwich-images.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
