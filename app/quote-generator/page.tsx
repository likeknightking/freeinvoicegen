import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import InvoiceBuilder from '@/components/InvoiceBuilder'
import AdSlot from '@/components/AdSlot'
import DocNav from '@/components/DocNav'

export const metadata: Metadata = {
  title: 'Quote Generator — Create Free Estimates and Quotes as PDF',
  description:
    'Free quote and estimate generator. Create professional PDF quotes with validity dates and terms. No sign-up required. 100% private — your data never leaves your browser.',
  openGraph: {
    title: 'Quote Generator — Free Estimates & Quotes',
    description: 'Create and download PDF quotes and estimates instantly. No sign-up, 100% free.',
    type: 'website',
    url: 'https://freeinvoicegen.app/quote-generator',
  },
  alternates: { canonical: 'https://freeinvoicegen.app/quote-generator' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Quote Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free quote and estimate generator. Create professional PDF quotes with terms and conditions. 100% client-side.',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between a quote and an invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A quote (also called an estimate or proposal) is a document you send before work begins to outline the expected cost. It is not a bill — it is an offer. An invoice is a formal request for payment sent after the work is completed or according to agreed milestones. A quote becomes the basis for the final invoice, though the actual amount may differ if the scope of work changes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a quote the same as an estimate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The terms are often used interchangeably, but there is a subtle difference. A quote typically represents a fixed price that the seller commits to for a specific period. An estimate is a rough approximation that may change as the project progresses. In practice, most businesses use them the same way. This generator creates documents labeled as QUOTE that you can use for either purpose.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should a quote remain valid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most business quotes are valid for 15 to 30 days, though this varies by industry. Construction and manufacturing quotes may be valid for 60 to 90 days due to material price fluctuations. Service-based quotes are typically valid for 14 to 30 days. Set the "Valid Until" date in the generator to clearly communicate when your pricing offer expires.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this quote generator free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No account required, no watermarks, no hidden costs. Create and download as many quotes as you need. Everything runs in your browser — your data is never stored on any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I include in my terms and conditions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your terms and conditions should cover the quote validity period, payment schedule and methods, any deposits required, the scope of work and what is excluded, revision or change order policies, cancellation terms, and any warranties or guarantees. Clear terms prevent misunderstandings and protect both you and the client.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a client negotiate a quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, quotes are negotiable. They represent your proposed pricing, and clients may request adjustments to the scope, timeline, or cost before accepting. Once both parties agree, the quote serves as the basis for a contract or purchase order. You can generate a revised quote with updated figures using this tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a quote into an invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After the client accepts your quote and the work is completed, you create an invoice based on the agreed-upon pricing. Use our invoice generator on the main page with the same line items and amounts from your quote. The invoice replaces the Valid Until date with a Due Date and becomes a formal request for payment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add my company logo and branding to the quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your company logo, enter your full business details, and choose from three professional templates (Clean, Classic, Modern) to match your brand. A branded quote creates a strong first impression and demonstrates professionalism before the client even evaluates your pricing.',
      },
    },
  ],
}

export default function QuoteGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-lg font-bold text-slate-800">Quote Generator</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <DocNav />

          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Free Quote &amp; Estimate Generator</h2>
            <p className="text-slate-500">Create professional PDF quotes with validity dates and terms. No sign-up required.</p>
          </div>

          <InvoiceBuilder mode="quote" />

          {/* Ad — between tool and SEO content */}
          <AdSlot slot="4097556163" format="horizontal" />

          {/* SEO content */}
          <article className="mt-16 space-y-8 max-w-3xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Write a Professional Quote That Wins Clients</h2>
              <p className="text-slate-600 leading-relaxed">
                A well-crafted quote is often the first step in winning new business. It demonstrates your professionalism, communicates your value, and sets clear expectations before any work begins. The best quotes are specific, well-organized, and easy to understand. Start by clearly stating your business details and the client&apos;s information. Break down your pricing into itemized line items rather than a single lump sum — clients appreciate transparency and are more likely to approve a quote when they can see exactly what they are paying for. Set a realistic validity date (typically 15 to 30 days) so the client knows they need to act within a certain timeframe. Include your terms and conditions to establish payment expectations, revision policies, and the scope of work upfront. A quote that answers all potential questions before they are asked dramatically increases your conversion rate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Quotes vs. Invoices vs. Estimates: What to Use and When</h2>
              <p className="text-slate-600 leading-relaxed">
                Understanding the differences between quotes, invoices, and estimates is important for managing your business finances correctly. A quote is a proposed price you offer to a potential client before work begins — it typically includes a validity period and becomes binding once accepted. An estimate is similar to a quote but implies that the final cost may vary based on actual time or materials used. An invoice is a formal request for payment sent after goods or services have been delivered. The typical workflow for project-based businesses follows this sequence: you send a quote to the client, the client approves it, you complete the work, and then you send an invoice for payment. For recurring services, you might skip the quote entirely and invoice on a regular schedule. Retail and point-of-sale businesses often skip both quotes and invoices, providing only a receipt at the time of purchase. Choose the right document for each stage of your transaction to maintain clear, professional communication.
              </p>
            </section>

            {/* In-article ad */}
            <AdSlot slot="3737762812" format="article" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Essential Components of an Effective Business Quote</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                A comprehensive quote should include every detail the client needs to make an informed decision. Missing information can lead to delays, misunderstandings, or lost opportunities.
              </p>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li><strong>Quote number</strong> — a unique reference number for tracking and organizing your proposals</li>
                <li><strong>Issue date and validity period</strong> — when the quote was created and until when the pricing remains valid</li>
                <li><strong>Your business details</strong> — company name, logo, contact information, and any relevant license or registration numbers</li>
                <li><strong>Client information</strong> — the name, company, and contact details of the potential customer</li>
                <li><strong>Itemized pricing</strong> — each product, service, or deliverable listed separately with quantity, unit price, and line total</li>
                <li><strong>Taxes and discounts</strong> — any applicable sales tax, VAT, or volume discounts clearly shown</li>
                <li><strong>Terms and conditions</strong> — payment terms, deposit requirements, revision policy, and cancellation clauses</li>
                <li><strong>Total amount</strong> — the complete cost with all taxes and adjustments calculated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Tips for Writing Quotes That Get Accepted</h2>
              <p className="text-slate-600 leading-relaxed">
                Beyond just listing prices, there are several strategies that improve your quote acceptance rate. Respond quickly to quote requests — clients often contact multiple providers, and the first professional response has a significant advantage. Customize each quote to the specific client rather than sending a generic template; reference their project requirements and demonstrate that you understand their needs. Price competitively but do not undervalue your work — clearly communicate the value and quality the client will receive. Include a brief scope description for each line item so the client understands what is included and what falls outside the scope. If the total seems high, consider breaking the project into phases with separate pricing so the client can approve and start with a smaller initial commitment. Finally, follow up within a few days of sending your quote. A polite check-in shows professionalism and keeps the conversation active. Many deals are lost simply because no one followed up.
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
          <p className="text-slate-400 text-sm">Quote Generator — Free professional quotes and estimates. No sign-up required.</p>
        </footer>
      </div>
    </>
  )
}
