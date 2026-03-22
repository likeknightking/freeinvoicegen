'use client'

import {
  InvoiceData, calcLineTotal, calcSubtotal, calcDiscount, calcTotal,
  formatMoney,
} from '@/lib/invoice-types'

interface Props {
  data: InvoiceData
}

// All colors as hex — html2canvas cannot parse Tailwind v4 lab()/oklch() colors
const C = {
  white:      '#ffffff',
  slate50:    '#f8fafc',
  slate100:   '#f1f5f9',
  slate200:   '#e2e8f0',
  slate400:   '#94a3b8',
  slate500:   '#64748b',
  slate600:   '#475569',
  slate800:   '#1e293b',
  slate900:   '#0f172a',
  blue100:    '#dbeafe',
  blue200:    '#bfdbfe',
  blue600:    '#2563eb',
  blue700:    '#1d4ed8',
  red500:     '#ef4444',
  emerald600: '#059669',
}

export default function InvoicePreview({ data }: Props) {
  const subtotal           = calcSubtotal(data.items)
  const discount           = calcDiscount(subtotal, data.discountRate)
  const discountedSubtotal = subtotal - discount
  const tax                = discountedSubtotal * (data.taxRate / 100)
  const total              = calcTotal(subtotal, data.taxRate, data.discountRate)

  const isModern  = data.template === 'modern'
  const isClassic = data.template === 'classic'

  return (
    <div
      id="invoice-preview"
      style={{
        background: C.white,
        width: '100%',
        minHeight: 842,
        padding: 40,
        fontFamily: 'Georgia, serif',
        color: C.slate800,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 40,
          paddingBottom: 24,
          ...(isModern
            ? { background: C.blue600, margin: '-40px -40px 40px -40px', padding: '40px 40px 24px 40px', color: C.white }
            : isClassic
              ? { borderBottom: `2px solid ${C.slate800}` }
              : { borderBottom: `1px solid ${C.slate200}` }),
        }}
      >
        <div>
          {data.senderLogo && (
            <img src={data.senderLogo} alt="Logo" style={{ height: 56, marginBottom: 12, objectFit: 'contain' }} />
          )}
          <p style={{ fontSize: 20, fontWeight: 700, color: isModern ? C.white : C.slate900, margin: 0 }}>
            {data.senderName || 'Your Company'}
          </p>
          <p style={{ fontSize: 14, whiteSpace: 'pre-line', color: isModern ? C.blue100 : C.slate500, margin: '4px 0 0' }}>
            {data.senderAddress}
          </p>
          {data.senderPhone && (
            <p style={{ fontSize: 14, color: isModern ? C.blue100 : C.slate500, margin: '2px 0 0' }}>{data.senderPhone}</p>
          )}
          <p style={{ fontSize: 14, color: isModern ? C.blue100 : C.slate500, margin: '2px 0 0' }}>{data.senderEmail}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', color: isModern ? C.white : C.blue600, margin: 0 }}>
            INVOICE
          </p>
          <p style={{ fontSize: 14, marginTop: 4, color: isModern ? C.blue100 : C.slate500 }}>#{data.invoiceNumber}</p>
        </div>
      </div>

      {/* Dates & Client */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.slate400, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
            Bill To
          </p>
          <p style={{ fontWeight: 600, color: C.slate800, margin: 0 }}>{data.clientName || 'Client Name'}</p>
          <p style={{ fontSize: 14, color: C.slate500, whiteSpace: 'pre-line', margin: '2px 0 0' }}>{data.clientAddress}</p>
          <p style={{ fontSize: 14, color: C.slate500, margin: '2px 0 0' }}>{data.clientEmail}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 12, color: C.slate400, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Issue Date</p>
            <p style={{ fontSize: 14, fontWeight: 500, margin: '2px 0 0' }}>{data.invoiceDate}</p>
          </div>
          <div>
            <p style={{ fontSize: 12, color: C.slate400, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Due Date</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: C.red500, margin: '2px 0 0' }}>{data.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Items table */}
      <table style={{ width: '100%', marginBottom: 24, fontSize: 14, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{
            background: isModern ? C.blue600 : isClassic ? C.slate800 : C.slate100,
            color: isModern || isClassic ? C.white : C.slate600,
          }}>
            <th style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 600 }}>Description</th>
            <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 600, width: 64 }}>Qty</th>
            <th style={{ textAlign: 'right', padding: '10px 12px', fontWeight: 600, width: 112 }}>Unit Price</th>
            <th style={{ textAlign: 'right', padding: '10px 12px', fontWeight: 600, width: 112 }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={item.id} style={{ background: i % 2 === 0 ? C.white : C.slate50 }}>
              <td style={{ padding: '10px 12px' }}>{item.description || '—'}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{item.quantity}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{formatMoney(item.unitPrice, data.currency)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{formatMoney(calcLineTotal(item), data.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
        <div style={{ width: 224, fontSize: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: C.slate500 }}>Subtotal</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatMoney(subtotal, data.currency)}</span>
          </div>
          {data.taxRate > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: C.slate500 }}>Tax ({data.taxRate}%)</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>+{formatMoney(tax, data.currency)}</span>
            </div>
          )}
          {data.discountRate > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: C.slate500 }}>Discount ({data.discountRate}%)</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', color: C.emerald600 }}>−{formatMoney(discount, data.currency)}</span>
            </div>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: 16,
            paddingTop: 8,
            borderTop: `1px solid ${isModern ? C.blue200 : C.slate200}`,
            color: isModern ? C.blue700 : C.slate900,
          }}>
            <span>Total</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatMoney(total, data.currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div style={{ borderTop: `1px solid ${C.slate200}`, paddingTop: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.slate400, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
            Notes
          </p>
          <p style={{ fontSize: 14, color: C.slate600, whiteSpace: 'pre-line', margin: 0 }}>{data.notes}</p>
        </div>
      )}
    </div>
  )
}
