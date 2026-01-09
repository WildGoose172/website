import { PageBuilder } from '@/components/page-builder'

import { client } from '@/sanity/client'
import { routing } from '@/i18n/routing'
import { pageQuery } from '@/sanity/queries'
import { PageQueryResult } from '@/types/sanity'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'

export default async function IndexPage({ params }: PageProps<'/[[...slug]]'>) {
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
