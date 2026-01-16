'use client'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { QuoteIcon } from 'lucide-react'

export function Quote({
  quote,
  author,
  bgBlur = true,
  className,
}: BlockWithMeta<'quote'>) {
  return (
    <section
      className={cn(
        'pt-30 container relative mx-auto flex flex-col items-center justify-center gap-8 pb-20 md:flex-row md:items-start',
        className,
      )}
    >
      <div className="relative">
        <QuoteIcon className="size-20" />
        {bgBlur && <GradientBackground className="-z-1 -inset-30 absolute" />}
      </div>

      <div>
        <blockquote className="prose-lg head-4 mx-auto max-w-3xl text-center">
          {quote}
        </blockquote>
        {author && (
          <p className="text-muted-foreground mt-4 text-center text-sm italic">
            {author}
          </p>
        )}
      </div>
    </section>
  )
}

function GradientBackground({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('', className)}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="blur-gradient" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
        </filter>
        <radialGradient id="gradient-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#CD6158" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#CDB958" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#CD6158" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="400"
        cy="400"
        r="300"
        fill="url(#gradient-fill)"
        filter="url(#blur-gradient)"
      />
    </svg>
  )
}
