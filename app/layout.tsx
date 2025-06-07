import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutClient from './layout-client'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Christina Cephus | theCephus - AI Engineer & Software Developer',
  description: 'Portfolio of Christina Cephus (theCephus), showcasing AI engineering, software development, and prompt design expertise.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col text-sepia-100`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}