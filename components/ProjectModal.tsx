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
}

interface Props {
  folder: Folder
  onClose: () => void
}

export default function ProjectModal({ folder, onClose }: Props) {
  const c = folder.content

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="win-window w-[520px] max-w-[95vw] max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Title bar */}
        <div className="win-titlebar">
          <span>📁 {folder.name} — {folder.tagline}</span>
          <button className="win-titlebar-btn" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="win-body overflow-y-auto flex-1" style={{ maxHeight: 'calc(85vh - 30px)' }}>
          {/* What it is */}
          {c.what_it_is && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">What It Is</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{c.what_it_is}</p>
            </div>
          )}

          {/* Tech Stack */}
          {c.tech_stack && c.tech_stack.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">Tech Stack</h3>
              <div className="flex flex-wrap gap-1">
                {c.tech_stack.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] font-bold bg-[#d4d0c8] border border-[#808080] rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Work */}
          {c.key_work && c.key_work.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">Key Work</h3>
              <ul className="text-xs text-gray-700 space-y-1 list-none">
                {c.key_work.map((k, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-[#000080]">▸</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sub Items */}
          {c.sub_items && c.sub_items.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">
                {folder.id === 'achievements' ? 'Achievements' : folder.id === 'leadership' ? 'Roles' : folder.id === 'internships' ? 'Experience' : 'Sub-Projects'}
              </h3>
              <div className="space-y-2">
                {c.sub_items.map((item, i) => (
                  <div key={i} className="bg-white border border-[#808080] p-2 rounded-sm">
                    <div className="text-xs font-bold text-[#000080]">📌 {item.name}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why It Matters */}
          {c.why_it_matters && (
            <div className="mb-2">
              <h3 className="text-xs font-bold uppercase text-[#000080] mb-1 border-b border-[#808080] pb-1">Why It Matters</h3>
              <p className="text-xs text-gray-700 italic leading-relaxed">{c.why_it_matters}</p>
            </div>
          )}

          {/* Close button */}
          <div className="flex justify-end mt-3">
            <button className="win-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
