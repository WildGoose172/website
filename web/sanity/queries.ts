import { groq } from 'next-sanity'

const pageReference = `page->{
  _type,
  "slug": slug.current
}`

const nestedLinks = `links[]{
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
}`

export const navigationQuery = groq`
  *[
    _type == "navigation" &&
    language == $language
  ]{
    image,
    ${nestedLinks},
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      image,
      ${nestedLinks},
    },
  }[0]
`

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
  },
`

export const pageQuery = groq`
  *[
    _type in ["page", "service", "project", "flockTalk"] && 
    slug.current == $slug &&
    language == $language
  ][0]{
    ...,
    ${pageBuilderBlocks}
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "keywords": coalesce(seo.keywords, []),
    },
  }
`

export const sitemapQuery = groq`
  *[
    _type in ["page", "service", "project", "flockTalk"] &&
    defined(slug.current)
  ] {
    "href": slug.current,
    _updatedAt,
    language,
  }
`
