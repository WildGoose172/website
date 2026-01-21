'use client'

import { SanityImage } from '@/components/sanity-image'
import {
  BedDouble,
  BriefcaseBusiness,
  DoorOpen,
  LandPlot,
  MegaphoneOff,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { PortableText } from 'next-sanity'
import { useRef, useEffect } from 'react'
import { animate, scroll } from 'motion'
import { useIsMobile } from '@/hooks/use-mobile'
import { useContainerPadding } from '@/hooks/use-container-padding'

type ValueItem = NonNullable<BlockWithMeta<'values'>['values']>[number]

export function Values({ values, className }: BlockWithMeta<'values'>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const mobile = useIsMobile()
  const containerPadding = useContainerPadding()

  useEffect(() => {
    if (!containerRef.current || !groupRef.current) return

    const items = groupRef.current.children
    const itemCount = items.length
    const cardWidth = mobile ? 360 : 576
    const gap = 24

    scroll(
      animate(groupRef.current, {
        transform: [
          'none',
          `translateX(-${containerPadding + (itemCount - 1) * (cardWidth + gap)}px)`,
        ],
      }),
      {
        target: containerRef.current,
        offset: ['start center', 'end center'],
      },
    )
  }, [values, mobile, containerPadding])

  return (
    <section className={cn('py-20', className)}>
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${(values?.length ?? 0) * 30}vh` }}
      >
        <div className="sticky top-1/2 flex items-center overflow-hidden">
          <div ref={groupRef} className="flex gap-6">
            {(values ?? []).map((value, i) => {
              return (
                <div
                  key={value._key}
                  className="md:w-xl w-90 relative flex-1 overflow-hidden rounded-2xl p-6 md:p-10"
                  style={{
                    marginLeft: i === 0 ? containerPadding : 0,
                  }}
                >
                  <div className="text-background relative z-10 flex h-full flex-col justify-between">
                    <div className="flex flex-1 items-center gap-6 md:gap-12">
                      {renderIcon(value.icon)}
                      <div className="flex max-w-prose flex-col gap-2 overflow-hidden">
                        <div className="flex flex-col gap-2">
                          <h3>{value.title}</h3>
                          <div className="html-richtext [&>p]:text-justify! text-sm">
                            <PortableText value={value.text ?? []} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 -z-10">
                    <SanityImage
                      src={value.image!}
                      alt={value.image?.alt ?? ''}
                      fill
                      sizes="600px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function renderIcon(icon: ValueItem['icon']) {
  switch (icon) {
    case 'briefcase-business':
      return (
        <BriefcaseBusiness className="size-10 min-w-10 md:size-20 md:min-w-20" />
      )
    case 'bed-double':
      return <BedDouble className="size-10 min-w-10 md:size-20 md:min-w-20" />
    case 'door-open':
      return <DoorOpen className="size-10 min-w-10 md:size-20 md:min-w-20" />
    case 'land-plot':
      return <LandPlot className="size-10 min-w-10 md:size-20 md:min-w-20" />
    case 'megaphone-off':
      return (
        <MegaphoneOff className="size-10 min-w-10 md:size-20 md:min-w-20" />
      )
    case 'shield-check':
      return <ShieldCheck className="size-10 min-w-10 md:size-20 md:min-w-20" />
    case 'users':
      return <Users className="size-10 min-w-10 md:size-20 md:min-w-20" />
    default:
      return <span>icon not found</span>
  }
}
