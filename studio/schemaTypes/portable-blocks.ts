import { defineField, defineType } from 'sanity'
import { CubeIcon } from '@sanity/icons'

const photoType = defineType({
  name: 'photo',
  title: 'Image',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'aspectRatio',
      type: 'string',
      initialValue: 'landscape',
      options: {
        list: ['square', 'landscape', 'portrait'],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'centered',
      type: 'boolean',
      initialValue: true,
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
    },
    prepare(selection) {
      const { alt } = selection

      return {
        title: alt ?? 'No alt',
        subtitle: 'Photo',
        icon: CubeIcon,
      }
    },
  },
})

const buttonLinkType = defineType({
  name: 'buttonLink',
  title: 'Button Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'link',
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
    defineField({
      name: 'variant',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          'link',
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link',
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'size',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { value: 'default', title: 'Default' },
          { value: 'sm', title: 'Small' },
          { value: 'lg', title: 'Large' },
        ],
      },
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare(selection) {
      const { label } = selection

      return {
        title: label,
        subtitle: 'Button Link',
        icon: CubeIcon,
      }
    },
  },
})

export const portableComponents = [{ type: 'photo' }, { type: 'buttonLink' }]

export const portableBlockTypes = [photoType, buttonLinkType]
