import type { Metadata } from 'next'
import PlatformLanding from '../../components/platform-landing'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function SearchPage() {
  return <PlatformLanding activeHref="/search" />
}
