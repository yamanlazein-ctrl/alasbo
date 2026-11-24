import { navigation } from '../../content/site'
import PlatformLanding from '../../components/platform-landing'

export const dynamicParams = false

export function generateStaticParams() {
  return navigation.slice(1).map(({ href }) => ({ section: href.slice(1) }))
}

export default async function SectionPage({ params }: PageProps<'/[section]'>) {
  const { section } = await params
  return <PlatformLanding activeHref={`/${section}`} />
}
