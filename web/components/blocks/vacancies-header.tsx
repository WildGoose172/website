'use client'

import { BlockWithMeta } from '@/types/blocks'
import { PortableText } from 'next-sanity'
import { SanityImage } from '@/components/sanity-image'

export function VacanciesHeader({
  title,
  description,
  image,
}: BlockWithMeta<'vacanciesHeader'>) {
  return (
    <div className="bg-primary text-background pt-30 pb-10">
      <div className="container grid gap-10 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6">
          <h1>{title}</h1>
          {description && (
            <div className="html-richtext max-w-prose">
              <PortableText value={description || []} />
            </div>
          )}
        </div>

        {image && (
          <div
            className="relative mx-auto aspect-square h-full w-full max-w-80"
            style={{
              WebkitMask:
                "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20320%22%3E%3Cpath%20d%3D%22M40%2C0H265A15%2C15%200%2C0%2C1%20280%2C15V25A15%2C15%200%2C0%2C0%20295%2C40H305A15%2C15%200%2C0%2C1%20320%2C55V280A40%2C40%200%2C0%2C1%20280%2C320H40A40%2C40%200%2C0%2C1%200%2C280V40A40%2C40%200%2C0%2C1%2040%2C0Z%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fsvg%3E') no-repeat center / contain",
              mask: "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20320%22%3E%3Cpath%20d%3D%22M40%2C0H265A15%2C15%200%2C0%2C1%20280%2C15V25A15%2C15%200%2C0%2C0%20295%2C40H305A15%2C15%200%2C0%2C1%20320%2C55V280A40%2C40%200%2C0%2C1%20280%2C320H40A40%2C40%200%2C0%2C1%200%2C280V40A40%2C40%200%2C0%2C1%2040%2C0Z%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fsvg%3E') no-repeat center / contain",
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
            }}
          >
            <SanityImage
              src={image}
              alt={image.alt || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-2xl object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
  )
}
