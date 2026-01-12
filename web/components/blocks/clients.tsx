'use client'

import { SanityImage } from '@/components/sanity-image'

import { cn } from '@/lib/utils'
import { ClientsBlock } from '@/types/blocks'

export function Clients({ title, subtitle, clients, className }: ClientsBlock) {
  return (
    <section
      className={cn(
        'container mx-auto flex grid flex-col gap-y-6 py-20',
        className,
      )}
    >
      <div className="">
        <h2>{title}</h2>
        <p className="text-muted-foreground max-w-prose">{subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {(clients ?? []).map(client => (
          <div
            key={client.name}
            className="bg-muted flex items-center justify-center rounded-2xl p-10"
          >
            <SanityImage
              src={client.image!}
              alt={client.name ?? 'Client Logo'}
              width={150}
              height={75}
              className="h-auto w-full object-contain grayscale"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
