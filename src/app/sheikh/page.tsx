import type { Metadata } from 'next'
import Link from 'next/link'
import { HeritageNavigation } from '../../components/heritage-navigation'

export const metadata: Metadata = {
  title: 'عن الشيخ | الشيخ محمد علي الصابوني',
  description: 'صفحة سيرة الشيخ محمد علي الصابوني قيد الإعداد.',
}

export default function SheikhPage() {
  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-ink px-6 pb-16 pt-32 text-parchment sm:px-10 lg:px-16">
      <HeritageNavigation />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_18%_82%,rgb(173_148_96_/_0.12),transparent_36%)]" />
      <div className="relative z-10 mx-auto flex min-h-[65svh] max-w-[90rem] flex-col items-start justify-center">
        <p className="mb-5 text-sm text-parchment/70">الموقع الرسمي للشيخ محمد علي الصابوني</p>
        <h1 className="font-primary text-[clamp(2.5rem,6vw,5rem)] leading-[1.3]">السيرة قيد الإعداد</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-parchment/80">نعمل على جمع سيرة الشيخ ومصادرها الموثوقة لتكون متاحة قريبًا.</p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center border-b border-antique-gold/70 text-sm font-semibold text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">العودة إلى الصفحة الرئيسية</Link>
      </div>
    </main>
  )
}
