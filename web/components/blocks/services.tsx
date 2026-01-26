'use client'

import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { SanityImage } from '@/components/sanity-image'

import { cn, normalizeSlug } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { BlockWithMeta } from '@/types/blocks'

export function Services({
  image,
  services,
  className,
}: BlockWithMeta<'services'>) {
  const t = useTranslations()

  const mask =
    "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20120%22%3E%3Cpath%20d%3D%22M0%2C0H190A10%2C10%200%2C0%2C1%20200%2C10V90A10%2C10%200%2C0%2C1%20190%2C100H170A10%2C10%200%2C0%2C0%20160%2C110V110A10%2C10%200%2C0%2C1%20150%2C120H30A10%2C10%200%2C0%2C1%2020%2C110V70A10%2C10%200%2C0%2C0%2010%2C60H10A10%2C10%200%2C0%2C1%200%2C50V30A10%2C10%200%2C0%2C1%2010%2C20H50A10%2C10%200%2C0%2C0%2060%2C10V10A10%2C10%200%2C0%2C1%2070%2C0%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fsvg%3E')"

  return (
    <section className={cn('bg-primary py-20 text-white', className)}>
      <div className="container mx-auto grid gap-x-10 gap-y-20 lg:grid-cols-2">
        <div
          className="relative z-0 order-2 mx-auto max-w-xl overflow-hidden lg:order-1 lg:mx-0 lg:self-center"
          style={{
            aspectRatio: '6/3.29',
            maskImage: mask,
            WebkitMaskImage: mask,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
          }}
        >
          <SanityImage
            src={image!}
            alt={image?.alt || ''}
            width={600}
            height={300}
            className="h-auto w-full max-w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <h2 className="text-4xl">{t('services')}</h2>
          <div className="grid gap-4 min-[500px]:grid-cols-2 2xl:grid-cols-4">
            {(services ?? []).map(service => (
              <Link
                key={service._key}
                href={normalizeSlug(service.link?.slug)}
                className="hover:bg-muted/10 hover:scale-102 group w-full rounded-lg border bg-transparent p-3 transition duration-300"
              >
                <div className="flex min-h-[200px] flex-col gap-4">
                  <span className="text-muted text-xs uppercase">
                    {t('services')}
                  </span>
                  <h3>{service.name}</h3>
                </div>
                <ArrowRight className="ml-auto size-5 transition-transform duration-300 group-hover:-rotate-45" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
