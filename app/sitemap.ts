export default function sitemap() {
  return [
    { url: 'https://freeinvoicegen.app', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
  ]
}
