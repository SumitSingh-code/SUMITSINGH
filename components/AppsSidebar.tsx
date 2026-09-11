"use client"
import { useState } from "react"
import clsx from "clsx"

const APPS = [
  { id: "vetanx",    name: "Vetanx",       sub: "Web App",           icon: "💼", color: "#3b82f6" },
  { id: "unigram",   name: "Unigram",      sub: "Messaging Platform", icon: "💬", color: "#8b5cf6" },
  { id: "medikiosk", name: "MediKiosk",    sub: "Healthcare Portal",  icon: "🏥", color: "#10b981" },
  { id: "ashoka",    name: "Ashoka Hotel", sub: "Website / Menu",     icon: "🏨", color: "#f59e0b" },
  { id: "github",    name: "GitHub",       sub: "Source Code",        icon: "🐙", color: "#374151" },
  { id: "linkedin",  name: "LinkedIn",     sub: "Connect with me",    icon: "💼", color: "#0e76a8" },
  { id: "resume",    name: "Resume.pdf",   sub: "Download CV",        icon: "📄", color: "#ef4444" },
]

interface Props {
  onOpen: (app: typeof APPS[0]) => void
}

export default function AppsSidebar({ onOpen }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  const handleClick = (app: typeof APPS[0]) => {
    if (app.id === "resume") {
      window.open("/resume.pdf", "_blank")
      return
    }
    if (app.id === "github") {
      window.open("https://github.com/SumitSingh-code", "_blank")
      return
    }
    if (app.id === "linkedin") {
      window.open("https://linkedin.com/in/sumit-singh", "_blank")
      return
    }
    onOpen(app)
  }

  return (
    <div className="flex flex-col h-full pt-4 pb-20 px-2 select-none">
      <h2 className="text-white font-bold text-lg mb-4 px-2 drop-shadow-lg tracking-wide">
        🚀 Apps
      </h2>
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-2 flex flex-col gap-1 overflow-y-auto">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => handleClick(app)}
            onMouseEnter={() => setHovered(app.id)}
            onMouseLeave={() => setHovered(null)}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left w-full",
              hovered === app.id ? "bg-white/20" : "hover:bg-white/10"
            )}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-lg"
              style={{ background: app.color }}
            >
              {app.icon}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-tight truncate">{app.name}</p>
              {app.sub && (
                <p className="text-white/50 text-xs truncate">{app.sub}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
