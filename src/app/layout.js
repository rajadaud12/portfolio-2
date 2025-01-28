import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Daud bin Nasar', 
  description: 'Personal Portfolio', 
  icons: {
    icon: '/images/portfolio.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
            }
            
            body {
            background: linear-gradient(135deg, #18233c 0%, #1e293b 100%);
            }
          `
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}