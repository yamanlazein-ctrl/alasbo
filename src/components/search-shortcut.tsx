'use client'

import { useLenis } from 'lenis/react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SearchShortcut() {
  const lenis = useLenis()
  const router = useRouter()

  function focusSearch() {
    const input = document.getElementById('archive-query')
    if (!input) {
      router.push('/#archive-query')
      return
    }

    input.focus({ preventScroll: true })
    if (lenis?.options.smoothWheel) {
      lenis.scrollTo(input, { offset: -(window.innerHeight - input.offsetHeight) / 2 })
    } else {
      input.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }

  return (
    <button className="nav-search" type="button" onClick={focusSearch}>
      <span>ابحث في الأرشيف</span>
      <span className="nav-search__icon" aria-hidden="true"><Search /></span>
    </button>
  )
}
