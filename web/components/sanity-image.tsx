'use client'

import { urlForImage } from '@/lib/sanity/image'
import { SanityImageSource } from '@sanity/image-url'
import Image, { ImageProps } from 'next/image'

type Props = Omit<ImageProps, 'src'> & {
  src: SanityImageSource
}

export default function SanityImage({ src, alt, ...props }: Props) {
  return (
    <Image
      src="sanity image"
      alt={alt}
      loader={({ width, quality = 90 }) =>
        urlForImage(src).width(width).quality(quality).url()
      }
      {...props}
    />
  )
}
