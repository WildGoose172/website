'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { PortableText } from 'next-sanity'

import { cn, normalizeSlug } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { VacancyOverviewQueryResult } from '@/types/sanity'
import { vacancyOverviewQuery } from '@/sanity/queries'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/client'
import { useLocale, useTranslations } from 'next-intl'

export function VacancyOverview({
  title,
  cta,
  className,
}: BlockWithMeta<'vacancyOverview'>) {
  const [items, setItems] = useState<VacancyOverviewQueryResult>([])
  const locale = useLocale()
  const t = useTranslations()

  useEffect(() => {
    const fetchProjectOverview = async () => {
      try {
        const data = await client.fetch(vacancyOverviewQuery, {
          language: locale,
        })

        setItems(data || [])
      } catch (error) {
        console.error('Failed to fetch vacancy overview:', error)
      }
    }

    fetchProjectOverview()
  }, [locale])

  return (
    <section
      className={cn(
        'container mx-auto flex max-w-6xl flex-col gap-4 py-20',
        className,
      )}
    >
      <h2 className="text-center">{title}</h2>

      <ul className="flex flex-col">
        {items.map(item => (
          <li
            className="group relative flex flex-col items-center justify-between gap-4 border-t py-4 last:border-b sm:flex-row"
            key={item._id}
          >
            <div className="self-start">
              <h3>{item.teaser?.title}</h3>
              {item.teaser?.text && (
                <div className="html-richtext">
                  <PortableText value={item.teaser.text} />
                </div>
              )}
            </div>
            <Button
              aria-label={item.teaser?.title || t('viewVacancy')}
              className="mt-4 w-fit self-end"
            >
              {cta}{' '}
              <ArrowRight className="ml-auto size-5 transition-transform duration-300 group-hover:-rotate-45" />
            </Button>

            <Link
              href={normalizeSlug(item.slug)}
              aria-label={item.teaser?.title || t('viewVacancy')}
              className="absolute inset-0"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
