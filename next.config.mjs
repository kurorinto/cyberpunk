import 'dotenv/config'

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
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
  },
}

export default nextConfig
