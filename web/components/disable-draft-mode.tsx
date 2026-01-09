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
    <div className="container mx-auto py-10">
      {pending ? (
        'Disabling draft mode...'
      ) : (
        <Button type="button" onClick={disable}>
          Disable draft mode
        </Button>
      )}
    </div>
  )
}
