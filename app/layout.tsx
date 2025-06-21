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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Prevent browser extension custom element conflicts
            (function() {
              const originalDefine = window.customElements?.define;
              if (originalDefine) {
                window.customElements.define = function(name, constructor, options) {
                  if (this.get(name)) {
                    console.warn('Custom element already defined:', name);
                    return;
                  }
                  return originalDefine.call(this, name, constructor, options);
                };
              }
            })();
          `
        }} />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col text-sepia-100`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}