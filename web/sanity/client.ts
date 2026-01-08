import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'uwf1iyke',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
