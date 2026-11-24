import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic } from 'next/font/google'
import type { ReactNode } from 'react'
import { ScrollProvider } from '../components/scroll-provider'
import { siteDescription, siteTitle } from '../content/site'
import { getSiteUrl } from './site-url'
import 'lenis/dist/lenis.css'
import './globals.css'

const siteUrl = getSiteUrl()
const arabicDisplay = Noto_Naskh_Arabic({ variable: '--font-arabic-display', subsets: ['arabic'], weight: ['400', '500', '600', '700'], display: 'swap' })
const arabicSans = IBM_Plex_Sans_Arabic({ variable: '--font-arabic-sans', subsets: ['arabic'], weight: ['400', '500', '600', '700'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  alternates: siteUrl ? { canonical: siteUrl.href } : undefined,
}

export const viewport: Viewport = {
  themeColor: '#12100d',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicDisplay.variable} ${arabicSans.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/thmanyah/serif-display/thmanyah-serif-display-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-svh overflow-x-hidden bg-canvas font-secondary text-body text-text">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  )
}
