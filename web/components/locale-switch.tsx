'use client'

import { cn, normalizeSlug } from '@/lib/utils'
import { Locale, useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { client } from '@/sanity/client'
import { localeQuery } from '@/sanity/queries'

interface LocaleSwitchProps {
  className?: string
}

export function LocaleSwitch({ className }: LocaleSwitchProps) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const currentLocale = useLocale()

  async function setLocale(nextLocale: Locale) {
    const data = await client.fetch(localeQuery, {
      slug: pathname.startsWith('/') ? pathname.slice(1) : pathname,
      language: currentLocale,
    })

    const newLocalePage = data?._translations.find(
      page => page && page.language === nextLocale,
    )
    const newSlug = newLocalePage ? normalizeSlug(newLocalePage?.slug) : '/'

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      { pathname: newSlug, params },
      { locale: nextLocale },
    )
  }

  return (
    <div className={cn('flex rounded-full border p-0.5', className)}>
      {routing.locales.map(locale => {
        const current = currentLocale === locale

        return (
          <button
            key={locale}
            disabled={current}
            className={[
              'rounded-full px-2 py-0.5 text-sm uppercase transition-colors duration-300',
              current ? 'bg-muted' : 'bg-transparent',
            ].join(' ')}
            onClick={() => setLocale(locale)}
          >
            {locale}
          </button>
        )
      })}
    </div>
  )
}
