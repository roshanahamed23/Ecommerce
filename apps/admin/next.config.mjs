/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDINARY_CLOUDNAME: process.env.CLOUDINARY_CLOUDNAME,
    CLOUDINARY_APIKEY: process.env.CLOUDINARY_APIKEY,
    CLOUDINARY_APISECRET: process.env.CLOUDINARY_APISECRET,
    UPSTASH_URL: process.env.UPSTASH_URL,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_TOKEN: process.env.REDIS_TOKEN,
  }

};

export default nextConfig;
