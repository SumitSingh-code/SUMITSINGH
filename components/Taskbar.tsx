'use client'

import { useState } from 'react'
import LiveClock from './LiveClock'

interface Props {
  onContactClick: () => void
  faq: { question: string; answer: string }[]
}

export default function Taskbar({ onContactClick, faq }: Props) {
  const [startOpen, setStartOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatQ, setChatQ] = useState('')
  const [chatA, setChatA] = useState('')

  const handleFaqSearch = () => {
    if (!chatQ.trim()) return
    const q = chatQ.toLowerCase()
    const match = faq.find(f =>
      f.question.toLowerCase().includes(q) || q.includes(f.question.toLowerCase().split(' ').slice(0, 3).join(' '))
    )
    setChatA(match ? match.answer : "I don't have info on that yet. Try asking about my projects, stack, or achievements!")
  }

  return (
    <>
      {/* Taskbar */}
      <div className="taskbar">
        {/* Start Button */}
        <div className="relative">
          <button
            onClick={() => setStartOpen(!startOpen)}
            className="start-btn win-btn flex items-center gap-1 h-7 px-2 font-bold text-xs"
          >
            <span className="text-sm">🪟</span> Start
          </button>

          {/* Start Menu Dropdown */}
          {startOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setStartOpen(false)} />
              <div className="absolute bottom-8 left-0 win-window w-48 z-50">
                {/* Blue sidebar */}
                <div className="flex">
                  <div className="bg-[#000080] w-6 flex flex-col justify-end p-1">
                    <span className="text-white text-[7px] font-bold tracking-widest" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
                      Sumit Singh
                    </span>
                  </div>
                  <div className="flex-1">
                    <button onClick={() => { window.open('https://github.com/SumitSingh-code', '_blank'); setStartOpen(false) }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#000080] hover:text-white flex items-center gap-2">
                      🐙 GitHub
                    </button>
                    <button onClick={() => { window.open('https://linkedin.com/in/sumit-singh', '_blank'); setStartOpen(false) }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#000080] hover:text-white flex items-center gap-2">
                      💼 LinkedIn
                    </button>
                    <button onClick={() => { window.open('mailto:sumirajput870@gmail.com'); setStartOpen(false) }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#000080] hover:text-white flex items-center gap-2">
                      📧 Email
                    </button>
                    <hr className="border-[#808080]" />
                    <button onClick={() => { window.open('/resume.pdf', '_blank'); setStartOpen(false) }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#000080] hover:text-white flex items-center gap-2">
                      📄 Resume
                    </button>
                    <button onClick={() => { onContactClick(); setStartOpen(false) }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#000080] hover:text-white flex items-center gap-2">
                      ✉️ Contact Me
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick launch separator */}
        <div className="w-[1px] h-6 bg-[#808080] mx-2" />
        <div className="w-[1px] h-6 bg-white mx-0" />

        {/* Quick launch icons */}
        <button onClick={() => window.open('https://vetanx.site', '_blank')} className="mx-1 text-sm hover:bg-white/20 p-1 rounded" title="Vetanx">💼</button>
        <button onClick={() => window.open('https://unigramjind.site', '_blank')} className="mx-1 text-sm hover:bg-white/20 p-1 rounded" title="Unigram">💬</button>
        <button onClick={onContactClick} className="mx-1 text-sm hover:bg-white/20 p-1 rounded" title="Contact">✉️</button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* System tray */}
        <div className="flex items-center gap-2 border-l-2 border-[#808080] pl-2 pr-1">
          <span className="text-xs">🔊</span>
          <LiveClock variant="taskbar" />
        </div>
      </div>

      {/* Floating Chat Bubble */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="chat-bubble-float fixed bottom-12 right-4 z-50 w-12 h-12 rounded-full bg-[#000080] text-white flex items-center justify-center text-xl shadow-lg hover:bg-[#0000a0] transition-colors border-2 border-white/30"
        title="Ask about me"
      >
        💬
      </button>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-[100px] right-4 z-50 win-window w-72">
          <div className="win-titlebar">
            <span>💬 Ask About Me</span>
            <button className="win-titlebar-btn" onClick={() => setChatOpen(false)}>✕</button>
          </div>
          <div className="win-body">
            <div className="bg-white border-2 border-inset p-2 h-32 overflow-y-auto text-xs mb-2" style={{ borderColor: '#808080 #fff #fff #808080' }}>
              {chatA ? (
                <div>
                  <div className="text-blue-800 font-bold mb-1">Q: {chatQ}</div>
                  <div className="text-gray-700">A: {chatA}</div>
                </div>
              ) : (
                <div className="text-gray-400 italic">Ask me anything — who I am, my projects, tech stack, achievements...</div>
              )}
            </div>
            <div className="flex gap-1">
              <input
                className="win-input flex-1"
                placeholder="Type a question..."
                value={chatQ}
                onChange={e => setChatQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleFaqSearch()}
              />
              <button className="win-btn text-xs" onClick={handleFaqSearch}>Ask</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
