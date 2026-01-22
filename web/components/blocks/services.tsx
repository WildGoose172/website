'use client'

import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

import { cn, normalizeSlug } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { BlockWithMeta } from '@/types/blocks'

export function Services({ services, className }: BlockWithMeta<'services'>) {
  const t = useTranslations()

  return (
    <section className={cn('bg-primary py-20 text-white', className)}>
      <div className="container mx-auto grid gap-x-10 gap-y-20 lg:grid-cols-2">
        <div
          className="relative z-0 order-2 mx-auto max-w-xl overflow-hidden lg:order-1 lg:mx-0 lg:self-center"
          style={{
            aspectRatio: '6/3.29',
            maskImage:
              "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
            WebkitMaskImage:
              "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
          }}
        >
          <video className="object-cover" autoPlay loop muted playsInline>
            <source src="/videos/goose.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <h2 className="text-4xl">{t('services')}</h2>
          <ul className="grid gap-4 min-[500px]:grid-cols-2 2xl:grid-cols-4">
            {(services ?? []).map(service => (
              <Link
                key={service._key}
                href={normalizeSlug(service.link?.slug)}
                className="hover:bg-muted/10 hover:scale-102 group w-full rounded-lg border bg-transparent p-3 transition duration-300"
              >
                <li>
                  <div className="flex min-h-[200px] flex-col gap-4">
                    <span className="text-muted text-xs uppercase">
                      {t('services')}
                    </span>
                    <h3>{service.name}</h3>
                  </div>
                  <ArrowRight className="ml-auto size-5 transition-transform duration-300 group-hover:-rotate-45" />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
