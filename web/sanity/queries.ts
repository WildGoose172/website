import { groq } from 'next-sanity'

export const navigationQuery = groq`*[_type == "navigation" && language == $language]{
  image,
  links,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    image,
    links
  },
}[0]`
