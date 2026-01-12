import { defineField, defineType } from 'sanity'
import { ComponentIcon, CubeIcon } from '@sanity/icons'

const textHeroType = defineType({
  name: 'textHero',
  title: 'Text Hero',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection

      return {
        title,
        subtitle: 'Text Hero',
        icon: ComponentIcon,
      }
    },
  },
})

const serviceItemType = defineType({
  name: 'serviceItem',
  title: 'Service Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'reference',
      to: [{ type: 'service' }],
      options: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: document?.language },
        }),
      },
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      const { name } = selection

      return {
        title: name,
        subtitle: 'Service Item',
        icon: CubeIcon,
      }
    },
  },
})

const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'services',
      type: 'array',
      of: [{ type: 'serviceItem' }],
      validation: rule => rule.required() && rule.min(1),
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Services',
        subtitle: 'Services',
        icon: ComponentIcon,
      }
    },
  },
})

const clientItemType = defineType({
  name: 'clientItem',
  title: 'Client Item',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      const { name } = selection

      return {
        title: name,
        subtitle: 'Client Item',
        icon: CubeIcon,
      }
    },
  },
})

const clientsType = defineType({
  name: 'clients',
  title: 'Clients',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'clients',
      type: 'array',
      of: [{ type: 'clientItem' }],
      validation: rule => rule.required() && rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Clients',
        subtitle: 'Clients',
        icon: ComponentIcon,
      }
    },
  },
})

const flockTalkItemType = defineType({
  name: 'flockTalkItem',
  title: 'Flock Talk Item',
  type: 'object',
  fields: [
    defineField({
      name: 'item',
      type: 'reference',
      to: [{ type: 'flockTalk' }],
      options: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: document?.language },
        }),
      },
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'item.title',
    },
    prepare(selection) {
      const { name } = selection

      return {
        title: name,
        subtitle: 'Flock Talk Item',
        icon: CubeIcon,
      }
    },
  },
})

const flockTalkTeaserType = defineType({
  name: 'flockTalkTeaser',
  title: 'Flock Talk Teaser',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      type: 'reference',
      to: [{ type: 'page' }],
      options: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: document?.language },
        }),
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      description: 'Select exactly 3 Flock Talks to feature in the teaser',
      of: [{ type: 'flockTalkItem' }],
      validation: rule => rule.required() && rule.min(3) && rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Flock Talk',
        subtitle: 'Teaser',
        icon: ComponentIcon,
      }
    },
  },
})

export const blockTypes = [
  textHeroType,
  serviceItemType,
  servicesType,
  clientItemType,
  clientsType,
  flockTalkItemType,
  flockTalkTeaserType,
]
