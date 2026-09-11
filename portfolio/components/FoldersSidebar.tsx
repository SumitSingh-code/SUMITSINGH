"use client"
import { useState } from "react"
import clsx from "clsx"

const FOLDERS = [
  { id: "vetanx",     label: "Vetanx",            emoji: "💼" },
  { id: "unigram",    label: "Unigram",            emoji: "💬" },
  { id: "medikiosk",  label: "MediKiosk",          emoji: "🏥" },
  { id: "ashoka",     label: "Ashoka Hotel",       emoji: "🏨" },
  { id: "achievements", label: "Achievements",     emoji: "🏆" },
  { id: "leadership", label: "Leadership & Roles", emoji: "👑" },
]

interface Props {
  onOpen: (folder: typeof FOLDERS[0]) => void
}

export default function FoldersSidebar({ onOpen }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <div className="flex flex-col h-full pt-4 pb-20 px-2 select-none">
      <h2 className="text-white font-bold text-lg mb-4 px-2 drop-shadow-lg tracking-wide">
        📁 Folders
      </h2>
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 flex flex-col gap-1 overflow-y-auto">
        {FOLDERS.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onOpen(folder)}
            onMouseEnter={() => setHovered(folder.id)}
            onMouseLeave={() => setHovered(null)}
            className={clsx(
              "folder-item flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 group w-full",
              hovered === folder.id
                ? "bg-white/15 scale-105"
                : "hover:bg-white/10"
            )}
          >
            <span
              className="folder-icon text-4xl transition-transform duration-200"
              style={
                hovered === folder.id
                  ? { filter: "drop-shadow(0 0 8px rgba(234,179,8,0.9))", transform: "scale(1.15)" }
                  : {}
              }
            >
              {folder.emoji}
            </span>
            <span className="text-white text-xs font-medium text-center leading-tight drop-shadow">
              {folder.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export { FOLDERS }
