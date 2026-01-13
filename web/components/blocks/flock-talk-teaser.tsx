'use client'

import { CornerDownRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { SanityImage } from '@/components/sanity-image'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function FlockTalkTeaser({
  title,
  subtitle,
  ctaLabel,
  ctaLink,
  items,
  className,
}: BlockWithMeta<'flockTalkTeaser'>) {
  return (
    <section
      className={cn('container mx-auto flex flex-col gap-6 py-20', className)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2>{title}</h2>
          <p className="text-muted-foreground max-w-prose">{subtitle}</p>
        </div>

        {ctaLabel && ctaLink && (
          <Button variant="outline" size="sm" asChild>
            <Link href={ctaLink}>
              <CornerDownRight />
              {ctaLabel}
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-x-4 gap-y-8 lg:grid-cols-4">
        {(items ?? []).map((item, i) => (
          <Link
            href={item.slug || '#'}
            key={item._key}
            className={[
              i === 0 ? 'lg:col-span-2' : 'col-span-1',
              'group flex flex-col gap-4',
            ].join(' ')}
          >
            <div className="h-[22.75rem] overflow-hidden rounded-2xl border">
              <SanityImage
                src={item.thumbnail!}
                alt="Flock Talk Thumbnail"
                width={400}
                height={225}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h4 className="group-hover:underline">{item.title}</h4>
          </Link>
        ))}
      </div>
    </section>
  )
}
