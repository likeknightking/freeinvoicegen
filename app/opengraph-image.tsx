import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Invoice Generator — Free Professional Invoices'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 8, display: 'flex' }}>🧾</div>
        <div style={{ fontSize: 52, fontWeight: 800, color: '#1e293b', marginBottom: 12, display: 'flex' }}>
          Invoice Generator
        </div>
        <div style={{ fontSize: 24, color: '#64748b', maxWidth: 700, textAlign: 'center', display: 'flex' }}>
          Create professional PDF invoices instantly. No sign-up, no fees, 100% private.
        </div>
        <div
          style={{
            marginTop: 32,
            padding: '12px 32px',
            background: '#2563eb',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 700,
            color: '#ffffff',
            display: 'flex',
          }}
        >
          freeinvoicegen.app
        </div>
      </div>
    ),
    { ...size }
  )
}
