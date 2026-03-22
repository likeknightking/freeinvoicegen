export async function generateInvoicePDF(elementId: string, filename: string) {
  const { default: jsPDF } = await import('jspdf')
  const { default: html2canvas } = await import('html2canvas')

  const element = document.getElementById(elementId)
  if (!element) return

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  // Multi-page support
  const pageHeight = pdf.internal.pageSize.getHeight()
  if (pdfHeight <= pageHeight) {
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  } else {
    let position = 0
    let remaining = pdfHeight
    while (remaining > 0) {
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight)
      remaining -= pageHeight
      position -= pageHeight
      if (remaining > 0) pdf.addPage()
    }
  }

  pdf.save(filename)
}
