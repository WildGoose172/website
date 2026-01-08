'use client'

import { Locale, useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface LocaleSwitchProps {
  className?: string
}

export function LocaleSwitch({ className }: LocaleSwitchProps) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const currentLocale = useLocale()

  function setLocale(nextLocale: Locale) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
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
