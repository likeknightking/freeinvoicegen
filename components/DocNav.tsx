'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Receipt, ClipboardList } from 'lucide-react'

const links = [
  { href: '/', label: 'Invoice Generator', icon: FileText },
  { href: '/receipt-generator', label: 'Receipt Generator', icon: Receipt },
  { href: '/quote-generator', label: 'Quote Generator', icon: ClipboardList },
] as const

export default function DocNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1.5 shadow-sm mb-6">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              active
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Icon size={14} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
