"use client"
import { useState, useEffect } from "react"

interface Props {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  useEffect(() => {
    if (!open) { setStatus("idle"); setForm({ name: "", email: "", message: "" }) }
  }, [open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(160deg, #0d1b3e 0%, #1a2f5e 100%)", border: "1px solid rgba(255,255,255,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2"
          style={{ background: "linear-gradient(90deg, #1a5276 0%, #2e86c1 100%)" }}>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span className="text-white font-bold text-sm">Message Me</span>
          </div>
          <button onClick={onClose}
            className="w-5 h-5 rounded-sm text-xs font-bold text-white flex items-center justify-center hover:bg-red-500 transition-colors"
            style={{ background: "rgba(255,255,255,0.2)" }}>
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-white/60 text-sm mb-6">Thanks for reaching out. I will get back to you soon.</p>
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #2563eb, #16a34a)" }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-1.5 block font-medium">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/30 outline-none focus:ring-2 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
              </div>
              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-1.5 block font-medium">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/30 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
              </div>
              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-1.5 block font-medium">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Hey Sumit, I wanted to..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/30 outline-none resize-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
              </div>
              {status === "error" && (
                <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
              )}
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={status === "loading"}
                  className="flex-1 py-3 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #2563eb, #16a34a)" }}>
                  {status === "loading" ? "Sending..." : "Send Message 🚀"}
                </button>
                <button type="button" onClick={onClose}
                  className="px-4 py-3 rounded-xl text-white/60 text-sm hover:text-white hover:bg-white/10 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
