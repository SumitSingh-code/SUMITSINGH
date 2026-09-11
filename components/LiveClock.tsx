"use client"
import { useEffect, useState } from "react"

export function useLiveClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes().toString().padStart(2, "0")
      const ampm = h >= 12 ? "PM" : "AM"
      const h12 = h % 12 || 12
      setTime(`${h12}:${m} ${ampm}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function LiveClock({ variant = "taskbar" }: { variant?: "desk" | "taskbar" }) {
  const time = useLiveClock()
  if (variant === "desk") {
    return (
      <div className="led-clock font-mono text-green-400 text-base font-bold tracking-widest select-none">
        {time}
      </div>
    )
  }
  return (
    <span className="font-mono text-white text-xs tracking-wide select-none">{time}</span>
  )
}
