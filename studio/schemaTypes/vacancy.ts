import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { isUniqueOtherThanLanguage } from '../utils/validator'
import { portableComponents } from './portable-blocks'
import { pageDocumentTypes } from './page'

export const vacancyType = defineType({
  name: 'vacancy',
  title: 'Vacatures',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueOtherThanLanguage,
        source: 'hero.title',
      },
    }),
    defineField({
      name: 'teaser',
      type: 'teaser',
    }),
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({
          name: 'location',
          type: 'string',
        }),
        defineField({
          name: 'hours',
          type: 'string',
        }),
        defineField({
          name: 'title',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'array',
          of: portableComponents,
          validation: rule => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'intro',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'array',
          of: portableComponents,
          validation: rule => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'role',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'array',
          of: portableComponents,
          validation: rule => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'offer',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'array',
          of: portableComponents,
          validation: rule => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'backButton',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'page',
          type: 'reference',
          to: pageDocumentTypes,
          options: {
            filter: ({ document }) => ({
              filter: 'language == $language',
              params: { language: document?.language },
            }),
          },
          validation: rule => rule.required(),
        }),
      ],
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
      title: 'hero.title',
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
