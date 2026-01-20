'use client'

import { SanityImage } from '@/components/sanity-image'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  BriefcaseBusiness,
  DoorOpen,
  LandPlot,
  MegaphoneOff,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { PortableText } from 'next-sanity'
import { useEffect, useState } from 'react'

type ValueItem = NonNullable<BlockWithMeta<'values'>['values']>[number]

export function Values({ values, className }: BlockWithMeta<'values'>) {
  const [current, setCurrent] = useState(0)
  const [isAutoplayActive, setIsAutoplayActive] = useState(true)

  useEffect(() => {
    if (!isAutoplayActive || !values || values.length === 0) return

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % values.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isAutoplayActive, values])

  function setPrevious() {
    setIsAutoplayActive(false)
    setCurrent(
      prev =>
        (prev - 1 + (values ? values.length : 0)) %
        (values ? values.length : 1),
    )
  }

  function setNext() {
    setIsAutoplayActive(false)
    setCurrent(prev => (prev + 1) % (values ? values.length : 1))
  }

  return (
    <section
      className={cn(
        'container mx-auto flex max-w-3xl flex-col gap-6 py-20',
        className,
      )}
    >
      {values && values[current] && (
        <div className="bg-primary relative overflow-hidden rounded-2xl md:aspect-video">
          <div className="z-1 text-background relative flex h-full flex-col justify-between p-4">
            <div className="flex flex-1 flex-col items-center gap-12 p-6 md:flex-row">
              <AnimatePresence mode="wait">
                <motion.div
                  key={values[current]._key}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.4, ease: 'easeOut' },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.3, ease: 'easeIn' },
                  }}
                >
                  {renderIcon(values[current].icon)}
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col gap-2 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={values[current]._key}
                    initial={{ y: 32, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.35, ease: 'easeOut' },
                    }}
                    exit={{
                      y: -32,
                      opacity: 0,
                      transition: { duration: 0.25, ease: 'easeIn' },
                    }}
                    className="flex flex-col gap-2"
                  >
                    <h2 className="text-center md:text-left">
                      {values[current].title}
                    </h2>
                    <div className="html-richtext [&>p]:md:text-justify! [&>p]:text-center">
                      <PortableText value={values[current].text ?? []} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {values.map((value, index) => (
                <button
                  key={value._key}
                  onClick={() => {
                    setCurrent(index)
                    setIsAutoplayActive(false)
                  }}
                  className={cn(
                    'bg-background/50 mt-6 inline-block h-1 w-4 rounded transition-opacity duration-300',
                    current === index && 'bg-background opacity-100',
                    current !== index && 'opacity-50 hover:opacity-100',
                  )}
                  aria-label={`Show value ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={values[current]._key}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.4, ease: 'easeOut' },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, ease: 'easeIn' },
              }}
              className="absolute inset-0"
            >
              <SanityImage
                src={values[current].image!}
                alt={values[current].image?.alt ?? ''}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="icon" onClick={setPrevious}>
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon" onClick={setNext}>
          <ArrowRight />
        </Button>
      </div>
    </section>
  )
}

function renderIcon(icon: ValueItem['icon']) {
  switch (icon) {
    case 'briefcase-business':
      return <BriefcaseBusiness className="size-20" />
    case 'bed-double':
      return <BedDouble className="size-20" />
    case 'door-open':
      return <DoorOpen className="size-20" />
    case 'land-plot':
      return <LandPlot className="size-20" />
    case 'megaphone-off':
      return <MegaphoneOff className="size-20" />
    case 'shield-check':
      return <ShieldCheck className="size-20" />
    case 'users':
      return <Users className="size-20" />
    default:
      return <span>icon not found</span>
  }
}
