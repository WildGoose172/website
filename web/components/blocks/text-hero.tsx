'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function TextHero({
  title,
  description,
  className,
}: BlockWithMeta<'textHero'>) {
  return (
    <section
      className={cn('bg-primary flex min-h-dvh flex-col text-white', className)}
    >
      <div className="container mx-auto flex grow flex-col justify-around gap-20 pb-10 pt-40">
        <Image
          src="/images/goose_with_hat.webp"
          alt="Wild Goose"
          width={150}
          height={208}
          loading="eager"
          className="mx-auto md:ml-20 md:mr-0"
        />
        <div className="self-center sm:self-end">
          <h1 className="text-balance text-center text-4xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="text-muted mx-auto max-w-prose text-balance text-center">
            {description}
          </p>
        </div>
        <div className="head-4 text-muted flex flex-col font-black">
          <span>Fly</span>
          <span>Further</span>
          <span>Together</span>
        </div>
      </div>
    </section>
  )
}
