/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.evbuc.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // The redesign folds "Why join NCMA" into the chapter page; keep old links working.
      {
        source: '/why-join',
        destination: '/about#why-join',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
