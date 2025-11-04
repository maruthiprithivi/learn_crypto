'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import BitcoinExplorer from '@/components/interactive/BitcoinExplorer'

export default function BitcoinStage4() {
  const [walletBalance] = useState(1.5) // BTC
  const [recipientAddress, setRecipientAddress] = useState('')
  const [sendAmount, setSendAmount] = useState('')
  const [feeRate, setFeeRate] = useState('medium')
  const [transaction, setTransaction] = useState(null)
  const [isSending, setIsSending] = useState(false)

  const feeRates = {
    slow: { sat: 1, time: '~60 min', cost: 0.00001 },
    medium: { sat: 5, time: '~10 min', cost: 0.00005 },
    fast: { sat: 20, time: '~10 sec', cost: 0.0002 },
  }

  const createTransaction = async () => {
    if (!recipientAddress || !sendAmount || parseFloat(sendAmount) <= 0) {
      alert('Please enter valid recipient address and amount')
      return
    }

    const amount = parseFloat(sendAmount)
    const fee = feeRates[feeRate].cost

    if (amount + fee > walletBalance) {
      alert('Insufficient balance (including fee)')
      return
    }

    setIsSending(true)

    // Simulate transaction creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const tx = {
      id: 'tx_' + Math.random().toString(36).substring(7),
      from: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      to: recipientAddress,
      amount: amount,
      fee: fee,
      total: amount + fee,
      feeRate: feeRate,
      timestamp: new Date().toISOString(),
      status: 'pending',
      confirmations: 0,
    }

    setTransaction(tx)
    setIsSending(false)
  }

  const broadcastTransaction = async () => {
    setTransaction({ ...transaction, status: 'broadcasting' })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setTransaction({ ...transaction, status: 'confirmed', confirmations: 1 })
  }

  const resetForm = () => {
    setRecipientAddress('')
    setSendAmount('')
    setTransaction(null)
  }

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={4}
      stageTitle="Sending Bitcoin"
      stageDescription="Build and broadcast transactions with an interactive interface"
      nextStageHref="/bitcoin/stage-5"
      estimatedTime="20 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">How Bitcoin Transactions Work</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            A Bitcoin transaction is like sending a package with multiple steps:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-bold text-white mb-2">1. Create</h3>
              <p className="text-sm">Specify recipient and amount</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">✍️</div>
              <h3 className="font-bold text-white mb-2">2. Sign</h3>
              <p className="text-sm">Sign with your private key</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📡</div>
              <h3 className="font-bold text-white mb-2">3. Broadcast</h3>
              <p className="text-sm">Send to the network</p>
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
            <p className="text-sm">
              <strong>Important:</strong> Every transaction requires a fee to incentivize miners
              to include it in a block. Higher fees = faster confirmation!
            </p>
          </div>
        </div>
      </Card>

      {/* Wallet Balance */}
      <Card className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">Your Wallet Balance</div>
            <div className="text-4xl font-bold text-white">
              {walletBalance.toFixed(8)} <span className="text-orange-400">BTC</span>
            </div>
            <div className="text-sm text-gray-400 mt-1">
              ≈ ${(walletBalance * 45000).toLocaleString()} USD
            </div>
          </div>
          <div className="text-6xl">💰</div>
        </div>
      </Card>

      {/* Transaction Builder */}
      {!transaction ? (
        <Card className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">💸 Send Bitcoin</h3>
          <div className="space-y-6">
            {/* Recipient Address */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Recipient Bitcoin Address
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="bc1q... or 1... or 3..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 This is a testnet simulation - any address format will work for demo
              </p>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount to Send (BTC)</label>
              <div className="relative">
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00000000"
                  step="0.00000001"
                  min="0"
                  max={walletBalance}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={() => setSendAmount((walletBalance - feeRates[feeRate].cost).toFixed(8))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-white"
                >
                  Send Max
                </button>
              </div>
              {sendAmount && (
                <p className="text-xs text-gray-400 mt-1">
                  ≈ ${(parseFloat(sendAmount || 0) * 45000).toLocaleString()} USD
                </p>
              )}
            </div>

            {/* Fee Selection */}
            <div>
              <label className="block text-sm text-gray-400 mb-3">Transaction Fee</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(feeRates).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setFeeRate(key)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      feeRate === key
                        ? 'border-orange-500 bg-orange-500/20'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-sm font-bold text-white capitalize mb-1">{key}</div>
                    <div className="text-xs text-gray-400 mb-2">{value.time}</div>
                    <div className="text-xs text-orange-400">{value.cost} BTC</div>
                    <div className="text-xs text-gray-500">{value.sat} sat/vB</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            {sendAmount && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-bold text-white mb-3">Transaction Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white">{parseFloat(sendAmount).toFixed(8)} BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network Fee:</span>
                    <span className="text-orange-400">+{feeRates[feeRate].cost} BTC</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-white">
                      {(parseFloat(sendAmount) + feeRates[feeRate].cost).toFixed(8)} BTC
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Remaining Balance:</span>
                    <span className="text-gray-400">
                      {(walletBalance - parseFloat(sendAmount || 0) - feeRates[feeRate].cost).toFixed(8)} BTC
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Send Button */}
            <Button
              onClick={createTransaction}
              variant="bitcoin"
              size="lg"
              disabled={isSending || !recipientAddress || !sendAmount}
              className="w-full"
            >
              {isSending ? '🔄 Creating Transaction...' : '📤 Create Transaction'}
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Transaction Details */}
          <Card className="mb-8 bg-green-500/10 border-green-500/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">✅</span>
              <h3 className="text-2xl font-bold text-white">Transaction Created!</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Transaction ID</div>
                <div className="font-mono text-sm text-green-400 break-all">{transaction.id}</div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">From (Your Address)</div>
                  <div className="font-mono text-xs text-blue-400 break-all">
                    {transaction.from}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">To (Recipient)</div>
                  <div className="font-mono text-xs text-purple-400 break-all">
                    {transaction.to}
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Amount</div>
                    <div className="text-lg font-bold text-white">
                      {transaction.amount.toFixed(8)}
                    </div>
                    <div className="text-xs text-gray-400">BTC</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Fee</div>
                    <div className="text-lg font-bold text-orange-400">
                      {transaction.fee.toFixed(8)}
                    </div>
                    <div className="text-xs text-gray-400">BTC</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Total</div>
                    <div className="text-lg font-bold text-white">
                      {transaction.total.toFixed(8)}
                    </div>
                    <div className="text-xs text-gray-400">BTC</div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Status</div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          transaction.status === 'confirmed'
                            ? 'bg-green-500'
                            : transaction.status === 'broadcasting'
                            ? 'bg-yellow-500 animate-pulse'
                            : 'bg-orange-500 animate-pulse'
                        }`}
                      />
                      <span className="text-white font-bold capitalize">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Confirmations</div>
                    <div className="text-2xl font-bold text-white text-center">
                      {transaction.confirmations}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {transaction.status === 'pending' && (
                <Button onClick={broadcastTransaction} variant="bitcoin" size="lg" className="w-full">
                  📡 Broadcast to Network
                </Button>
              )}

              {transaction.status === 'confirmed' && (
                <div className="text-center">
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
                    <div className="text-4xl mb-2">🎉</div>
                    <p className="text-green-400 font-bold">Transaction Confirmed!</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Your Bitcoin has been sent successfully
                    </p>
                  </div>
                  <Button onClick={resetForm} variant="secondary">
                    Send Another Transaction
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      {/* How It Works */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚙️ Behind the Scenes</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <span className="text-lg">1️⃣</span>
            <p>
              <strong>Input Selection:</strong> Your wallet selects unspent outputs (UTXOs) to
              fund the transaction
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">2️⃣</span>
            <p>
              <strong>Output Creation:</strong> Creates outputs for recipient and change back
              to you
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">3️⃣</span>
            <p>
              <strong>Signing:</strong> Transaction is signed with your private key to prove
              ownership
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">4️⃣</span>
            <p>
              <strong>Broadcasting:</strong> Signed transaction is sent to Bitcoin nodes
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">5️⃣</span>
            <p>
              <strong>Mining:</strong> Miners include your transaction in the next block
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">6️⃣</span>
            <p>
              <strong>Confirmation:</strong> Each new block adds one confirmation (6+ is
              considered final)
            </p>
          </div>
        </div>
      </Card>

      {/* Real Blockchain Explorer */}
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🔍</span>
          <div>
            <h3 className="text-xl font-bold text-white">Explore Real Bitcoin Transactions</h3>
            <p className="text-sm text-gray-400">Look up real addresses and transactions on the Bitcoin blockchain</p>
          </div>
        </div>
        <BitcoinExplorer />
      </Card>

      {/* Key Learnings */}
      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Bitcoin transactions require a fee to incentivize miners</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Higher fees result in faster confirmation times</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Transactions must be signed with your private key</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Once broadcast, transactions cannot be reversed (irreversible!)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always double-check the recipient address before sending</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>You can explore real transactions on the Bitcoin blockchain using the explorer above</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
