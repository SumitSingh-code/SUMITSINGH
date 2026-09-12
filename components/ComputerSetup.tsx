'use client'

import LiveClock from './LiveClock'

interface Props {
  portraitUrl: string
  aboutMe: string
  onMouseClick: () => void
}

export default function ComputerSetup({ portraitUrl, aboutMe, onMouseClick }: Props) {
  return (
    <div className="flex flex-col items-center select-none" style={{ transform: 'scale(0.85)' }}>
      {/* Desk surface */}
      <div className="relative">
        {/* Monitor */}
        <div className="relative">
          {/* Monitor outer shell */}
          <div className="bg-[#d4d0c8] rounded-t-lg p-3 pb-1 border-2 border-[#808080]" style={{ borderBottomColor: '#404040' }}>
            {/* Screen bezel */}
            <div className="bg-[#2a2a2a] p-2 rounded-sm">
              {/* CRT Screen */}
              <div className="crt-screen bg-[#0a1628] w-[320px] h-[220px] rounded-sm overflow-hidden relative flex flex-col items-center justify-center p-4">
                {/* Portrait */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00ff00]/40 mb-3 flex-shrink-0">
                  <img src={portraitUrl} alt="Sumit Singh" className="w-full h-full object-cover" />
                </div>
                {/* Name */}
                <div className="text-[#00ff00] font-mono text-sm font-bold mb-1">Sumit Singh</div>
                {/* Bio */}
                <p className="text-[#00cc00]/80 font-mono text-[9px] text-center leading-tight max-h-[80px] overflow-y-auto">
                  {aboutMe}
                </p>
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)'
                }} />
              </div>
            </div>
            {/* Monitor brand */}
            <div className="flex justify-center mt-1">
              <div className="bg-[#a0a0a0] text-[8px] text-gray-600 px-4 py-0.5 rounded-sm font-bold tracking-widest">
                SUMIT OS
              </div>
            </div>
          </div>
          {/* Monitor stand */}
          <div className="flex justify-center">
            <div className="bg-[#d4d0c8] w-16 h-6 border-x-2 border-[#808080]" />
          </div>
          <div className="flex justify-center">
            <div className="bg-[#c0c0c0] w-28 h-3 rounded-b-sm border-2 border-t-0 border-[#808080]" />
          </div>
        </div>

        {/* Desk items row */}
        <div className="flex items-end justify-between w-full mt-2 px-2">
          {/* Left speaker */}
          <div className="flex flex-col items-center">
            <div className="bg-[#1a1a1a] w-8 h-16 rounded-sm border border-[#333] flex flex-col items-center justify-center gap-1">
              <div className="w-5 h-5 rounded-full border border-[#444] bg-[#222]" />
              <div className="w-3 h-3 rounded-full border border-[#444] bg-[#222]" />
            </div>
          </div>

          {/* LED Clock */}
          <div className="flex flex-col items-center">
            <LiveClock variant="desk" />
          </div>

          {/* CPU Tower */}
          <div className="bg-[#d4d0c8] w-14 h-24 rounded-sm border-2 border-[#808080] flex flex-col items-center justify-center gap-1 p-1">
            <div className="w-8 h-2 bg-[#333] rounded-sm" />
            <div className="w-8 h-2 bg-[#333] rounded-sm" />
            <div className="w-3 h-3 rounded-full bg-[#00ff00] shadow-[0_0_4px_#00ff00] mt-1" />
            <div className="text-[6px] text-gray-500 mt-1 font-bold">CPU</div>
          </div>

          {/* Right speaker */}
          <div className="flex flex-col items-center">
            <div className="bg-[#1a1a1a] w-8 h-16 rounded-sm border border-[#333] flex flex-col items-center justify-center gap-1">
              <div className="w-5 h-5 rounded-full border border-[#444] bg-[#222]" />
              <div className="w-3 h-3 rounded-full border border-[#444] bg-[#222]" />
            </div>
          </div>
        </div>

        {/* Keyboard */}
        <div className="flex justify-center mt-3">
          <div className="bg-[#d4d0c8] w-48 h-8 rounded-sm border-2 border-[#808080] flex items-center justify-center gap-0.5 px-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#e8e8e8] border border-[#a0a0a0] rounded-[1px]" />
            ))}
          </div>
        </div>

        {/* Mouse - CLICKABLE for admin login */}
        <div className="flex justify-end mt-2 mr-2">
          <button
            onClick={onMouseClick}
            title="🖱️"
            className="bg-[#d4d0c8] w-6 h-10 rounded-t-full rounded-b-lg border-2 border-[#808080] cursor-pointer hover:bg-[#e0e0e0] transition-colors relative"
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-[#808080]" />
          </button>
        </div>

        {/* Desk accessories */}
        <div className="flex justify-between items-end mt-2 px-4">
          {/* Pen holder */}
          <div className="flex flex-col items-center">
            <div className="bg-[#8b4513] w-6 h-8 rounded-t-sm border border-[#5c3310] flex items-end justify-center pb-0.5">
              <div className="w-0.5 h-6 bg-[#333] -mt-3 mx-[1px]" />
              <div className="w-0.5 h-5 bg-blue-600 -mt-2 mx-[1px]" />
              <div className="w-0.5 h-5 bg-red-600 -mt-2 mx-[1px]" />
            </div>
          </div>

          {/* Notebook */}
          <div className="bg-[#f5f5dc] w-12 h-3 border border-[#ccc] rounded-sm relative">
            <div className="absolute top-0.5 left-1 w-8 h-[1px] bg-blue-200" />
            <div className="absolute top-1.5 left-1 w-6 h-[1px] bg-blue-200" />
          </div>

          {/* Floppy disks */}
          <div className="flex gap-0.5">
            <div className="bg-[#333] w-5 h-5 rounded-sm border border-[#555]">
              <div className="bg-[#888] w-3 h-1 mx-auto mt-0.5 rounded-sm" />
            </div>
            <div className="bg-blue-800 w-5 h-5 rounded-sm border border-blue-600">
              <div className="bg-[#888] w-3 h-1 mx-auto mt-0.5 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Desk surface bottom */}
      <div className="bg-[#8b6914] w-full h-3 rounded-b-lg mt-1 shadow-lg" />
    </div>
  )
}
