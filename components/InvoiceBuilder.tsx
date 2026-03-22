'use client'

import { useState, useEffect, useRef } from 'react'
import { Download, Save, FolderOpen, Eye, EyeOff } from 'lucide-react'
import { InvoiceData, DEFAULT_INVOICE, nextInvoiceNumber } from '@/lib/invoice-types'
import { generateInvoicePDF } from '@/lib/generate-pdf'
import InvoiceForm from './InvoiceForm'
import InvoicePreview from './InvoicePreview'
import AdSlot from './AdSlot'

const DRAFT_KEY = 'invoice_draft'

function validate(data: InvoiceData): string[] {
  const errors: string[] = []
  if (!data.senderName.trim()) errors.push('Sender name is required.')
  if (!data.clientName.trim()) errors.push('Client name is required.')
  if (!data.items.some(i => i.description.trim())) errors.push('At least one item must have a description.')
  data.items.forEach((item, idx) => {
    if (item.quantity < 1) errors.push(`Item ${idx + 1}: quantity must be at least 1.`)
    if (item.unitPrice < 0) errors.push(`Item ${idx + 1}: unit price cannot be negative.`)
  })
  return errors
}

export default function InvoiceBuilder() {
  const [data, setData] = useState<InvoiceData>(DEFAULT_INVOICE)
  const [showPreview, setShowPreview] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Ref for stable auto-save interval
  const dataRef = useRef(data)
  dataRef.current = data

  // Load draft on mount + init invoice number
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) {
        setData(JSON.parse(raw))
      } else {
        setData(prev => ({ ...prev, invoiceNumber: nextInvoiceNumber() }))
      }
    } catch { /* ignore */ }
  }, [])

  // Auto-save every 30s — single stable interval using ref
  useEffect(() => {
    const id = setInterval(() => {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(dataRef.current)) } catch { /* ignore */ }
    }, 30000)
    return () => clearInterval(id)
  }, [])

  function handleSave() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch { /* ignore */ }
  }

  function handleLoad() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) setData(JSON.parse(raw))
    } catch { /* ignore */ }
  }

  async function handleDownload() {
    const errors = validate(data)
    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }
    setValidationErrors([])
    setDownloading(true)
    try {
      await generateInvoicePDF('invoice-preview', `${data.invoiceNumber || 'invoice'}.pdf`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      alert(`Failed to generate PDF: ${message}`)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Validation errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          <p className="font-semibold mb-1">Please fix the following before downloading:</p>
          <ul className="list-disc list-inside space-y-0.5">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Download size={14} />
          {downloading ? 'Generating PDF…' : 'Download PDF'}
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
        >
          <Save size={14} />
          {saved ? 'Saved!' : 'Save Draft'}
        </button>
        <button
          onClick={handleLoad}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
        >
          <FolderOpen size={14} /> Load Draft
        </button>
        <button
          onClick={() => setShowPreview(p => !p)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors ml-auto"
        >
          {showPreview ? <><EyeOff size={14} /> Hide Preview</> : <><Eye size={14} /> Show Preview</>}
        </button>
      </div>

      {/* Main layout */}
      <div className={`gap-6 ${showPreview ? 'grid grid-cols-1 lg:grid-cols-2' : 'block'}`}>
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <InvoiceForm data={data} onChange={setData} />
        </div>

        {/* Preview — always rendered so PDF generation can access the DOM element */}
        <div className={showPreview ? 'space-y-2' : 'sr-only'} aria-hidden={!showPreview}>
          {showPreview && (
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide px-1">Live Preview</p>
          )}
          <div className={showPreview ? 'shadow-xl rounded-xl overflow-hidden border border-slate-200' : ''}>
            <div className={showPreview ? 'overflow-auto max-h-[900px]' : ''}>
              <InvoicePreview data={data} />
            </div>
          </div>
        </div>
      </div>

      {/* Ad */}
      <AdSlot slot="4455667788" format="horizontal" />
      <AdSlot slot="8877665544" format="rectangle" className="mx-auto" />
    </div>
  )
}
