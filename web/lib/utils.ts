import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeSlug(slug?: string | null | undefined) {
  if (!slug) return '#'

  slug = slug.toLowerCase().replaceAll(' ', '-').trim()

  if (!slug.startsWith('/')) {
    slug = '/' + slug
  }

  if (slug.endsWith('/')) {
    slug = slug.slice(0, -1)
  }

  return slug
}
