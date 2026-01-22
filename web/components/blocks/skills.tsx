'use client'

import { PortableText } from 'next-sanity'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { useScroll, useTransform, motion, MotionValue } from 'motion/react'
import { useRef } from 'react'

export function Skills({
  title,
  text,
  skills,
  className,
}: BlockWithMeta<'skills'>) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const labelY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (skills?.length ?? 1) * 36],
  )

  return (
    <section
      ref={containerRef}
      className={cn(
        'container mx-auto flex flex-col-reverse items-center justify-center gap-20 py-20 md:grid-cols-2 md:flex-row',
        className,
      )}
    >
      <div className="relative flex justify-center gap-4">
        <motion.div
          className="head-3 sticky flex h-fit items-center"
          style={{
            y: labelY,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          SKILLS
        </motion.div>

        <ul className="flex flex-col gap-1">
          {(skills ?? []).map((skill, index) => (
            <SkillItem
              key={skill}
              skill={skill}
              index={index}
              itemCount={(skills ?? []).length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </ul>
      </div>

      <div className="flex max-w-prose flex-col gap-y-6">
        <h2>{title}</h2>
        <div className="html-richtext">
          <PortableText value={text!} />
        </div>
      </div>
    </section>
  )
}

interface SkillItemProps {
  skill: string
  index: number
  itemCount: number
  scrollYProgress: MotionValue<number>
}

function SkillItem({
  skill,
  index,
  itemCount,
  scrollYProgress,
}: SkillItemProps) {
  const start = index / itemCount
  const end = (index + 1) / itemCount

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [0.4, 1, 1, 0.4],
  )

  const color = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    ['#85837C', '#CC6057', '#CC6057', '#85837C'],
  )

  return (
    <motion.li style={{ opacity, color }}>
      <p className="head-2 font-semibold">{skill}</p>
    </motion.li>
  )
}
