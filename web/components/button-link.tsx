'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'

import type { ButtonLink } from '@/types/sanity'
import { normalizeSlug } from '@/lib/utils'

export function ButtonLink({
  variant,
  size,
  link,
  label,
}: Omit<ButtonLink, 'link'> & { link: string }) {
  return (
    <Button variant={variant} size={size} asChild>
      <Link
        href={normalizeSlug(link)}
        className={variant !== 'link' ? 'no-underline' : undefined}
      >
        {label}
      </Link>
    </Button>
  )
}
