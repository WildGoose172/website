'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import SanityImage from '@/components/sanity-image'

import { useIsMobile } from '@/hooks/use-mobile'
import { NavigationQueryResult } from '@/types/sanity'

interface NavigationProps {
  nav: NavigationQueryResult
}

export function Navigation({ nav }: NavigationProps) {
  const isMobile = useIsMobile()

  return (
    <div className="border-glass-border bg-glass shadow-2xl/20 inset-shadow-sm inset-shadow-current/20 inset-shadow-sm container mx-auto mt-4 flex justify-between gap-x-4 rounded-full border px-2 py-1 backdrop-blur-sm">
      <SanityImage src={nav!.image!} alt="Logo" width={120} height={40} />

      <NavigationMenu viewport={isMobile}>
        <NavigationMenuList className="flex-wrap">
          {nav?.links?.map(link => {
            if (link._type === 'navigationDropdown') {
              return (
                <NavigationMenuItem key={link._key} className="hidden md:block">
                  <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[150px] gap-4">
                      <li>
                        {(link.links ?? []).map(subLink => (
                          <NavigationMenuLink asChild key={subLink._key}>
                            <Link href={subLink.slug?.current || '#'}>
                              {subLink.name}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            } else if (link._type === 'navigationLink') {
              return (
                <NavigationMenuItem key={link._key}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={link.slug?.current || '#'}>{link.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
