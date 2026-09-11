"use client"
import { useState } from "react"
import LiveClock from "./LiveClock"
import StartMenu from "./StartMenu"
import clsx from "clsx"

const QUICK_ICONS = [
  { icon: "💼", label: "Projects" },
  { icon: "🏥", label: "MediKiosk" },
  { icon: "💬", label: "Unigram" },
  { icon: "📄", label: "Resume" },
]

interface Props {
  onContact: () => void
}

export default function Taskbar({ onContact }: Props) {
  const [startOpen, setStartOpen] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-2 gap-2 relative"
      style={{
        height: "44px",
        background: "linear-gradient(180deg, #1a3a6a 0%, #0d2040 100%)",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.5)"
      }}>

      {/* START BUTTON */}
      <div className="relative">
        <StartMenu open={startOpen} onClose={() => setStartOpen(false)} onContact={onContact} />
        <button
          onClick={() => setStartOpen((v) => !v)}
          className={clsx(
            "start-btn flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-sm font-bold transition-all duration-200 select-none",
            startOpen ? "ring-2 ring-green-400" : ""
          )}
          style={{
            background: "linear-gradient(135deg, #16a34a, #2563eb)",
            boxShadow: "0 0 8px rgba(74,222,128,0.3)"
          }}
        >
          <span className="text-base">🪟</span>
          <span>Start</span>
        </button>
      </div>

      {/* SEPARATOR */}
      <div className="w-px h-6 bg-white/20" />

      {/* QUICK LAUNCH ICONS */}
      <div className="flex items-center gap-1">
        {QUICK_ICONS.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className="w-8 h-8 rounded flex items-center justify-center text-lg hover:bg-white/15 transition-colors"
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* SPACER */}
      <div className="flex-1" />

      {/* SYSTEM TRAY */}
      <div className="flex items-center gap-3 px-2">
        <button className="text-white/70 hover:text-white transition-colors text-base" title="Volume">
          🔊
        </button>
        <div className="w-px h-5 bg-white/20" />
        <LiveClock variant="taskbar" />
      </div>

      {/* CHAT BUBBLE (floating above taskbar) */}
      <button
        onClick={onContact}
        className="chat-bubble absolute -top-14 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-transform hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          boxShadow: "0 4px 20px rgba(37,99,235,0.6)"
        }}
        title="Message Me"
      >
        💬
      </button>
    </div>
  )
}
