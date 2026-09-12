'use client'

interface Folder {
  id: string
  name: string
  tagline: string
  content: Record<string, unknown>
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
  'ashoka-hotel': '🏨',
  ashoka: '🏨',
  'hackathon-partition-tool': '🎯',
  'hackathon-tool': '🎯',
  achievements: '🏆',
  'leadership-roles': '👑',
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
              <div className="text-white/60 text-[10px] truncate leading-tight" style={{ maxWidth: '120px' }}>
                {folder.tagline.length > 40 ? folder.tagline.slice(0, 40) + '…' : folder.tagline}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
