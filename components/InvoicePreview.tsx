'use client'

import {
  InvoiceData, calcLineTotal, calcSubtotal, calcDiscount, calcTotal,
  formatMoney,
} from '@/lib/invoice-types'

interface Props {
  data: InvoiceData
}

export default function InvoicePreview({ data }: Props) {
  const subtotal          = calcSubtotal(data.items)
  const discount          = calcDiscount(subtotal, data.discountRate)
  const discountedSubtotal = subtotal - discount
  const tax               = discountedSubtotal * (data.taxRate / 100)
  const total             = calcTotal(subtotal, data.taxRate, data.discountRate)

  const isModern  = data.template === 'modern'
  const isClassic = data.template === 'classic'

  return (
    <div
      id="invoice-preview"
      className="bg-white w-full min-h-[842px] p-10 text-slate-800"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Header */}
      <div className={`flex justify-between items-start mb-10 pb-6 ${isModern ? 'bg-blue-600 -mx-10 -mt-10 px-10 pt-10 text-white' : isClassic ? 'border-b-2 border-slate-800' : 'border-b border-slate-200'}`}>
        <div>
          {data.senderLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.senderLogo} alt="Logo" className="h-14 mb-3 object-contain" />
          )}
          <p className={`text-xl font-bold ${isModern ? 'text-white' : 'text-slate-900'}`}>{data.senderName || 'Your Company'}</p>
          <p className={`text-sm whitespace-pre-line ${isModern ? 'text-blue-100' : 'text-slate-500'}`}>{data.senderAddress}</p>
          {data.senderPhone && <p className={`text-sm ${isModern ? 'text-blue-100' : 'text-slate-500'}`}>{data.senderPhone}</p>}
          <p className={`text-sm ${isModern ? 'text-blue-100' : 'text-slate-500'}`}>{data.senderEmail}</p>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-bold tracking-tight ${isModern ? 'text-white' : 'text-blue-600'}`}>INVOICE</p>
          <p className={`text-sm mt-1 ${isModern ? 'text-blue-100' : 'text-slate-500'}`}>#{data.invoiceNumber}</p>
        </div>
      </div>

      {/* Dates & Client */}
      <div className="flex justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Bill To</p>
          <p className="font-semibold text-slate-800">{data.clientName || 'Client Name'}</p>
          <p className="text-sm text-slate-500 whitespace-pre-line">{data.clientAddress}</p>
          <p className="text-sm text-slate-500">{data.clientEmail}</p>
        </div>
        <div className="text-right space-y-1">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Issue Date</p>
            <p className="text-sm font-medium">{data.invoiceDate}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Due Date</p>
            <p className="text-sm font-medium text-red-500">{data.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Items table */}
      <table className="w-full mb-6 text-sm">
        <thead>
          <tr className={`${isModern ? 'bg-blue-600 text-white' : isClassic ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
            <th className="text-left py-2.5 px-3 font-semibold rounded-tl">Description</th>
            <th className="text-center py-2.5 px-3 font-semibold w-16">Qty</th>
            <th className="text-right py-2.5 px-3 font-semibold w-28">Unit Price</th>
            <th className="text-right py-2.5 px-3 font-semibold w-28 rounded-tr">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={item.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="py-2.5 px-3">{item.description || '—'}</td>
              <td className="py-2.5 px-3 text-center tabular-nums">{item.quantity}</td>
              <td className="py-2.5 px-3 text-right tabular-nums">{formatMoney(item.unitPrice, data.currency)}</td>
              <td className="py-2.5 px-3 text-right tabular-nums font-medium">{formatMoney(calcLineTotal(item), data.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-56 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span className="tabular-nums">{formatMoney(subtotal, data.currency)}</span>
          </div>
          {data.taxRate > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500">Tax ({data.taxRate}%)</span>
              <span className="tabular-nums">+{formatMoney(tax, data.currency)}</span>
            </div>
          )}
          {data.discountRate > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500">Discount ({data.discountRate}%)</span>
              <span className="tabular-nums text-emerald-600">−{formatMoney(discount, data.currency)}</span>
            </div>
          )}
          <div className={`flex justify-between font-bold text-base pt-2 border-t ${isModern ? 'border-blue-200 text-blue-700' : 'border-slate-200 text-slate-900'}`}>
            <span>Total</span>
            <span className="tabular-nums">{formatMoney(total, data.currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="border-t border-slate-200 pt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Notes</p>
          <p className="text-sm text-slate-600 whitespace-pre-line">{data.notes}</p>
        </div>
      )}
    </div>
  )
}
