'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, type ReactNode } from 'react'

const scrollOptions = {
  autoRaf: false,
  lerp: 0.14,
  stopInertiaOnNavigate: true,
  syncTouch: false,
  respectReducedMotion: true,
} as const

function ScrollSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    let dispose: (() => void) | undefined
    let cancelled = false

    void import('./site-animation').then(({ connectScroll }) => {
      if (!cancelled) dispose = connectScroll(lenis)
    }).catch(() => {
      // Restore native wheel scrolling if the animation runtime cannot load.
      if (!cancelled) lenis.options.smoothWheel = false
    })

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [lenis])

  return null
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={scrollOptions}>
      <ScrollSync />
      {children}
    </ReactLenis>
  )
}
