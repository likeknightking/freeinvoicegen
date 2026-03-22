export async function generateInvoicePDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('Invoice preview element not found. Cannot generate PDF.')
  }

  // Ensure the element is visible for html2canvas (it may be off-screen for PDF generation)
  const prevPosition = element.style.position
  const prevLeft = element.style.left
  const wasHidden = element.offsetParent === null
  if (wasHidden) {
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.style.display = 'block'
  }

  try {
    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import('jspdf'),
      import('html2canvas'),
    ])

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
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
  } finally {
    // Restore original styles
    if (wasHidden) {
      element.style.position = prevPosition
      element.style.left = prevLeft
      element.style.display = ''
    }
  }
}
