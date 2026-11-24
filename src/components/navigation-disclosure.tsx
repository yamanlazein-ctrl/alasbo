'use client'

import type { KeyboardEvent, ReactNode } from 'react'

export function NavigationDisclosure({ active, children }: { active: boolean; children: ReactNode }) {
  function dismissWithEscape(event: KeyboardEvent<HTMLDetailsElement>) {
    const disclosure = event.currentTarget
    if (event.key !== 'Escape' || !disclosure.open) return

    event.preventDefault()
    disclosure.open = false
    disclosure.querySelector('summary')?.focus()
  }

  return (
    <details
      className="more-navigation relative"
      onKeyDown={dismissWithEscape}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
      }}
    >
      <summary data-current={active || undefined}>المزيد</summary>
      {children}
    </details>
  )
}
