import { defineField, defineType } from 'sanity'
import { LinkIcon, CubeIcon } from '@sanity/icons'

const navigationLinkType = defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'page',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'service' },
        { type: 'project' },
        { type: 'flockTalk' },
      ],
      options: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: document?.language },
        }),
      },
      validation: rule => rule.required(),
    }),
  ],
})

const navigationDropdownType = defineType({
  name: 'navigationDropdown',
  title: 'Navigation Dropdown',
  type: 'object',
  icon: CubeIcon,
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
  icon: LinkIcon,
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
