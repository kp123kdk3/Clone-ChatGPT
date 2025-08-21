'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './ThemeProvider'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="chatgpt-clone-theme"
    >
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}
