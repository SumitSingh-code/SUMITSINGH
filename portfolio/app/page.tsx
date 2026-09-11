"use client"
import { useState } from "react"
import FoldersSidebar from "@/components/FoldersSidebar"
import ComputerSetup from "@/components/ComputerSetup"
import AppsSidebar from "@/components/AppsSidebar"
import Taskbar from "@/components/Taskbar"
import ProjectModal from "@/components/ProjectModal"
import ContactModal from "@/components/ContactModal"

export default function Home() {
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <main className="desktop-bg h-screen w-screen overflow-hidden flex flex-col">
      {/* MAIN CONTENT AREA (above taskbar) */}
      <div className="flex flex-1 min-h-0 pb-[44px]">

        {/* LEFT SIDEBAR — Folders */}
        <div className="w-28 md:w-36 lg:w-40 flex-shrink-0 overflow-y-auto">
          <FoldersSidebar onOpen={(f) => setOpenFolder(f.id)} />
        </div>

        {/* CENTER — Computer Setup Hero */}
        <div className="flex-1 min-w-0 flex items-end justify-center overflow-hidden">
          <ComputerSetup />
        </div>

        {/* RIGHT SIDEBAR — Apps */}
        <div className="w-44 md:w-52 lg:w-56 flex-shrink-0 overflow-y-auto">
          <AppsSidebar onOpen={(a) => {
            if (a.id !== "resume" && a.id !== "github" && a.id !== "linkedin") {
              setOpenFolder(a.id)
            }
          }} />
        </div>
      </div>

      {/* TASKBAR */}
      <Taskbar onContact={() => setContactOpen(true)} />

      {/* MODALS */}
      <ProjectModal folderId={openFolder} onClose={() => setOpenFolder(null)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  )
}
