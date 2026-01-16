import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { isUniqueOtherThanLanguage } from '../utils/validator'

export const projectType = defineType({
  name: 'project',
  title: 'Projecten',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueOtherThanLanguage,
        source: 'title',
      },
    }),
    defineField({
      name: 'teaser',
      type: 'teaser',
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const { language, title } = selection

      return {
        title: title,
        subtitle: (language ?? '').toUpperCase(),
      }
    },
  },
})
