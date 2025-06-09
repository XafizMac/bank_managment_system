/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  experimental: {
    serverComponentsExternalPackages: ['prisma']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
