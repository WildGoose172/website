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
    defineArrayMember({ type: 'imageText' }),
  ],
})
