import { defineField, defineType } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'Should be between 50-60 characters for best results',
      type: 'string',
    }),
    defineField({
      name: 'description',
      description: 'Should be between 150-160 characters for best results',
      type: 'text',
    }),
    defineField({
      name: 'image',
      description: 'Should be 1200 x 630 pixels for best results',
      type: 'image',
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})
