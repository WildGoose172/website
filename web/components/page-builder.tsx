'use client'

import { Clients } from '@/components/blocks/clients'
import { Services } from '@/components/blocks/services'
import { TextHero } from '@/components/blocks/text-hero'
import { FlockTalkTeaser } from '@/components/blocks/flock-talk-teaser'

import { PageQueryResult } from '@/types/sanity'
import { client } from '@/sanity/client'
import { createDataAttribute } from 'next-sanity'
import { useOptimistic } from 'next-sanity/hooks'

interface PageBuilderProps {
  content: NonNullable<PageQueryResult>['content']
  documentId: string
  documentType: string
}

const { projectId, dataset, stega } = client.config()
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
}

export function PageBuilder({
  content,
  documentId,
  documentType,
}: PageBuilderProps) {
  const blocks = useOptimistic<
    NonNullable<PageQueryResult>['content'] | undefined,
    NonNullable<PageQueryResult>
  >(content, (state, action) => {
    if (action.id === documentId) {
      return action?.document?.content?.map(
        block => state?.find(s => s._key === block?._key) || block,
      )
    }
    return state
  })

  if (!Array.isArray(content)) {
    return null
  }

  return (
    <main
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: 'content',
      }).toString()}
    >
      {(blocks ?? []).map((block, i) => {
        const DragHandle = ({ children }: { children: React.ReactNode }) => (
          <div
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `content[_key=="${block._key}"]`,
            }).toString()}
          >
            {children}
          </div>
        )

        switch (block._type) {
          case 'textHero':
            return (
              <DragHandle key={block._key}>
                <TextHero
                  {...block}
                  documentId={documentId}
                  documentType={documentType}
                />
              </DragHandle>
            )
          case 'services':
            return (
              <DragHandle key={block._key}>
                <Services
                  {...block}
                  documentId={documentId}
                  documentType={documentType}
                />
              </DragHandle>
            )
          case 'clients':
            return (
              <DragHandle key={block._key}>
                <Clients
                  {...block}
                  documentId={documentId}
                  documentType={documentType}
                />
              </DragHandle>
            )
          case 'flockTalkTeaser':
            return (
              <DragHandle key={block._key}>
                <FlockTalkTeaser
                  {...block}
                  documentId={documentId}
                  documentType={documentType}
                />
              </DragHandle>
            )
          default:
            return <div key={i}>Block not found</div>
        }
      })}
    </main>
  )
}
