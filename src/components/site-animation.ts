import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, CustomEase)
gsap.ticker.lagSmoothing(0)

export function connectScroll(lenis: Lenis) {
  const unsubscribe = lenis.on('scroll', ScrollTrigger.update)
  const tick = (seconds: number) => lenis.raf(seconds * 1000)
  gsap.ticker.add(tick)

  return () => {
    unsubscribe()
    gsap.ticker.remove(tick)
  }
}

function appendBrandReveal(timeline: gsap.core.Timeline, header: HTMLElement) {
  const art = header.querySelector<HTMLElement>('.brand-link__art')
  const image = art?.querySelector<HTMLImageElement>('.brand-link__original')
  const vector = art?.querySelector<HTMLImageElement>('.brand-link__vector')
  const strokes = Array.from(header.querySelectorAll<SVGPathElement>('[data-brand-stroke]'))
  const details = header.querySelectorAll<SVGPathElement>('[data-brand-detail]')
  if (!art || !image || !vector || !strokes.length || !details.length
    || !vector.naturalWidth || !image.naturalWidth
    || !CSS.supports('mask-image', 'url(#brand-stroke-reveal)')) return

  const lengths = strokes.map((stroke) => stroke.getTotalLength())
  if (lengths.some((length) => !length)) return

  strokes.forEach((stroke, index) => {
    const length = lengths[index] + 1
    gsap.set(stroke, { strokeDasharray: length, strokeDashoffset: length })
    timeline.to(stroke, { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut' }, index * 0.12)
  })
  gsap.set(details, { opacity: 0 })
  gsap.set(image, { opacity: 0.16 })
  art.setAttribute('data-brand-drawing', '')
  timeline.to(details, { opacity: 1, duration: 0.18, stagger: 0.055 }, 1.05)
  timeline.to(image, { opacity: 1, duration: 0.26, clearProps: 'opacity' }, 1.26)
  timeline.to(vector, { opacity: 0, duration: 0.26 }, 1.26)

  return () => {
    art.removeAttribute('data-brand-drawing')
    image.style.removeProperty('opacity')
    vector.style.removeProperty('opacity')
  }
}

let entrancePlayed = false

function playEntrance(root: HTMLElement) {
  if (entrancePlayed || window.scrollY > 0 || root.contains(document.activeElement)) return
  entrancePlayed = true

  const header = root.querySelector('header')!
  const curve = getComputedStyle(root).getPropertyValue('--ease-out').trim()
  const ease = CustomEase.create('site-entrance', curve.slice('cubic-bezier('.length, -1))
  const timeline = gsap.timeline({ paused: true, defaults: { ease } })
  const finishBrand = appendBrandReveal(timeline, header)
  const parts = (part: string) => root.querySelectorAll(`[data-hero-motion="${part}"]`)

  if (parts('portrait').length) {
    timeline
      .from(parts('portrait'), { opacity: 0.55, duration: 0.65, clearProps: 'opacity' }, 0)
      .fromTo(parts('headline'), { clipPath: 'inset(-20% -6% 82% -6%)' }, {
        clipPath: 'inset(-20% -6% -20% -6%)',
        duration: 0.55,
        stagger: 0.075,
        clearProps: 'clipPath',
      }, 0.12)
      .from(parts('support'), { opacity: 0.45, duration: 0.45, clearProps: 'opacity' }, 0.25)
      .from(parts('search'), { opacity: 0.75, y: 8, duration: 0.44, clearProps: 'opacity,transform' }, 0.32)
  }

  if (!timeline.duration()) return

  function finish() {
    finishBrand?.()
    root.removeEventListener('focusin', interrupt)
    window.removeEventListener('scroll', interrupt)
  }

  function interrupt() {
    timeline.progress(1)
  }

  timeline.eventCallback('onComplete', finish)
  root.addEventListener('focusin', interrupt)
  window.addEventListener('scroll', interrupt, { once: true, passive: true })
  timeline.play()
  return finish
}

export function initializeSiteAnimation() {
  const root = document.querySelector<HTMLElement>('.site')
  if (!root?.querySelector('header')) return

  const motion = gsap.matchMedia()
  motion.add('(prefers-reduced-motion: no-preference)', (context) => {
    let cancelled = false
    let finishEntrance: (() => void) | undefined
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('.brand-link__art img'))
    const startEntrance = context.add('startEntrance', () => { finishEntrance = playEntrance(root) })
    void Promise.allSettled(images.map((image) => image.decode())).then(() => {
      if (!cancelled) startEntrance()
    })
    return () => {
      cancelled = true
      finishEntrance?.()
    }
  }, root)

  return () => motion.revert()
}
