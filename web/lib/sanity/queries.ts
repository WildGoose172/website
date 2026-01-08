import { groq } from 'next-sanity'

export const navigationQuery = groq`*[_type == "navigation"][0]`
