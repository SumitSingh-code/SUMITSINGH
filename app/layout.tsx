import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sumit Singh — Portfolio",
  description: "Retro Desktop Portfolio of Sumit Singh",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden">
        {children}
      </body>
    </html>
  )
}
