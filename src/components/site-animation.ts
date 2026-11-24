import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
gsap.ticker.lagSmoothing(0)

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function connectScroll(lenis: Lenis) {
  const unsubscribe = lenis.on('scroll', ScrollTrigger.update)
  const tick = (seconds: number) => lenis.raf(seconds * 1000)
  gsap.ticker.add(tick)

  return () => {
    unsubscribe()
    gsap.ticker.remove(tick)
  }
}

let entrancePlayed = false

function buildEntrance(root: HTMLElement) {
  if (entrancePlayed || window.scrollY > 0 || root.contains(document.activeElement)) return
  entrancePlayed = true

  const ease = gsap.parseEase(EASE)
  const tl = gsap.timeline({ paused: true, defaults: { ease } })

  const bg = root.querySelector<HTMLElement>('[data-hero-motion="background"] img')
  const portrait = root.querySelector<HTMLElement>('[data-hero-motion="portrait"]')
  const portraitImg = portrait?.querySelector<HTMLElement>('.hero__portrait-img')
  const headlines = root.querySelectorAll<HTMLElement>('[data-hero-motion="headline"] > i')
  const support = root.querySelector<HTMLElement>('[data-hero-motion="support"]')
  const search = root.querySelector<HTMLElement>('[data-hero-motion="search"]')
  const header = root.querySelector<HTMLElement>('[data-site-header]')

  // 1. Background scale 1.08 -> 1, 1800ms
  if (bg) {
    tl.fromTo(bg, { scale: 1.08 }, { scale: 1, duration: 1.8, clearProps: 'transform' }, 0)
  }

  // 2. Sheikh fade in: translateY 24 -> 0, blur 8 -> 0, 1200ms, delay 300ms
  if (portrait && portraitImg) {
    gsap.set(portrait, { opacity: 0, y: 24, filter: 'blur(8px)' })
    tl.to(portrait, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, clearProps: 'filter,transform' }, 0.3)
  }

  // 3. Name lines reveal upward through mask, 120ms stagger, delay 500ms
  if (headlines.length) {
    gsap.set(headlines, { y: '115%' })
    tl.to(headlines, { y: '0%', duration: 1.1, stagger: 0.12, clearProps: 'transform' }, 0.5)
  }

  // 4. Subline at 800ms
  if (support) {
    gsap.set(support, { opacity: 0, y: 12 })
    tl.to(support, { opacity: 1, y: 0, duration: 0.7, clearProps: 'opacity,transform' }, 0.8)
  }

  // 5. Search at 950ms
  if (search) {
    gsap.set(search, { opacity: 0, y: 12 })
    tl.to(search, { opacity: 1, y: 0, duration: 0.6, clearProps: 'opacity,transform' }, 0.95)
  }

  // 6. Nav at 1100ms
  if (header) {
    gsap.set(header, { opacity: 0, y: -16 })
    tl.to(header, { opacity: 1, y: 0, duration: 0.6, clearProps: 'opacity,transform' }, 1.1)
  }

  if (!tl.duration()) return

  function finish() {
    root.removeEventListener('focusin', interrupt)
    window.removeEventListener('scroll', interrupt)
  }
  function interrupt() {
    tl.progress(1)
  }

  tl.eventCallback('onComplete', finish)
  root.addEventListener('focusin', interrupt)
  window.addEventListener('scroll', interrupt, { once: true, passive: true })
  tl.play()
  return finish
}

function buildScrollMotion(root: HTMLElement) {
  const st = ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: 'bottom top',
    scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress
      const bg = root.querySelector<HTMLElement>('[data-hero-motion="background"] img')
      const portrait = root.querySelector<HTMLElement>('[data-hero-motion="portrait"]')
      const content = root.querySelector<HTMLElement>('[data-hero-motion="content"]')

      if (bg) gsap.set(bg, { yPercent: -15 * p })
      if (portrait) gsap.set(portrait, { yPercent: -6 * p })
      if (content) {
        // drift up 40px and fade out by 60% of hero height
        const fadeP = Math.min(p / 0.6, 1)
        gsap.set(content, { y: -40 * fadeP, opacity: 1 - fadeP })
      }
    },
  })

  return () => st.kill()
}

export function initializeSiteAnimation() {
  const root = document.querySelector<HTMLElement>('.hero')
  const siteRoot = document.querySelector<HTMLElement>('.site')
  if (!root || !siteRoot?.querySelector('header')) return

  const mm = gsap.matchMedia()

  // Reduced motion: show everything immediately, no scroll linking
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set(['[data-hero-motion]'], { clearProps: 'all' })
    return () => {}
  })

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    let finishEntrance: (() => void) | undefined
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('img'))
    const startEntrance = () => { finishEntrance = buildEntrance(root) }
    void Promise.allSettled(images.map((img) => img.decode())).then(() => {
      startEntrance()
    })

    const killScroll = buildScrollMotion(root)

    return () => {
      finishEntrance?.()
      killScroll()
    }
  }, root)

  return () => mm.revert()
}
