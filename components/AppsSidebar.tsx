'use client'

interface App {
  id: string
  name: string
  sub_label: string
  icon_glyph: string
  icon_color: string
  link_url: string | null
  link_status: 'live' | 'coming_soon' | 'private'
  order_index: number
}

interface Props {
  apps: App[]
  onAppClick: (app: App) => void
}

export default function AppsSidebar({ apps, onAppClick }: Props) {
  return (
    <div className="sidebar-panel">
      <h2 className="text-white font-bold text-sm mb-3 tracking-wider uppercase">🚀 Apps</h2>
      <div className="space-y-0.5">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onAppClick(app)}
            className="app-row w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left"
          >
            <span className="text-xl flex-shrink-0" style={{ filter: `drop-shadow(0 0 2px ${app.icon_color})` }}>
              {app.icon_glyph}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-white text-xs font-bold truncate flex items-center gap-1">
                {app.name}
                {app.link_status === 'coming_soon' && <span className="badge-coming-soon">SOON</span>}
                {app.link_status === 'private' && <span className="badge-private">PRIVATE</span>}
              </div>
              <div className="text-white/60 text-[10px] truncate">{app.sub_label}</div>
            </div>
            {app.link_status === 'live' && app.link_url && app.id !== 'skills' && (
              <span className="text-white/40 text-[10px]">↗</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
