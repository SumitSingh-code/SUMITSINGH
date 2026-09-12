'use client'

interface Folder {
  id: string
  name: string
  tagline: string
  content: {
    what_it_is: string
    tech_stack: string[]
    key_work: string[]
    why_it_matters: string
    sub_items: { name: string; desc: string }[]
  }
  order_index: number
}

interface Props {
  folders: Folder[]
  onOpen: (f: Folder) => void
}

const FOLDER_ICONS: Record<string, string> = {
  vetanx: '💼',
  unigram: '💬',
  medikiosk: '🏥',
  ashoka: '🏨',
  'hackathon-tool': '🎯',
  achievements: '🏆',
  leadership: '👑',
  internships: '📋',
}

export default function FoldersSidebar({ folders, onOpen }: Props) {
  return (
    <div className="sidebar-panel">
      <h2 className="text-white font-bold text-sm mb-3 tracking-wider uppercase">📁 Folders</h2>
      <div className="space-y-1">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onOpen(folder)}
            className="folder-icon w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left group"
          >
            <span className="text-2xl flex-shrink-0">
              {FOLDER_ICONS[folder.id] || '📁'}
            </span>
            <div className="min-w-0">
              <div className="text-white text-xs font-bold truncate">{folder.name}</div>
              <div className="text-white/60 text-[10px] truncate">{folder.tagline}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
