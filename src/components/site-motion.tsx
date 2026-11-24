'use client'

import { useEffect } from 'react'

export function SiteMotion() {
  useEffect(() => {
    const headerEl = document.querySelector<HTMLElement>('[data-site-header]')
    if (!headerEl) return
    const header: HTMLElement = headerEl

    let lastY = window.scrollY
    let ticking = false

    function update() {
      ticking = false
      const y = window.scrollY
      const scrollingDown = y > lastY

      // Scrolled: blurred dark backdrop + hairline
      header.classList.toggle('site-header--scrolled', y > 72)

      // Hide when scrolling down past nav height, show on up
      if (y > 88 && scrollingDown) {
        header.classList.add('site-header--hidden')
      } else {
        header.classList.remove('site-header--hidden')
      }

      lastY = y
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    let dispose: (() => void) | undefined
    let cancelled = false

    void import('./site-animation').then(({ initializeSiteAnimation }) => {
      if (!cancelled) dispose = initializeSiteAnimation()
    }).catch((error: unknown) => {
      console.error('Unable to initialize site motion', error)
    })

    return () => {
      cancelled = true
      dispose?.()
      window.removeEventListener('scroll', onScroll)
      header.classList.remove('site-header--scrolled')
      header.classList.remove('site-header--hidden')
    }
  }, [])

  return null
}
