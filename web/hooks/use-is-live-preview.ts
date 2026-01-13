'use client'

import { useIsLivePreview } from 'next-sanity/hooks'

export function DebugLivePreview() {
  const isLivePreview = useIsLivePreview()

  if (isLivePreview === null) return 'Checking Live Preview...'

  return isLivePreview ? 'Live Preview Enabled' : 'Live Preview Disabled'
}
