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
  serverRuntimeConfig: {
    // Will only be available on the server side
    eventbriteApiKey: process.env.EVENTBRITE_API_KEY,
    eventbriteOrganizationId: process.env.EVENTBRITE_ORGANIZATION_ID,
  },
}

module.exports = nextConfig
