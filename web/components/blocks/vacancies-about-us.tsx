'use client'

import { BlockWithMeta } from '@/types/blocks'
import { PortableText } from 'next-sanity'

export function VacanciesAboutUs({
  sectionOne,
  sectionTwo,
}: BlockWithMeta<'vacanciesAboutUs'>) {
  return (
    <div className="-mt-1 pb-20 sm:-mt-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="bg-primary fill-foreground"
      >
        <path d="M 0 234 L 0 217.14249847805968 C 144 217.14249847805968 144 215.8623891257158 288 215.8623891257158 C 432 215.8623891257158 432 159.6515034763949 576 159.6515034763949 C 720 159.6515034763949 720 235.4578598725378 864 235.4578598725378 C 1008 235.4578598725378 1008 191.5341073017451 1152 191.5341073017451 C 1296 191.5341073017451 1296 159.5136629699557 1440 159.5136629699557 C 1440 159.5136629699557 1440 320 1440 320 L 1440 320 L 0 320 Z"></path>
      </svg>
      <div className="bg-foreground text-background -mt-1 rounded-b-2xl pb-20">
        <div className="container flex flex-col gap-10 md:flex-row md:justify-center md:gap-20">
          <div className="flex flex-1 flex-col gap-6">
            <h2>{sectionOne?.title}</h2>
            <div className="html-richtext">
              <PortableText value={sectionOne?.description || []} />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <h2>{sectionTwo?.title}</h2>
            <div className="html-richtext">
              <PortableText value={sectionTwo?.description || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
