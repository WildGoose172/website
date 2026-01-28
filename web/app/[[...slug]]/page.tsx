import { PageBuilder } from '@/components/page-builder'
import { Vacancy } from '@/components/templates/vacancy'
import { Policy } from '@/components/templates/policy'

import { routing } from '@/i18n/routing'
import { pageQuery } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { urlForImage } from '@/sanity/image'
import { sanityFetch } from '@/sanity/live'
import { getTranslations } from 'next-intl/server'

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
  const t = await getTranslations('seo')
  const { data: page } = await getPage(params, true)

  if (!page) {
    return {}
  }

  const metadata: Metadata = {
    title: page.seo.title || t('title'),
    description: page.seo.description || t('description'),
    keywords: page.seo.keywords || [],
  }

  const url =
    'image' in page.seo && page.seo.image
      ? urlForImage(page.seo.image).width(1200).height(630).url()
      : 'https://cdn.sanity.io/images/uwf1iyke/production/df2784fc323401821732b75a8e0f11dcda698165-600x315.png'

  metadata.openGraph = {
    images: {
      url,
      width: 1200,
      height: 630,
    },
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
      {(() => {
        switch (page._type) {
          case 'vacancy':
            return <Vacancy {...page} />
          case 'policy':
            return <Policy {...page} />
          default:
            return (
              <PageBuilder
                documentId={page._id}
                documentType={page._type}
                content={page.content}
              />
            )
        }
      })()}
    </div>
  )
}
