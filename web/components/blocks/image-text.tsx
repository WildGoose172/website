'use client'

import { SanityImage } from '@/components/sanity-image'
import { RichText } from '@/components/richtext'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function ImageText({
  title,
  text,
  image,
  imageRounded = true,
  imagePosition = 'right',
  textAlignment = 'center',
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
          'flex flex-col gap-y-6',
          imagePosition === 'right' && 'lg:order-1',
          imagePosition === 'left' && 'lg:order-2',
          imagePosition === 'top' && 'order-2',
          textAlignment === 'top' && 'justify-start',
          textAlignment === 'center' && 'justify-center',
          textAlignment === 'bottom' && 'justify-end',
        )}
      >
        <h2>{title}</h2>
        <div className="html-richtext max-w-prose">
          <RichText text={text!} />
        </div>
      </div>

      <div
        className={cn(
          imagePosition === 'right' && 'lg:order-2',
          imagePosition === 'left' && 'lg:order-1',
          imagePosition === 'top' && 'order-1',
          imageRounded && 'rounded-md',
        )}
      >
        <SanityImage
          src={image}
          alt={image?.alt || ''}
          height={630}
          width={1385}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  )
}
