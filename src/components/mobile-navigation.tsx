'use client'

import Link from 'next/link'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation } from '../content/site'

export function MobileNavigation({ activeHref }: { activeHref: string }) {
  const [menuHost, setMenuHost] = useState<HTMLElement | null>(null)
  const open = menuHost !== null
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)

  function close() {
    setMenuHost(null)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return

    const links = panel.querySelectorAll<HTMLAnchorElement>('a[href]')
    const first = links[0]
    const last = links[links.length - 1]
    first.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab') return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const desktop = matchMedia('(min-width: 40rem)')
    function handleResize() {
      if (desktop.matches) setMenuHost(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleResize)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleResize)
    }
  }, [open])

  return (
    <>
      <button
        className="menu-button"
        type="button"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={open ? 'mobile-navigation' : undefined}
        aria-label={open ? 'إغلاق قائمة التنقل' : 'فتح قائمة التنقل'}
        onClick={(event) => setMenuHost(open ? null : event.currentTarget.closest('header'))}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {menuHost && createPortal(
        <div className="mobile-navigation fixed inset-0 z-[60]" id="mobile-navigation">
          <button
            className="mobile-navigation__backdrop"
            type="button"
            tabIndex={-1}
            aria-label="إغلاق قائمة التنقل"
            onClick={close}
          />
          <nav className="mobile-navigation__panel" ref={panelRef} aria-label="التنقل على الهاتف" data-lenis-prevent>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                aria-current={item.href === activeHref ? 'page' : undefined}
                onClick={() => setMenuHost(null)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>,
        menuHost,
      )}
    </>
  )
}
