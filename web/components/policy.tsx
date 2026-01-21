import { PortableText } from 'next-sanity'

import { PageTemplate } from '@/types/blocks'

export function Policy({ title, content }: PageTemplate<'policy'>) {
  return (
    <section className="pt-30 container flex max-w-prose flex-col gap-6">
      <h1>{title}</h1>
      <div className="html-richtext">
        <PortableText value={content || []} />
      </div>
    </section>
  )
}
