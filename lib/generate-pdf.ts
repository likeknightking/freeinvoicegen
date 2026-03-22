export async function generateInvoicePDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('Invoice preview element not found. Cannot generate PDF.')
  }

  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ])

  // Clone the element into an isolated container outside the Tailwind DOM tree.
  // This prevents html2canvas from encountering Tailwind v4's lab()/oklch() colors
  // from parent/ancestor elements that it cannot parse.
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.left = '-10000px'
  container.style.top = '0'
  container.style.width = `${element.scrollWidth}px`
  container.style.background = '#ffffff'
  container.style.zIndex = '-1'

  const clone = element.cloneNode(true) as HTMLElement
  clone.removeAttribute('id')
  container.appendChild(clone)
  document.body.appendChild(container)

  try {
    const canvas = await html2canvas(clone, {
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
    // Clean up the isolated container
    document.body.removeChild(container)
  }
}
