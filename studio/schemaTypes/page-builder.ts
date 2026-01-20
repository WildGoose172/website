import { defineType, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  type: 'array',
  icon: BlockElementIcon,
  of: [
    defineArrayMember({ type: 'textHero' }),
    defineArrayMember({ type: 'services' }),
    defineArrayMember({ type: 'clients' }),
    defineArrayMember({ type: 'flockTalkTeaser' }),
    defineArrayMember({ type: 'relatedFlockTalk' }),
    defineArrayMember({ type: 'imageText' }),
    defineArrayMember({ type: 'imageBanner' }),
    defineArrayMember({ type: 'article' }),
    defineArrayMember({ type: 'contactForm' }),
    defineArrayMember({ type: 'projectOverview' }),
    defineArrayMember({ type: 'flockTalkOverview' }),
    defineArrayMember({ type: 'quote' }),
    defineArrayMember({ type: 'backButton' }),
    defineArrayMember({ type: 'cardCarousel' }),
    defineArrayMember({ type: 'values' }),
    defineArrayMember({ type: 'vacanciesHeader' }),
    defineArrayMember({ type: 'vacanciesAboutUs' }),
    defineArrayMember({ type: 'vacancyOverview' }),
  ],
})
