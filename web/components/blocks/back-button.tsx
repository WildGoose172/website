'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

import { normalizeSlug } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'

export function BackButton({ link, label }: BlockWithMeta<'backButton'>) {
  return (
    <div className="container py-20">
      <Button variant="ghost" asChild>
        <Link href={normalizeSlug(link)}>
          <ArrowLeft />
          {label}
        </Link>
      </Button>
    </div>
  )
}
