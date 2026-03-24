import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import InvoiceBuilder from '@/components/InvoiceBuilder'
import AdSlot from '@/components/AdSlot'
import DocNav from '@/components/DocNav'

export const metadata: Metadata = {
  title: 'Receipt Generator — Create Free Payment Receipts as PDF',
  description:
    'Free receipt generator. Create professional payment receipts with a PAID stamp, download as PDF. No sign-up required. 100% private — your data never leaves your browser.',
  openGraph: {
    title: 'Receipt Generator — Free Payment Receipts',
    description: 'Create and download PDF payment receipts instantly. No sign-up, 100% free.',
    type: 'website',
    url: 'https://freeinvoicegen.app/receipt-generator',
  },
  alternates: { canonical: 'https://freeinvoicegen.app/receipt-generator' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Receipt Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free receipt generator. Create professional PDF payment receipts with PAID stamp. 100% client-side.',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between a receipt and an invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An invoice is a request for payment issued before or at the time of delivery. A receipt is a document confirming that payment has already been received. Invoices include a due date and payment terms, while receipts include the payment date, payment method, and often a PAID stamp to clearly indicate the transaction is complete.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I issue a receipt instead of an invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Issue a receipt after you have received payment from the client. Receipts are commonly used for cash transactions, point-of-sale purchases, completed service payments, and any situation where the client needs proof that they have paid. Some businesses send a receipt automatically after processing an invoice payment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this receipt generator free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No account required, no watermarks, no hidden fees. You can generate and download as many receipts as you need. The tool runs entirely in your browser and never sends your data to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the receipt include a PAID stamp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every receipt generated with this tool automatically includes a prominent PAID stamp in the document preview and in the downloaded PDF. This makes it immediately clear to both parties that the transaction has been completed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods can I list on a receipt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The receipt generator supports Cash, Credit Card, Debit Card, Bank Transfer, PayPal, and Other as payment methods. Select the method that matches how payment was received so the receipt accurately documents the transaction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use receipts for tax documentation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Receipts serve as proof of payment and are important for both buyer and seller tax records. They document when payment was made, how much was paid, and for what goods or services. Keep copies of all receipts for your accounting records and tax filings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to include tax on a receipt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If the original transaction included tax, your receipt should reflect the same tax amount. Enter the applicable tax rate in the Tax (%) field and the tool will calculate it automatically. This ensures your receipt matches the original charge and provides accurate records for tax reporting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add my company logo to the receipt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your company logo using the Upload Logo button. It will appear in the receipt header and in the downloaded PDF. The logo is processed entirely in your browser and is never uploaded to any external server.',
      },
    },
  ],
}

export default function ReceiptGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-lg font-bold text-slate-800">Receipt Generator</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <DocNav />

          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Free Receipt Generator</h2>
            <p className="text-slate-500">Create professional payment receipts with a PAID stamp. Download as PDF instantly.</p>
          </div>

          <InvoiceBuilder mode="receipt" />

          {/* Ad — between tool and SEO content */}
          <AdSlot slot="5566778899" format="horizontal" />

          {/* SEO content */}
          <article className="mt-16 space-y-8 max-w-3xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">What Is a Receipt and Why Does It Matter?</h2>
              <p className="text-slate-600 leading-relaxed">
                A receipt is a written acknowledgment that payment has been received for goods or services. Unlike an invoice, which is a request for payment, a receipt confirms that the transaction is complete. Receipts are essential for both buyers and sellers because they serve as proof of purchase, support warranty claims, enable expense tracking, and provide documentation for tax filings. Whether you run a retail shop, a consulting practice, or a freelance business, issuing professional receipts after every payment helps maintain transparent financial records and builds trust with your clients. This free receipt generator lets you create clean, professional payment receipts that include all the necessary details — your business information, the client details, an itemized list of goods or services, the payment method, the payment date, and a clear PAID stamp.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Receipt vs. Invoice: Understanding the Key Differences</h2>
              <p className="text-slate-600 leading-relaxed">
                Many business owners confuse receipts with invoices, but they serve fundamentally different purposes in the payment lifecycle. An invoice is sent before payment is received — it specifies the amount owed, the due date, and payment instructions. A receipt is issued after payment has been collected — it confirms the amount paid, the payment method, and the date of the transaction. Think of it this way: an invoice says &quot;please pay this amount,&quot; while a receipt says &quot;thank you, payment received.&quot; In practice, some businesses send an invoice first, then issue a receipt once they receive payment. Others, especially in retail or point-of-sale situations, skip the invoice entirely and provide a receipt at the time of purchase. Both documents are important for accurate bookkeeping, but they serve different stages of the transaction. Use our invoice generator to bill your clients and this receipt generator to confirm their payments.
              </p>
            </section>

            {/* In-article ad */}
            <AdSlot slot="1029384756" format="article" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Essential Elements of a Professional Receipt</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                A well-formatted receipt should include several key elements that make it useful for accounting, tax documentation, and dispute resolution. Missing any of these can reduce the receipt&apos;s value as a financial record.
              </p>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li><strong>Receipt number</strong> — a unique identifier that helps you track and reference individual transactions in your records</li>
                <li><strong>Issue date and payment date</strong> — the date the receipt was created and the date payment was actually received</li>
                <li><strong>Seller and buyer information</strong> — names, addresses, and contact details for both parties</li>
                <li><strong>Itemized list</strong> of products or services with quantities and prices so the buyer can verify each charge</li>
                <li><strong>Payment method</strong> — whether the payment was made by cash, card, bank transfer, or other means</li>
                <li><strong>Total amount paid</strong> including any applicable taxes or discounts</li>
                <li><strong>PAID indication</strong> — a clear visual marker confirming the payment status of the transaction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">When and How to Issue Receipts for Your Business</h2>
              <p className="text-slate-600 leading-relaxed">
                The timing and method of issuing receipts depends on your business type and transaction model. Retail businesses typically provide receipts immediately at the point of sale. Service-based businesses often send receipts via email after receiving a bank transfer or online payment. Freelancers and contractors usually issue receipts after their clients pay an outstanding invoice. Regardless of your business model, establishing a consistent receipt process protects both you and your clients. Digital receipts are increasingly preferred because they are easy to store, search, and retrieve during tax season. This generator creates PDF receipts that you can email to clients or save to your own records. Each receipt includes a sequential receipt number for easy organization, and since everything runs in your browser, you maintain complete control over your data without relying on third-party cloud services.
              </p>
            </section>

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
        <Footer />

        <footer className="border-t border-slate-200 mt-16 py-8 text-center bg-white">
          <p className="text-slate-400 text-sm">Receipt Generator — Free professional payment receipts. No sign-up required.</p>
        </footer>
      </div>
    </>
  )
}
