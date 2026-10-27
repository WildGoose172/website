import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { withConsentManifest } from 'c15t/next/build'
import { redirectsQuery } from '@/sanity/queries'
import { client } from '@/sanity/client'

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    const redirects = await client.fetch(redirectsQuery)

    return redirects.filter(
      (
        redirect,
      ): redirect is {
        source: string
        destination: string
        permanent: boolean
      } =>
        redirect.source !== null &&
        redirect.destination !== null &&
        redirect.permanent !== null,
    )
  },
}

const withNextIntl = createNextIntlPlugin()
export default withConsentManifest(withNextIntl(nextConfig))
