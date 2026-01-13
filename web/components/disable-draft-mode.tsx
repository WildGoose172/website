'use client'

import { Button } from '@/components/ui/button'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { disableDraftMode } from '@/app/actions'
import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const environment = useDraftModeEnvironment()

  if (environment !== 'live' && environment !== 'unknown') {
    return null
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })

  return (
    <div className="fixed left-4 top-1/2 origin-left rotate-[90deg]">
      {pending ? (
        <Button type="button" variant="secondary" size="lg" disabled>
          Disabling draft mode...
        </Button>
      ) : (
        <Button type="button" variant="secondary" size="lg" onClick={disable}>
          Disable draft mode
        </Button>
      )}
    </div>
  )
}
