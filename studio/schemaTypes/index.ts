import { blockTypes } from './blocks'
import { navigationTypes } from './navigation'
import { pageType } from './page'
import { pageBuilderType } from './page-builder'
import { seoType } from './seo'

export const schemaTypes = [
  ...navigationTypes,
  ...blockTypes,
  seoType,
  pageType,
  pageBuilderType,
]
