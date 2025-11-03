/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'CryptoLearn',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
}

export default nextConfig
