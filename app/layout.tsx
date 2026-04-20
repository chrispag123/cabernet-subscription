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
      <head>
        <script>
          {`jdgm = window.jdgm || {};jdgm.SHOP_DOMAIN = 'ones-876a.myshopify.com';jdgm.PLATFORM = 'shopify';jdgm.PUBLIC_TOKEN = 'qxD2N1IV9Zchm-g1xa5qcP20Lxc';`}
        </script>
        <script data-cfasync='false' type='text/javascript' async src='https://cdnwidget.judge.me/widget_preloader.js'></script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
