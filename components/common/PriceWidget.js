'use client'

import { useState, useEffect } from 'react'
import Card from './Card'
import { getCryptoPrices } from '@/lib/api/price-api'

export default function PriceWidget() {
  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const fetchPrices = async () => {
    try {
      const data = await getCryptoPrices()
      setPrices(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch prices')
      setLoading(false)
    }
  }

  if (loading || !prices) {
    return (
      <Card className="shimmer">
        <div className="h-20"></div>
      </Card>
    )
  }

  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', data: prices.bitcoin, color: 'text-orange-400', icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', data: prices.ethereum, color: 'text-blue-400', icon: 'Ξ' },
    { name: 'Solana', symbol: 'SOL', data: prices.solana, color: 'text-green-400', icon: '◎' },
  ]

  return (
    <Card>
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span>💹</span>
        <span>Live Prices</span>
        <span className="text-xs text-gray-500 font-normal">(Updates every minute)</span>
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {cryptos.map((crypto) => (
          <div key={crypto.symbol} className="text-center">
            <div className="text-2xl mb-1">{crypto.icon}</div>
            <div className="text-xs text-gray-500 mb-1">{crypto.symbol}</div>
            <div className={`text-lg font-bold ${crypto.color}`}>
              ${crypto.data.price.toLocaleString()}
            </div>
            <div
              className={`text-xs ${
                crypto.data.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {crypto.data.change24h >= 0 ? '↑' : '↓'} {Math.abs(crypto.data.change24h).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
