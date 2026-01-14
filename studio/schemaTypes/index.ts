import { blockTypes } from './blocks'
import { flockTalkType } from './flock-talk'
import { navigationTypes } from './navigation'
import { pageType } from './page'
import { pageBuilderType } from './page-builder'
import { portableBlockTypes } from './portable-blocks'
import { projectType } from './project'
import { seoType } from './seo'
import { serviceType } from './service'

export const schemaTypes = [
  ...navigationTypes,
  ...portableBlockTypes,
  ...blockTypes,
  seoType,
  pageType,
  pageBuilderType,
  serviceType,
  projectType,
  flockTalkType,
]
