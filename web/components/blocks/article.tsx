'use client'

import { RichText } from '@/components/richtext'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function Article({
  text,
  constrained = true,
  className,
}: BlockWithMeta<'article'>) {
  return (
    <section
      className={cn(
        'html-richtext container mx-auto',
        constrained && 'md:max-w-prose',
        className,
      )}
    >
      <RichText text={text} />
    </section>
  )
}
