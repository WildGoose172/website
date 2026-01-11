import {
  createClient,
  FilteredResponseQueryOptions,
  QueryParams,
} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-02-19',
  useCdn: true,
  token: process.env.SANITY_VIEWER_TOKEN!,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL!,
  },
})

export async function sanityFetch<T>({
  query,
  params = {},
  options,
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: QueryParams
  options?: FilteredResponseQueryOptions
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch<T>(query, params, {
    ...(options || {}),
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
      ...(options?.next || {}),
    },
  })
}
