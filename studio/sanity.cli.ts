import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'uwf1iyke',
    dataset: 'production',
  },
  deployment: {
    appId: 'mi03wv6q65rsfvnpq6u7b8rx',
    autoUpdates: true,
  },
  typegen: {
    path: '../web/sanity/queries.ts',
    schema: './schema.json',
    generates: '../web/types/sanity.ts',
  },
})
