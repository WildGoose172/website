import { defineConsentConfig, hosted } from 'c15t/next'
import { gtag } from '@c15t/integrations/google-tag'

// The backend URL comes from NEXT_PUBLIC_C15T_BACKEND_URL.
export default defineConsentConfig({
  mode: hosted(),
  options: {
    consentCategories: ['necessary', 'measurement', 'marketing'],
  },
  scripts: [
    gtag({
      id: 'G-JZ6XXWL0JZ',
      category: 'measurement',
      // Send nothing to Google until the visitor allows measurement.
      loadMode: 'after-consent',
    }),
  ],
})
