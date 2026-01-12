'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { PageQueryResult } from '@/types/sanity'

type TextHeroBlock = Extract<
  NonNullable<NonNullable<PageQueryResult>['content']>[number],
  { _type: 'textHero' }
>

type TextHeroProps = TextHeroBlock & {
  documentId: string
  documentType: string
  className?: string
}

export function TextHero({ title, description, className }: TextHeroProps) {
  return (
    <section
      className={cn('bg-primary flex min-h-dvh flex-col text-white', className)}
    >
      <div className="container mx-auto flex grow flex-col justify-around gap-20 pb-10 pt-40">
        <Image
          src="/images/flat-goose.webp"
          alt="Wild Goose"
          width={200}
          height={146}
          className="sm:ml-20"
        />
        <div className="self-center sm:self-end">
          <h1 className="text-balance text-center text-4xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="text-muted mx-auto max-w-prose text-balance text-center">
            {description}
          </p>
        </div>
        <div className="head-4 text-muted flex flex-col">
          <span>Fly</span>
          <span>Further</span>
          <span>Together</span>
        </div>
      </div>
    </section>
  )
}
