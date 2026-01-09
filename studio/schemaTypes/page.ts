import { defineField, defineType, SlugValidationContext } from 'sanity'
import { SparklesIcon, DocumentIcon } from '@sanity/icons'

const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
    }),
    defineField({
      name: 'metaKeywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'metaImage',
      type: 'image',
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})

const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueOtherThanLanguage,
        source: 'title',
      },
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const { language, title } = selection

      return {
        title: title,
        subtitle: (language ?? '').toUpperCase(),
      }
    },
  },
})

export async function isUniqueOtherThanLanguage(
  slug: string,
  context: SlugValidationContext,
) {
  const { document, getClient } = context

  if (!document?.language) {
    return true
  }

  const client = getClient({ apiVersion: '2025-02-19' })
  const id = document._id.replace(/^drafts\./, '')
  const query = `!defined(*[
    !(sanity::versionOf($id)) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`

  return await client.fetch(query, {
    id,
    language: document.language,
    slug,
  })
}

export const pageTypes = [pageType, seoType]
