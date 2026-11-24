import { Amiri, IBM_Plex_Sans_Arabic } from 'next/font/google'

export const amiri = Amiri({
  weight: '700',
  style: 'normal',
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-display',
})

export const plexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '500'],
  style: 'normal',
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-ui',
})
