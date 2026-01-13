'use client'

import { urlForImage } from '@/sanity/image'
import { SanityImageSource } from '@sanity/image-url'
import Image, { ImageProps } from 'next/image'

type Props = Omit<ImageProps, 'src'> & {
  src: SanityImageSource
}

export function SanityImage({ src, alt, quality = 90, ...props }: Props) {
  return (
    <Image
      {...props}
      src={urlForImage(src).quality(+quality).url()}
      alt={alt}
      quality={quality}
      placeholder="blur"
      blurDataURL={urlForImage(src).width(24).height(24).blur(10).url()}
    />
  )
}
