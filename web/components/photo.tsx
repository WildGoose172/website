'use client'

import { SanityImage } from '@/components/sanity-image'

import { cn } from '@/lib/utils'
import type { Photo } from '@/types/sanity'

export function Photo({
  image,
  alt,
  aspectRatio = 'landscape',
  centered = true,
}: Photo) {
  return (
    <section
      className={cn(
        'relative my-4 overflow-hidden rounded-2xl',
        centered && 'mx-auto',
        aspectRatio === 'square' && 'aspect-square size-80',
        aspectRatio === 'landscape' && 'aspect-video h-80',
        aspectRatio === 'portrait' && 'aspect-[3/4] h-80',
      )}
    >
      <SanityImage
        src={image!}
        alt={alt ?? ''}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        className="object-cover"
      />
    </section>
  )
}
