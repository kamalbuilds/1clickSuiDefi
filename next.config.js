/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.martianwallet.xyz',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}
module.exports = nextConfig
