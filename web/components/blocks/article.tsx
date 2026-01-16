'use client'

import { RichText } from '@/components/richtext'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function Article({
  text,
  constrained = true,
  topPadding = false,
  className,
}: BlockWithMeta<'article'>) {
  return (
    <section
      className={cn(
        'html-richtext container mx-auto',
        constrained && 'md:max-w-prose',
        topPadding && 'pt-30',
        className,
      )}
    >
      <RichText text={text} />
    </section>
  )
}
