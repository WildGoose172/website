'use client'

import { PortableText } from 'next-sanity'
import { TextAnimate } from '@/components/ui/text-animate'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function AlternativeHero({
  title,
  description,
  backgroundColor = 'bg-primary',
  className,
}: BlockWithMeta<'alternativeHero'>) {
  return (
    <section
      className={cn(
        backgroundColor,
        'text-background rounded-b-2xl',
        className,
      )}
    >
      <div className="pt-30 container flex flex-col gap-6 pb-20">
        <TextAnimate
          animation="blurInUp"
          by="word"
          once
          as="h1"
          className="max-w-4xl"
        >
          {title ?? ''}
        </TextAnimate>
        <div className="text-muted html-richtext max-w-prose">
          <PortableText value={description ?? []} />
        </div>
      </div>
    </section>
  )
}
