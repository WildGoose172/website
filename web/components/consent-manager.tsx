import {
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner,
} from '@c15t/nextjs'
import { ConsentManagerClient } from '@/components/consent-manager-client'

interface ConsentManagerProps {
  children: React.ReactNode
}

export function ConsentManager({ children }: ConsentManagerProps) {
  return (
    <ConsentManagerProvider
      options={{
        mode: 'c15t',
        backendURL: process.env.NEXT_PUBLIC_C15T_URL,
        consentCategories: ['necessary', 'measurement', 'marketing'],
      }}
    >
      <CookieBanner />
      <ConsentManagerDialog />
      <ConsentManagerClient>{children}</ConsentManagerClient>
    </ConsentManagerProvider>
  )
}
