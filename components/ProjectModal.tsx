"use client"
import { useEffect } from "react"

const PROJECT_DATA: Record<string, {
  title: string
  description: string
  tech: string[]
  emoji: string
  color: string
  github?: string
  live?: string
}> = {
  vetanx: {
    title: "Vetanx",
    description: "A comprehensive web application built with modern technologies. Features include user authentication, real-time updates, and a clean dashboard interface.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    emoji: "💼",
    color: "#3b82f6",
    github: "https://github.com/SumitSingh-code",
  },
  unigram: {
    title: "Unigram",
    description: "A messaging platform with real-time chat capabilities, user presence indicators, and seamless media sharing.",
    tech: ["Next.js", "Socket.io", "PostgreSQL", "Tailwind"],
    emoji: "💬",
    color: "#8b5cf6",
    github: "https://github.com/SumitSingh-code",
  },
  medikiosk: {
    title: "MediKiosk",
    description: "A healthcare portal for managing patient records, appointments, and medical information with an intuitive interface.",
    tech: ["React", "Express", "MySQL", "Bootstrap"],
    emoji: "🏥",
    color: "#10b981",
    github: "https://github.com/SumitSingh-code",
  },
  ashoka: {
    title: "Ashoka Hotel",
    description: "A complete hotel management website with digital menu, room booking, and a fun mini-games section for guests.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    emoji: "🏨",
    color: "#f59e0b",
    github: "https://github.com/SumitSingh-code",
  },
  achievements: {
    title: "Achievements",
    description: "A collection of hackathon wins, certifications, academic honors, and notable recognitions throughout my journey.",
    tech: ["Hackathons", "Certifications", "Awards", "Publications"],
    emoji: "🏆",
    color: "#f59e0b",
  },
  leadership: {
    title: "Leadership & Roles",
    description: "Experience leading teams, organizing events, mentoring peers, and driving impactful initiatives in college and professional settings.",
    tech: ["Team Lead", "Event Organizer", "Mentor", "Community Builder"],
    emoji: "👑",
    color: "#ef4444",
  },
}

interface Props {
  folderId: string | null
  onClose: () => void
}

export default function ProjectModal({ folderId, onClose }: Props) {
  const project = folderId ? PROJECT_DATA[folderId] : null

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!folderId || !project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(160deg, #0d1b3e 0%, #1a2f5e 100%)", border: "1px solid rgba(255,255,255,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Win98-style title bar */}
        <div className="flex items-center justify-between px-4 py-2"
          style={{ background: "linear-gradient(90deg, #1a5276 0%, #2e86c1 100%)" }}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{project.emoji}</span>
            <span className="text-white font-bold text-sm tracking-wide">{project.title}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={onClose}
              className="w-5 h-5 rounded-sm text-xs font-bold text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              style={{ background: "rgba(255,255,255,0.2)" }}>
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
              style={{ background: project.color }}>
              {project.emoji}
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold">{project.title}</h2>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4,5].map(s => (
                  <div key={s} className="w-2 h-2 rounded-full" style={{ background: project.color }} />
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ background: `${project.color}40`, border: `1px solid ${project.color}60` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "#374151" }}>
                🐙 GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: project.color }}>
                🚀 Live Demo
              </a>
            )}
            <button onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-white/60 text-sm font-medium hover:text-white hover:bg-white/10 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
