'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HeritageAbout } from './heritage-about'
import { HeritageHero } from './heritage-hero'
import { HeritageNavigation } from './heritage-navigation'

export function HeritageHome() {
  const pageRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -72])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1.04, reduceMotion ? 1.04 : 1.1])

  return (
    <main ref={pageRef} className="relative isolate min-h-svh overflow-clip bg-ink text-parchment" id="main-content" tabIndex={-1}>
      <a href="#heritage-about" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-antique-gold focus:px-4 focus:py-3 focus:text-ink">
        تخطَّ إلى المحتوى
      </a>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[178svh] overflow-hidden"
        style={reduceMotion ? undefined : { y: sceneY, scale: sceneScale }}
      >
        <Image
          src="/assets/images/mosque-chandelier.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[48%_top] opacity-40 saturate-[0.58] max-sm:object-[39%_top] max-sm:opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-l from-ink/85 via-ink/55 to-ink/15" />
        <div className="absolute inset-0 bg-linear-to-b from-ink/10 via-ink/45 to-ink" />
      </motion.div>

      <HeritageNavigation />
      <div className="relative z-10">
        <HeritageHero />
        <HeritageAbout />
      </div>
    </main>
  )
}
