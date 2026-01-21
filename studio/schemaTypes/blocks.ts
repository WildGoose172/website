import { defineField, defineType } from 'sanity'
import { ComponentIcon, CubeIcon } from '@sanity/icons'
import { portableComponents } from './portable-blocks'
import { pageDocumentTypes } from './page'

const imageBannerType = defineType({
  name: 'imageBanner',
  title: 'Image Banner',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
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
        title: title ?? 'No title',
        subtitle: 'Image Banner',
        icon: ComponentIcon,
      }
    },
  },
})

const alternativeHeroType = defineType({
  name: 'alternativeHero',
  title: 'Alternative Hero',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'backgroundColor',
      type: 'string',
      initialValue: 'bg-primary',
      options: {
        list: [
          { title: 'Red', value: 'bg-primary' },
          { title: 'Gray', value: 'bg-foreground' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
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
        subtitle: 'Alternative Hero',
        icon: ComponentIcon,
      }
    },
  },
})

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
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
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
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
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
      name: 'cta',
      type: 'buttonLink',
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

const relatedFlockTalkType = defineType({
  name: 'relatedFlockTalk',
  title: 'Related Flock Talks',
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
    }),
    defineField({
      name: 'cta',
      type: 'buttonLink',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Related Flock Talks',
        subtitle: 'Flock Talks',
        icon: ComponentIcon,
      }
    },
  },
})

const imageTextType = defineType({
  name: 'imageText',
  title: 'Image Text',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'imageRounded',
      type: 'boolean',
      initialValue: true,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      initialValue: 'right',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'textAlignment',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' },
        ],
      },
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Image Text',
        subtitle: 'Image with Text',
        icon: ComponentIcon,
      }
    },
  },
})

const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'text',
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'constrained',
      description: 'Constrain the width of the article for better readability',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'topPadding',
      description: 'Add top padding to the article for better spacing',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Article',
        subtitle: 'Article content',
        icon: ComponentIcon,
      }
    },
  },
})

const contactFormType = defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'emailTo',
      description:
        'Email address to receive form submissions. Leave empty to use default.',
      type: 'email',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form',
        subtitle: 'Form',
        icon: ComponentIcon,
      }
    },
  },
})

const projectOverviewType = defineType({
  name: 'projectOverview',
  title: 'Project Overview',
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
    }),
    defineField({
      name: 'cta',
      type: 'string',
      description: 'Button text for each Project item',
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
        title: title ?? 'Project Overview',
        subtitle: 'Project Overview',
        icon: ComponentIcon,
      }
    },
  },
})

const flockTalkOverviewType = defineType({
  name: 'flockTalkOverview',
  title: 'Flock Talk Overview',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'cta',
      type: 'string',
      description: 'Button text for each Flock Talk item',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Flock Talk Overview',
        subtitle: 'Flock Talk Overview',
        icon: ComponentIcon,
      }
    },
  },
})

const quoteType = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
    }),
    defineField({
      name: 'bgBlur',
      type: 'boolean',
      title: 'Background Blur',
      initialValue: true,
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Quote',
        subtitle: 'Quote',
        icon: ComponentIcon,
      }
    },
  },
})

const backButtonType = defineType({
  name: 'backButton',
  title: 'Back Button',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'link',
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
  preview: {
    select: {
      label: 'label',
    },
    prepare(selection) {
      const { label } = selection

      return {
        title: label ?? 'Back Button',
        subtitle: 'Back Button',
        icon: ComponentIcon,
      }
    },
  },
})

const vacanciesHeaderType = defineType({
  name: 'vacanciesHeader',
  title: 'Vacancies Header',
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
      type: 'array',
      of: portableComponents,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
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
        title: title ?? 'No title',
        subtitle: 'Vacancies Header',
        icon: ComponentIcon,
      }
    },
  },
})

const vacanciesAboutUsType = defineType({
  name: 'vacanciesAboutUs',
  title: 'Vacancies About Us',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'sectionOne',
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
      name: 'sectionTwo',
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Vacancies About Us',
        subtitle: 'Vacancies About Us',
        icon: ComponentIcon,
      }
    },
  },
})

const vacancyOverviewType = defineType({
  name: 'vacancyOverview',
  title: 'Vacancy Overview',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'string',
      description: 'Button text for each Vacancy item',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Vacancy Overview',
        subtitle: 'Vacancy Overview',
        icon: ComponentIcon,
      }
    },
  },
})

const cardCarouselItemType = defineType({
  name: 'cardCarouselItem',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
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
        subtitle: 'Card',
        icon: CubeIcon,
      }
    },
  },
})

const cardCarouselType = defineType({
  name: 'cardCarousel',
  title: 'Card Carousel',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'cards',
      type: 'array',
      of: [{ type: 'cardCarouselItem' }],
      validation: rule => rule.required() && rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection

      return {
        title: title ?? 'Card Carousel',
        subtitle: 'Card Carousel',
        icon: ComponentIcon,
      }
    },
  },
})

const valuesItemType = defineType({
  name: 'valuesItem',
  title: 'Value Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'string',
      options: {
        list: [
          { title: 'Briefcase', value: 'briefcase-business' },
          { title: 'Land plot', value: 'land-plot' },
          { title: 'Megaphone off', value: 'megaphone-off' },
          { title: 'Shield check', value: 'shield-check' },
          { title: 'Users', value: 'users' },
          { title: 'Bed double', value: 'bed-double' },
          { title: 'Door open', value: 'door-open' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
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
        title: title ?? 'No title',
        subtitle: 'Value Item',
        icon: CubeIcon,
      }
    },
  },
})

const valuesType = defineType({
  name: 'values',
  title: 'Values',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'values',
      type: 'array',
      of: [{ type: 'valuesItem' }],
      validation: rule => rule.required() && rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Values',
        subtitle: 'Values',
        icon: ComponentIcon,
      }
    },
  },
})

export const blockTypes = [
  imageBannerType,
  alternativeHeroType,
  textHeroType,
  serviceItemType,
  servicesType,
  clientItemType,
  clientsType,
  flockTalkItemType,
  flockTalkTeaserType,
  relatedFlockTalkType,
  imageTextType,
  articleType,
  contactFormType,
  projectOverviewType,
  flockTalkOverviewType,
  quoteType,
  backButtonType,
  vacanciesHeaderType,
  vacanciesAboutUsType,
  vacancyOverviewType,
  cardCarouselItemType,
  cardCarouselType,
  valuesItemType,
  valuesType,
]
