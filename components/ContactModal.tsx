'use client'

import { useState } from 'react'

interface Props {
  onClose: () => void
}

export default function ContactModal({ onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="win-window w-[400px] max-w-[95vw]" onClick={e => e.stopPropagation()}>
        <div className="win-titlebar">
          <span>✉️ Contact Sumit</span>
          <button className="win-titlebar-btn" onClick={onClose}>✕</button>
        </div>
        <div className="win-body">
          {status === 'sent' ? (
            <div className="text-center py-6">
              <div className="text-2xl mb-2">✅</div>
              <p className="text-xs font-bold text-green-700 mb-3">Message sent! I&apos;ll get back to you soon.</p>
              <button className="win-btn" onClick={onClose}>Close</button>
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase">Name</label>
                  <input className="win-input w-full" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase">Email</label>
                  <input className="win-input w-full" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase">Message</label>
                  <textarea className="win-input w-full h-20 resize-none" value={message} onChange={e => setMessage(e.target.value)} placeholder="What's on your mind?" />
                </div>
              </div>
              {status === 'error' && <p className="text-[10px] text-red-600 mb-2">Something went wrong. Try again.</p>}
              <div className="flex justify-end gap-2">
                <button className="win-btn" onClick={onClose}>Cancel</button>
                <button className="win-btn font-bold" onClick={handleSubmit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send ✉️'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
