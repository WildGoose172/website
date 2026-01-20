'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { SanityImage } from '@/components/sanity-image'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import AutoPlay from 'embla-carousel-autoplay'

export function CardCarousel({
  title,
  cards,
  className,
}: BlockWithMeta<'cardCarousel'>) {
  return (
    <section
      className={cn('container mx-auto flex flex-col gap-6 py-20', className)}
    >
      <h2>{title}</h2>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[AutoPlay({})]}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {(cards ?? []).map(card => (
            <CarouselItem
              key={card._key}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="group flex flex-col gap-2 p-1">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <SanityImage
                    src={card.image!}
                    alt={card.image?.alt ?? ''}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="head-4">{card.label}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-end gap-2 pt-6">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      </Carousel>
    </section>
  )
}
