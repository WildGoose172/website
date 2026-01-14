import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <div className="pt-30 container mx-auto grid gap-10">
      <Image
        src="/images/goose_searching.webp"
        alt="Goose searching"
        width={150}
        height={228}
        loading="eager"
        className="mx-auto"
      />
      <div className="bg-muted mx-auto flex max-w-prose flex-col items-center gap-6 rounded-2xl p-10 text-center">
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        <Button asChild size="lg" className="w-fit">
          <Link href="/">{t('cta')}</Link>
        </Button>
      </div>
    </div>
  )
}
