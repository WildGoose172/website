import { groq } from 'next-sanity'

export const navigationQuery = groq`
  *[_type == "navigation" && language == $language]{
    image,
    links,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      image,
      links
    },
  }[0]
`

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug && language == $language][0]{
    ...,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "keywords": coalesce(seo.keywords, []),
    },
  }
`

export const sitemapQuery = groq`
  *[_type in ["page"] && defined(slug.current)] {
    "href": select(
      _type == "page" => slug.current,
      slug.current
    ),
    _updatedAt,
    language,
  }
`
