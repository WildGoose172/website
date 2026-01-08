'use client'

import { Link } from '@/i18n/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import SanityImage from '@/components/sanity-image'
import { Button } from '@/components/ui/button'
import { LocaleSwitch } from '@/components/locale-switch'
import { LiquidGlassCard } from '@/components/ui/liquid-glass'
import { ChevronDown, Menu } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import { NavigationQueryResult } from '@/types/sanity'
import { useState } from 'react'

interface NavigationProps {
  nav: NavigationQueryResult
}

export function Navigation({ nav }: NavigationProps) {
  const isMobile = useIsMobile()

  const [openAccordion, setOpenAccordion] = useState<string>()

  return (
    <LiquidGlassCard
      blurIntensity="sm"
      className="container fixed left-1/2 top-2 mx-auto -translate-x-1/2 rounded-full px-4 py-1.5"
    >
      <div className="flex items-center justify-between gap-x-4">
        <SanityImage src={nav!.image!} alt="Logo" width={120} height={40} />

        {/* Desktop Navigation */}
        <NavigationMenu viewport={isMobile} className="hidden md:block">
          <NavigationMenuList className="flex-wrap">
            {nav?.links?.map(link => {
              if (link._type === 'navigationDropdown') {
                return (
                  <NavigationMenuItem key={link._key}>
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
            <NavigationMenuItem>
              {' '}
              <LocaleSwitch />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SanityImage
                src={nav!.image!}
                alt="Logo"
                width={120}
                height={40}
              />
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4">
              {nav?.links?.map(link => {
                if (link._type === 'navigationDropdown') {
                  return (
                    <div
                      key={link._key}
                      className="flex flex-col gap-2 border-b"
                    >
                      <button
                        className={[
                          'flex items-center justify-between gap-2',
                          openAccordion === link._key ? 'border-b' : '',
                        ].join(' ')}
                        onClick={() => {
                          setOpenAccordion(
                            openAccordion === link._key ? undefined : link._key,
                          )
                        }}
                      >
                        <span className="font-medium">{link.name}</span>
                        <ChevronDown
                          className={[
                            'transition-transform duration-200',
                            openAccordion === link._key ? 'rotate-180' : '',
                          ].join(' ')}
                        />
                      </button>
                      {openAccordion === link._key && (
                        <div key={link._key} className="flex flex-col pl-4">
                          {(link.links ?? []).map(subLink => (
                            <SheetClose key={subLink._key} asChild>
                              <Link href={subLink.slug?.current || '#'}>
                                {subLink.name}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                } else if (link._type === 'navigationLink') {
                  return (
                    <SheetClose key={link._key} asChild>
                      <Link
                        href={link.slug?.current || '#'}
                        className={`border-b font-medium`}
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  )
                }
              })}
            </div>
            <SheetFooter className="mt-10 border-t">
              <LocaleSwitch className="w-fit" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </LiquidGlassCard>
  )
}
