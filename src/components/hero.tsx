import Image from 'next/image'
import { ScholarlySearch } from './scholarly-search'

const PORTRAIT_SRC = '/assets/images/sheikh-muhammad-ali-al-sabouni-cutout.png'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" data-hero-motion="background">
        <Image
          src="/assets/images/mosque-chandelier.png"
          alt=""
          fill
          sizes="100vw"
          quality={95}
          preload
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />
      <div className="hero__floor" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <figure className="hero__portrait" data-hero-motion="portrait">
        <Image
          className="hero__portrait-img"
          src={PORTRAIT_SRC}
          alt="الشيخ محمد علي الصابوني رحمه الله"
          width={1165}
          height={1350}
          sizes="(max-width: 639px) 76vw, 46vw"
          quality={95}
          fetchPriority="high"
          loading="eager"
        />
        <div
          className="hero__rim"
          aria-hidden="true"
          style={{ ['--portrait-mask' as string]: `url(${PORTRAIT_SRC})` }}
        />
      </figure>

      <div className="hero__content" data-hero-motion="content">
        <div className="hero__identity">
          <h1 className="hero__name" id="hero-title">
            <span data-hero-motion="headline">
              <i>الشيخ محمد علي</i>
            </span>
            <span data-hero-motion="headline">
              <i>الصابوني</i>
            </span>
          </h1>
          <p className="hero__support" data-hero-motion="support">
            <span className="hero__subline">خادم كتاب الله وسنة رسوله</span>
            <span className="hero__mercy">رحمه الله</span>
          </p>
        </div>

        <ScholarlySearch />
      </div>
    </section>
  )
}
