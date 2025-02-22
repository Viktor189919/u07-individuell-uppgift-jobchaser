import type { NextConfig } from "next";

const nextConfig: NextConfig = {

};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arbetsformedlingen.se",
      }
    ]
  }
}



export default nextConfig;
