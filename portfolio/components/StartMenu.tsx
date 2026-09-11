"use client"
import { useState } from "react"
import clsx from "clsx"

const MENU_ITEMS = [
  { label: "About Me",  href: "#",     icon: "👤" },
  { label: "Projects",  href: "#",     icon: "💼" },
  { label: "Contact",   href: "#",     icon: "✉️" },
  { label: "Resume",    href: "/resume.pdf", icon: "📄", external: true },
  { label: "GitHub",    href: "https://github.com/SumitSingh-code", icon: "🐙", external: true },
  { label: "LinkedIn",  href: "https://linkedin.com/in/sumit-singh", icon: "💼", external: true },
]

interface Props {
  open: boolean
  onClose: () => void
  onContact: () => void
}

export default function StartMenu({ open, onClose, onContact }: Props) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-12 left-0 z-50 w-56 rounded-xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(160deg, #1a3a6a 0%, #0d2040 100%)", border: "1px solid rgba(255,255,255,0.15)" }}>
        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-3"
          style={{ background: "linear-gradient(90deg, #1a5276, #2e86c1)" }}>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
            👨‍💻
          </div>
          <div>
            <p className="text-white font-bold text-sm">Sumit Singh</p>
            <p className="text-blue-200 text-xs">Developer</p>
          </div>
        </div>
        {/* Items */}
        <div className="py-2">
          {MENU_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (item.label === "Contact") { e.preventDefault(); onContact(); }
                onClose()
              }}
              className="flex items-center gap-3 px-4 py-2 text-white/90 hover:bg-white/15 transition-colors text-sm"
            >
              <span className="text-lg w-6 text-center">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/10 text-white/30 text-xs text-center">
          Sumit Portfolio OS™
        </div>
      </div>
    </>
  )
}
