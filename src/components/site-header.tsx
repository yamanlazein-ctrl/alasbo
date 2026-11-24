import Image from 'next/image'
import Link from 'next/link'
import { navigation } from '../content/site'
import { BrandStrokeMask } from './brand-stroke-mask'
import { MobileNavigation } from './mobile-navigation'
import { NavigationDisclosure } from './navigation-disclosure'
import { SearchShortcut } from './search-shortcut'

export function SiteHeader({ activeHref }: { activeHref: string }) {
  const moreLinks = navigation.slice(2)

  return (
    <header className="site-header pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="site-header__inner pointer-events-auto mx-auto grid w-full items-center">
        <Link className="brand-link grid place-items-center justify-self-start" href="/" aria-label="الصفحة الرئيسية">
          <span className="brand-link__art">
            <Image
              className="brand-link__original"
              src="/assets/brand/alsabouni-calligraphy-logo.png"
              alt="الصابوني"
              width={1671}
              height={941}
              sizes="(max-width: 639px) 88px, 120px"
              quality={95}
              loading="eager"
            />
            <Image
              className="brand-link__vector"
              src="/assets/brand/alsabouni-calligraphy-outline.svg"
              alt=""
              aria-hidden="true"
              width={1671}
              height={941}
              unoptimized
              loading="eager"
            />
          </span>
          <BrandStrokeMask />
        </Link>

        <nav className="desktop-navigation items-center justify-center whitespace-nowrap" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} aria-current={item.href === activeHref ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <NavigationDisclosure active={moreLinks.some((item) => item.href === activeHref)}>
            <div className="more-navigation__panel absolute grid gap-1">
              {moreLinks.map((item) => (
                <Link key={item.href} href={item.href} prefetch={false} aria-current={item.href === activeHref ? 'page' : undefined}>
                  {item.label}
                </Link>
              ))}
            </div>
          </NavigationDisclosure>
        </nav>

        <MobileNavigation activeHref={activeHref} />
        <SearchShortcut />
      </div>
    </header>
  )
}
