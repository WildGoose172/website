'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Phone } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export function ContactFormLarge({
  title,
  subtitle,
  mail,
  phone,
  emailTo,
  className,
}: BlockWithMeta<'contactFormLarge'>) {
  const t = useTranslations()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'success' | 'error' | 'initial'
  >('initial')

  const formSchema = z.object({
    name: z
      .string(t('form.required', { field: t('contactForm.name') }))
      .min(2, t('form.min', { field: t('contactForm.name'), min: 2 }))
      .max(50, t('form.max', { field: t('contactForm.name'), max: 50 })),
    email: z
      .email(t('form.email', { field: t('contactForm.email') }))
      .min(2, t('form.min', { field: t('contactForm.email'), min: 2 }))
      .max(50, t('form.max', { field: t('contactForm.email'), max: 50 })),
    message: z
      .string(t('form.required', { field: t('contactForm.message') }))
      .min(2, t('form.min', { field: t('contactForm.message'), min: 2 }))
      .max(100, t('form.max', { field: t('contactForm.message'), max: 100 })),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitStatus('initial')

    try {
      const response = await fetch('/api/mail/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailTo ?? 'fly@wildgoose.be',
          props: values,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      form.reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        'pt-30 container mx-auto flex flex-col items-center gap-x-20 gap-y-4 md:flex-row md:items-start md:justify-center',
        className,
      )}
    >
      <div className="flex flex-wrap gap-6 sm:flex-col">
        {mail && (
          <div className="flex gap-4">
            <div className="h-fit w-fit rounded border p-1.5">
              <Mail className="size-5 min-w-5" />
            </div>
            <div className="flex flex-col">
              <span className="head-4">{mail.title}</span>
              <a href={`mailto:${mail.mail}`} className="underline">
                {mail.mail}
              </a>
            </div>
          </div>
        )}
        {phone && (
          <div className="flex gap-4">
            <div className="h-fit w-fit rounded border p-1.5">
              <Phone className="size-5 min-w-5" />
            </div>
            <div className="flex flex-col">
              <span className="head-4">{phone.title}</span>
              <a href={`tel:${phone.number}`} className="underline">
                {phone.number}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="bg-primary text-background flex max-w-prose flex-col gap-10 rounded-2xl p-10">
        <div className="border-muted/40 flex flex-col gap-2 border-b border-dashed pb-4">
          <h1 className="head-2 md:head-1">{title}</h1>
          <p>{subtitle}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                disabled={submitStatus === 'success'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contactForm.name')}</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                disabled={submitStatus === 'success'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contactForm.email')}</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              disabled={submitStatus === 'success'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contactForm.message')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-40 rounded-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitStatus === 'success' && (
              <p className="text-xs text-green-600">
                {t('contactForm.success')}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-primary text-xs">{t('contactForm.error')}</p>
            )}
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="w-full"
              disabled={isSubmitting || submitStatus === 'success'}
            >
              {isSubmitting
                ? t('contactForm.sending')
                : t('contactForm.submit')}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
