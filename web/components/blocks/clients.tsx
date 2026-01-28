'use client'

import { SanityImage } from '@/components/sanity-image'
import { Link } from '@/i18n/navigation'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function Clients({
  title,
  subtitle,
  clients,
  className,
}: BlockWithMeta<'clients'>) {
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
          <Link
            key={client.name}
            href={client.clientWebsite || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted hover:scale-102 relative flex items-center justify-center rounded-2xl p-10 transition-transform duration-300"
          >
            <SanityImage
              src={client.image!}
              alt={client.image?.alt ?? client.name ?? 'Client Logo'}
              width={150}
              height={75}
              loading="lazy"
              className="h-auto w-full object-contain grayscale"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
