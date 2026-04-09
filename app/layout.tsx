import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ONES Cabernet Subscription',
  description: 'Premium non-alcoholic wine subscription from Canada\'s first non-alcoholic winery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
