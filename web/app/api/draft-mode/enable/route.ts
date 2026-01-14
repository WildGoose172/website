import { client } from '@/sanity/client'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

console.log({ token: process.env.SANITY_VIEWER_TOKEN })

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
})
