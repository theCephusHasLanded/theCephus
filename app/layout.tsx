import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import DynamicBackground from '@/components/ui/DynamicBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Christina Cephus | theCephus - AI Engineer & Software Developer',
  description: 'Portfolio of Christina Cephus (theCephus), showcasing AI engineering, software development, and prompt design expertise.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col text-sepia-100`}>
        <DynamicBackground />
        <div className="absolute inset-0 scanlines pointer-events-none z-0"></div>
        <Header />
        <main className="flex-grow relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}