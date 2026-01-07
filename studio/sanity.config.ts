import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Wild Goose Website',
  projectId: 'uwf1iyke',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
