'use client'

import { useState, useEffect } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function BitcoinStage6() {
  const [mempoolTxs, setMempoolTxs] = useState([])
  const [feeRate, setFeeRate] = useState(10)
  const [blockTime, setBlockTime] = useState(0)
  const [minedBlocks, setMinedBlocks] = useState([])
  const [isPaused, setIsPaused] = useState(false)

  const feeCategories = [
    { min: 0, max: 5, label: 'Low Fee', color: 'bg-red-500' },
    { min: 5, max: 15, label: 'Medium Fee', color: 'bg-yellow-500' },
    { min: 15, max: Infinity, label: 'High Fee', color: 'bg-green-500' },
  ]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      // Add new transactions randomly
      if (Math.random() > 0.3 && mempoolTxs.length < 30) {
        const newTx = {
          id: Date.now() + Math.random(),
          fee: Math.floor(Math.random() * 30) + 1,
          size: Math.floor(Math.random() * 500) + 200,
          time: Date.now(),
        }
        setMempoolTxs((prev) => [...prev, newTx])
      }

      // Mine block every 10 seconds
      setBlockTime((prev) => {
        if (prev >= 10) {
          mineBlock()
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [mempoolTxs, isPaused])

  const mineBlock = () => {
    // Sort by fee rate (fee per byte)
    const sorted = [...mempoolTxs].sort((a, b) => b.fee / b.size - a.fee / a.size)

    // Take top transactions that fit in a block (max 10 for demo)
    const included = sorted.slice(0, Math.min(10, sorted.length))
    const remaining = sorted.slice(Math.min(10, sorted.length))

    if (included.length > 0) {
      setMinedBlocks((prev) => [
        {
          number: prev.length + 1,
          txCount: included.length,
          totalFees: included.reduce((sum, tx) => sum + tx.fee, 0),
          timestamp: Date.now(),
        },
        ...prev.slice(0, 4),
      ])
      setMempoolTxs(remaining)
    }
  }

  const addCustomTx = () => {
    const newTx = {
      id: Date.now() + Math.random(),
      fee: feeRate,
      size: 250,
      time: Date.now(),
      custom: true,
    }
    setMempoolTxs((prev) => [...prev, newTx])
  }

  const getTxCategory = (fee) => {
    return feeCategories.find((cat) => fee >= cat.min && fee < cat.max)
  }

  const getEstimatedTime = (fee) => {
    const position = mempoolTxs.filter((tx) => tx.fee / tx.size > fee / 250).length
    const blocksAhead = Math.ceil(position / 10)
    return blocksAhead * 10
  }

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={6}
      stageTitle="Transaction Fees"
      stageDescription="Master fee calculation and mempool dynamics"
      nextStageHref="/bitcoin/stage-7"
      estimatedTime="15 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">How Bitcoin Fees Work</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            Bitcoin miners prioritize transactions by <strong>fee rate</strong> (satoshis per
            byte). Higher fees = faster confirmation!
          </p>
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
            <div className="text-sm space-y-2">
              <p>
                <strong>The Mempool:</strong> A waiting area for unconfirmed transactions
              </p>
              <p>
                <strong>Mining:</strong> Every ~10 minutes, miners select highest-fee
                transactions
              </p>
              <p>
                <strong>Confirmation:</strong> Once in a block, your transaction is confirmed
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Block Mining Status */}
      <Card className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">Next Block Mining In</div>
            <div className="text-4xl font-bold text-white">
              {10 - blockTime}s
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {mempoolTxs.length} transactions waiting
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Mining Progress</div>
            <div className="w-32 h-32 relative">
              <svg className="transform -rotate-90" width="128" height="128">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#374151"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#F7931A"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(blockTime / 10) * 352} 352`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{blockTime * 10}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={() => setIsPaused(!isPaused)}
            variant={isPaused ? 'success' : 'secondary'}
            size="sm"
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'} Simulation
          </Button>
        </div>
      </Card>

      {/* Fee Rate Selector */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💸 Send Your Transaction</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-400">Fee Rate (sat/byte)</label>
              <span className="text-lg font-bold text-orange-400">{feeRate} sat/byte</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={feeRate}
              onChange={(e) => setFeeRate(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Category</div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-white ${
                    getTxCategory(feeRate).color
                  }`}
                >
                  {getTxCategory(feeRate).label}
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Estimated Wait</div>
                <div className="text-white font-bold">~{getEstimatedTime(feeRate)}s</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Total Fee</div>
                <div className="text-white">{feeRate * 250} satoshis</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">In USD</div>
                <div className="text-white">${((feeRate * 250 * 0.0001) / 100).toFixed(2)}</div>
              </div>
            </div>
          </div>

          <Button onClick={addCustomTx} variant="bitcoin" className="w-full">
            Add Transaction to Mempool
          </Button>
        </div>
      </Card>

      {/* Mempool Visualization */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">
          📊 Mempool ({mempoolTxs.length} pending)
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {mempoolTxs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Mempool is empty. Add a transaction above!
            </div>
          ) : (
            mempoolTxs
              .sort((a, b) => b.fee / b.size - a.fee / a.size)
              .map((tx, index) => {
                const category = getTxCategory(tx.fee)
                return (
                  <div
                    key={tx.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      tx.custom
                        ? 'border-orange-500 bg-orange-500/20'
                        : 'border-gray-700 bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                      <div>
                        <div className="text-sm text-white font-mono">
                          TX-{tx.id.toString().slice(-6)}
                        </div>
                        <div className="text-xs text-gray-400">{tx.size} bytes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${category.color.replace('bg-', 'text-')}`}>
                        {tx.fee} sat/byte
                      </div>
                      <div className="text-xs text-gray-500">
                        {index < 10 ? 'Next block' : `~${Math.ceil((index + 1) / 10)} blocks`}
                      </div>
                    </div>
                  </div>
                )
              })
          )}
        </div>
      </Card>

      {/* Mined Blocks */}
      {minedBlocks.length > 0 && (
        <Card className="mb-8 bg-green-500/10 border-green-500/50">
          <h3 className="text-xl font-bold text-white mb-4">⛏️ Recently Mined Blocks</h3>
          <div className="space-y-3">
            {minedBlocks.map((block) => (
              <div key={block.number} className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Block #{block.number}</div>
                    <div className="text-white">{block.txCount} transactions</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Total Fees</div>
                    <div className="text-lg font-bold text-green-400">
                      {block.totalFees.toFixed(0)} sat
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Fee Tips */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <span>🕐</span>
            <p>
              <strong>Not urgent?</strong> Use low fees during quiet times (weekends, late
              nights)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span>⚡</span>
            <p>
              <strong>Need speed?</strong> Check current mempool and pay above average fee rate
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span>📊</span>
            <p>
              <strong>Use fee estimators:</strong> Wallets often suggest optimal fees
              automatically
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span>🔄</span>
            <p>
              <strong>RBF (Replace-by-Fee):</strong> Some wallets let you increase fees if stuck
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span>💰</span>
            <p>
              <strong>Batch transactions:</strong> Sending to multiple addresses at once saves
              fees
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Miners prioritize transactions with higher fee rates (sat/byte)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>The mempool is a queue of pending transactions waiting to be mined</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Fee rates fluctuate based on network demand</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Low-priority transactions can wait hours or days during busy times</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always check current fee estimates before sending Bitcoin</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
