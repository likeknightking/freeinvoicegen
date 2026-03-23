import {
  InvoiceData,
  DocMode,
  calcLineTotal,
  calcSubtotal,
  calcDiscount,
  calcTotal,
  formatMoney,
} from './invoice-types'

export async function generateInvoicePDF(_elementId: string, filename: string, data?: InvoiceData, mode: DocMode = 'invoice') {
  if (!data) throw new Error('Invoice data is required.')

  const { default: jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = margin

  // Colors
  const isModern = data.template === 'modern'
  const isClassic = data.template === 'classic'
  const accentR = isModern ? 37 : isClassic ? 30 : 37
  const accentG = isModern ? 99 : isClassic ? 41 : 99
  const accentB = isModern ? 235 : isClassic ? 59 : 235

  // --- HEADER ---
  if (isModern) {
    pdf.setFillColor(accentR, accentG, accentB)
    pdf.rect(0, 0, pageWidth, 45, 'F')
    pdf.setTextColor(255, 255, 255)
  } else {
    pdf.setTextColor(15, 23, 42) // slate-900
  }

  // Logo
  if (data.senderLogo) {
    try {
      pdf.addImage(data.senderLogo, 'PNG', margin, y, 20, 20)
      // Sender info next to logo
      const logoOffset = margin + 24
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text(data.senderName || 'Your Company', logoOffset, y + 6)
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(isModern ? 219 : 100, isModern ? 234 : 116, isModern ? 254 : 139)
      if (data.senderAddress) pdf.text(data.senderAddress, logoOffset, y + 12)
      if (data.senderPhone) pdf.text(data.senderPhone, logoOffset, y + 16)
      if (data.senderEmail) pdf.text(data.senderEmail, logoOffset, y + 20)
    } catch {
      // Logo failed to load, continue without it
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text(data.senderName || 'Your Company', margin, y + 6)
    }
  } else {
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text(data.senderName || 'Your Company', margin, y + 6)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(isModern ? 219 : 100, isModern ? 234 : 116, isModern ? 254 : 139)
    let infoY = y + 12
    if (data.senderAddress) { pdf.text(data.senderAddress, margin, infoY); infoY += 4 }
    if (data.senderPhone) { pdf.text(data.senderPhone, margin, infoY); infoY += 4 }
    if (data.senderEmail) { pdf.text(data.senderEmail, margin, infoY) }
  }

  // Document title — right side
  const docTitle = mode === 'receipt' ? 'RECEIPT' : mode === 'quote' ? 'QUOTE' : 'INVOICE'
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(isModern ? 255 : accentR, isModern ? 255 : accentG, isModern ? 255 : accentB)
  pdf.text(docTitle, pageWidth - margin, y + 8, { align: 'right' })
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(isModern ? 191 : 148, isModern ? 219 : 163, isModern ? 254 : 184)
  pdf.text(`#${data.invoiceNumber}`, pageWidth - margin, y + 14, { align: 'right' })

  // Divider
  if (isClassic) {
    y += 30
    pdf.setDrawColor(30, 41, 59)
    pdf.setLineWidth(0.5)
    pdf.line(margin, y, pageWidth - margin, y)
  } else if (!isModern) {
    y += 30
    pdf.setDrawColor(226, 232, 240)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
  }

  y = isModern ? 52 : y + 8

  // --- BILL TO + DATES ---
  pdf.setTextColor(148, 163, 184) // slate-400
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('BILL TO', margin, y)

  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(30, 41, 59) // slate-800
  pdf.text(data.clientName || 'Client Name', margin, y + 6)

  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(100, 116, 139) // slate-500
  let clientY = y + 11
  if (data.clientAddress) { pdf.text(data.clientAddress, margin, clientY); clientY += 4 }
  if (data.clientEmail) { pdf.text(data.clientEmail, margin, clientY) }

  // Dates — right side
  pdf.setFontSize(8)
  pdf.setTextColor(148, 163, 184)
  pdf.text('ISSUE DATE', pageWidth - margin, y, { align: 'right' })
  pdf.setFontSize(10)
  pdf.setTextColor(30, 41, 59)
  pdf.setFont('helvetica', 'normal')
  pdf.text(data.invoiceDate, pageWidth - margin, y + 5, { align: 'right' })

  if (mode === 'invoice') {
    pdf.setFontSize(8)
    pdf.setTextColor(148, 163, 184)
    pdf.text('DUE DATE', pageWidth - margin, y + 12, { align: 'right' })
    pdf.setFontSize(10)
    pdf.setTextColor(239, 68, 68) // red-500
    pdf.text(data.dueDate, pageWidth - margin, y + 17, { align: 'right' })
  } else if (mode === 'receipt') {
    pdf.setFontSize(8)
    pdf.setTextColor(148, 163, 184)
    pdf.text('PAYMENT DATE', pageWidth - margin, y + 12, { align: 'right' })
    pdf.setFontSize(10)
    pdf.setTextColor(5, 150, 105) // emerald-600
    pdf.text(data.paymentDate, pageWidth - margin, y + 17, { align: 'right' })
    pdf.setFontSize(8)
    pdf.setTextColor(148, 163, 184)
    pdf.text('PAYMENT METHOD', pageWidth - margin, y + 24, { align: 'right' })
    pdf.setFontSize(10)
    pdf.setTextColor(30, 41, 59)
    pdf.text(data.paymentMethod, pageWidth - margin, y + 29, { align: 'right' })
  } else if (mode === 'quote') {
    pdf.setFontSize(8)
    pdf.setTextColor(148, 163, 184)
    pdf.text('VALID UNTIL', pageWidth - margin, y + 12, { align: 'right' })
    pdf.setFontSize(10)
    pdf.setTextColor(37, 99, 235) // blue-600
    pdf.text(data.validUntil, pageWidth - margin, y + 17, { align: 'right' })
  }

  y += 28

  // PAID stamp for receipts
  if (mode === 'receipt') {
    pdf.setFontSize(32)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(5, 150, 105) // emerald-600
    pdf.text('PAID', pageWidth / 2, y + 4, { align: 'center' })
    y += 14
    pdf.setFont('helvetica', 'normal')
  }

  // --- ITEMS TABLE ---
  const tableHead = [['Description', 'Qty', 'Unit Price', 'Total']]
  const tableBody = data.items.map(item => [
    item.description || '—',
    String(item.quantity),
    formatMoney(item.unitPrice, data.currency),
    formatMoney(calcLineTotal(item), data.currency),
  ])

  const headColor: [number, number, number] = isModern
    ? [37, 99, 235]
    : isClassic
      ? [30, 41, 59]
      : [241, 245, 249]

  const headTextColor: [number, number, number] = isModern || isClassic
    ? [255, 255, 255]
    : [100, 116, 139]

  autoTable(pdf, {
    startY: y,
    head: tableHead,
    body: tableBody,
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: [30, 41, 59],
    },
    headStyles: {
      fillColor: headColor,
      textColor: headTextColor,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: contentWidth * 0.45 },
      1: { cellWidth: contentWidth * 0.12, halign: 'center' },
      2: { cellWidth: contentWidth * 0.22, halign: 'right' },
      3: { cellWidth: contentWidth * 0.21, halign: 'right', fontStyle: 'bold' },
    },
  })

  // Get Y after table
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (pdf as any).lastAutoTable.finalY + 10

  // --- TOTALS ---
  const subtotal = calcSubtotal(data.items)
  const discount = calcDiscount(subtotal, data.discountRate)
  const discountedSubtotal = subtotal - discount
  const tax = discountedSubtotal * (data.taxRate / 100)
  const total = calcTotal(subtotal, data.taxRate, data.discountRate)

  const totalsX = pageWidth - margin - 60
  const valuesX = pageWidth - margin

  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(100, 116, 139)
  pdf.text('Subtotal', totalsX, y)
  pdf.setTextColor(30, 41, 59)
  pdf.text(formatMoney(subtotal, data.currency), valuesX, y, { align: 'right' })

  if (data.taxRate > 0) {
    y += 6
    pdf.setTextColor(100, 116, 139)
    pdf.text(`Tax (${data.taxRate}%)`, totalsX, y)
    pdf.setTextColor(30, 41, 59)
    pdf.text(`+${formatMoney(tax, data.currency)}`, valuesX, y, { align: 'right' })
  }

  if (data.discountRate > 0) {
    y += 6
    pdf.setTextColor(100, 116, 139)
    pdf.text(`Discount (${data.discountRate}%)`, totalsX, y)
    pdf.setTextColor(5, 150, 105) // emerald-600
    pdf.text(`-${formatMoney(discount, data.currency)}`, valuesX, y, { align: 'right' })
  }

  // Total line
  y += 4
  pdf.setDrawColor(226, 232, 240)
  pdf.setLineWidth(0.3)
  pdf.line(totalsX - 5, y, valuesX, y)
  y += 6

  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(isModern ? accentR : 15, isModern ? accentG : 23, isModern ? accentB : 42)
  pdf.text('Total', totalsX, y)
  pdf.text(formatMoney(total, data.currency), valuesX, y, { align: 'right' })

  // --- NOTES ---
  if (data.notes) {
    y += 16
    pdf.setDrawColor(226, 232, 240)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 8

    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(148, 163, 184)
    pdf.text('NOTES', margin, y)

    y += 5
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(71, 85, 105) // slate-600
    const noteLines = pdf.splitTextToSize(data.notes, contentWidth)
    pdf.text(noteLines, margin, y)
  }

  // Terms & Conditions (quote mode)
  if (mode === 'quote' && data.termsAndConditions) {
    y += 10
    pdf.setDrawColor(226, 232, 240)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 8

    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(148, 163, 184)
    pdf.text('TERMS & CONDITIONS', margin, y)

    y += 5
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(71, 85, 105)
    const termsLines = pdf.splitTextToSize(data.termsAndConditions, contentWidth)
    pdf.text(termsLines, margin, y)
  }

  pdf.save(filename)
}
