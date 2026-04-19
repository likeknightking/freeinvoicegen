import type { Metadata } from 'next'
import Link from 'next/link'
import DocNav from '@/components/DocNav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — FreeInvoiceGen.app',
  description: 'Learn about FreeInvoiceGen.app, a free invoice generator built by developers to help freelancers and small businesses create professional invoices.',
  alternates: { canonical: 'https://freeinvoicegen.app/about' },
}

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-lg font-bold text-slate-800 hover:text-slate-600">Invoice Generator</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <DocNav />
        <h1 className="text-3xl font-bold text-slate-900 mb-8">About FreeInvoiceGen.app</h1>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">What We Do</h2>
            <p>FreeInvoiceGen.app is a free online tool for creating professional invoices, receipts, and quotes. It features live PDF preview, multiple templates, multi-currency support, logo upload, automatic tax and discount calculations, and instant PDF download. Everything runs in your browser with zero server-side processing, so your business data stays completely private.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Why We Built This</h2>
            <p>Freelancers and small business owners need professional invoices, but most invoicing tools require monthly subscriptions, force account creation, or add watermarks to free versions. We built FreeInvoiceGen.app because creating a clean, professional invoice should be free and instant, with no strings attached.</p>
            <p className="mt-3">Built by developers for freelancers, contractors, and small business owners, this tool prioritizes simplicity, privacy, and a professional result. Your client details and financial data never leave your browser.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Our Technology</h2>
            <p>FreeInvoiceGen.app is built with Next.js, React, and Tailwind CSS. PDF generation is handled entirely client-side using JavaScript. The tool supports draft saving via localStorage, multiple invoice templates, and live preview that updates as you type. The application is statically optimized for fast page loads across all devices.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Our Other Free Tools</h2>
            <p>FreeInvoiceGen.app is part of a suite of free online tools built with the same philosophy of simplicity, privacy, and speed:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><a href="https://loancalcemi.com" className="text-blue-600 hover:underline">LoanCalcEMI.com</a> — EMI calculator with amortization schedules for all loan types</li>
              <li><a href="https://calcinterest.com" className="text-blue-600 hover:underline">CalcInterest.com</a> — Compound interest calculator with growth charts and inflation adjustment</li>
              <li><a href="https://passwordmake.com" className="text-blue-600 hover:underline">PasswordMake.com</a> — Secure password and passphrase generator using the Web Crypto API</li>
              <li><a href="https://formatmyjson.com" className="text-blue-600 hover:underline">FormatMyJSON.com</a> — JSON formatter, validator, and converter powered by Monaco Editor</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Contact</h2>
            <p>Have feedback, suggestions, or questions? Reach us at <strong>contact@freeinvoicegen.app</strong>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
