import { PageBuilder } from '@/components/page-builder'

import { routing } from '@/i18n/routing'
import { pageQuery } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { urlForImage } from '@/sanity/image'
import { sanityFetch } from '@/sanity/live'

async function getPage(
  params: PageProps<'/[[...slug]]'>['params'],
  meta?: boolean,
) {
  const { isEnabled } = await draftMode()
  const { slug } = await params

  const [language, ...routeSegments] = slug || [routing.defaultLocale]

  const page = await sanityFetch({
    query: pageQuery,
    params: {
      slug: routeSegments.join('/') || '/',
      language,
      options: isEnabled
        ? {
            perspective: 'drafts',
            useCdn: false,
            stega: true,
          }
        : undefined,
    },
    ...(meta ? { perspective: 'published', stega: false } : {}),
  })

  return page
}

export async function generateMetadata({
  params,
}: PageProps<'/[[...slug]]'>): Promise<Metadata> {
  const { data: page } = await getPage(params, true)

  if (!page) {
    return {}
  }

  const metadata: Metadata = {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
  }

  if (page.seo.image) {
    metadata.openGraph = {
      images: {
        url: urlForImage(page.seo.image).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      },
    }
  }

  return metadata
}

export default async function IndexPage({ params }: PageProps<'/[[...slug]]'>) {
  const { data: page } = await getPage(params)

  if (!page) {
    return notFound()
  }

  return (
    <div className="min-h-screen">
      <PageBuilder
        documentId={page._id}
        documentType={page._type}
        content={page.content}
      />
    </div>
  )
}
