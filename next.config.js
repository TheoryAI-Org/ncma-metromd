/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Defaults are app/pages/components/lib/src; add test/ so `npm run lint`
    // covers the test harness too, not just application source.
    dirs: ['app', 'components', 'lib', 'test'],
  },
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
