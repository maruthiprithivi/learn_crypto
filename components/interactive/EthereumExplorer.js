'use client'

import { useState } from 'react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { getEthereumAddress, getERC20TokenInfo, getGasPrice } from '@/lib/api/ethereum-api'

export default function EthereumExplorer() {
  const [searchType, setSearchType] = useState('address')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [gasData, setGasData] = useState(null)

  const exampleAddresses = [
    { label: 'Vitalik.eth', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
    { label: 'USDC Contract', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
  ]

  const handleSearch = async () => {
    if (!searchInput.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      if (searchType === 'address') {
        const data = await getEthereumAddress(searchInput)
        setResult({ type: 'address', data })
      } else {
        const data = await getERC20TokenInfo(searchInput)
        setResult({ type: 'token', data })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchGasPrice = async () => {
    try {
      const data = await getGasPrice()
      setGasData(data)
    } catch (err) {
      console.error('Failed to fetch gas price')
    }
  }

  const loadExample = (address) => {
    setSearchInput(address)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-blue-500/10 border-blue-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">Ξ</span>
            <div>
              <h3 className="text-xl font-bold text-white">Real Ethereum Blockchain Explorer</h3>
              <p className="text-sm text-gray-400">
                Analyze Ethereum addresses and ERC-20 tokens
              </p>
            </div>
          </div>
          <Button onClick={fetchGasPrice} variant="secondary" size="sm">
            Check Gas Price
          </Button>
        </div>

        {gasData && (
          <div className="mt-4 pt-4 border-t border-blue-500/30">
            <p className="text-xs text-gray-400 mb-2">Current Gas Prices (Gwei):</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-900 rounded px-3 py-2 text-center">
                <div className="text-xs text-gray-500">Low</div>
                <div className="text-lg font-bold text-green-400">{gasData.low}</div>
              </div>
              <div className="bg-gray-900 rounded px-3 py-2 text-center">
                <div className="text-xs text-gray-500">Average</div>
                <div className="text-lg font-bold text-yellow-400">{gasData.average}</div>
              </div>
              <div className="bg-gray-900 rounded px-3 py-2 text-center">
                <div className="text-xs text-gray-500">High</div>
                <div className="text-lg font-bold text-red-400">{gasData.high}</div>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Search Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => setSearchType('address')}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                  searchType === 'address'
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400'
                }`}
              >
                Address
              </button>
              <button
                onClick={() => setSearchType('token')}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                  searchType === 'token'
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400'
                }`}
              >
                ERC-20 Token
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              {searchType === 'address' ? 'Ethereum Address' : 'Token Contract Address'}
            </label>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="0x..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleAddresses.map((ex) => (
                <button
                  key={ex.address}
                  onClick={() => loadExample(ex.address)}
                  className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-gray-300"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSearch} variant="ethereum" disabled={loading || !searchInput} className="w-full">
            {loading ? 'Searching...' : '🔍 Search Blockchain'}
          </Button>
        </div>
      </Card>

      {loading && (
        <Card className="text-center py-12">
          <LoadingSpinner size="lg" text="Fetching data from Ethereum blockchain..." />
        </Card>
      )}

      {error && (
        <Card className="bg-red-500/10 border-red-500/50">
          <div className="flex items-center gap-3">
            <span className="text-3xl">❌</span>
            <div>
              <h4 className="font-bold text-white mb-1">Error</h4>
              <p className="text-sm text-gray-400">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {result && result.type === 'address' && (
        <Card className="bg-green-500/10 border-green-500/50">
          <h4 className="text-xl font-bold text-white mb-4">Address Information</h4>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Address</div>
              <div className="font-mono text-sm text-green-400 break-all">
                {result.data.address}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">ETH Balance</div>
              <div className="text-3xl font-bold text-white">
                {result.data.balance} ETH
              </div>
              <div className="text-xs text-gray-500 mt-1">
                ≈ ${(parseFloat(result.data.balance) * 2500).toLocaleString()}
              </div>
            </div>

            {result.data.transactions.length > 0 && (
              <div>
                <h5 className="font-bold text-white mb-3">Recent Transactions</h5>
                <div className="space-y-2">
                  {result.data.transactions.map((tx, idx) => (
                    <div key={idx} className="bg-gray-900 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-mono text-xs text-blue-400 break-all flex-1">
                          {tx.hash}
                        </div>
                        <span
                          className={`ml-2 text-xs px-2 py-1 rounded ${
                            tx.status === 'Success'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">{tx.timestamp}</span>
                        <span className="text-white font-bold">{tx.value} ETH</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {result && result.type === 'token' && (
        <Card className="bg-green-500/10 border-green-500/50">
          <h4 className="text-xl font-bold text-white mb-4">ERC-20 Token Information</h4>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Token Name</div>
                <div className="text-2xl font-bold text-white">{result.data.name}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Symbol</div>
                <div className="text-2xl font-bold text-blue-400">{result.data.symbol}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Decimals</div>
                <div className="text-xl font-bold text-white">{result.data.decimals}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Total Supply</div>
                <div className="text-xl font-bold text-white">
                  {parseInt(result.data.totalSupply).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
