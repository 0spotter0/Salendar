import type { Metadata } from 'next'
import { GeistSans, GeistMono } from 'geist/font'
import './globals.css'
import Navbar from '@/app/ui/Navbar'

export const metadata: Metadata = {
  title: 'Salendar'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} bg-white text-black overflow-y-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
