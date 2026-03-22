'use client'

import { Plus, Trash2, Upload } from 'lucide-react'
import { InvoiceData, LineItem, CURRENCIES, calcLineTotal, formatMoney } from '@/lib/invoice-types'

interface Props {
  data: InvoiceData
  onChange: (data: InvoiceData) => void
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors'
const areaCls  = `${inputCls} resize-none`

export default function InvoiceForm({ data, onChange }: Props) {
  function set<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    onChange({ ...data, [key]: value })
  }

  function setItem(id: string, field: keyof LineItem, value: string | number) {
    onChange({
      ...data,
      items: data.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    })
  }

  function addItem() {
    onChange({
      ...data,
      items: [...data.items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 }],
    })
  }

  function removeItem(id: string) {
    if (data.items.length === 1) return
    onChange({ ...data, items: data.items.filter(i => i.id !== id) })
  }

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => set('senderLogo', ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      {/* Template */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Template</label>
        <div className="flex gap-2">
          {(['clean', 'classic', 'modern'] as const).map(t => (
            <button
              key={t}
              onClick={() => set('template', t)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg border capitalize transition-colors ${data.template === t ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice meta — responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Invoice #">
          <input className={inputCls} value={data.invoiceNumber} onChange={e => set('invoiceNumber', e.target.value)} />
        </Field>
        <Field label="Issue Date">
          <input type="date" className={inputCls} value={data.invoiceDate} onChange={e => set('invoiceDate', e.target.value)} />
        </Field>
        <Field label="Due Date">
          <input type="date" className={inputCls} value={data.dueDate} onChange={e => set('dueDate', e.target.value)} />
        </Field>
      </div>

      {/* Sender & Client */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-1">From (You)</h3>
          {/* Logo upload */}
          <div className="flex items-center gap-3">
            {data.senderLogo ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.senderLogo} alt="Logo" className="h-10 w-10 object-contain rounded border border-slate-200" />
                <button onClick={() => set('senderLogo', '')} aria-label="Remove logo" className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">&times;</button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-3 py-1.5 border border-dashed border-slate-300 rounded-lg text-xs text-slate-400 cursor-pointer hover:border-blue-300 hover:text-blue-400 transition-colors">
                <Upload size={13} /> Upload Logo
                <input type="file" accept="image/*" onChange={handleLogo} className="hidden" />
              </label>
            )}
          </div>
          <Field label="Name / Company"><input className={inputCls} placeholder="Your Name or Company" value={data.senderName} onChange={e => set('senderName', e.target.value)} /></Field>
          <Field label="Email"><input className={inputCls} type="email" placeholder="you@example.com" value={data.senderEmail} onChange={e => set('senderEmail', e.target.value)} /></Field>
          <Field label="Address"><textarea className={areaCls} rows={2} placeholder="Street, City, Country" value={data.senderAddress} onChange={e => set('senderAddress', e.target.value)} /></Field>
          <Field label="Phone"><input className={inputCls} placeholder="+1 (555) 000-0000" value={data.senderPhone} onChange={e => set('senderPhone', e.target.value)} /></Field>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-1">Bill To (Client)</h3>
          <Field label="Name / Company"><input className={inputCls} placeholder="Client Name" value={data.clientName} onChange={e => set('clientName', e.target.value)} /></Field>
          <Field label="Email"><input className={inputCls} type="email" placeholder="client@example.com" value={data.clientEmail} onChange={e => set('clientEmail', e.target.value)} /></Field>
          <Field label="Address"><textarea className={areaCls} rows={2} placeholder="Street, City, Country" value={data.clientAddress} onChange={e => set('clientAddress', e.target.value)} /></Field>
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

          {data.items.map(item => (
            <div key={item.id}>
              {/* Desktop: grid layout */}
              <div className="hidden sm:grid grid-cols-12 gap-2 items-center">
                <input
                  className={`${inputCls} col-span-5`}
                  placeholder="Service or product"
                  value={item.description}
                  onChange={e => setItem(item.id, 'description', e.target.value)}
                />
                <input
                  className={`${inputCls} col-span-2 text-center`}
                  type="number" min={1} step={1}
                  value={item.quantity}
                  onChange={e => setItem(item.id, 'quantity', Number(e.target.value))}
                />
                <input
                  className={`${inputCls} col-span-3 text-right`}
                  type="number" min={0} step={0.01}
                  value={item.unitPrice}
                  onChange={e => setItem(item.id, 'unitPrice', Number(e.target.value))}
                />
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <span className="text-sm text-slate-600 tabular-nums">
                    {formatMoney(calcLineTotal(item), data.currency)}
                  </span>
                  <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-slate-300 hover:text-red-400 transition-colors ml-1">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Mobile: stacked card layout */}
              <div className="sm:hidden border border-slate-200 rounded-lg p-3 space-y-2">
                <input
                  className={inputCls}
                  placeholder="Service or product"
                  value={item.description}
                  onChange={e => setItem(item.id, 'description', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Qty">
                    <input
                      className={inputCls}
                      type="number" min={1} step={1}
                      value={item.quantity}
                      onChange={e => setItem(item.id, 'quantity', Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Unit Price">
                    <input
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
                  <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-slate-300 hover:text-red-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors mt-1"
        >
          <Plus size={14} /> Add Item
        </button>
      </div>

      {/* Currency, Tax, Discount, Notes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Field label="Currency">
          <select className={inputCls} value={data.currency} onChange={e => set('currency', e.target.value)}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}
          </select>
        </Field>
        <Field label="Tax (%)">
          <input className={inputCls} type="number" min={0} max={100} step={0.1} value={data.taxRate} onChange={e => set('taxRate', Number(e.target.value))} />
        </Field>
        <Field label="Discount (%)">
          <input className={inputCls} type="number" min={0} max={100} step={0.1} value={data.discountRate} onChange={e => set('discountRate', Number(e.target.value))} />
        </Field>
      </div>

      <Field label="Notes / Payment Terms">
        <textarea className={areaCls} rows={2} placeholder="e.g. Payment due within 30 days. Thank you for your business!" value={data.notes} onChange={e => set('notes', e.target.value)} />
      </Field>
    </div>
  )
}
