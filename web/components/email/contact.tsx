import {
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Text,
  Body,
} from '@react-email/components'

export interface ContactTemplateProps {
  name: string
  email: string
  message: string
}

export function ContactTemplate({
  name,
  email,
  message,
}: ContactTemplateProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Contact Form Submission</title>
      </Head>
      <Body>
        <Container>
          <Heading as="h1">Contact Form Submission</Heading>
          <Hr />
          <Text>Name: {name}!</Text>
          <Text>Email: {email}</Text>
          <Text>Message: {message}</Text>
        </Container>
      </Body>
    </Html>
  )
}
