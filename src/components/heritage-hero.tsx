'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'

export function HeritageHero() {
  const reduceMotion = useReducedMotion()
  const reveal = {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <section aria-labelledby="hero-title" className="relative mx-auto grid min-h-[100svh] w-full max-w-[90rem] grid-cols-1 items-center px-6 pb-6 pt-24 sm:px-10 lg:grid-cols-12 lg:px-16 lg:pt-20">
      <div className="relative z-10 order-1 flex flex-col items-start lg:col-span-6 lg:pe-8">
        <motion.p {...reveal} className="mb-5 text-xs font-medium tracking-[0.2em] text-parchment/75 sm:text-sm">أرشيفٌ علميٌّ موثوق</motion.p>
        <motion.h1
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
          id="hero-title"
          className="max-w-[12ch] text-pretty font-primary text-[clamp(2.7rem,6vw,5.35rem)] font-medium leading-[1.25] tracking-[-0.035em] text-parchment"
        >
          الشيخ محمد علي <span className="block whitespace-nowrap">الصابوني</span>
        </motion.h1>
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.16 }} className="mt-5 max-w-lg text-base leading-8 text-parchment/80 sm:text-lg">
          صاحبُ «صفوة التفاسير»؛ إرثٌ علميٌّ في خدمة كتاب الله وسنّة رسوله.
        </motion.p>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.24 }} className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link href="/library" prefetch={false} className="inline-flex min-h-12 items-center border-b border-parchment/55 text-sm font-semibold text-parchment transition-colors duration-[var(--duration-quick)] ease-heritage hover:border-parchment hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
            اكتشف تراثه
          </Link>
          <Link href="/search" prefetch={false} className="inline-flex min-h-12 items-center gap-2 text-sm text-parchment/75 transition-colors duration-[var(--duration-quick)] ease-heritage hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
            <Search aria-hidden="true" className="size-4" />
            ابحث في الأرشيف
          </Link>
        </motion.div>
        <p className="mt-6 text-sm text-parchment/65">رحمه الله رحمةً واسعة</p>
      </div>

      <motion.figure
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        className="relative order-2 mx-auto flex h-[34svh] min-h-64 w-full max-w-[26rem] items-end justify-center lg:col-span-6 lg:h-[78svh] lg:max-h-[48rem] lg:max-w-none"
      >
        <div aria-hidden="true" className="absolute inset-x-[9%] bottom-[3%] h-[42%] rounded-[50%] bg-[#5a4324]/35 blur-3xl" />
        <Image
          src="/assets/images/sheikh-muhammad-ali-al-sabouni-cutout.png"
          alt="الشيخ محمد علي الصابوني رحمه الله"
          fill
          priority
          sizes="(max-width: 1024px) 86vw, 48vw"
          className="relative z-10 object-contain object-bottom saturate-[0.82] sepia-[0.12] contrast-[0.97] drop-shadow-[0_0_0.75rem_rgba(173,148,96,0.12)] drop-shadow-[0_1rem_2.4rem_rgba(13,10,6,0.42)] [mask-image:radial-gradient(ellipse_96%_100%_at_50%_48%,black_78%,transparent_100%),linear-gradient(to_bottom,black_0%,black_90%,transparent_100%)] [mask-composite:intersect]"
        />
      </motion.figure>
    </section>
  )
}
