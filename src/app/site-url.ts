export function getSiteUrl() {
  const siteUrl = process.env.SITE_URL
  return siteUrl ? new URL('/', siteUrl) : undefined
}
