'use client'

import { CornerDownRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { SanityImage } from '@/components/sanity-image'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { RelatedFlockTalksQueryResult } from '@/types/sanity'
import { relatedFlockTalksQuery } from '@/sanity/queries'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/client'

export function RelatedFlockTalk({
  title,
  subtitle,
  cta,
  documentId,
  className,
}: BlockWithMeta<'relatedFlockTalk'>) {
  const [items, setItems] = useState<RelatedFlockTalksQueryResult>([])

  useEffect(() => {
    const fetchRelatedTalks = async () => {
      try {
        const data = await client.fetch(relatedFlockTalksQuery, {
          currentDocumentId: documentId,
          language: 'nl',
        })

        setItems(data || [])
      } catch (error) {
        console.error('Failed to fetch related flock talks:', error)
      }
    }

    fetchRelatedTalks()
  }, [documentId])

  return (
    <section
      className={cn('container mx-auto flex flex-col gap-6 pt-40', className)}
    >
      <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2>{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-prose">{subtitle}</p>
          )}
        </div>

        {cta?.label && cta?.link && (
          <Button variant={cta.variant} size={cta.size} asChild>
            <Link href={cta.link}>
              <CornerDownRight />
              {cta.label}
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-x-4 gap-y-8 lg:grid-cols-4">
        {items.map((item, i) => (
          <Link
            href={item.slug || '#'}
            key={item._id}
            className={[
              i === 0 ? 'lg:col-span-2' : 'col-span-1',
              'group flex flex-col gap-4',
            ].join(' ')}
          >
            <div className="relative h-[22.75rem] overflow-hidden rounded-2xl border">
              <SanityImage
                src={item.thumbnail!}
                alt="Flock Talk Thumbnail"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h4 className="group-hover:underline">{item.title}</h4>
          </Link>
        ))}
      </div>
    </section>
  )
}
