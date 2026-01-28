import { defineQuery } from 'next-sanity'

const pageReference = `page->{
  _type,
  "slug": slug.current
}`

export const configQuery = defineQuery(`
  *[
    _type == "config" &&
    language == $language
  ]{
    navigation{
      name,
      image,
      links[]{
        ...,
        _type == "navigationLink" => {
          ...,
          page->{ _type, "slug": slug.current }
        },
        _type == "navigationDropdown" => {
          ...,
          links[]{
            ...,
            ${pageReference}
          }
        }
      }
    },
    footer{
      ...,
      policies[]{
        ...,
        _type == "navigationLink" => {
          ...,
          page->{ _type, "slug": slug.current }
        }
      }
    }
  }[0]
`)

const pageBuilderBlocks = `
  content[]{
    ...,
    _type == "services" => {
      ...,
      services[]{
        ...,
        "link": {
          "slug": link->slug.current,
        }
      }
    },
    _type == "flockTalkTeaser" => {
      ...,
      cta{
        ...,
        "link": link->slug.current
      },
      items[]{
        ...,
        "slug": item->slug.current,
        "teaser": item->teaser,
      }
    },
    _type == "relatedFlockTalk" => {
      ...,
      cta{
        ...,
        "link": link->slug.current
      },
    },
    _type == "imageText" => {
      ...,
      text[]{
        ...,
        _type == "buttonLink" => {
          ...,
          "link": link->slug.current
        }
      }
    },
    _type == "article" => {
      ...,
      text[]{
        ...,
        _type == "buttonLink" => {
          ...,
          "link": link->slug.current
        }
      }
    },
    _type == "backButton" => {
      ...,
      "link": link->slug.current
    }
  },
`

const vacancyPageBlocks = `
  backButton{
    ...,
    "page": page->slug.current,
  },
`

export const pageQuery = defineQuery(`
  *[
    _type in ["page", "service", "project", "flockTalk", "vacancy", "policy"] &&
    slug.current == $slug &&
    language == $language
  ][0]{
    ...,
    ${pageBuilderBlocks}
    ${vacancyPageBlocks}
    "seo": {
      "_type": "seo",
      "title": coalesce(seo.title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "keywords": coalesce(seo.keywords, []),
    },
  }
`)

export const sitemapQuery = defineQuery(`
  *[
    _type in ["page", "service", "project", "flockTalk", "vacancy", "policy"] &&
    defined(slug.current)
  ] {
    "href": slug.current,
    _updatedAt,
    language,
  }
`)

export const relatedFlockTalksQuery = defineQuery(`
  *[
    _type == "flockTalk" &&
    _id != $currentDocumentId &&
    language == $language
  ] | order(_createdAt desc)[0...3] {
    ...,
    "slug": slug.current,
  }
`)

export const flockTalkOverviewQuery = defineQuery(`
  *[
    _type == "flockTalk" &&
    language == $language
  ] | order(_createdAt desc) {
    ...,
    "slug": slug.current,
  }
`)

export const projectOverviewQuery = defineQuery(`
  *[
    _type == "project" &&
    language == $language
  ] | order(_createdAt desc) {
    ...,
    "slug": slug.current,
  }
`)

export const vacancyOverviewQuery = defineQuery(`
  *[
    _type == "vacancy" &&
    language == $language
  ] | order(_createdAt desc) {
    ...,
    "slug": slug.current,
  }
`)

export const localeQuery = defineQuery(`
  *[
    _type in ["page", "service", "project", "flockTalk", "vacancy", "policy"] &&
    slug.current == $slug &&
    language == $language
  ][0]{
    "_translations": *[
      _type == "translation.metadata" &&
      references(^._id)
    ].translations[].value->{
      language,
      "slug": slug.current,
    },
  }
`)
