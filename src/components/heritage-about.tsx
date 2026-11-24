'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export function HeritageAbout() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="heritage-about"
      aria-labelledby="about-title"
      className="relative mx-auto grid min-h-[78svh] w-full max-w-[90rem] grid-cols-1 items-center gap-8 px-6 pb-24 pt-12 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:pb-36 lg:pt-20"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className="relative order-2 flex h-[clamp(20rem,52vw,36rem)] items-end justify-center lg:order-2 lg:col-span-6"
      >
        <div aria-hidden="true" className="absolute inset-x-[9%] bottom-[7%] h-[56%] rounded-full bg-black/35 blur-3xl" />
        <Image
          src="/assets/images/sheikh-muhammad-ali-al-sabouni-cutout.png"
          alt="الشيخ محمد علي الصابوني في زيه الأبيض"
          fill
          sizes="(max-width: 1024px) 88vw, 48vw"
          className="relative z-10 object-contain object-bottom saturate-[0.74] sepia-[0.2] contrast-[0.96] drop-shadow-[0_1.5rem_2.8rem_rgba(10,8,5,0.38)] [mask-image:linear-gradient(to_bottom,black_0%,black_89%,transparent_100%)]"
        />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="relative z-10 order-1 lg:order-1 lg:col-span-6 lg:ps-5"
      >
        <p className="mb-5 text-xs font-medium tracking-[0.2em] text-parchment/80 sm:text-sm">سيرةٌ وعطاء</p>
        <h2 id="about-title" className="max-w-[12ch] text-pretty font-primary text-[clamp(2.5rem,5vw,4.6rem)] font-medium leading-[1.22] tracking-[-0.03em] text-parchment">
          عمرٌ في خدمة القرآن
        </h2>
        <div className="mt-7 flex flex-col gap-3 text-base leading-8 text-parchment/80 sm:text-lg">
          <p>خادم كتاب الله والسنة</p>
          <p>صاحب كتاب صفوة التفاسير</p>
        </div>
        <Link
          href="/about"
          prefetch={false}
          className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-antique-gold/75 pb-1 text-sm font-semibold text-parchment transition-colors duration-[var(--duration-quick)] ease-heritage hover:text-antique-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
        >
          تعرّف على الشيخ
          <ArrowLeft aria-hidden="true" className="size-4" />
        </Link>
      </motion.div>
    </section>
  )
}
