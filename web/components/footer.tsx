'use client'

import { Link } from '@/i18n/navigation'
import { SanityImage } from '@/components/sanity-image'
import { LinkedIn, Instagram } from '@/components/icons'
import { Mail, Phone } from 'lucide-react'

import { ConfigQueryResult } from '@/types/sanity'
import { normalizeSlug } from '@/lib/utils'

interface FooterProps {
  config: NonNullable<ConfigQueryResult>['footer']
}

export function Footer({ config }: FooterProps) {
  return (
    <div className="container mx-auto">
      <footer className="border-background relative mb-4 overflow-hidden rounded-2xl border shadow">
        <div className="z-1 bg-background/20 relative p-6 lg:p-10">
          <div className="grid gap-x-4 gap-y-6 lg:grid-cols-4">
            <SanityImage
              src={config!.image!}
              alt="Footer Logo"
              width={200}
              height={65}
              className="lg:col-span-2"
            />
            {config?.columns?.map(column => (
              <div key={column._key} className="flex flex-col gap-2">
                <h4 className="font-semibold">{column.name}</h4>
                {(column.columnItems ?? []).map(item => {
                  switch (item._type) {
                    case 'footerColumnText':
                      return <p key={item._key}>{item.text}</p>
                    case 'footerColumnEmail':
                      return (
                        <Link
                          key={item._key}
                          href={`mailto:${item.email}`}
                          className="flex items-center gap-2"
                        >
                          <Mail className="size-5 min-w-5" />
                          {item.email}
                        </Link>
                      )
                    case 'footerColumnNumber':
                      return (
                        <Link
                          key={item._key}
                          href={`tel:${item.number}`}
                          className="flex items-center gap-2"
                        >
                          <Phone className="size-5 min-w-5" />
                          {item.number}
                        </Link>
                      )
                    default:
                      return null
                  }
                })}
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              {config?.linkedIn && (
                <Link
                  href={config?.linkedIn}
                  className="flex items-center gap-2"
                >
                  <LinkedIn className="size-5 min-w-5" />
                </Link>
              )}
              {config?.instagram && (
                <Link
                  href={config?.instagram}
                  className="flex items-center gap-2"
                >
                  <Instagram className="size-5 min-w-5" />
                </Link>
              )}
            </div>

            <p className="text-muted-foreground text-xs">
              &copy;{new Date().getFullYear()} Wild Goose BV
            </p>

            <div className="flex flex-col text-sm sm:flex-row sm:items-center">
              {config?.policies?.map(policy => (
                <Link
                  key={policy._key}
                  href={normalizeSlug(policy.page?.slug)}
                  className="underline"
                >
                  {policy.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="from-primary to-muted absolute -inset-4 z-0 bg-gradient-to-br blur" />
      </footer>
    </div>
  )
}
