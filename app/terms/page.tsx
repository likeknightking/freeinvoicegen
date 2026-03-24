import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service — FreeInvoiceGen.app',
  description: 'Terms of service for FreeInvoiceGen.app. Understand the terms and conditions for using our free invoice generator tools.',
  alternates: { canonical: 'https://freeinvoicegen.app/terms' },
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-lg font-bold text-slate-800 hover:text-slate-600">Invoice Generator</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: March 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Acceptance of Terms</h2>
            <p>By accessing and using FreeInvoiceGen.app (&quot;the site&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use this site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Description of Service</h2>
            <p>FreeInvoiceGen.app provides free online tools for creating invoices, receipts, and quotes with PDF export functionality. These tools are intended for business and personal use. All document generation happens entirely in your browser.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Disclaimer of Warranties</h2>
            <p>All tools and generated documents are provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> without warranties of any kind, either express or implied. While we strive for accuracy in calculations and PDF rendering, we do not warrant that the generated invoices, receipts, or quotes meet the legal or regulatory requirements of any specific jurisdiction. You are responsible for ensuring your invoices comply with applicable laws and tax regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Limitation of Liability</h2>
            <p>FreeInvoiceGen.app and its operators shall not be liable for any damages arising from the use of or inability to use this site or its tools. This includes, but is not limited to, financial losses, tax penalties, or legal consequences resulting from invoices generated using this tool. You use the tools at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Not Legal or Accounting Advice</h2>
            <p>The tools and information provided on this site do not constitute legal, tax, or accounting advice. Generated invoices are based on the information you provide and may not meet all requirements for tax-compliant invoicing in your jurisdiction. Always consult a qualified accountant or legal professional for specific invoicing requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Intellectual Property</h2>
            <p>All content on this site, including text, graphics, logos, templates, code, and design, is the property of FreeInvoiceGen.app and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without prior written permission. The invoices and documents you generate using our tools are your property.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">User Responsibilities</h2>
            <p>You agree to use this site only for lawful purposes. You are responsible for the accuracy and legality of all information entered into our invoice generator. You agree not to use generated invoices for fraudulent purposes or to misrepresent goods or services. You agree not to attempt to disrupt, overload, or interfere with the proper functioning of the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Modifications to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the site following any changes constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Contact</h2>
            <p>If you have any questions about these terms, please contact us at <strong>contact@freeinvoicegen.app</strong>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
