import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization'
import { vercelProtectionBypassTool } from '@sanity/vercel-protection-bypass'
import { resolve } from './utils/presentation-reslove'

export default defineConfig({
  name: 'default',
  title: 'Wild Goose Website',
  projectId: 'uwf1iyke',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve,
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'nl', title: 'Nederlands' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: schemaTypes.map(type => type.name),
    }),
    vercelProtectionBypassTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
