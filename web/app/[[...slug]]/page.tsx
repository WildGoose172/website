import { PageBuilder } from '@/components/page-builder'

import { client } from '@/sanity/client'
import { routing } from '@/i18n/routing'
import { pageQuery } from '@/sanity/queries'
import { PageQueryResult } from '@/types/sanity'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { urlForImage } from '@/sanity/image'

async function getPage(params: PageProps<'/[[...slug]]'>['params']) {
  const { isEnabled } = await draftMode()
  const { slug } = await params

  const [language, ...routeSegments] = slug || [routing.defaultLocale]

  const page = await client.fetch<PageQueryResult>(
    pageQuery,
    {
      slug: routeSegments.join('/') || '/',
      language,
    },
    isEnabled
      ? {
          perspective: 'drafts',
          useCdn: false,
          stega: true,
        }
      : undefined,
  )

  return { data: page }
}

export async function generateMetadata({
  params,
}: PageProps<'/[[...slug]]'>): Promise<Metadata> {
  const { data: page } = await getPage(params)

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
