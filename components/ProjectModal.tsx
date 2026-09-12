'use client'

interface Folder {
  id: string
  name: string
  tagline: string
  content: Record<string, unknown>
}

interface Props {
  folder: Folder
  onClose: () => void
}

export default function ProjectModal({ folder, onClose }: Props) {
  const c = folder.content

  // Helper to render a string field
  const renderText = (label: string, value: unknown) => {
    if (!value || typeof value !== 'string') return null
    return (
      <div className="mb-4">
        <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">{label}</h3>
        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{value}</p>
      </div>
    )
  }

  // Helper to render a string[] field as tags
  const renderTags = (label: string, value: unknown) => {
    if (!Array.isArray(value) || value.length === 0) return null
    return (
      <div className="mb-4">
        <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">{label}</h3>
        <div className="flex flex-wrap gap-1">
          {value.map((t: string, i: number) => (
            <span key={i} className="px-2 py-0.5 text-[10px] font-bold bg-[#d4d0c8] border border-[#808080] rounded-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // Helper to render a string[] field as bullet list
  const renderBullets = (label: string, value: unknown) => {
    if (!Array.isArray(value) || value.length === 0) return null
    return (
      <div className="mb-4">
        <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">{label}</h3>
        <ul className="text-xs text-gray-700 space-y-1 list-none">
          {value.map((k: string, i: number) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-[#000080] flex-shrink-0">▸</span>
              <span>{k}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Helper to render sub_items / entries array [{name, desc/description}, ...]
  const renderSubItems = (label: string, value: unknown) => {
    if (!Array.isArray(value) || value.length === 0) return null
    return (
      <div className="mb-4">
        <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">{label}</h3>
        <div className="space-y-2">
          {value.map((item: Record<string, string>, i: number) => (
            <div key={i} className="bg-white border border-[#808080] p-2 rounded-sm">
              <div className="text-xs font-bold text-[#000080]">📌 {item.name || item.title || `Item ${i + 1}`}</div>
              <div className="text-[10px] text-gray-600 mt-0.5">{item.desc || item.description || ''}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="win-window w-[520px] max-w-[95vw] max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Title bar */}
        <div className="win-titlebar">
          <span>📁 {folder.name}</span>
          <button className="win-titlebar-btn" onClick={onClose}>✕</button>
        </div>

        {/* Tagline */}
        <div className="px-3 py-2 bg-[#fffff0] border-b border-[#808080] text-[11px] text-gray-600 italic">
          {folder.tagline}
        </div>

        {/* Body — dynamically renders whatever fields the content JSON has */}
        <div className="win-body overflow-y-auto flex-1" style={{ maxHeight: 'calc(85vh - 60px)' }}>

          {renderText('What It Is', c.what_it_is)}
          {renderText('Origin Story', c.origin_story)}
          {renderText('Story', c.story)}
          {renderText('Design Direction', c.design_direction)}
          {renderText('Status', c.status)}
          {renderText('Note', c.note)}

          {renderTags('Tech Stack', c.tech_stack)}
          {renderBullets('Key Work', c.key_work)}
          {renderBullets('Feature Set', c.feature_set)}
          {renderBullets('Related Client Work', c.related_client_work)}

          {renderSubItems(
            folder.id === 'achievements' ? 'Achievements' :
            folder.id === 'leadership-roles' ? 'Roles' :
            folder.id === 'internships' ? 'Experience' :
            'Sub-Projects',
            c.sub_items || c.entries
          )}

          {renderText('Why It Matters', c.why_it_matters)}

          {/* Close button */}
          <div className="flex justify-end mt-3">
            <button className="win-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
