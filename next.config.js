/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is enabled by default in Next.js 13+
  
  // Turbopack configuration
  experimental: {
    // Enable Turbopack for development (already enabled via --turbo flag)
    turbo: {
      // Turbopack-specific configurations can be added here
    }
  },
  
  // Optimize for Turbopack
  swcMinify: true, // Use SWC for minification (faster than Terser)
  
  // Remove any Webpack-specific configurations
  webpack: undefined,
}

module.exports = nextConfig
