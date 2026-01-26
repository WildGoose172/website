'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { SanityImage } from '@/components/sanity-image'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { FlockTalkOverviewQueryResult } from '@/types/sanity'
import { flockTalkOverviewQuery } from '@/sanity/queries'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/client'
import { useLocale, useTranslations } from 'next-intl'
import { normalizeSlug } from '@/lib/utils'
import { PortableText } from 'next-sanity'

export function FlockTalkOverview({
  cta,
  className,
}: BlockWithMeta<'flockTalkOverview'>) {
  const [items, setItems] = useState<FlockTalkOverviewQueryResult>([])
  const locale = useLocale()
  const t = useTranslations()

  useEffect(() => {
    const fetchProjectOverview = async () => {
      try {
        const data = await client.fetch(flockTalkOverviewQuery, {
          language: locale,
        })

        setItems(data || [])
      } catch (error) {
        console.error('Failed to fetch project overview:', error)
      }
    }

    fetchProjectOverview()
  }, [locale])

  return (
    <section
      className={cn('container mx-auto grid gap-10 pb-0 pt-40', className)}
    >
      {items.map(item => (
        <div
          className="bg-muted hover:scale-102 relative grid overflow-hidden rounded-2xl transition-transform duration-300 md:grid-cols-2"
          key={item._id}
        >
          <div className="relative aspect-video h-full w-full grow">
            <SanityImage
              src={item.teaser!.thumbnail!}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 p-10">
            <div className="flex grow flex-col gap-2">
              <h2>{item.teaser?.title}</h2>
              {item.teaser?.text && (
                <div className="html-richtext">
                  <PortableText value={item.teaser.text} />
                </div>
              )}
            </div>

            <Button
              aria-label={item.teaser?.title || t('viewFlockTalk')}
              className="w-fit self-end"
            >
              {cta}
            </Button>
          </div>

          <Link
            href={normalizeSlug(item.slug)}
            aria-label={item.teaser?.title || t('viewFlockTalk')}
            className="absolute inset-0"
          />
        </div>
      ))}
    </section>
  )
}
