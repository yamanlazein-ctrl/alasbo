'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navigation } from '../content/site'

export function HeritageNavigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let previousY = window.scrollY
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 24)
      if (currentY < 80) setHidden(false)
      else if (Math.abs(currentY - previousY) > 5) setHidden(currentY > previousY)
      previousY = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 px-5 pt-3 transition-[transform,background-color,backdrop-filter] duration-[var(--duration-quick)] ease-heritage sm:px-10 sm:pt-5 lg:px-16 ${scrolled ? 'bg-ink/75 backdrop-blur-md' : 'bg-transparent'} ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-auto flex min-h-14 w-full max-w-[90rem] items-center justify-between gap-4">
        <Link href="/" aria-label="الصفحة الرئيسية" className="shrink-0 font-primary text-lg font-semibold tracking-wide text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">الصابوني</Link>
        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className="min-h-11 content-center text-sm text-parchment/80 transition-colors duration-[var(--duration-quick)] ease-heritage hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/search" prefetch={false} className="inline-flex min-h-11 items-center gap-2 text-sm text-parchment/80 transition-colors hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
            <Search aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">ابحث</span>
          </Link>
          <details className="relative lg:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true" className="grid gap-1.5"><span className="h-px w-5 bg-current" /><span className="h-px w-5 bg-current" /></span>
              القائمة
            </summary>
            <nav aria-label="التنقل الرئيسي" className="absolute end-0 top-full mt-2 grid min-w-48 gap-1 border border-parchment/10 bg-ink/95 px-4 py-3 backdrop-blur-md">
              {navigation.map((item) => <Link key={item.href} href={item.href} prefetch={false} className="min-h-11 content-center text-sm text-parchment/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">{item.label}</Link>)}
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
