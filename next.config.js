/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud'],
  },
  // Serialize static-page generation to a single worker. The parallel worker
  // pool intermittently loads a mismatched React instance during prerender,
  // throwing "Cannot read properties of null (reading 'useState')".
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
}

module.exports = nextConfig
