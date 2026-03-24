export default function sitemap() {
  return [
    { url: 'https://freeinvoicegen.app', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: 'https://freeinvoicegen.app/receipt-generator', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: 'https://freeinvoicegen.app/quote-generator', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: 'https://freeinvoicegen.app/privacy-policy', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: 'https://freeinvoicegen.app/terms', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: 'https://freeinvoicegen.app/about', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
  ]
}
