import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — FreeInvoiceGen.app',
  description: 'Privacy policy for FreeInvoiceGen.app. Learn how we handle your data, our use of cookies, Google AdSense, and Google Analytics.',
  alternates: { canonical: 'https://freeinvoicegen.app/privacy-policy' },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-lg font-bold text-slate-800 hover:text-slate-600">Invoice Generator</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: March 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Overview</h2>
            <p>FreeInvoiceGen.app (&quot;we,&quot; &quot;our,&quot; or &quot;the site&quot;) provides free online tools for creating invoices, receipts, and quotes. We are committed to protecting your privacy. This policy explains what data is collected when you use our site and how it is used.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Data We Collect</h2>
            <p>Our invoice generator runs entirely in your browser. All business details, client information, line items, and calculations are processed client-side using JavaScript. PDF generation happens locally in your browser. No invoice data is transmitted to our servers or any third party. We do not require registration, and we do not collect personal information such as your name, email address, or phone number.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Cookies and Advertising</h2>
            <p>We use <strong>Google AdSense</strong> to display advertisements on this site. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to this site or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.</p>
            <p className="mt-3">You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor cookies by visiting the <a href="https://optout.networkadvertising.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out page</a>.</p>
            <p className="mt-3">Third-party vendors, including Google, use cookies to serve ads based on your prior visits. These cookies do not contain personally identifiable information but may track browsing patterns across websites.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Google Analytics</h2>
            <p>We use Google Analytics to understand how visitors interact with our site. Google Analytics collects information such as how often users visit the site, what pages they view, and what other sites they visited prior to coming here. We use this information solely to improve our tools and user experience. Google&apos;s ability to use and share information collected by Google Analytics is governed by the <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Local Storage</h2>
            <p>Our tools use your browser&apos;s localStorage to save invoice drafts and your preferences such as preferred currency and template style. This data is stored only on your device and is never transmitted to our servers. You can clear this data at any time through your browser settings or by clicking the &quot;Clear Draft&quot; button in the tool.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Third-Party Links</h2>
            <p>Our site may contain links to other websites. We are not responsible for the privacy practices of other sites. We encourage you to review the privacy policy of every site you visit.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">GDPR Compliance</h2>
            <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Since our tools do not collect or store personal data on our servers, there is typically no personal data for us to provide, modify, or delete. However, you can control cookie preferences through your browser settings and opt out of Google&apos;s personalized advertising as described above. For any GDPR-related inquiries, please contact us using the information below.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Children&apos;s Privacy</h2>
            <p>Our site is not directed to children under the age of 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Contact</h2>
            <p>If you have any questions about this privacy policy, please contact us at <strong>contact@freeinvoicegen.app</strong>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
