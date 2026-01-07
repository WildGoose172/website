import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'uwf1iyke',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
  typegen: {
    path: '../web/app/**/*.{ts,tsx,js,jsx}',
    schema: './schema.json',
    generates: '../web/types/sanity.ts',
  },
})
