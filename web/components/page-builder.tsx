'use client'

import { Clients } from '@/components/blocks/clients'
import { Services } from '@/components/blocks/services'
import { TextHero } from '@/components/blocks/text-hero'
import { FlockTalkTeaser } from '@/components/blocks/flock-talk-teaser'
import { RelatedFlockTalk } from '@/components/blocks/related-flock-talks'
import { ImageText } from '@/components/blocks/image-text'
import { ImageBanner } from '@/components/blocks/image-banner'
import { Article } from '@/components/blocks/article'
import { ContactForm } from '@/components/blocks/contact-form'
import { ProjectOverview } from '@/components/blocks/project-overview'
import { FlockTalkOverview } from '@/components/blocks/flock-talk-overview'
import { Quote } from '@/components/blocks/quote'
import { BackButton } from '@/components/blocks/back-button'

import { PageQueryResult } from '@/types/sanity'
import { Block } from '@/types/blocks'
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
        return (
          <div
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `content[_key=="${block._key}"]`,
            }).toString()}
            key={block._key || i}
          >
            {renderBlock(block, documentId, documentType)}
          </div>
        )
      })}
    </main>
  )
}

function renderBlock(block: Block, documentId: string, documentType: string) {
  switch (block._type) {
    case 'textHero':
      return (
        <TextHero
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'services':
      return (
        <Services
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'clients':
      return (
        <Clients
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'flockTalkTeaser':
      return (
        <FlockTalkTeaser
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'relatedFlockTalk':
      return (
        <RelatedFlockTalk
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'imageText':
      return (
        <ImageText
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'imageBanner':
      return (
        <ImageBanner
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'article':
      return (
        <Article
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'contactForm':
      return (
        <ContactForm
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'projectOverview':
      return (
        <ProjectOverview
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'flockTalkOverview':
      return (
        <FlockTalkOverview
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    case 'quote':
      return (
        <Quote {...block} documentId={documentId} documentType={documentType} />
      )
    case 'backButton':
      return (
        <BackButton
          {...block}
          documentId={documentId}
          documentType={documentType}
        />
      )
    default:
      return <div className="container mx-auto">Block not found</div>
  }
}
