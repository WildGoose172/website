'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { BlockWithMeta } from '@/types/blocks'
import { TextAnimate } from '@/components/ui/text-animate'

export function TextHero({
  title,
  description,
  className,
}: BlockWithMeta<'textHero'>) {
  return (
    <section
      className={cn('bg-primary flex min-h-dvh flex-col text-white', className)}
    >
      <div className="container mx-auto flex grow flex-col justify-around gap-20 pb-10 pt-40">
        <Image
          src="/images/goose_with_hat.webp"
          alt="Wild Goose"
          width={200}
          height={278}
          loading="eager"
          className="w-37 xl:w-50 mx-auto md:ml-20 md:mr-0"
        />

        <div className="self-center sm:self-end">
          <TextAnimate
            animation="blurInUp"
            by="word"
            once
            as="h1"
            className="text-balance text-center text-4xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
          >
            {title ?? ''}
          </TextAnimate>
          <TextAnimate
            animation="blurInUp"
            by="word"
            once
            as="p"
            delay={0.3}
            className="text-muted mx-auto max-w-prose text-balance text-center"
          >
            {description ?? ''}
          </TextAnimate>
        </div>
        <div className="head-4 text-muted flex flex-col font-black">
          <TextAnimate animation="slideRight" by="word" once>
            Fly
          </TextAnimate>
          <TextAnimate animation="slideRight" by="word" once delay={0.3}>
            Further
          </TextAnimate>
          <TextAnimate animation="slideRight" by="word" once delay={0.6}>
            Together
          </TextAnimate>
        </div>
      </div>
    </section>
  )
}
