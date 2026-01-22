'use client'

import { gtag } from '@c15t/scripts/google-tag'
import { ClientSideOptionsProvider } from '@c15t/nextjs/client'

interface ConsentManagerClientProps {
  children: React.ReactNode
}

export function ConsentManagerClient({ children }: ConsentManagerClientProps) {
  return (
    <ClientSideOptionsProvider
      scripts={[
        gtag({
          id: 'G-JZ6XXWL0JZ',
          category: 'measurement',
        }),
      ]}
    >
      {children}
    </ClientSideOptionsProvider>
  )
}
