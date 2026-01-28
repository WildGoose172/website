import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/live'
import { sitemapQuery } from '@/sanity/queries'
import { routing } from '@/i18n/routing'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data: paths } = await sanityFetch({
      query: sitemapQuery,
      perspective: 'published',
      stega: false,
    })

    if (!paths) return []

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

    const url = (path: string, language: string) => {
      let href = path.replace(/\/+/g, '/')

      if (language !== routing.defaultLocale) {
        href = `/${language}${href.startsWith('/') ? '' : '/'}${href}`
      }

      const fullUrl = new URL(href, baseUrl).toString()
      return fullUrl.endsWith('/') ? fullUrl.slice(0, -1) : fullUrl
    }

    return paths.map(path => ({
      url: url(path.href!, path.language || routing.defaultLocale),
      lastModified: new Date(path._updatedAt),
      changeFrequency: 'weekly',
      priority: 1,
    }))
  } catch {
    return []
  }
}
