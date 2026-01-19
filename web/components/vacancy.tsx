import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { CircleEye, Circle } from '@/components/icons'
import { ArrowLeft, Clock, MapPin } from 'lucide-react'
import { PortableText } from 'next-sanity'

import { normalizeSlug } from '@/lib/utils'
import { PageTemplate } from '@/types/blocks'

export function Vacancy({
  hero,
  intro,
  role,
  offer,
  backButton,
}: PageTemplate<'vacancy'>) {
  return (
    <section>
      <div className="bg-primary grid gap-16 pb-40 pt-20">
        {backButton?.page && (
          <div className="container">
            <Button variant="secondary" asChild>
              <Link href={normalizeSlug(backButton.page)}>
                <ArrowLeft />
                {backButton.label}
              </Link>
            </Button>
          </div>
        )}

        <div className="text-muted container grid gap-6">
          {(hero?.location || hero?.hours) && (
            <div className="flex flex-wrap items-center gap-4">
              {hero?.location && (
                <div className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm">
                  <MapPin className="size-4 min-w-4" />
                  {hero.location}
                </div>
              )}
              {hero?.hours && (
                <div className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm">
                  <Clock className="size-4 min-w-4" />
                  {hero.hours}
                </div>
              )}
            </div>
          )}

          <h1>{hero?.title}</h1>
          <div className="html-richtext max-w-prose">
            <PortableText value={hero?.description || []} />
          </div>
        </div>
      </div>

      <div className="bg-foreground text-background -mt-10 rounded-2xl py-20">
        <div className="container grid gap-10 md:grid-cols-2">
          <CircleEye className="text-primary mx-auto max-w-60" />

          <div className="container flex flex-col gap-6">
            <h2>{intro?.title}</h2>
            <div className="html-richtext max-w-prose">
              <PortableText value={intro?.description || []} />
            </div>
          </div>

          <div className="container flex flex-col gap-6">
            <h2>{role?.title}</h2>
            <div className="html-richtext max-w-prose">
              <PortableText value={role?.description || []} />
            </div>
          </div>

          <Circle className="text-primary mx-auto max-w-60" />
        </div>
      </div>

      <div className="container mx-auto flex max-w-prose flex-col gap-6 pt-20">
        <h2>{offer?.title}</h2>
        <div className="html-richtext">
          <PortableText value={offer?.description || []} />
        </div>
      </div>
    </section>
  )
}
