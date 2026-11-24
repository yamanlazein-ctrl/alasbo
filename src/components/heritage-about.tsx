'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { forwardRef, useRef } from 'react'
import { ArchiveVideoDialog } from './archive-video-dialog'

const milestones = [
  'خادم كتاب الله وسنة رسوله',
  'درّس الشيخ الصابوني في الأزهر',
  'وألقى دروس التفسير في المسجد الحرام',
  'ومن مؤلفاته «صفوة التفاسير» و«روائع البيان»',
]

function IlluminatedLine({ text, progress, index, reduceMotion }: { text: string; progress: MotionValue<number>; index: number; reduceMotion: boolean }) {
  const start = 0.13 + index * 0.16
  const opacity = useTransform(progress, [start, start + 0.12], [0.55, 1])
  return <motion.p style={reduceMotion ? { opacity: 1 } : { opacity }} className="max-w-[37rem] text-sm leading-[1.65] text-parchment sm:text-lg sm:leading-[1.95]">{text}</motion.p>
}

export const HeritageAbout = forwardRef<HTMLElement, { reduceMotion: boolean }>(function HeritageAbout({ reduceMotion }, forwardedRef) {
  const localRef = useRef<HTMLElement>(null)
  const setRefs = (node: HTMLElement | null) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }
  const { scrollYProgress } = useScroll({ target: localRef, offset: ['start start', 'end end'] })
  const headingOpacity = useTransform(scrollYProgress, [0.03, 0.15], [0.55, 1])
  const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.88], [0.55, 1])

  return (
    <section ref={setRefs} id="heritage-about" aria-labelledby="about-title" className="relative h-[255svh] scroll-mt-0 sm:h-[280svh]">
      <div className="sticky top-0 mx-auto grid min-h-svh w-full max-w-[90rem] grid-cols-1 items-start overflow-hidden px-6 pb-5 pt-16 sm:px-10 lg:grid-cols-12 lg:items-center lg:px-16 lg:pb-8 lg:pt-16">
        <div className="relative z-10 order-1 flex flex-col items-start pt-2 before:pointer-events-none before:absolute before:-inset-x-6 before:-inset-y-3 before:-z-10 before:bg-linear-to-b before:from-ink/95 before:via-ink/85 before:to-transparent lg:col-span-6 lg:pe-8 lg:pt-0 lg:before:hidden">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] text-parchment/75 sm:text-sm">سيرةٌ وعطاء</p>
          <motion.h2 style={reduceMotion ? { opacity: 1 } : { opacity: headingOpacity }} id="about-title" className="mb-4 max-w-[12ch] text-pretty font-primary text-[clamp(2.25rem,5vw,4.45rem)] font-medium leading-[1.25] tracking-[-0.03em] text-parchment sm:mb-5">عمرٌ في خدمة القرآن</motion.h2>
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {milestones.map((line, index) => <IlluminatedLine key={line} text={line} progress={scrollYProgress} index={index} reduceMotion={reduceMotion} />)}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2">
            <ArchiveVideoDialog />
            <motion.div style={reduceMotion ? { opacity: 1 } : { opacity: ctaOpacity }}>
              <Link href="/sheikh" prefetch={false} className="group relative isolate inline-flex min-h-16 items-center gap-4 overflow-hidden border border-antique-gold/75 px-6 py-3 text-base font-semibold text-parchment transition-colors duration-[var(--duration-reveal)] ease-heritage before:absolute before:inset-y-0 before:start-0 before:-z-10 before:w-full before:origin-right before:scale-x-0 before:bg-antique-gold before:transition-transform before:duration-[var(--duration-reveal)] before:ease-heritage hover:text-ink hover:before:scale-x-100 focus-visible:text-ink focus-visible:before:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring sm:text-lg">
                  تعرّف على الشيخ
                  <ArrowLeft aria-hidden="true" className="size-5 transition-transform duration-[var(--duration-quick)] ease-heritage group-hover:-translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>

        <figure className="pointer-events-none absolute inset-x-0 bottom-0 order-2 mx-auto h-[24svh] max-h-[15rem] w-full max-w-[22rem] lg:relative lg:col-span-6 lg:h-[78svh] lg:max-h-[48rem] lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-[9%] bottom-[2%] h-[34%] rounded-[50%] bg-[#5a4324]/35 blur-3xl" />
          <Image
            src="/assets/images/sheikh-muhammad-ali-al-sabouni-cutout.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 88vw, 48vw"
            className="object-contain object-bottom saturate-[0.82] sepia-[0.12] contrast-[0.97] drop-shadow-[0_0_0.75rem_rgba(173,148,96,0.12)] drop-shadow-[0_1rem_2.4rem_rgba(13,10,6,0.42)] [mask-image:radial-gradient(ellipse_96%_100%_at_50%_48%,black_78%,transparent_100%),linear-gradient(to_bottom,black_0%,black_90%,transparent_100%)] [mask-composite:intersect]"
          />
        </figure>
      </div>
    </section>
  )
})
