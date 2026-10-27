import type { Graph, Thing, WithContext } from 'schema-dts'

interface JsonLdProps {
  data: WithContext<Thing> | Graph
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Escape `<` so content can never close the script tag early
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, String.raw`<`),
      }}
    />
  )
}
