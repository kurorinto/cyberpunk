import "dotenv/config"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // sitecdn.zcycdn.com
    remotePatterns: [
      {
        hostname: "sitecdn.zcycdn.com",
      },
    ],
  },
}

export default nextConfig
