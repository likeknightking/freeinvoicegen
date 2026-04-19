'use client'

import { useId, useState } from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import { InvoiceData, LineItem, DocMode, CURRENCIES, PAYMENT_METHODS, calcLineTotal, formatMoney } from '@/lib/invoice-types'

interface Props {
  data: InvoiceData
  onChange: (data: InvoiceData) => void
  mode?: DocMode
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors'
const areaCls  = `${inputCls} resize-none`

const MAX_LOGO_BYTES = 2 * 1024 * 1024 // 2MB
const MAX_LOGO_DIM = 2000              // reject anything wildly oversized
const TARGET_LOGO_DIM = 600            // downscale target
const ACCEPTED_LOGO_TYPES = 'image/png,image/jpeg,image/webp,image/svg+xml'

function downscaleImage(dataUrl: string, max: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const ratio = Math.min(max / img.width, max / img.height, 1)
      const w = Math.round(img.width * ratio)
      const h = Math.round(img.height * ratio)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas not supported'))
        return
      }
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => reject(new Error('Could not read image'))
    img.src = dataUrl
  })
}

export default function InvoiceForm({ data, onChange, mode = 'invoice' }: Props) {
  const [logoError, setLogoError] = useState<string>('')
  const ids = useId()
  const id = (s: string) => `${ids}-${s}`

  function set<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    onChange({ ...data, [key]: value })
  }

  function setItem(itemId: string, field: keyof LineItem, value: string | number) {
    onChange({
      ...data,
      items: data.items.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      ),
    })
  }

  function addItem() {
    onChange({
      ...data,
      items: [...data.items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 }],
    })
  }

  function removeItem(itemId: string) {
    if (data.items.length === 1) return
    onChange({ ...data, items: data.items.filter(i => i.id !== itemId) })
  }

  async function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    setLogoError('')
    const file = e.target.files?.[0]
    if (!file) return

    if (!ACCEPTED_LOGO_TYPES.split(',').includes(file.type)) {
      setLogoError('Unsupported format. Use PNG, JPG, WebP, or SVG.')
      e.target.value = ''
      return
    }

    if (file.size > MAX_LOGO_BYTES) {
      setLogoError('Logo is too large. Maximum size is 2 MB.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = async ev => {
      const dataUrl = ev.target?.result as string
      if (!dataUrl) return

      // SVGs are vector — store as-is, no dimension probe needed
      if (file.type === 'image/svg+xml') {
        set('senderLogo', dataUrl)
        return
      }

      // Probe natural dimensions
      const probe = new Image()
      probe.onload = async () => {
        if (probe.width > MAX_LOGO_DIM || probe.height > MAX_LOGO_DIM) {
          setLogoError(`Image dimensions too large (${probe.width}×${probe.height}). Max is ${MAX_LOGO_DIM}×${MAX_LOGO_DIM}.`)
          return
        }
        if (probe.width > TARGET_LOGO_DIM || probe.height > TARGET_LOGO_DIM) {
          try {
            const scaled = await downscaleImage(dataUrl, TARGET_LOGO_DIM)
            set('senderLogo', scaled)
          } catch {
            setLogoError('Could not process image. Try a different file.')
          }
          return
        }
        set('senderLogo', dataUrl)
      }
      probe.onerror = () => setLogoError('Could not read image. Try a different file.')
      probe.src = dataUrl
    }
    reader.onerror = () => setLogoError('Could not read file. Try again.')
    reader.readAsDataURL(file)

    // reset input so re-uploading the same filename re-triggers change
    e.target.value = ''
  }

  return (
    <div className="space-y-6">
      {/* Template */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Template</span>
        <div className="flex gap-2" role="group" aria-label="Template">
          {(['clean', 'classic', 'modern'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => set('template', t)}
              aria-pressed={data.template === t}
              className={`flex-1 py-2 text-sm font-medium rounded-lg border capitalize transition-colors ${data.template === t ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Document meta — responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label={mode === 'receipt' ? 'Receipt #' : mode === 'quote' ? 'Quote #' : 'Invoice #'} htmlFor={id('docnum')}>
          <input id={id('docnum')} className={inputCls} value={data.invoiceNumber} onChange={e => set('invoiceNumber', e.target.value)} />
        </Field>
        <Field label="Issue Date" htmlFor={id('issuedate')}>
          <input id={id('issuedate')} type="date" className={inputCls} value={data.invoiceDate} onChange={e => set('invoiceDate', e.target.value)} />
        </Field>
        {mode === 'invoice' && (
          <Field label="Due Date" htmlFor={id('duedate')}>
            <input id={id('duedate')} type="date" className={inputCls} value={data.dueDate} onChange={e => set('dueDate', e.target.value)} />
          </Field>
        )}
        {mode === 'receipt' && (
          <Field label="Payment Date" htmlFor={id('paydate')}>
            <input id={id('paydate')} type="date" className={inputCls} value={data.paymentDate} onChange={e => set('paymentDate', e.target.value)} />
          </Field>
        )}
        {mode === 'quote' && (
          <Field label="Valid Until" htmlFor={id('validuntil')}>
            <input id={id('validuntil')} type="date" className={inputCls} value={data.validUntil} onChange={e => set('validUntil', e.target.value)} />
          </Field>
        )}
      </div>

      {/* Receipt: Payment Method */}
      {mode === 'receipt' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Payment Method" htmlFor={id('paymethod')}>
            <select id={id('paymethod')} className={inputCls} value={data.paymentMethod} onChange={e => set('paymentMethod', e.target.value)}>
              {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
        </div>
      )}

      {/* Sender & Client */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-1">From (You)</h3>
          {/* Logo upload */}
          <div>
            <div className="flex items-center gap-3">
              {data.senderLogo ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.senderLogo} alt="Logo" className="h-10 w-10 object-contain rounded border border-slate-200" />
                  <button type="button" onClick={() => { set('senderLogo', ''); setLogoError('') }} aria-label="Remove logo" className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">&times;</button>
                </div>
              ) : (
                <div>
                  <label htmlFor={id('logo')} className="flex items-center gap-2 px-3 py-1.5 border border-dashed border-slate-300 rounded-lg text-xs text-slate-400 cursor-pointer hover:border-blue-300 hover:text-blue-400 transition-colors">
                    <Upload size={13} /> Upload Logo
                  </label>
                  <input
                    id={id('logo')}
                    type="file"
                    accept={ACCEPTED_LOGO_TYPES}
                    onChange={handleLogo}
                    className="sr-only"
                    aria-describedby={`${id('logo')}-help ${logoError ? `${id('logo')}-err` : ''}`.trim()}
                    aria-invalid={logoError ? 'true' : undefined}
                  />
                  <p id={`${id('logo')}-help`} className="text-[10px] text-slate-400 mt-1">PNG, JPG, WebP, or SVG · Max 2 MB · Recommended: 200×200px</p>
                </div>
              )}
            </div>
            {logoError && (
              <p id={`${id('logo')}-err`} role="alert" className="text-xs text-red-600 mt-1">{logoError}</p>
            )}
          </div>
          <Field label="Name / Company" htmlFor={id('sendername')}>
            <input
              id={id('sendername')}
              className={inputCls}
              placeholder="Your Name or Company"
              value={data.senderName}
              onChange={e => set('senderName', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!data.senderName.trim() ? 'true' : undefined}
            />
          </Field>
          <Field label="Email" htmlFor={id('senderemail')}>
            <input id={id('senderemail')} className={inputCls} type="email" placeholder="you@example.com" value={data.senderEmail} onChange={e => set('senderEmail', e.target.value)} />
          </Field>
          <Field label="Address" htmlFor={id('senderaddr')}>
            <textarea id={id('senderaddr')} className={areaCls} rows={2} placeholder="Street, City, Country" value={data.senderAddress} onChange={e => set('senderAddress', e.target.value)} />
          </Field>
          <Field label="Phone" htmlFor={id('senderphone')}>
            <input id={id('senderphone')} className={inputCls} placeholder="+1 (555) 000-0000" value={data.senderPhone} onChange={e => set('senderPhone', e.target.value)} />
          </Field>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-1">Bill To (Client)</h3>
          <Field label="Name / Company" htmlFor={id('clientname')}>
            <input
              id={id('clientname')}
              className={inputCls}
              placeholder="Client Name"
              value={data.clientName}
              onChange={e => set('clientName', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!data.clientName.trim() ? 'true' : undefined}
            />
          </Field>
          <Field label="Email" htmlFor={id('clientemail')}>
            <input id={id('clientemail')} className={inputCls} type="email" placeholder="client@example.com" value={data.clientEmail} onChange={e => set('clientEmail', e.target.value)} />
          </Field>
          <Field label="Address" htmlFor={id('clientaddr')}>
            <textarea id={id('clientaddr')} className={areaCls} rows={2} placeholder="Street, City, Country" value={data.clientAddress} onChange={e => set('clientAddress', e.target.value)} />
          </Field>
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-1">Line Items</h3>
        <div className="space-y-2">
          {/* Header — hidden on mobile */}
          <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-medium text-slate-400 px-1">
            <span className="col-span-5">Description</span>
            <span className="col-span-2 text-center">Qty</span>
            <span className="col-span-3 text-right">Unit Price</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          {data.items.map((item, idx) => (
            <div key={item.id}>
              {/* Desktop: grid layout */}
              <div className="hidden sm:grid grid-cols-12 gap-2 items-center">
                <input
                  className={`${inputCls} col-span-5`}
                  placeholder="Service or product"
                  aria-label={`Item ${idx + 1} description`}
                  value={item.description}
                  onChange={e => setItem(item.id, 'description', e.target.value)}
                />
                <input
                  className={`${inputCls} col-span-2 text-center`}
                  type="number" min={1} step={1}
                  aria-label={`Item ${idx + 1} quantity`}
                  value={item.quantity}
                  onChange={e => setItem(item.id, 'quantity', Number(e.target.value))}
                />
                <input
                  className={`${inputCls} col-span-3 text-right`}
                  type="number" min={0} step={0.01}
                  aria-label={`Item ${idx + 1} unit price`}
                  value={item.unitPrice}
                  onChange={e => setItem(item.id, 'unitPrice', Number(e.target.value))}
                />
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <span className="text-sm text-slate-600 tabular-nums">
                    {formatMoney(calcLineTotal(item), data.currency)}
                  </span>
                  <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove item ${idx + 1}`} className="text-slate-300 hover:text-red-400 transition-colors ml-1">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Mobile: stacked card layout */}
              <div className="sm:hidden border border-slate-200 rounded-lg p-3 space-y-2">
                <input
                  className={inputCls}
                  placeholder="Service or product"
                  aria-label={`Item ${idx + 1} description`}
                  value={item.description}
                  onChange={e => setItem(item.id, 'description', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Qty" htmlFor={id(`qty-${item.id}`)}>
                    <input
                      id={id(`qty-${item.id}`)}
                      className={inputCls}
                      type="number" min={1} step={1}
                      value={item.quantity}
                      onChange={e => setItem(item.id, 'quantity', Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Unit Price" htmlFor={id(`price-${item.id}`)}>
                    <input
                      id={id(`price-${item.id}`)}
                      className={inputCls}
                      type="number" min={0} step={0.01}
                      value={item.unitPrice}
                      onChange={e => setItem(item.id, 'unitPrice', Number(e.target.value))}
                    />
                  </Field>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 tabular-nums">
                    Total: {formatMoney(calcLineTotal(item), data.currency)}
                  </span>
                  <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove item ${idx + 1}`} className="text-slate-300 hover:text-red-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors mt-1"
        >
          <Plus size={14} /> Add Item
        </button>
      </div>

      {/* Currency, Tax, Discount, Notes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Field label="Currency" htmlFor={id('currency')}>
          <select id={id('currency')} className={inputCls} value={data.currency} onChange={e => set('currency', e.target.value)}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}
          </select>
        </Field>
        <Field label="Tax (%)" htmlFor={id('tax')}>
          <input id={id('tax')} className={inputCls} type="number" min={0} max={100} step={0.1} value={data.taxRate} onChange={e => set('taxRate', Number(e.target.value))} />
        </Field>
        <Field label="Discount (%)" htmlFor={id('discount')}>
          <input id={id('discount')} className={inputCls} type="number" min={0} max={100} step={0.1} value={data.discountRate} onChange={e => set('discountRate', Number(e.target.value))} />
        </Field>
      </div>

      <Field label="Notes / Payment Terms" htmlFor={id('notes')}>
        <textarea id={id('notes')} className={areaCls} rows={2} placeholder="e.g. Payment due within 30 days. Thank you for your business!" value={data.notes} onChange={e => set('notes', e.target.value)} />
      </Field>

      {/* Quote: Terms & Conditions */}
      {mode === 'quote' && (
        <Field label="Terms & Conditions" htmlFor={id('terms')}>
          <textarea id={id('terms')} className={areaCls} rows={3} placeholder="e.g. This quote is valid for 30 days. Prices are subject to change after the validity period." value={data.termsAndConditions} onChange={e => set('termsAndConditions', e.target.value)} />
        </Field>
      )}
    </div>
  )
}
