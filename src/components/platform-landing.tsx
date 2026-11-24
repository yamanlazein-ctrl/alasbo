import { LibraryEntrance } from './library-entrance'
import { Hero } from './hero'
import { HeritageHome } from './heritage-home'
import { SiteHeader } from './site-header'
import { SiteMotion } from './site-motion'

export default function PlatformLanding({ activeHref }: { activeHref: string }) {
  const isHome = activeHref === '/'

  if (isHome) return <HeritageHome />

  return (
    <div className="site min-h-svh">
      <a className="skip-link" href="#main-content">تخطَّ إلى المحتوى</a>
      <SiteHeader activeHref={activeHref} />
      <main id="main-content" tabIndex={-1}>
        <Hero cinematic={isHome} />
        {isHome && <LibraryEntrance />}
      </main>
      <SiteMotion key={activeHref} />
    </div>
  )
}
