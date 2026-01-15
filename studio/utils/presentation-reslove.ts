import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: doc => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `${doc?.slug}`,
          },
        ],
      }),
    }),
    service: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        language: 'language',
      },
      resolve: doc => ({
        locations: [
          {
            title: 'Services overview',
            href: `${doc?.language === 'nl' ? '/diensten' : `/services`}`,
          },
          {
            title: doc?.title || 'Untitled',
            href: `${doc?.slug}`,
          },
        ],
      }),
    }),
    project: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        language: 'language',
      },
      resolve: doc => ({
        locations: [
          {
            title: 'Projects overview',
            href: `${doc?.language === 'nl' ? '/projecten' : `/projects`}`,
          },
          {
            title: doc?.title || 'Untitled',
            href: `${doc?.slug}`,
          },
        ],
      }),
    }),
    flockTalk: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: doc => ({
        locations: [
          { title: 'Flock Talks overview', href: `/flock-talk` },
          {
            title: doc?.title || 'Untitled',
            href: `${doc?.slug}`,
          },
        ],
      }),
    }),
  },
}
