import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { isUniqueOtherThanLanguage } from '../utils/validator'

export const policyType = defineType({
  name: 'policy',
  title: 'Beleid',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueOtherThanLanguage,
        source: 'title',
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: rule => rule.required(),
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
