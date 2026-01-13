'use client'

import { SanityImage } from '@/components/sanity-image'
import { PortableText } from '@portabletext/react'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function ImageText({
  title,
  text,
  image,
  imageRounded = true,
  imagePosition = 'right',
  className,
}: BlockWithMeta<'imageText'>) {
  if (!image) {
    return null
  }

  return (
    <section
      className={cn(
        'container mx-auto grid gap-x-10 gap-y-6 py-20',
        (imagePosition === 'left' || imagePosition === 'right') &&
          'lg:grid-cols-2',
        (imagePosition === 'top' || imagePosition === 'bottom') &&
          'max-w-prose',
        className,
      )}
    >
      <div
        className={cn(
          'space-y-6',
          imagePosition === 'right' && 'lg:order-1',
          imagePosition === 'left' && 'lg:order-2',
          imagePosition === 'top' && 'order-2',
        )}
      >
        <h2>{title}</h2>
        <div className="html-richtext">
          <PortableText value={text!} />
        </div>
      </div>

      <SanityImage
        src={image}
        alt={image?.alt || ''}
        width={400}
        height={225}
        loading="lazy"
        className={cn(
          imageRounded && 'rounded-md',
          'border-primary aspect-[37/24] w-full object-contain lg:aspect-[65/34]',
          imagePosition === 'right' && 'lg:order-2',
          imagePosition === 'left' && 'lg:order-1',
          imagePosition === 'top' && 'order-1',
        )}
      />
    </section>
  )
}
