import InvoiceBuilder from '@/components/InvoiceBuilder'
import AdSlot from '@/components/AdSlot'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Invoice Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free invoice generator. Create professional PDF invoices with live preview. 100% client-side.',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this invoice generator really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No account required, no watermarks, no payment. You can create and download as many invoices as you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my invoice data safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. All invoice data stays in your browser. Nothing is sent to any server. The PDF is generated locally using JavaScript. Your client details, amounts, and business information never leave your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an invoice and a receipt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An invoice is a request for payment sent before or at the time of delivering a service or product. A receipt is a confirmation that payment has already been made. Invoices typically have a due date; receipts confirm a completed transaction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add my company logo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Click the "Upload Logo" button in the form to add your company logo. The logo appears in the invoice header and is included in the downloaded PDF. It is processed locally in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add tax to my invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your tax rate percentage in the Tax (%) field. The tool automatically calculates the tax amount and adds it to the subtotal to show the final total.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-lg font-bold text-slate-800">🧾 Invoice Generator</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Free Invoice Generator</h2>
            <p className="text-slate-500">Create professional PDF invoices instantly. No account needed. 100% private.</p>
          </div>

          <InvoiceBuilder />

          {/* Ad — between tool and SEO content */}
          <AdSlot slot="5566778899" format="horizontal" />

          {/* SEO content */}
          <article className="mt-16 space-y-8 max-w-3xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Create a Professional Invoice</h2>
              <p className="text-slate-600 leading-relaxed">
                A professional invoice should clearly communicate what services or products were delivered, how much is owed, and when payment is expected. Fill in your business details, your client's information, and line items for each service or product. Add your tax rate if applicable, set a due date, and download your PDF.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">What Every Invoice Should Include</h2>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li><strong>Invoice number</strong> — unique identifier for tracking and accounting</li>
                <li><strong>Issue date and due date</strong> — sets clear payment expectations</li>
                <li><strong>Your business name and contact info</strong></li>
                <li><strong>Client name and address</strong></li>
                <li><strong>Itemized list</strong> of services/products with quantities and prices</li>
                <li><strong>Subtotal, taxes, and total</strong> clearly broken down</li>
                <li><strong>Payment terms</strong> — how you accept payment</li>
              </ul>
            </section>

            {/* In-article ad */}
            <AdSlot slot="1029384756" format="article" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqJsonLd.mainEntity.map(faq => (
                  <div key={faq.name}>
                    <h3 className="text-lg font-semibold text-slate-800">{faq.name}</h3>
                    <p className="text-slate-600 leading-relaxed mt-1">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </main>

        <footer className="border-t border-slate-200 mt-16 py-8 text-center bg-white">
          <p className="text-slate-400 text-sm">Invoice Generator — Free professional invoices. No sign-up required.</p>
        </footer>
      </div>
    </>
  )
}
