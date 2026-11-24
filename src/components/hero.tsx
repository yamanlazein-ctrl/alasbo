import Image from 'next/image'
import { ScholarlySearch } from './scholarly-search'

export function Hero({ cinematic = false }: { cinematic?: boolean }) {
  return (
    <section className={`hero relative isolate ${cinematic ? 'hero--cinematic' : 'bg-canvas'}`} aria-labelledby="hero-title">
      <div className="hero__architecture absolute inset-x-0 top-0 -z-2" aria-hidden="true">
        <Image
          src="/assets/images/mosque-chandelier.png"
          alt=""
          width={1820}
          height={864}
          sizes="(max-width: 639px) 1200px, 116vw"
          quality={95}
          preload
        />
      </div>

      <div className="hero__grid mx-auto w-full max-w-page">
        <figure className="portrait" data-hero-motion="portrait">
          <Image
            src="/assets/images/sheikh-muhammad-ali-al-sabouni-cutout.png"
            alt="الشيخ محمد علي الصابوني رحمه الله"
            width={1165}
            height={1350}
            sizes="(max-width: 639px) 420px, (max-width: 1023px) 50vw, (max-width: 1440px) 46vw, 640px"
            quality={95}
            fetchPriority="high"
            loading="eager"
          />
        </figure>

        <div className="hero__content relative z-1">
          <div className="hero__identity">
            <h1 id="hero-title" className="font-primary font-medium text-text text-balance">
              <span className="block" data-hero-motion="headline">الشيخ محمد علي</span>
              <span className="block" data-hero-motion="headline">الصابوني</span>
            </h1>
            <p className="hero__support" data-hero-motion="support">
              <span className="block">خادم كتاب الله وسنة رسوله</span>
              <span className="block">رحمه الله</span>
            </p>
          </div>

          <ScholarlySearch />
        </div>
      </div>
    </section>
  )
}
