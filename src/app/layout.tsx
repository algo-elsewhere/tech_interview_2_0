import { ReactNode } from 'react'
import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Tech Interview Consultant',
  description: 'Expert preparation for algorithms, system design, and GenAI interviews',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return children
}