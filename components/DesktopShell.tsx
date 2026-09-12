'use client'

import { useState } from 'react'
import FoldersSidebar from './FoldersSidebar'
import ComputerSetup from './ComputerSetup'
import AppsSidebar from './AppsSidebar'
import Taskbar from './Taskbar'
import ProjectModal from './ProjectModal'
import ContactModal from './ContactModal'
import AdminLoginModal from './AdminLoginModal'
import AdminPanel from './AdminPanel'

interface Folder {
  id: string
  name: string
  tagline: string
  content: Record<string, unknown>
  order_index: number
}

interface App {
  id: string
  name: string
  sub_label: string | null
  icon_glyph: string
  icon_color: string
  link_url: string | null
  link_status: string
  order_index: number
}

interface Props {
  folders: Folder[]
  apps: App[]
  skills: string[]
  aboutMe: string
  portraitUrl: string
  faq: { question: string; answer: string }[]
}

export default function DesktopShell({ folders, apps, skills, aboutMe, portraitUrl, faq }: Props) {
  const [openFolder, setOpenFolder] = useState<Folder | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [adminLoginOpen, setAdminLoginOpen] = useState(false)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [statusModal, setStatusModal] = useState<{ title: string; message: string } | null>(null)

  const handleAppClick = (app: App) => {
    // Control Panel / Skills — open in-page modal
    if (app.id === 'control-panel' || app.id === 'skills' || app.link_status === 'internal') {
      setSkillsOpen(true)
      return
    }
    // Resume — open/download
    if (app.id === 'resume') {
      window.open(app.link_url || '/resume.pdf', '_blank')
      return
    }
    // Live links — open in new tab
    if (app.link_status === 'live' && app.link_url) {
      window.open(app.link_url, '_blank')
      return
    }
    // Coming soon
    if (app.link_status === 'coming_soon') {
      setStatusModal({ title: `${app.name} — Coming Soon`, message: 'This project is currently under development. Check back soon!' })
      return
    }
    // Private
    if (app.link_status === 'private') {
      setStatusModal({ title: `${app.name} — Private`, message: 'This is a private client system and is not publicly hosted.' })
      return
    }
  }

  const handleAdminLogin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setAdminLoggedIn(true)
        setAdminLoginOpen(false)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const handleAdminLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAdminLoggedIn(false)
  }

  return (
    <>
      {/* Three-column desktop layout */}
      <div className="flex h-[calc(100vh-36px)] relative">
        {/* Left Sidebar - Folders */}
        <div className="w-[200px] flex-shrink-0 p-4 overflow-y-auto">
          <FoldersSidebar folders={folders} onOpen={setOpenFolder} />
        </div>

        {/* Center - Computer Setup */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <ComputerSetup
            portraitUrl={portraitUrl}
            aboutMe={aboutMe}
            onMouseClick={() => setAdminLoginOpen(true)}
          />
        </div>

        {/* Right Sidebar - Apps */}
        <div className="w-[200px] flex-shrink-0 p-4 overflow-y-auto">
          <AppsSidebar apps={apps} onAppClick={handleAppClick} />
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar
        onContactClick={() => setContactOpen(true)}
        faq={faq}
      />

      {/* Modals */}
      {openFolder && (
        <ProjectModal folder={openFolder} onClose={() => setOpenFolder(null)} />
      )}

      {contactOpen && (
        <ContactModal onClose={() => setContactOpen(false)} />
      )}

      {adminLoginOpen && !adminLoggedIn && (
        <AdminLoginModal
          onLogin={handleAdminLogin}
          onClose={() => setAdminLoginOpen(false)}
        />
      )}

      {adminLoggedIn && (
        <AdminPanel onClose={handleAdminLogout} />
      )}

      {/* Skills Modal */}
      {skillsOpen && (
        <div className="modal-overlay" onClick={() => setSkillsOpen(false)}>
          <div className="win-window w-[420px] max-w-[95vw]" onClick={e => e.stopPropagation()}>
            <div className="win-titlebar">
              <span>⚙️ Control Panel — Skills</span>
              <button className="win-titlebar-btn" onClick={() => setSkillsOpen(false)}>✕</button>
            </div>
            <div className="win-body">
              <div className="flex flex-wrap gap-2 p-2">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Modal (Coming Soon / Private) */}
      {statusModal && (
        <div className="modal-overlay" onClick={() => setStatusModal(null)}>
          <div className="win-window w-[360px] max-w-[95vw]" onClick={e => e.stopPropagation()}>
            <div className="win-titlebar">
              <span>{statusModal.title}</span>
              <button className="win-titlebar-btn" onClick={() => setStatusModal(null)}>✕</button>
            </div>
            <div className="win-body text-center py-6">
              <p className="text-sm mb-4">{statusModal.message}</p>
              <button className="win-btn" onClick={() => setStatusModal(null)}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
