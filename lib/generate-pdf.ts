export async function generateInvoicePDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('Invoice preview element not found. Cannot generate PDF.')
  }

  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ])

  // Create a sandboxed iframe — completely isolated from Tailwind's lab() colors.
  // The iframe has NO stylesheets, so html2canvas only sees inline styles (hex colors).
  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.left = '-10000px'
  iframe.style.top = '0'
  iframe.style.width = '794px'  // A4 width at 96dpi
  iframe.style.height = '1123px' // A4 height at 96dpi
  iframe.style.border = 'none'
  iframe.style.visibility = 'hidden'
  document.body.appendChild(iframe)

  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!iframeDoc) throw new Error('Could not access iframe document.')

    // Write a clean HTML document with NO Tailwind, NO external CSS
    iframeDoc.open()
    iframeDoc.write(`<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;}</style></head><body></body></html>`)
    iframeDoc.close()

    // Clone the preview element (which uses only inline styles) into the clean iframe
    const clone = element.cloneNode(true) as HTMLElement
    clone.removeAttribute('id')
    iframeDoc.body.appendChild(clone)

    // Wait for images (logo) to load in the iframe
    const images = clone.querySelectorAll('img')
    if (images.length > 0) {
      await Promise.all(
        Array.from(images).map(
          img => img.complete ? Promise.resolve() : new Promise(resolve => {
            img.onload = resolve
            img.onerror = resolve
          })
        )
      )
    }

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 794,
      windowHeight: 1123,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

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
    document.body.removeChild(iframe)
  }
}
