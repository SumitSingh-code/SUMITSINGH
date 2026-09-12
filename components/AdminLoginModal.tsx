'use client'

import { useState } from 'react'

interface Props {
  onLogin: (password: string) => Promise<boolean>
  onClose: () => void
}

export default function AdminLoginModal({ onLogin, onClose }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError(false)
    const ok = await onLogin(password)
    if (!ok) {
      setError(true)
      setPassword('')
    }
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="win-window w-[300px]" onClick={e => e.stopPropagation()}>
        <div className="win-titlebar">
          <span>🔐 Admin Login</span>
          <button className="win-titlebar-btn" onClick={onClose}>✕</button>
        </div>
        <div className="win-body">
          <div className="text-center mb-3">
            <div className="text-3xl mb-1">🖱️</div>
            <p className="text-[10px] text-gray-500">Enter admin password to manage content</p>
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="win-input w-full"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
          </div>
          {error && <p className="text-[10px] text-red-600 mb-2 text-center">❌ Wrong password</p>}
          <div className="flex justify-end gap-2">
            <button className="win-btn" onClick={onClose}>Cancel</button>
            <button className="win-btn font-bold" onClick={handleSubmit} disabled={loading}>
              {loading ? '...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
