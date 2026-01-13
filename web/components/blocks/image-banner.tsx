'use client'

import { SanityImage } from '@/components/sanity-image'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function ImageBanner({
  title,
  image,
  className,
}: BlockWithMeta<'imageBanner'>) {
  return (
    <section className={cn('py-20', className)}>
      <div className="z-1 container relative mx-auto">
        <div className="h-120 container relative z-0 w-full overflow-hidden rounded-2xl">
          <SanityImage
            src={image!}
            alt={image?.alt ?? title ?? ''}
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover"
          />
          <div className="z-1 bg-foreground/50 absolute inset-0" />
          {title && (
            <div className="z-2 text-background relative flex h-full flex-col justify-end p-6">
              <h1>{title}</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
