import { PageQueryResult } from '@/types/sanity'

export const BLOCK_TYPES = [
  'clients',
  'flockTalkTeaser',
  'relatedFlockTalk',
  'imageText',
  'services',
  'textHero',
  'alternativeHero',
  'imageBanner',
  'article',
  'contactForm',
  'projectOverview',
  'flockTalkOverview',
  'quote',
  'backButton',
  'cardCarousel',
  'values',
  'vacanciesHeader',
  'vacanciesAboutUs',
  'vacancyOverview',
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

export const TEMPLATE_TYPES = ['vacancy', 'policy'] as const

export type TemplateType = (typeof TEMPLATE_TYPES)[number]

export type PageTemplate<T extends TemplateType> = Extract<
  PageQueryResult,
  { _type: T }
>

export const PAGE_BUILDER_TYPES = [
  'page',
  'service',
  'project',
  'flockTalk',
] as const

export type PageBuilderType = (typeof PAGE_BUILDER_TYPES)[number]

export type PageBuilderDocument = Extract<
  NonNullable<PageQueryResult>,
  { _type: PageBuilderType }
>
