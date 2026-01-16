import { defineField, defineType } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const teaserType = defineType({
  name: 'teaser',
  title: 'Teaser',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'thumbnail',
      type: 'image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})
