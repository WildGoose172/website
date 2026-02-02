'use client'

import { SanityImage } from '@/components/sanity-image'

import { cn } from '@/lib/utils'
import type { Photo as PhotoProps } from '@/types/sanity'
import { getImageDimensions, SanityImageSource } from '@sanity/asset-utils'

export function Photo({
  image,
  alt,
  keepOriginalSize = false,
  aspectRatio = 'landscape',
  centered = true,
}: PhotoProps) {
  const dimensions = image
    ? getImageDimensions(image as SanityImageSource)
    : null

  const aspectRatios: Record<NonNullable<PhotoProps['aspectRatio']>, string> = {
    square: 'aspect-square size-80 max-h-80 max-w-80',
    landscape: 'aspect-video max-h-80',
    portrait: 'aspect-[3/4] max-h-80',
  }

  return (
    <section
      className={cn(
        'my-4 overflow-hidden rounded-2xl',
        centered && 'mx-auto',
        keepOriginalSize
          ? 'inline-block'
          : `relative ${aspectRatios[aspectRatio]}`,
      )}
    >
      <SanityImage
        src={image!}
        alt={alt ?? ''}
        {...(keepOriginalSize && dimensions
          ? {
              width: dimensions.width,
              height: dimensions.height,
            }
          : {
              fill: true,
              sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
            })}
        loading="lazy"
        className={cn(!keepOriginalSize && 'object-cover')}
      />
    </section>
  )
}
