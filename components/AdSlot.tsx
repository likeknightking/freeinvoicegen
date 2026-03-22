'use client'

import { useEffect } from 'react'

interface Props {
  slot: string
  format?: 'horizontal' | 'rectangle' | 'article'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdSlot({ slot, format = 'horizontal', className = '' }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(() => {
    if (!client) return
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch { /* already initialized */ }
  }, [client])

  // No AdSense configured = render nothing (no empty boxes in production)
  if (!client) return null

  return (
    <div className={`overflow-hidden my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
