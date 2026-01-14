import { Photo } from '@/components/photo'
import { ButtonLink } from '@/components/button-link'

import { BlockWithMeta } from '@/types/blocks'
import { PortableText } from 'next-sanity'

export function RichText({ text }: { text: BlockWithMeta<'article'>['text'] }) {
  return (
    <PortableText
      value={text!}
      components={{
        types: {
          photo: ({ value }) => <Photo {...value} />,
          buttonLink: ({ value }) => <ButtonLink {...value} />,
        },
      }}
    />
  )
}
