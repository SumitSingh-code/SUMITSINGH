"use client"
import { useLiveClock } from "./LiveClock"

export default function ComputerSetup() {
  const time = useLiveClock()

  return (
    <div className="flex items-end justify-center h-full pb-12 select-none">
      <div className="relative w-full max-w-[520px]">

        {/* ===== DESK ===== */}
        <div
          className="relative rounded-t-2xl shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #8B6914 0%, #6B4F0F 40%, #4a3509 100%)",
            minHeight: "200px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)"
          }}
        >
          {/* Wood grain overlay */}
          <div className="absolute inset-0 rounded-t-2xl opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 42px)"
            }}
          />

          {/* ===== MONITOR AREA ===== */}
          <div className="flex items-end justify-center pt-4 gap-4 px-6">

            {/* LEFT SPEAKER */}
            <div className="flex-shrink-0 mb-2">
              <div className="w-12 h-20 rounded-lg shadow-lg flex flex-col items-center justify-center gap-1 pt-2"
                style={{ background: "linear-gradient(160deg, #d4c5a9 0%, #b8a88a 60%, #9a8a6a 100%)" }}>
                <div className="w-8 h-8 rounded-full border-2 border-stone-600 flex items-center justify-center shadow-inner"
                  style={{ background: "radial-gradient(circle, #2a2a2a 40%, #1a1a1a 100%)" }}>
                  <div className="w-2 h-2 rounded-full bg-stone-400 opacity-50" />
                </div>
                <div className="w-1 h-1 rounded-full bg-amber-600 mt-1" />
                <div className="w-1 h-1 rounded-full bg-stone-500" />
              </div>
            </div>

            {/* CRT MONITOR */}
            <div className="flex flex-col items-center flex-1 max-w-[280px]">
              {/* Monitor outer bezel */}
              <div className="w-full rounded-2xl p-3 shadow-2xl relative"
                style={{ background: "linear-gradient(160deg, #d4c5a9 0%, #c0aa8a 50%, #a89070 100%)" }}>
                {/* Monitor inner bezel */}
                <div className="rounded-xl p-1.5 shadow-inner"
                  style={{ background: "#2a2218" }}>
                  {/* CRT SCREEN */}
                  <div
                    className="crt-screen rounded-lg overflow-hidden relative"
                    style={{
                      aspectRatio: "4/3",
                      background: "#0a0e1a",
                      boxShadow: "inset 0 0 40px rgba(74,222,128,0.12)"
                    }}
                  >
                    {/* Portrait photo */}
                    <img
                      src="/portrait.jpg"
                      alt="Sumit Singh"
                      className="w-full h-full object-cover object-top"
                      style={{ filter: "brightness(1.05) saturate(1.15) contrast(1.05)" }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        const parent = target.parentElement
                        if (parent) {
                          parent.style.background = "linear-gradient(135deg, #0a2040 0%, #0d3060 50%, #0a2040 100%)"
                          parent.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#4ade80;font-family:monospace;gap:8px;"><div style="font-size:48px">👤</div><div style="font-size:12px;opacity:0.7">Add portrait.jpg</div><div style="font-size:10px;opacity:0.4">to /public folder</div></div>`
                        }
                      }}
                    />
                    {/* CRT overlay tint */}
                    <div className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.04) 0%, transparent 60%)", mixBlendMode: "screen" }} />
                  </div>
                </div>
                {/* Monitor brand area */}
                <div className="flex items-center justify-between mt-2 px-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg" style={{ boxShadow: "0 0 6px #4ade80" }} />
                  <span className="text-stone-500 text-xs font-mono opacity-60 tracking-widest">SUMIT</span>
                  <div className="flex gap-1">
                    <div className="w-8 h-2 rounded-sm bg-stone-600 opacity-50" />
                  </div>
                </div>
              </div>
              {/* Monitor neck */}
              <div className="w-8 h-4 rounded-b-lg" style={{ background: "#9a8060" }} />
              {/* Monitor base */}
              <div className="w-20 h-3 rounded-xl" style={{ background: "linear-gradient(90deg, #8a7050, #b09070, #8a7050)" }} />
            </div>

            {/* RIGHT SPEAKER */}
            <div className="flex-shrink-0 mb-2">
              <div className="w-12 h-20 rounded-lg shadow-lg flex flex-col items-center justify-center gap-1 pt-2"
                style={{ background: "linear-gradient(160deg, #d4c5a9 0%, #b8a88a 60%, #9a8a6a 100%)" }}>
                <div className="w-8 h-8 rounded-full border-2 border-stone-600 flex items-center justify-center shadow-inner"
                  style={{ background: "radial-gradient(circle, #2a2a2a 40%, #1a1a1a 100%)" }}>
                  <div className="w-2 h-2 rounded-full bg-stone-400 opacity-50" />
                </div>
                <div className="w-1 h-1 rounded-full bg-amber-600 mt-1" />
                <div className="w-1 h-1 rounded-full bg-stone-500" />
              </div>
            </div>
          </div>

          {/* ===== DESK SURFACE ITEMS ===== */}
          <div className="flex items-end px-6 pb-4 pt-3 gap-3">

            {/* LEFT SIDE: Clock + Pen holder + Notebook */}
            <div className="flex items-end gap-2 flex-1">
              {/* Digital Alarm Clock */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="rounded-lg px-2 py-1 shadow-lg"
                  style={{ background: "linear-gradient(160deg, #3a3020, #1a1008)", border: "2px solid #5a4520" }}>
                  <div className="led-clock font-mono text-green-400 text-sm font-bold tracking-wider" style={{ textShadow: "0 0 8px #4ade80" }}>
                    {time}
                  </div>
                </div>
                <div className="w-12 h-1 rounded-b-sm" style={{ background: "#2a1a08" }} />
              </div>

              {/* Pen Holder */}
              <div className="flex-shrink-0">
                <div className="w-9 h-14 rounded-b-lg rounded-t-2xl shadow-md flex flex-col items-center justify-end pb-1 gap-0.5 relative overflow-hidden"
                  style={{ background: "linear-gradient(180deg, #c0b090, #8a7050)" }}>
                  <div className="w-0.5 h-10 rounded-full absolute" style={{ background: "#1a1a1a", top: "2px", left: "12px" }} />
                  <div className="w-0.5 h-8 rounded-full absolute" style={{ background: "#c0392b", top: "4px", left: "16px" }} />
                  <div className="w-0.5 h-9 rounded-full absolute" style={{ background: "#1a5276", top: "3px", right: "10px" }} />
                </div>
              </div>

              {/* Open Notebook */}
              <div className="flex-shrink-0">
                <div className="w-16 h-12 rounded shadow-md relative"
                  style={{ background: "#f5f0e8", border: "1px solid #d4c9b0" }}>
                  {/* Lines */}
                  {[0,1,2,3].map(i => (
                    <div key={i} className="absolute left-2 right-2 h-px opacity-30"
                      style={{ background: "#7a7a7a", top: `${14 + i * 10}px` }} />
                  ))}
                  {/* Spine */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 opacity-20" style={{ background: "#5a4520" }} />
                  {/* Pen on notebook */}
                  <div className="absolute -bottom-1 -right-3 w-10 h-1 rounded-full rotate-[-20deg]" style={{ background: "#1a5276" }} />
                </div>
              </div>
            </div>

            {/* CPU TOWER */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-16 h-28 rounded-lg shadow-xl relative"
                style={{ background: "linear-gradient(160deg, #c8b896 0%, #a89870 50%, #8a7858 100%)" }}>
                {/* Floppy slot */}
                <div className="absolute top-4 left-2 right-2 h-3 rounded-sm"
                  style={{ background: "#1a1a1a", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8)" }}>
                  <div className="absolute inset-y-0.5 left-0.5 right-0.5 rounded-sm opacity-30"
                    style={{ background: "linear-gradient(90deg, #333, #555, #333)" }} />
                </div>
                {/* CD drive */}
                <div className="absolute top-9 left-2 right-2 h-2 rounded-sm"
                  style={{ background: "#1a1a1a", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }} />
                {/* Power button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{ background: "radial-gradient(circle, #4ade80, #16a34a)" ,
                  boxShadow: "0 0 6px #4ade80" }} />
                {/* Brand */}
                <div className="absolute bottom-8 left-2 right-2 flex justify-center">
                  <span className="text-stone-600 text-xs font-mono opacity-40 tracking-widest">SUMI-PC</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Keyboard + Mouse area */}
            <div className="flex flex-col gap-2 flex-1 items-end">
              {/* Desk Organizer */}
              <div className="flex gap-1">
                <div className="w-10 h-6 rounded shadow-sm flex items-end justify-around px-1 pb-0.5"
                  style={{ background: "#c8b890" }}>
                  {["#1a1a1a","#c0392b","#1a5276"].map((c,i) => (
                    <div key={i} className="w-0.5 rounded-full" style={{ height: `${12+i*4}px`, background: c }} />
                  ))}
                </div>
                {/* Floppy disks stack */}
                <div className="flex flex-col gap-0.5">
                  {["#1a5276","#1a1a1a","#7c3aed"].map((c,i) => (
                    <div key={i} className="w-6 h-1.5 rounded-sm shadow-sm" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* KEYBOARD + MOUSE ROW */}
          <div className="px-4 pb-3 flex items-end gap-3">
            {/* Keyboard */}
            <div className="flex-1 rounded-lg shadow-lg relative"
              style={{ background: "linear-gradient(160deg, #d4c5a9, #b8a882)", height: "44px" }}>
              {/* Key rows */}
              {[0,1,2].map(row => (
                <div key={row} className="absolute flex gap-0.5"
                  style={{ top: `${6 + row * 11}px`, left: `${6 + row * 3}px`, right: `${6 + row * 2}px` }}>
                  {Array.from({length: 14 - row}).map((_, i) => (
                    <div key={i} className="rounded-sm shadow-sm flex-1"
                      style={{ height: "8px", background: "linear-gradient(160deg, #e8d8bc, #c8b89a)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.4)" }} />
                  ))}
                </div>
              ))}
            </div>
            {/* Mouse + mousepad */}
            <div className="flex-shrink-0 relative">
              <div className="w-14 h-10 rounded-lg"
                style={{ background: "#1a1a1a", boxShadow: "0 2px 8px rgba(0,0,0,0.6)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-7 rounded-lg shadow-lg"
                  style={{ background: "linear-gradient(160deg, #d4c5a9, #b8a882)", marginTop: "-4px" }}>
                  <div className="w-full h-1/2 border-b border-stone-400 opacity-50 rounded-t-lg" />
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-3 rounded-full bg-stone-500 opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESK LEGS */}
        <div className="flex justify-between px-12">
          <div className="w-4 h-8 rounded-b-lg" style={{ background: "linear-gradient(180deg, #6B4F0F, #4a3509)" }} />
          <div className="w-4 h-8 rounded-b-lg" style={{ background: "linear-gradient(180deg, #6B4F0F, #4a3509)" }} />
        </div>

        {/* Ambient shadow under desk */}
        <div className="mx-8 h-4 rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)" }} />
      </div>
    </div>
  )
}
