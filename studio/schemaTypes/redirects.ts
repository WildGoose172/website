import { CogIcon } from '@sanity/icons'
import { defineType, defineField, type Slug, type SlugRule } from 'sanity'

const slugValidator = (rule: SlugRule) =>
  rule.required().custom((value: Slug | undefined) => {
    if (!value || !value.current) return "Can't be blank"
    if (!value.current.startsWith('/')) return 'The path must start with a /'
    return true
  })

export const redirectType = defineType({
  name: 'redirect',
  title: 'Redirects',
  type: 'document',
  icon: CogIcon,
  description: 'Redirect for website',
  fields: [
    defineField({
      name: 'source',
      type: 'slug',
      validation: (rule: SlugRule) => slugValidator(rule),
    }),
    defineField({
      name: 'destination',
      type: 'slug',
      validation: (rule: SlugRule) => slugValidator(rule),
    }),
    defineField({
      name: 'permanent',
      type: 'boolean',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  initialValue: {
    permanent: true,
  },
  preview: {
    select: {
      source: 'source',
      language: 'language',
    },
    prepare(selection) {
      const { language, source } = selection

      return {
        title: source?.current || 'No source',
        subtitle: (language ?? '').toUpperCase(),
      }
    },
  },
})
