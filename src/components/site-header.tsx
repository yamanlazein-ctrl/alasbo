import Image from 'next/image'
import Link from 'next/link'
import { navigation } from '../content/site'
import { MobileNavigation } from './mobile-navigation'
import { SearchShortcut } from './search-shortcut'

export function SiteHeader({ activeHref }: { activeHref: string }) {
  return (
    <header className="site-header" data-site-header>
      <div className="site-header__inner">
        <Link className="brand-link" href="/" aria-label="الصفحة الرئيسية">
          <Image
            src="/assets/brand/alsabouni-calligraphy-logo.png"
            alt="الصابوني"
            width={1671}
            height={941}
            sizes="(max-width: 639px) 88px, 120px"
            quality={95}
            loading="eager"
          />
        </Link>

        <nav className="desktop-navigation" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              aria-current={item.href === activeHref ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <SearchShortcut />
          <MobileNavigation activeHref={activeHref} />
        </div>
      </div>
    </header>
  )
}
