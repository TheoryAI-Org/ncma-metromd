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
      // The redesign folds "Why join NCMA" into the chapter page.
      { source: "/why-join", destination: "/our-chapter", permanent: true },
    ];
  },
}

module.exports = nextConfig
