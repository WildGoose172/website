'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { SanityImage } from '@/components/sanity-image'
import { PortableText } from 'next-sanity'

import { cn, normalizeSlug } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { ProjectOverviewQueryResult } from '@/types/sanity'
import { projectOverviewQuery } from '@/sanity/queries'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/client'
import { useLocale } from 'next-intl'

export function ProjectOverview({
  title,
  subtitle,
  cta,
  className,
}: BlockWithMeta<'projectOverview'>) {
  const [items, setItems] = useState<ProjectOverviewQueryResult>([])
  const locale = useLocale()

  useEffect(() => {
    const fetchProjectOverview = async () => {
      try {
        const data = await client.fetch(projectOverviewQuery, {
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
      className={cn('container mx-auto flex flex-col gap-6 py-40', className)}
    >
      <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2>{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-prose">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="grid gap-10">
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
                <h3 className="head-2">{item.teaser?.title}</h3>
                {item.teaser?.text && (
                  <div className="html-richtext">
                    <PortableText value={item.teaser.text} />
                  </div>
                )}
              </div>

              <Button className="w-fit self-end">{cta}</Button>
            </div>

            <Link
              href={normalizeSlug(item.slug)}
              className="absolute inset-0"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
