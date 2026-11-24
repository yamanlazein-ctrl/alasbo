import Link from 'next/link'
import { navigation } from '../content/site'

export function HeritageNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-linear-to-b from-ink/75 to-transparent px-5 pt-4 sm:px-10 sm:pt-6 lg:px-16">
      <div className="mx-auto flex min-h-14 w-full max-w-[90rem] items-center justify-between gap-4">
        <Link href="/" aria-label="الصفحة الرئيسية" className="shrink-0 text-lg font-semibold tracking-wide text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
          الصابوني
        </Link>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="min-h-11 content-center text-sm text-parchment/80 transition-colors duration-[var(--duration-quick)] ease-heritage hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="grid gap-1.5">
              <span className="h-px w-5 bg-current" />
              <span className="h-px w-5 bg-current" />
            </span>
            القائمة
          </summary>
          <nav aria-label="التنقل الرئيسي" className="absolute end-0 top-full mt-2 grid min-w-48 gap-1 bg-ink px-4 py-3 shadow-xl shadow-black/20">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} prefetch={false} className="min-h-11 content-center text-sm text-parchment/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  )
}
