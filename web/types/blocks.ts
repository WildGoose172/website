import { PageQueryResult } from '@/types/sanity'

interface DefaultBlockFields {
  className?: string
}

export interface WithDocumentMeta {
  documentId: string
  documentType: string
}

export type ClientsBlock = WithDocumentMeta &
  DefaultBlockFields &
  Extract<
    NonNullable<NonNullable<PageQueryResult>['content']>[number],
    { _type: 'clients' }
  >

export type FlockTalkTeaserBlock = WithDocumentMeta &
  DefaultBlockFields &
  Extract<
    NonNullable<NonNullable<PageQueryResult>['content']>[number],
    { _type: 'flockTalkTeaser' }
  >

export type GradientImageBlock = WithDocumentMeta &
  DefaultBlockFields &
  Extract<
    NonNullable<NonNullable<PageQueryResult>['content']>[number],
    { _type: 'gradientImage' }
  >

export type ServicesBlock = WithDocumentMeta &
  DefaultBlockFields &
  Extract<
    NonNullable<NonNullable<PageQueryResult>['content']>[number],
    { _type: 'services' }
  >

export type TextHeroBlock = WithDocumentMeta &
  DefaultBlockFields &
  Extract<
    NonNullable<NonNullable<PageQueryResult>['content']>[number],
    { _type: 'textHero' }
  >
