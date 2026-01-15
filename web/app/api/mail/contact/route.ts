import {
  ContactTemplate,
  type ContactTemplateProps,
} from '@/components/email/contact'

import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const body: {
    to: string
    props: ContactTemplateProps
  } = await request.json()

  try {
    const { data, error } = await resend.emails.send({
      from: 'Wild Goose Website <wild@wildgoose.be>',
      to: [body.to],
      subject: 'Contact Form Submission',
      react: ContactTemplate(body.props),
    })

    console.log('Resend response:', {
      data,
      error,
      key: process.env.NEXT_RESEND_API_KEY,
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
