'use client'

import {
  BedDouble,
  BriefcaseBusiness,
  DoorOpen,
  LandPlot,
  MegaphoneOff,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { PortableText } from 'next-sanity'
import { useIsMobile } from '@/hooks/use-mobile'

type ValueItem = NonNullable<BlockWithMeta<'values'>['values']>[number]

export function Values({ title, values, className }: BlockWithMeta<'values'>) {
  const mobile = useIsMobile()

  return (
    <section
      className={cn(
        'container flex flex-col items-center gap-6 py-20',
        className,
      )}
    >
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <motion.div
          className="sm:bg-muted sm:rounded-2xl sm:p-6 lg:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.3,
          }}
        >
          <h2>{title}</h2>
        </motion.div>

        {(values ?? []).map((value, i) => {
          return (
            <motion.div
              key={value._key}
              className="hover:bg-muted/10 hover:scale-102 flex h-full flex-col gap-4 rounded-2xl border p-6 transition duration-300 lg:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.3,
                delay: mobile ? 0 : (i + 1) * 0.15,
              }}
            >
              <div>{renderIcon(value.icon)}</div>

              <div className="flex flex-col gap-2">
                <h3 className="head-4">{value.title}</h3>
                <div className="html-richtext text-sm">
                  <PortableText value={value.text ?? []} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function renderIcon(icon: ValueItem['icon']) {
  switch (icon) {
    case 'briefcase-business':
      return <BriefcaseBusiness className="size-8 min-w-8" />
    case 'bed-double':
      return <BedDouble className="size-8 min-w-8" />
    case 'door-open':
      return <DoorOpen className="size-8 min-w-8" />
    case 'land-plot':
      return <LandPlot className="size-8 min-w-8" />
    case 'megaphone-off':
      return <MegaphoneOff className="size-8 min-w-8" />
    case 'shield-check':
      return <ShieldCheck className="size-8 min-w-8" />
    case 'users':
      return <Users className="size-8 min-w-8" />
    default:
      return <span>icon not found</span>
  }
}
