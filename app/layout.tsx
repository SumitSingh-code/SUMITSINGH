import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sumit Singh — Portfolio',
  description: 'Retro Desktop Portfolio — Solo developer, founder of Vetanx, CRSU Jind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
