import { defineField, defineType } from 'sanity'

const navigationLinkType = defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: rule => rule.required(),
    }),
  ],
})

const navigationDropdownType = defineType({
  name: 'navigationDropdown',
  title: 'Navigation Dropdown',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'navigationLink' }],
    }),
  ],
})

const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'navigationLink' }, { type: 'navigationDropdown' }],
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
      language: 'language',
    },
    prepare(selection) {
      const { language } = selection

      return {
        title: 'Navigation',
        subtitle: (language ?? '').toUpperCase(),
      }
    },
  },
})

export const navigationTypes = [
  navigationType,
  navigationLinkType,
  navigationDropdownType,
]
