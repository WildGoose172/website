import { Navigation } from '@/components/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Footer } from '@/components/footer'
import { DisableDraftMode } from '@/components/disable-draft-mode'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import '../globals.css'
import { VisualEditing } from 'next-sanity/visual-editing'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { ConsentManager } from '@/components/consent-manager'

import { configQuery } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { draftMode } from 'next/headers'
import { SanityLive, sanityFetch } from '@/sanity/live'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const agrandir = localFont({
  variable: '--font-agrandir',
  src: [
    {
      path: '../../public/fonts/agrandir.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/agrandir-700.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/agrandir-900.otf',
      weight: '900',
      style: 'normal',
    },
  ],
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug?: string[] }>
}) {
  const { isEnabled } = await draftMode()
  const { slug } = await params
  const [locale] = slug || [routing.defaultLocale]

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const { data: config } = await sanityFetch({
    query: configQuery,
    params: { language: locale },
  })

  if (!config || !config.navigation || !config.footer) {
    notFound()
  }

  return (
    <ConsentManager>
      <html lang={locale}>
        <body className={`${inter.variable} ${agrandir.variable} antialiased`}>
          <NextIntlClientProvider>
            <div className="flex min-h-dvh flex-col">
              <Navigation config={config.navigation} />
              <main className="flex flex-1 flex-col gap-16 pb-40 lg:gap-20">
                {children}
                <SanityLive />
                {isEnabled && (
                  <>
                    <VisualEditing />
                    <DisableDraftMode />
                  </>
                )}
              </main>
              <Footer config={config.footer} />
              <ProgressiveBlur
                height="50px"
                position="bottom"
                className="fixed bottom-0 left-0 right-0"
              />
            </div>
          </NextIntlClientProvider>
        </body>
      </html>
    </ConsentManager>
  )
}
