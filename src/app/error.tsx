'use client'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto grid min-h-svh w-fit content-center gap-4" style={{ paddingInline: 'var(--space-gutter)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 2.75rem)', color: 'var(--color-cream)' }}>
        تعذّر تحميل الصفحة
      </h1>
      <button
        type="button"
        onClick={reset}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '2.75rem',
          paddingInline: '1.5rem',
          border: 0,
          borderRadius: '0.5rem',
          background: 'var(--color-gold)',
          color: 'var(--color-base)',
          fontWeight: 500,
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        حاول مرة أخرى
      </button>
    </main>
  )
}
