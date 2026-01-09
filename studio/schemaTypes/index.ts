import { blockTypes } from './blocks'
import { navigationTypes } from './navigation'
import { pageTypes } from './page'
import { pageBuilderType } from './page-builder'

export const schemaTypes = [
  ...navigationTypes,
  ...blockTypes,
  ...pageTypes,
  pageBuilderType,
]
