/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is enabled by default in Next.js 13+
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  // Ensure proper handling of environment variables
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client')
    }
    return config
  },
}

module.exports = nextConfig
