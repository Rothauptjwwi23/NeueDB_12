/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add explicit resolution for jsonwebtoken
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      crypto: false,
      stream: false
    };
    return config;
  },
};

module.exports = nextConfig;