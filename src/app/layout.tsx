import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { ScrollProvider } from '../components/scroll-provider'
import { siteDescription, siteTitle } from '../content/site'
import { getSiteUrl } from './site-url'
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
  themeColor: '#060603',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
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
