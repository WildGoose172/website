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
        _key,
        _type,
        "slug": item->slug.current,
        "thumbnail": item->thumbnail,
        "title": item->title,
      }
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
  },
`

export const pageQuery = defineQuery(`
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
`)

export const sitemapQuery = defineQuery(`
  *[
    _type in ["page", "service", "project", "flockTalk"] &&
    defined(slug.current)
  ] {
    "href": slug.current,
    _updatedAt,
    language,
  }
`)
