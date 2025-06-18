import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.example.com",
      "firebasestorage.googleapis.com", // Add this line
    ],
  },
};

export default nextConfig;
