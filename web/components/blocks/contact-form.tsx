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

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export function ContactForm({
  title,
  emailTo,
  className,
}: BlockWithMeta<'contactForm'>) {
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
    <section className={cn('container mx-auto pt-20', className)}>
      {title && <h2 className="mb-4 text-center">{title}</h2>}
      <div className="bg-muted mx-auto max-w-prose rounded-2xl p-10">
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
