'use client'

import { useState } from 'react'

interface Props {
  onClose: () => void
}

export default function AdminPanel({ onClose }: Props) {
  const [tab, setTab] = useState<'folders' | 'apps' | 'achievements' | 'leadership' | 'about' | 'skills'>('folders')
  const [message, setMessage] = useState('')

  const tabs = [
    { key: 'folders' as const, label: '📁 Folders' },
    { key: 'apps' as const, label: '🚀 Apps' },
    { key: 'achievements' as const, label: '🏆 Achievements' },
    { key: 'leadership' as const, label: '👑 Leadership' },
    { key: 'about' as const, label: '👤 About' },
    { key: 'skills' as const, label: '⚙️ Skills' },
  ]

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="modal-overlay">
      <div className="win-window w-[600px] max-w-[95vw] max-h-[85vh] flex flex-col">
        <div className="win-titlebar">
          <span>🔧 Admin Panel — Content Management</span>
          <div className="flex gap-1">
            <button className="win-titlebar-btn" onClick={onClose} title="Logout & Close">✕</button>
          </div>
        </div>

        <div className="win-body flex-1 overflow-hidden flex flex-col">
          {/* Tab bar */}
          <div className="flex flex-wrap gap-0 mb-2 border-b border-[#808080]">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-3 py-1 text-[10px] font-bold border border-b-0 border-[#808080] rounded-t-sm -mb-[1px] ${
                  tab === t.key ? 'bg-[#c0c0c0] border-b-[#c0c0c0]' : 'bg-[#d4d0c8]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 text-[10px] px-2 py-1 mb-2 rounded-sm">
              ✅ {message}
            </div>
          )}

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto">
            <AdminTabContent tab={tab} showMessage={showMessage} />
          </div>

          <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#808080]">
            <span className="text-[10px] text-gray-500">Changes save to Supabase instantly</span>
            <button className="win-btn text-[10px]" onClick={onClose}>🚪 Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminTabContent({ tab, showMessage }: { tab: string; showMessage: (m: string) => void }) {
  const [loading, setLoading] = useState(false)

  const apiCall = async (url: string, method: string, body?: unknown) => {
    setLoading(true)
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })
      if (!res.ok) throw new Error('Failed')
      showMessage('Saved successfully!')
      return await res.json()
    } catch {
      showMessage('Error saving. Check your Supabase connection.')
      return null
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8 text-xs text-gray-500">⏳ Working...</div>

  return (
    <div className="text-xs text-gray-600 p-4">
      <p className="mb-3">
        {tab === 'folders' && '📁 Edit project folder content. Changes reflect on the public site immediately.'}
        {tab === 'apps' && '🚀 Manage app links, icons, and status badges.'}
        {tab === 'achievements' && '🏆 Add or edit achievement entries.'}
        {tab === 'leadership' && '👑 Manage leadership roles and descriptions.'}
        {tab === 'about' && '👤 Edit your bio, portrait URL, and resume URL.'}
        {tab === 'skills' && '⚙️ Add or remove skill tags.'}
      </p>
      <p className="text-[10px] text-gray-400 italic">
        Full admin CRUD is available via API routes at /api/admin/{tab}.
        Connect your Supabase to enable live editing.
      </p>
      <div className="mt-4">
        <button className="win-btn" onClick={() => apiCall(`/api/admin/${tab === 'about' ? 'settings' : tab}`, 'GET')}>
          🔄 Test Connection
        </button>
      </div>
    </div>
  )
}
