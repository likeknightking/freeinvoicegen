import InvoiceBuilder from '@/components/InvoiceBuilder'
import AdSlot from '@/components/AdSlot'
import DocNav from '@/components/DocNav'
import Footer from '@/components/Footer'

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
        text: 'Yes, completely free. No account required, no watermarks, no payment. You can create and download as many invoices as you need. The tool runs entirely in your browser with no server-side processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my invoice data safe and private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. All invoice data stays in your browser. Nothing is sent to any server. The PDF is generated locally using JavaScript. Your client details, amounts, and business information never leave your device. You can verify this by checking your browser network tab while using the tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an invoice and a receipt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An invoice is a request for payment sent before or at the time of delivering a service or product. A receipt is a confirmation that payment has already been made. Invoices typically include a due date and payment terms, while receipts confirm a completed transaction with a payment date and method.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add my company logo to the invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Click the "Upload Logo" button in the form to add your company logo. The logo appears in the invoice header and is included in the downloaded PDF. It is processed locally in your browser and never uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add tax to my invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your tax rate percentage in the Tax (%) field. The tool automatically calculates the tax amount based on the subtotal after any discounts and adds it to show the final total. You can use decimal values for precise tax rates like 7.5% or 10.25%.',
      },
    },
    {
      '@type': 'Question',
      name: 'What information should I include on a professional invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A professional invoice should include: your business name and contact details, the client name and address, a unique invoice number, the issue date and due date, an itemized list of products or services with quantities and prices, subtotal, any applicable taxes or discounts, the total amount due, and your payment terms or preferred payment methods.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I save my invoice and edit it later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use the "Save Draft" button to store your current invoice in your browser local storage. You can reload the page and click "Load Draft" to resume editing. The tool also auto-saves your work every 30 seconds so you do not lose progress accidentally.',
      },
    },
    {
      '@type': 'Question',
      name: 'What currencies does the invoice generator support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The generator supports multiple currencies including USD, EUR, GBP, INR, BRL, CAD, and AUD. Select your currency from the dropdown menu and all amounts will be formatted with the correct currency symbol and formatting conventions.',
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
            <h1 className="text-lg font-bold text-slate-800">Invoice Generator</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <DocNav />

          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Free Invoice Generator</h2>
            <p className="text-slate-500">Create professional PDF invoices instantly. No account needed. 100% private.</p>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            Getting paid starts with a professional invoice. This tool lets you create polished, itemized PDF invoices in seconds without creating an account or paying for a subscription. Add your business details, logo, line items, and tax calculations, then download a ready-to-send PDF. Everything runs in your browser, so your financial data stays private.
          </p>

          <InvoiceBuilder />

          {/* Ad — between tool and SEO content */}
          <AdSlot slot="4097556163" format="horizontal" />

          {/* SEO content */}
          <article className="mt-16 space-y-8 max-w-3xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Create a Professional Invoice</h2>
              <p className="text-slate-600 leading-relaxed">
                Creating a professional invoice is essential for any freelancer, small business owner, or contractor who wants to get paid on time and maintain a credible business image. A well-structured invoice communicates exactly what services or products were delivered, how much is owed, and when payment is expected. Start by entering your business details in the &quot;From&quot; section, including your company name, email, address, and phone number. Upload your company logo for a polished look that reinforces brand recognition. Then fill in your client&apos;s details in the &quot;Bill To&quot; section. Assign a unique invoice number for your records, set the issue date, and choose a realistic due date — most businesses use Net 15, Net 30, or Net 60 payment terms depending on their industry and client relationship.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">What Every Invoice Should Include</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Whether you are billing for consulting hours, physical products, or project milestones, every invoice should contain certain essential elements to be considered valid for accounting and tax purposes. Missing any of these fields can delay payment or create confusion during audits.
              </p>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li><strong>Invoice number</strong> — a unique sequential identifier for tracking, referencing, and matching payments to invoices in your accounting system</li>
                <li><strong>Issue date and due date</strong> — the issue date records when the invoice was created, while the due date sets clear expectations for when payment should arrive</li>
                <li><strong>Your business name and contact info</strong> — so the client knows exactly who is billing them and how to reach you with questions</li>
                <li><strong>Client name and address</strong> — identifies the party responsible for payment, important for legal and record-keeping purposes</li>
                <li><strong>Itemized list</strong> of services or products with quantities, unit prices, and line totals so clients can verify each charge</li>
                <li><strong>Subtotal, taxes, and total</strong> clearly broken down so the client understands how the final amount was calculated</li>
                <li><strong>Payment terms and methods</strong> — specify how you accept payment (bank transfer, credit card, PayPal) and any late-payment policies</li>
              </ul>
            </section>

            {/* In-article ad */}
            <AdSlot slot="3737762812" format="article" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Invoice Templates and When to Use Each Style</h2>
              <p className="text-slate-600 leading-relaxed">
                This invoice generator offers three distinct templates to match different business contexts. The <strong>Clean</strong> template uses a minimal layout with subtle borders, making it ideal for freelancers, consultants, and tech professionals who prefer a modern, understated look. The <strong>Classic</strong> template features bold dividers and a traditional aesthetic suited for established businesses, law firms, and professional services. The <strong>Modern</strong> template uses a colored header bar with white text, perfect for creative agencies, designers, and startups that want their invoices to reflect a dynamic brand identity. Choose the template that aligns with your industry and client expectations. A well-designed invoice not only looks professional but also makes it easier for clients to process payment quickly because key information stands out clearly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Best Practices for Faster Invoice Payments</h2>
              <p className="text-slate-600 leading-relaxed">
                Getting paid on time is one of the biggest challenges for freelancers and small businesses. Several strategies can significantly improve your payment collection rate. First, send invoices promptly — the sooner you bill after completing work, the sooner you get paid. Second, use clear and specific descriptions for each line item so clients understand exactly what they are paying for, which reduces back-and-forth questions that delay payment. Third, offer multiple payment methods to make it convenient for clients; many businesses accept bank transfer, credit card, and online payment platforms. Fourth, set reasonable but firm due dates and communicate them upfront before starting the project. Finally, consider offering a small early-payment discount (such as 2% off for payment within 10 days) to incentivize quick settlement. Include your payment terms in the notes section of your invoice so there is no ambiguity about expectations.
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
      </div>
    </>
  )
}
