'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HeritageAbout } from './heritage-about'
import { HeritageHero } from './heritage-hero'
import { HeritageNavigation } from './heritage-navigation'

export function HeritageHome() {
  const pageRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] })
  const { scrollYProgress: aboutApproach } = useScroll({ target: aboutRef, offset: ['start end', 'start start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -54])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1.04, reduceMotion ? 1.04 : 1.08])
  const kaabaOpacity = useTransform(aboutApproach, [0, 0.9, 1], [0, 0.68, 0.82])

  return (
    <main ref={pageRef} className="relative isolate min-h-svh overflow-clip bg-ink text-parchment" id="main-content" tabIndex={-1}>
      <a href="#heritage-about" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-antique-gold focus:px-4 focus:py-3 focus:text-ink">
        تخطَّ إلى المحتوى
      </a>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-x-0 top-0 h-[150svh]" style={reduceMotion ? undefined : { y: sceneY, scale: sceneScale }}>
          <Image
            src="/assets/images/mosque-chandelier.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[48%_top] opacity-40 saturate-[0.58] max-sm:object-[39%_top] max-sm:opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-l from-ink/90 via-ink/58 to-ink/20" />
          <div className="absolute inset-0 bg-linear-to-b from-ink/15 via-ink/45 to-ink" />
        </motion.div>
        <motion.div className="absolute inset-x-0 top-[66svh] h-[330svh] overflow-hidden" style={reduceMotion ? undefined : { opacity: kaabaOpacity }}>
          <Image src="/assets/images/kaaba-background-placeholder.svg" alt="" fill sizes="100vw" className="object-cover object-center opacity-80" />
          <div className="absolute inset-0 bg-linear-to-l from-ink/90 via-ink/55 to-ink/20" />
          <div className="absolute inset-0 bg-linear-to-b from-ink/30 via-ink/45 to-ink" />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_44%,transparent_24%,var(--color-ink)_100%)] opacity-55" />
      </div>

      <HeritageNavigation />
      <div className="relative z-10">
        <HeritageHero />
        <HeritageAbout ref={aboutRef} reduceMotion={Boolean(reduceMotion)} />
      </div>
    </main>
  )
}
