import type {
  BlogPosting,
  Graph,
  JobPosting,
  Organization,
  PostalAddress,
  WithContext,
} from 'schema-dts'
import { toPlainText, type PortableTextBlock } from 'next-sanity'

import { routing } from '@/i18n/routing'
import { urlForImage } from '@/sanity/image'
import type { PageQueryResult } from '@/types/sanity'

export const SITE_URL = 'https://www.wildgoose.be'
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const GOOGLE_BUSINESS_PROFILE_URL =
  'https://www.google.com/maps?cid=2309803903281974427'
const LOGO_URL =
  'https://cdn.sanity.io/images/uwf1iyke/production/fa5d582487ef9a20e2fc6bbaf23b5521c8555c23-112x112.png'

const OFFICE_ADDRESS: PostalAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'Hulsterweg 172',
  postalCode: '3980',
  addressLocality: 'Tessenderlo-Ham',
  addressRegion: 'Limburg',
  addressCountry: 'BE',
}

// Short reference to the full Organization in the root layout, for use inside other entities
const ORGANIZATION_REF: Organization = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Wild Goose',
  url: SITE_URL,
  logo: LOGO_URL,
}

type Locale = 'nl' | 'en'

export const TECHNOLOGIES = [
  'Java',
  'Spring',
  'Hibernate',
  'Python',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Vue',
  'Angular',
  'React',
  'Kafka',
  'Docker',
  'Kubernetes',
  'AWS',
  'Google Cloud',
  'Azure',
]

const localized = {
  nl: {
    url: SITE_URL,
    inLanguage: 'nl-BE',
    slogan: 'Software zonder gedoe, koppen waar je op kan rekenen.',
    description:
      'Wij lossen softwareproblemen op. Met ervaring die beweging brengt en engineers die snelheid verkiezen boven logge structuren. En geven vrijheid aan denken buiten hokjes. Tools veranderen. Goed softwaredenken niet.',
    catalogName: 'Diensten',
    services: [
      {
        name: 'Consultancy',
        slug: 'diensten/consultancy',
        description:
          'Onze consultancy helpt organisaties groeien. Strategie, innovatie en advies op maat voor duurzame resultaten met Wild Goose.',
      },
      {
        name: 'Advies',
        slug: 'diensten/advies',
        description:
          'Wild Goose biedt advies op maat voor strategie, processen en innovatie. Krijg inzichten die echt verschil maken.',
      },
      {
        name: 'Code audit',
        slug: 'diensten/code-audit',
        description:
          'Onze code audits verbeteren kwaliteit, veiligheid en prestaties. Ontdek hoe Wild Goose uw software betrouwbaarder maakt.',
      },
      {
        name: 'Project team',
        slug: 'diensten/project-team',
        description:
          'Laat ons projectteam uw uitdagingen oppakken. Flexibele, deskundige professionals die samen met u impact maken.',
      },
    ],
  },
  en: {
    url: `${SITE_URL}/en`,
    slogan: 'Software without hassle, heads you can count on.',
    inLanguage: 'en',
    description:
      'We fix software problems. With experience that keeps things moving, and engineers who’d rather move fast than wait on red tape. We give people room to think beyond the usual boxes. Tools change. Good software thinking doesn’t.',
    catalogName: 'Services',
    services: [
      {
        name: 'Consultancy',
        slug: 'en/services/consultancy',
        description:
          'Our consultancy helps organizations grow. Strategy, innovation, and tailored advice for sustainable results with Wild Goose.',
      },
      {
        name: 'Advice',
        slug: 'en/services/advice',
        description:
          'Wild Goose provides tailored advice on strategy, processes, and innovation. Gain insights that truly make a difference.',
      },
      {
        name: 'Code audit',
        slug: 'en/services/code-audit',
        description:
          'Our code audits enhance quality, security, and performance. Discover how Wild Goose makes your software more reliable.',
      },
      {
        name: 'Project team',
        slug: 'en/services/project-team',
        description:
          'Let our project team handle your challenges. Flexible, skilled professionals working with you to make a real impact.',
      },
    ],
  },
} satisfies Record<Locale, unknown>

export function getSchemaOrg(locale: Locale): Graph {
  const t = localized[locale]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,

        // Identity
        name: 'Wild Goose',
        legalName: 'Wild Goose BV',
        alternateName: 'Wild Goose Developers',
        url: SITE_URL,
        description: t.description,
        slogan: t.slogan,
        logo: {
          '@type': 'ImageObject',
          url: LOGO_URL,
          width: { '@type': 'QuantitativeValue', value: 112, unitCode: 'E37' }, // E37 = pixel
          height: { '@type': 'QuantitativeValue', value: 112, unitCode: 'E37' },
        },
        image:
          'https://cdn.sanity.io/images/uwf1iyke/production/c9ca208a635de852b1fb362e4cbd2b8b0004b991-1200x630.png',

        // Legal & company identifiers (Belgium)
        vatID: 'BE1005389162',
        taxID: '1005.389.162', // KBO/BCE enterprise number
        iso6523Code: '0208:1005389162', // 0208 = Belgian KBO/BCE scheme
        isicV4: '6201', // Computer programming activities (6202 = consultancy)
        naics: '541511', // Custom Computer Programming Services

        // Company facts
        foundingDate: '2024-01-30',
        foundingLocation: {
          '@type': 'Place',
          name: 'Hulst, Tessenderlo-Ham, Belgium',
        },
        founder: {
          '@type': 'Person',
          name: 'Lennert Vesters',
          jobTitle: 'Founder',
          url: 'https://www.linkedin.com/in/lennert-vesters-478b3b25/',
          sameAs: ['https://www.linkedin.com/in/lennert-vesters-478b3b25/'],
          worksFor: { '@id': ORGANIZATION_ID },
        },
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: 20, // "October 2025 – There are 20 of us", update when it changes
        },

        // Contact
        email: 'fly@wildgoose.be',
        telephone: '+32473770691',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'fly@wildgoose.be',
            telephone: '+32473770691',
            areaServed: 'BE',
            availableLanguage: ['Dutch', 'English'],
          },
        ],

        // Addresses: `address` = registered office, `location` = where you actually work
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kolmenstraat 184',
          postalCode: '3512',
          addressLocality: 'Hasselt',
          addressRegion: 'Limburg',
          addressCountry: 'BE',
        },
        location: {
          '@type': 'Place',
          name: 'Wild Goose office',
          address: OFFICE_ADDRESS,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 51.0689998,
            longitude: 5.1265072,
          },
          hasMap: GOOGLE_BUSINESS_PROFILE_URL,
        },

        // Market
        areaServed: [{ '@type': 'Country', name: 'Belgium' }],
        knowsLanguage: ['nl', 'en'],
        knowsAbout: [
          'Software development',
          'IT consultancy',
          'Code audits',
          ...TECHNOLOGIES,
        ],

        // Services offered
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.catalogName,
          itemListElement: t.services.map(service => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
              url: `${SITE_URL}/${service.slug}`,
              serviceType: service.name,
              provider: { '@id': ORGANIZATION_ID },
              areaServed: 'BE',
            },
          })),
        },

        // Social profiles & external listings
        sameAs: [
          'https://www.linkedin.com/company/wild-goose-engineers',
          'https://www.instagram.com/wildgoose.be',
          GOOGLE_BUSINESS_PROFILE_URL,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: t.url,
        name: 'Wild Goose',
        inLanguage: t.inLanguage,
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  }
}

type PageDocument<T extends string> = Extract<
  NonNullable<PageQueryResult>,
  { _type: T }
>

export function pageUrl(
  language: string | undefined,
  slug: string | undefined,
) {
  const prefix =
    !language || language === routing.defaultLocale ? '' : `/${language}`

  return `${SITE_URL}${prefix}/${slug ?? ''}`
}

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function isTextBlock(block: { _type: string }): block is PortableTextBlock {
  return block._type === 'block'
}

// Google wants the full job description as HTML, so turn the Sanity rich text into simple markup
// (buttons and photos in between are skipped)
function portableTextToHtml(content: ReadonlyArray<{ _type: string }> = []) {
  let html = ''
  let inList = false

  for (const block of content) {
    if (!isTextBlock(block)) continue

    const text = escapeHtml(toPlainText([block]).trim())
    if (!text) continue

    if (block.listItem && !inList) html += '<ul>'
    if (!block.listItem && inList) html += '</ul>'
    inList = Boolean(block.listItem)

    html += block.listItem ? `<li>${text}</li>` : `<p>${text}</p>`
  }

  return inList ? `${html}</ul>` : html
}

export function getJobPostingSchema(
  vacancy: PageDocument<'vacancy'>,
): WithContext<JobPosting> {
  const sections = [vacancy.intro, vacancy.role, vacancy.offer]
  const description =
    portableTextToHtml(vacancy.hero?.description) +
    sections
      .map(section =>
        section?.description?.length
          ? `<h2>${escapeHtml(section.title ?? '')}</h2>` +
            portableTextToHtml(section.description)
          : '',
      )
      .join('')

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: (vacancy.hero?.title ?? vacancy.teaser?.title ?? '').trim(),
    description: description || vacancy.seo.description,
    url: pageUrl(vacancy.language, vacancy.slug?.current),
    datePosted: vacancy._createdAt,
    employmentType: 'FULL_TIME', // TODO: make this a field in Sanity if part-time / freelance roles are added
    hiringOrganization: ORGANIZATION_REF,
    jobLocation: {
      '@type': 'Place',
      address: OFFICE_ADDRESS,
    },
  }
}

export function getBlogPostingSchema(
  flockTalk: PageDocument<'flockTalk'>,
): WithContext<BlogPosting> {
  const url = pageUrl(flockTalk.language, flockTalk.slug?.current)
  const image = flockTalk.seo.image ?? flockTalk.teaser?.thumbnail

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: (flockTalk.title ?? flockTalk.teaser?.title ?? '').trim(),
    description: (
      flockTalk.seo.description || toPlainText(flockTalk.teaser?.text ?? [])
    ).trim(),
    image: image?.asset ? urlForImage(image).url() : undefined,
    url,
    mainEntityOfPage: url,
    inLanguage: flockTalk.language === 'nl' ? 'nl-BE' : flockTalk.language,
    datePublished: flockTalk._createdAt,
    dateModified: flockTalk._updatedAt,
    // There is no author field in Sanity yet, so Wild Goose itself is the author
    author: ORGANIZATION_REF,
    publisher: ORGANIZATION_REF,
    isPartOf: { '@id': WEBSITE_ID },
  }
}
