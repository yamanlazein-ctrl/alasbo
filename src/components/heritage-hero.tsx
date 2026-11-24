'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export function HeritageHero() {
  const reduceMotion = useReducedMotion()
  const reveal = {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <section aria-labelledby="hero-title" className="relative mx-auto grid min-h-[min(100svh,58rem)] w-full max-w-[90rem] grid-cols-1 items-center px-6 pb-14 pt-28 sm:px-10 lg:min-h-[100svh] lg:grid-cols-12 lg:px-16 lg:pb-20">
      <div className="relative z-10 order-2 flex flex-col items-start pt-2 sm:pt-4 lg:order-1 lg:col-span-5 lg:pt-8">
        <motion.p {...reveal} className="mb-5 text-xs font-medium tracking-[0.22em] text-parchment/80 sm:text-sm">
          أرشيفٌ علميٌّ موثوق
        </motion.p>
        <motion.h1
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
          id="hero-title"
          className="max-w-[12ch] text-pretty font-primary text-[clamp(2.7rem,6vw,5.6rem)] font-medium leading-[1.2] tracking-[-0.035em] text-parchment"
        >
          الشيخ محمد علي <span className="whitespace-nowrap">الصابوني</span>
        </motion.h1>
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.16 }}
          className="mt-5 max-w-md text-base leading-8 text-parchment/80 sm:text-lg"
        >
          خادم كتاب الله وسنّة رسوله، وصاحبُ «صفوة التفاسير»
        </motion.p>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.24 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href="/library"
            prefetch={false}
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-antique-gold px-6 py-3 text-sm font-semibold text-ink transition-transform duration-[var(--duration-quick)] ease-heritage hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
          >
            اكتشف تراثه
          </Link>
          <Link
            href="/search"
            prefetch={false}
            className="inline-flex min-h-12 items-center border-b border-parchment/35 text-sm text-parchment/80 transition-colors duration-[var(--duration-quick)] ease-heritage hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
          >
            ابحث في الأرشيف
          </Link>
        </motion.div>
        <form action="/search" method="get" role="search" className="mt-8 flex w-full max-w-md items-center gap-3 border-b border-parchment/30 pb-2 focus-within:border-focus-ring">
          <label htmlFor="heritage-search" className="sr-only">ابحث في تراث الشيخ</label>
          <input
            id="heritage-search"
            name="q"
            type="search"
            placeholder="ابحث في تراث الشيخ"
            className="min-h-11 min-w-0 flex-1 appearance-none border-0 bg-transparent text-sm text-parchment outline-none placeholder:text-parchment/75"
          />
          <button type="submit" className="min-h-11 appearance-none border-0 bg-transparent px-2 text-sm text-parchment/85 transition-colors duration-[var(--duration-quick)] ease-heritage hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
            ابحث
          </button>
        </form>
        <p className="mt-5 text-sm text-parchment/75">رحمه الله رحمةً واسعة</p>
      </div>

      <motion.figure
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        className="relative order-1 mx-auto flex h-[clamp(19rem,64vw,43rem)] w-full max-w-[33rem] items-end justify-center lg:order-2 lg:col-span-7 lg:h-[min(83svh,49rem)] lg:max-w-none"
      >
        <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[4%] h-[57%] rounded-full bg-ink/50 blur-3xl" />
        <Image
          src="/assets/images/sheikh-muhammad-ali-al-sabouni-cutout.png"
          alt="الشيخ محمد علي الصابوني رحمه الله"
          fill
          priority
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 65vw, 56vw"
          className="relative z-10 object-contain object-bottom saturate-[0.78] sepia-[0.2] contrast-[0.96] drop-shadow-[0_1.5rem_2.8rem_rgba(10,8,5,0.42)] [mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)]"
        />
      </motion.figure>
    </section>
  )
}
