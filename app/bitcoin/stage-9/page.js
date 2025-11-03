'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function BitcoinStage9() {
  const [channelOpen, setChannelOpen] = useState(false)
  const [channelBalance, setChannelBalance] = useState({ you: 0.5, bob: 0.5 })
  const [transactions, setTransactions] = useState([])
  const [sendAmount, setSendAmount] = useState('')

  const openChannel = () => {
    setChannelOpen(true)
    setChannelBalance({ you: 0.5, bob: 0.5 })
    setTransactions([])
  }

  const sendPayment = () => {
    const amount = parseFloat(sendAmount)
    if (!amount || amount > channelBalance.you) {
      alert('Invalid amount or insufficient balance')
      return
    }

    setChannelBalance({
      you: channelBalance.you - amount,
      bob: channelBalance.bob + amount,
    })
    setTransactions([
      {
        id: Date.now(),
        from: 'You',
        to: 'Bob',
        amount,
        timestamp: Date.now(),
      },
      ...transactions,
    ])
    setSendAmount('')
  }

  const receivePayment = () => {
    const amount = 0.1
    if (amount > channelBalance.bob) return

    setChannelBalance({
      you: channelBalance.you + amount,
      bob: channelBalance.bob - amount,
    })
    setTransactions([
      {
        id: Date.now(),
        from: 'Bob',
        to: 'You',
        amount,
        timestamp: Date.now(),
      },
      ...transactions,
    ])
  }

  const closeChannel = () => {
    setChannelOpen(false)
    setTransactions([])
  }

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={9}
      stageTitle="Lightning Network"
      stageDescription="Experience instant Bitcoin payments"
      nextStageHref="/bitcoin/stage-10"
      estimatedTime="15 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">⚡ What is the Lightning Network?</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            Bitcoin transactions can be slow and expensive. The <strong>Lightning Network</strong>{' '}
            solves this by enabling instant, cheap payments!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <div className="text-3xl mb-2">🐢</div>
              <h3 className="text-lg font-bold text-white mb-2">Regular Bitcoin</h3>
              <ul className="text-sm space-y-2">
                <li>⏱️ 10 min - 1 hour confirmation</li>
                <li>💸 $1-$50 fees (depends on congestion)</li>
                <li>🔗 Every tx on blockchain</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">Lightning Network</h3>
              <ul className="text-sm space-y-2">
                <li>⚡ Instant (< 1 second)</li>
                <li>💰 Fractions of a cent</li>
                <li>🔓 Off-chain transactions</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
        <div className="space-y-4 text-gray-300 text-sm">
          <div className="flex items-start gap-3">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <p className="font-bold text-white mb-1">Open Channel (On-chain)</p>
              <p>
                You and Bob each deposit Bitcoin into a 2-of-2 multisig wallet. This creates a
                "payment channel".
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <p className="font-bold text-white mb-1">Make Instant Payments (Off-chain)</p>
              <p>
                You and Bob can send Bitcoin back and forth instantly, updating the balance between
                you. These transactions are NOT on the blockchain!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <p className="font-bold text-white mb-1">Close Channel (On-chain)</p>
              <p>
                When done, close the channel. The final balance is recorded on the blockchain. Only
                2 on-chain transactions total!
              </p>
            </div>
          </div>
        </div>
      </Card>

      {!channelOpen ? (
        <Card className="mb-8 text-center py-12">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-2xl font-bold text-white mb-4">Try Lightning Network</h3>
          <p className="text-gray-400 mb-6">
            Open a payment channel with Bob to start making instant transactions
          </p>
          <Button onClick={openChannel} variant="bitcoin" size="lg">
            Open Lightning Channel
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            This will create a 2-of-2 multisig with 1 BTC total (0.5 BTC each)
          </p>
        </Card>
      ) : (
        <>
          <Card className="mb-8 bg-yellow-500/10 border-yellow-500/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚡</span>
              <div>
                <h3 className="text-xl font-bold text-white">Channel Active</h3>
                <p className="text-sm text-gray-400">
                  {transactions.length} off-chain transactions made
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Your Balance</div>
                <div className="text-3xl font-bold text-white">
                  {channelBalance.you.toFixed(3)} BTC
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {((channelBalance.you / 1) * 100).toFixed(0)}% of channel
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Bob's Balance</div>
                <div className="text-3xl font-bold text-white">
                  {channelBalance.bob.toFixed(3)} BTC
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {((channelBalance.bob / 1) * 100).toFixed(0)}% of channel
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-400">Channel Capacity:</span>
                <span className="text-white font-bold">1.0 BTC</span>
              </div>
              <div className="bg-gray-700 rounded-full h-6 overflow-hidden flex">
                <div
                  className="bg-green-500 flex items-center justify-center text-xs text-white font-bold"
                  style={{ width: `${(channelBalance.you / 1) * 100}%` }}
                >
                  {channelBalance.you > 0.15 && 'You'}
                </div>
                <div
                  className="bg-blue-500 flex items-center justify-center text-xs text-white font-bold"
                  style={{ width: `${(channelBalance.bob / 1) * 100}%` }}
                >
                  {channelBalance.bob > 0.15 && 'Bob'}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Send to Bob</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="Amount"
                    step="0.001"
                    max={channelBalance.you}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                  <Button onClick={sendPayment} variant="bitcoin" disabled={!sendAmount}>
                    ⚡ Send Instantly
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={receivePayment} variant="success" size="sm" className="flex-1">
                  ← Receive 0.1 BTC from Bob
                </Button>
                <Button onClick={closeChannel} variant="danger" size="sm">
                  Close Channel
                </Button>
              </div>
            </div>
          </Card>

          {transactions.length > 0 && (
            <Card className="mb-8">
              <h4 className="text-lg font-bold text-white mb-4">
                ⚡ Off-Chain Transactions ({transactions.length})
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {transactions.map((tx) => (
                  <div key={tx.id} className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {tx.from === 'You' ? '➡️' : '⬅️'}
                      </span>
                      <div>
                        <div className="text-sm text-white">
                          {tx.from} → {tx.to}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{tx.amount.toFixed(3)} BTC</div>
                      <div className="text-xs text-green-400">⚡ Instant</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-500/10 border border-blue-500/50 rounded-lg p-3">
                <p className="text-sm text-blue-300">
                  💡 All these transactions are off-chain! Only opening and closing the channel
                  touch the blockchain.
                </p>
              </div>
            </Card>
          )}
        </>
      )}

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🌐 Real-World Lightning</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <h4 className="font-bold text-white mb-1">Micropayments</h4>
                <p>Buy coffee, pay for articles, tip content creators - all instantly and cheaply</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌍</span>
              <div>
                <h4 className="font-bold text-white mb-1">Global Routing</h4>
                <p>
                  Don't have a direct channel? Lightning routes through other channels
                  automatically
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="font-bold text-white mb-1">Popular Wallets</h4>
                <p>Phoenix, Breez, Wallet of Satoshi, Strike - all support Lightning</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Lightning Network enables instant, low-cost Bitcoin payments</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Payment channels keep most transactions off the main blockchain</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Perfect for small payments like coffee, tips, and micropayments</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Transactions are instant (less than 1 second) with near-zero fees</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Growing adoption makes Bitcoin practical for everyday purchases</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
