import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Full Stack Developer & Designer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}