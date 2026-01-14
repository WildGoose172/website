'use client'

import { PortableText } from '@portabletext/react'
import { LinkedIn, Facebook } from '@/components/icons'
import { FacebookShareButton, LinkedinShareButton } from 'next-share'
import { Clipboard, ClipboardCheck } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Article({
  text,
  constrained = true,
  showSocialShare = true,
  className,
}: BlockWithMeta<'article'>) {
  return (
    <section
      className={cn(
        'container mx-auto flex flex-col justify-center space-x-14 md:flex-row',
        className,
      )}
    >
      {showSocialShare && <SocialShare className="hidden md:block" />}

      <div
        className={cn(
          'html-richtext mx-auto',
          constrained && 'md:mx-0 md:max-w-prose',
        )}
      >
        <PortableText value={text!} />
      </div>

      {showSocialShare && <SocialShare className="mt-8 md:hidden" />}
    </section>
  )
}

function SocialShare({ className }: { className?: string }) {
  const t = useTranslations()
  const path = usePathname()
  const currentUrl = process.env.NEXT_PUBLIC_BASE_URL + path

  const [isCopied, setIsCopied] = useState(false)

  function copyUrl() {
    setIsCopied(true)
    navigator.clipboard.writeText(currentUrl)
  }

  return (
    <div
      className={cn(
        'sticky top-20 flex items-center gap-2 self-start md:flex-col',
        className,
      )}
    >
      <span className="hidden text-sm md:block">{t('share')}</span>
      <div className="bg-muted flex flex-row flex-wrap gap-6 rounded-2xl px-6 py-4 md:flex-col md:px-3">
        <FacebookShareButton url={currentUrl}>
          <Facebook className="size-5" />
        </FacebookShareButton>
        <LinkedinShareButton url={currentUrl}>
          <LinkedIn className="size-5" />
        </LinkedinShareButton>
        <button onClick={copyUrl}>
          {isCopied ? (
            <ClipboardCheck className="size-5" />
          ) : (
            <Clipboard className="size-5" />
          )}
        </button>
      </div>
    </div>
  )
}
