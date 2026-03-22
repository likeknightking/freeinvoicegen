'use client'

import { useEffect } from 'react'

interface Props {
  slot: string
  format?: 'horizontal' | 'rectangle' | 'article'
  className?: string
}

const FORMAT_CLASSES: Record<string, string> = {
  horizontal: 'h-[90px]  w-full',
  rectangle:  'h-[250px] w-full max-w-[300px]',
  article:    'h-[280px] w-full',
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

  if (!client) {
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-slate-200 bg-slate-50 rounded-lg text-slate-400 text-xs ${FORMAT_CLASSES[format]} ${className}`}
        aria-hidden="true"
      >
        Ad · {format} · slot {slot}
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${FORMAT_CLASSES[format]} ${className}`}>
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
