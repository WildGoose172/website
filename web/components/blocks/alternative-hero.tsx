'use client'

import { PortableText } from 'next-sanity'

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
        <h1>{title}</h1>
        <div className="text-muted html-richtext max-w-prose">
          <PortableText value={description ?? []} />
        </div>
      </div>
    </section>
  )
}
