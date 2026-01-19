import { defineField, defineType } from 'sanity'
import {
  CogIcon,
  CubeIcon,
  EnvelopeIcon,
  MobileDeviceIcon,
  TextIcon,
} from '@sanity/icons'
import { pageDocumentTypes } from './page'

const navigationScrollType = defineType({
  name: 'navigationScroll',
  title: 'Navigation Scroll',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'scrollToId',
      title: 'Scroll ID',
      description: 'ID of the section to scroll to',
      type: 'string',
      validation: rule => rule.required(),
    }),
  ],
})

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
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        { type: 'navigationLink' },
        { type: 'navigationDropdown' },
        { type: 'navigationScroll' },
      ],
    }),
  ],
})

const footerColumnEmailType = defineType({
  name: 'footerColumnEmail',
  title: 'Email',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'email',
      type: 'string',
    }),
  ],
})

const footerColumnNumberType = defineType({
  name: 'footerColumnNumber',
  title: 'Number',
  type: 'object',
  icon: MobileDeviceIcon,
  fields: [
    defineField({
      name: 'number',
      type: 'string',
    }),
  ],
})

const footerColumnTextType = defineType({
  name: 'footerColumnText',
  title: 'Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'text',
      type: 'string',
    }),
  ],
})

const footerColumnType = defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'columnItems',
      type: 'array',
      of: [
        { type: 'footerColumnNumber' },
        { type: 'footerColumnEmail' },
        { type: 'footerColumnText' },
      ],
    }),
  ],
})

const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'columns',
      type: 'array',
      of: [{ type: 'footerColumn' }],
    }),
    defineField({
      name: 'policies',
      type: 'array',
      of: [{ type: 'navigationLink' }],
    }),
    defineField({
      name: 'linkedIn',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      type: 'string',
    }),
  ],
})

const configType = defineType({
  name: 'config',
  title: 'Config',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'navigation',
      type: 'navigation',
      options: {
        collapsible: true,
      },
    }),
    defineField({
      name: 'footer',
      type: 'footer',
      options: {
        collapsible: true,
      },
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
        title: 'Config',
        subtitle: (language ?? '').toUpperCase(),
      }
    },
  },
})

export const navigationTypes = [
  navigationScrollType,
  navigationType,
  navigationLinkType,
  navigationDropdownType,
  footerType,
  footerColumnType,
  footerColumnEmailType,
  footerColumnNumberType,
  footerColumnTextType,
  configType,
]
