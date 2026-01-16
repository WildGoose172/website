import { PageQueryResult } from '@/types/sanity'

export const BLOCK_TYPES = [
  'clients',
  'flockTalkTeaser',
  'relatedFlockTalk',
  'imageText',
  'services',
  'textHero',
  'imageBanner',
  'article',
  'contactForm',
  'projectOverview',
] as const

export type BlockType = (typeof BLOCK_TYPES)[number]

export type Block = {
  [K in BlockType]: Extract<
    NonNullable<NonNullable<PageQueryResult>['content']>[number],
    { _type: K }
  >
}[BlockType]

export type BlockWithMeta<T extends BlockType> = Extract<
  NonNullable<NonNullable<PageQueryResult>['content']>[number],
  { _type: T }
> & {
  documentId: string
  documentType: string
  className?: string
}
