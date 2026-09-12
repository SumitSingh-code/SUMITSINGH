'use client'

import { useState, useEffect } from 'react'

export function useLiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function LiveClock({ variant = 'desk' }: { variant?: 'desk' | 'taskbar' }) {
  const time = useLiveClock()

  if (variant === 'taskbar') {
    return <span className="text-xs font-mono">{time}</span>
  }

  return (
    <div className="led-clock text-lg font-bold tracking-wider bg-black/80 px-3 py-1 rounded">
      {time}
    </div>
  )
}
