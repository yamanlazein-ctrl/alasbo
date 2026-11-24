import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-svh w-fit content-center gap-4" style={{ paddingInline: 'var(--space-gutter)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 2.75rem)', color: 'var(--color-cream)' }}>
        الصفحة غير موجودة
      </h1>
      <Link href="/" style={{ color: 'var(--color-gold)', textDecoration: 'underline', textUnderlineOffset: '0.3em' }}>
        العودة إلى الصفحة الرئيسية
      </Link>
    </main>
  )
}
