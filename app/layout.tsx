import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://freeinvoicegen.app'),
  title: 'Invoice Generator — Create Professional Invoices for Free',
  description:
    'Free invoice generator. Create, customize, and download professional PDF invoices in seconds. No sign-up required. 100% private — your data never leaves your browser.',
  openGraph: {
    title: 'Invoice Generator — Free Professional Invoices',
    description: 'Create and download PDF invoices instantly. No sign-up, 100% free.',
    type: 'website',
    url: 'https://freeinvoicegen.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoice Generator — Free & Private',
    description: 'Create professional PDF invoices. No account needed.',
  },
  alternates: { canonical: 'https://freeinvoicegen.app' },
  robots: { index: true, follow: true },
  other: { 'google-adsense-account': 'ca-pub-7584346505499429' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased min-h-screen`}>
        {children}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
