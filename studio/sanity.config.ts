import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'Wild Goose Website',
  projectId: 'uwf1iyke',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'nl', title: 'Nederlands' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: schemaTypes.map(type => type.name),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
