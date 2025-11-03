import './globals.css'

export const metadata = {
  title: 'CryptoLearn - Interactive Crypto Education Platform',
  description: 'Learn Bitcoin, Ethereum, Solana, and crypto trading security through hands-on interactive experiences. From wallet creation to advanced trading strategies.',
  keywords: 'crypto, bitcoin, ethereum, solana, blockchain, trading, education, learning platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          {children}
        </div>
      </body>
    </html>
  )
}
