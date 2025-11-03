'use client'

import { useState } from 'react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { getBitcoinAddress, getBitcoinTransaction } from '@/lib/api/bitcoin-api'

export default function BitcoinExplorer() {
  const [searchType, setSearchType] = useState('address')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const exampleAddresses = [
    { label: 'Satoshi Genesis', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { label: 'Large Wallet', address: '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo' },
  ]

  const handleSearch = async () => {
    if (!searchInput.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      if (searchType === 'address') {
        const data = await getBitcoinAddress(searchInput)
        setResult({ type: 'address', data })
      } else {
        const data = await getBitcoinTransaction(searchInput)
        setResult({ type: 'transaction', data })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadExample = (address) => {
    setSearchInput(address)
    setSearchType('address')
  }

  return (
    <div className="space-y-6">
      <Card className="bg-blue-500/10 border-blue-500/50">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🔍</span>
          <div>
            <h3 className="text-xl font-bold text-white">Real Bitcoin Blockchain Explorer</h3>
            <p className="text-sm text-gray-400">
              Analyze real Bitcoin addresses and transactions on the live blockchain
            </p>
          </div>
        </div>
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
                    ? 'border-orange-500 bg-orange-500/20 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400'
                }`}
              >
                Address
              </button>
              <button
                onClick={() => setSearchType('transaction')}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                  searchType === 'transaction'
                    ? 'border-orange-500 bg-orange-500/20 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400'
                }`}
              >
                Transaction
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              {searchType === 'address' ? 'Bitcoin Address' : 'Transaction Hash'}
            </label>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={
                searchType === 'address'
                  ? '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
                  : 'Enter transaction hash...'
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          {searchType === 'address' && (
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
          )}

          <Button onClick={handleSearch} variant="bitcoin" disabled={loading || !searchInput} className="w-full">
            {loading ? 'Searching...' : '🔍 Search Blockchain'}
          </Button>
        </div>
      </Card>

      {loading && (
        <Card className="text-center py-12">
          <LoadingSpinner size="lg" text="Fetching data from Bitcoin blockchain..." />
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

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Balance</div>
                <div className="text-2xl font-bold text-white">
                  {result.data.balance.toFixed(8)} BTC
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ≈ ${(result.data.balance * 45000).toLocaleString()}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Total Received</div>
                <div className="text-xl font-bold text-green-400">
                  {result.data.totalReceived.toFixed(8)} BTC
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Transactions</div>
                <div className="text-xl font-bold text-blue-400">{result.data.txCount}</div>
              </div>
            </div>

            {result.data.transactions.length > 0 && (
              <div>
                <h5 className="font-bold text-white mb-3">Recent Transactions (Last 10)</h5>
                <div className="space-y-2">
                  {result.data.transactions.map((tx, idx) => (
                    <div key={idx} className="bg-gray-900 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-mono text-xs text-blue-400 break-all flex-1">
                          {tx.hash}
                        </div>
                        <span
                          className={`ml-2 text-xs px-2 py-1 rounded ${
                            tx.confirmations === 'Confirmed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {tx.confirmations}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{new Date(tx.time * 1000).toLocaleString()}</span>
                        <span className="text-white font-bold">{tx.value.toFixed(8)} BTC</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {result && result.type === 'transaction' && (
        <Card className="bg-green-500/10 border-green-500/50">
          <h4 className="text-xl font-bold text-white mb-4">Transaction Details</h4>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Transaction Hash</div>
              <div className="font-mono text-sm text-green-400 break-all">
                {result.data.hash}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <div className="text-lg font-bold text-white">{result.data.confirmations}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Fee</div>
                <div className="text-lg font-bold text-orange-400">
                  {result.data.fee.toFixed(8)} BTC
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white mb-2">Inputs</h5>
              <div className="space-y-2">
                {result.data.inputs.map((input, idx) => (
                  <div key={idx} className="bg-gray-900 rounded-lg p-3">
                    <div className="font-mono text-xs text-gray-400 break-all mb-1">
                      {input.address}
                    </div>
                    <div className="text-sm text-red-400">{input.value.toFixed(8)} BTC</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white mb-2">Outputs</h5>
              <div className="space-y-2">
                {result.data.outputs.map((output, idx) => (
                  <div key={idx} className="bg-gray-900 rounded-lg p-3">
                    <div className="font-mono text-xs text-gray-400 break-all mb-1">
                      {output.address}
                    </div>
                    <div className="text-sm text-green-400">{output.value.toFixed(8)} BTC</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
