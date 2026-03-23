export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export type DocMode = 'invoice' | 'receipt' | 'quote'

export interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  senderName: string
  senderEmail: string
  senderAddress: string
  senderPhone: string
  senderLogo: string
  clientName: string
  clientEmail: string
  clientAddress: string
  items: LineItem[]
  currency: string
  taxRate: number
  discountRate: number
  notes: string
  template: 'clean' | 'classic' | 'modern'
  // Receipt-specific
  paymentMethod: string
  paymentDate: string
  // Quote-specific
  validUntil: string
  termsAndConditions: string
}

export const CURRENCIES = [
  { code: 'USD', symbol: '$',   name: 'US Dollar'         },
  { code: 'EUR', symbol: '€',   name: 'Euro'              },
  { code: 'GBP', symbol: '£',   name: 'British Pound'     },
  { code: 'INR', symbol: '₹',   name: 'Indian Rupee'      },
  { code: 'BRL', symbol: 'R$',  name: 'Brazilian Real'    },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar'   },
  { code: 'AUD', symbol: 'A$',  name: 'Australian Dollar' },
] as const

export function getCurrencySymbol(code: string): string {
  return CURRENCIES.find(c => c.code === code)?.symbol ?? code
}

export function calcLineTotal(item: LineItem): number {
  return item.quantity * item.unitPrice
}

export function calcSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + calcLineTotal(item), 0)
}

export function calcTax(subtotal: number, rate: number): number {
  return subtotal * (rate / 100)
}

export function calcDiscount(subtotal: number, rate: number): number {
  return subtotal * (rate / 100)
}

export function calcTotal(subtotal: number, taxRate: number, discountRate: number): number {
  const discount = calcDiscount(subtotal, discountRate)
  const discountedSubtotal = subtotal - discount
  const tax = discountedSubtotal * (taxRate / 100)
  return discountedSubtotal + tax
}

export function formatMoney(value: number, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value)
}

export function nextInvoiceNumber(): string {
  try {
    const stored = localStorage.getItem('inv_counter')
    const n = stored ? parseInt(stored) + 1 : 1
    localStorage.setItem('inv_counter', String(n))
    return `INV-${String(n).padStart(4, '0')}`
  } catch {
    return 'INV-0001'
  }
}

export const PAYMENT_METHODS = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal', 'Other'] as const

export const DEFAULT_INVOICE: InvoiceData = {
  invoiceNumber: 'INV-0001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  senderName: '',
  senderEmail: '',
  senderAddress: '',
  senderPhone: '',
  senderLogo: '',
  clientName: '',
  clientEmail: '',
  clientAddress: '',
  items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
  currency: 'USD',
  taxRate: 0,
  discountRate: 0,
  notes: '',
  template: 'clean',
  paymentMethod: 'Cash',
  paymentDate: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  termsAndConditions: '',
}

export function nextReceiptNumber(): string {
  try {
    const stored = localStorage.getItem('rcp_counter')
    const n = stored ? parseInt(stored) + 1 : 1
    localStorage.setItem('rcp_counter', String(n))
    return `RCP-${String(n).padStart(4, '0')}`
  } catch {
    return 'RCP-0001'
  }
}

export function nextQuoteNumber(): string {
  try {
    const stored = localStorage.getItem('qte_counter')
    const n = stored ? parseInt(stored) + 1 : 1
    localStorage.setItem('qte_counter', String(n))
    return `QTE-${String(n).padStart(4, '0')}`
  } catch {
    return 'QTE-0001'
  }
}
