import { sanityFetch } from '@/sanity/live'
import { llmsQuery } from '@/sanity/queries'
import type { LlmsQueryResult } from '@/types/sanity'
import { pageUrl } from '@/lib/schema-org'

// llms.txt (https://llmstxt.org): a Markdown summary of the site for LLMs and AI agents

type Document = LlmsQueryResult[number]

const SECTIONS: { title: string; type: Document['_type'] }[] = [
  { title: 'Services', type: 'service' },
  { title: 'Projects', type: 'project' },
  { title: 'Vacancies', type: 'vacancy' },
  { title: 'Flock Talk (blog)', type: 'flockTalk' },
  { title: 'Pages', type: 'page' },
  { title: 'Optional', type: 'policy' },
]

const INTRO = `Wild Goose (Wild Goose BV) is a Belgian software partner. Our senior software engineers help companies move forward with software that lasts: they think along, make the right trade-offs and take responsibility, using AI where it adds value. We offer advice, code audits, engineers who join your team and complete project teams with our clients.

Wild Goose was founded in January 2024 and is run by Lennert Vesters and Mitte Berckmans, with an office in Tessenderlo-Ham (Limburg, Belgium). Our engineers are technically strong, but what clients value most goes further: they understand the business behind the software, explain technical choices to non-technical people, keep the overview in complex systems, take responsibility for what they deliver and say when something won’t work.


Legal name: Wild Goose BV
VAT / enterprise number: BE 1005.389.162
Office: Hulsterweg 172, 3980 Tessenderlo-Ham, Belgium
Registered office: Kolmenstraat 184, 3512 Hasselt, Belgium
Email: fly@wildgoose.be
LinkedIn: https://www.linkedin.com/company/wild-goose-engineers
Instagram: https://www.instagram.com/wildgoose.be/


The website is available in Dutch (default, https://www.wildgoose.be) and English (https://www.wildgoose.be/en). The links below point to the English pages; pages marked (Dutch) are only available in Dutch.`

function toLine(document: Document) {
  const title = document.title?.trim() || document.slug
  const language = document.language === 'en' ? '' : ' (Dutch)'
  // Typed as string, but null when a document has no SEO description and no teaser
  const description = (document.description ?? '').replace(/\s+/g, ' ').trim()

  return `- [${title}](${pageUrl(document.language ?? undefined, document.slug ?? undefined)})${language}${description ? `: ${description}` : ''}`
}

export async function GET() {
  const { data: documents } = await sanityFetch({
    query: llmsQuery,
    perspective: 'published',
    stega: false,
  })

  const sections = SECTIONS.map(({ title, type }) => {
    const lines = documents
      .filter(document => document._type === type)
      .map(toLine)

    return lines.length ? `## ${title}\n\n${lines.join('\n')}` : ''
  }).filter(Boolean)

  return new Response([INTRO, ...sections].join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
