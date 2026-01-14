import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value:
              "ALLOW FROM 'self' https://*.sanity.io https://www.sanity.io",
          },
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://*.sanity.io https://www.sanity.io",
          },
        ],
      },
    ]
  },
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
