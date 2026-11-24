import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { ScrollProvider } from '../components/scroll-provider'
import { siteDescription, siteTitle } from '../content/site'
import { getSiteUrl } from './site-url'
import { amiri, plexSansArabic } from './fonts'
import 'lenis/dist/lenis.css'
import './globals.css'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  alternates: siteUrl ? { canonical: siteUrl.href } : undefined,
}

export const viewport: Viewport = {
  themeColor: '#0E0C0A',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${plexSansArabic.variable}`}>
      <body className="min-h-svh overflow-x-hidden bg-base text-body text-cream">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  )
}
