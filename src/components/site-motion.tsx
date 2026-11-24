'use client'

import { useEffect } from 'react'

export function SiteMotion() {
  useEffect(() => {
    const header = document.querySelector('.site-header')
    const updateHeader = () => header?.classList.toggle('site-header--scrolled', window.scrollY > 72)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })

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
      window.removeEventListener('scroll', updateHeader)
      header?.classList.remove('site-header--scrolled')
    }
  }, [])

  return null
}
