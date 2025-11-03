'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function EthereumStage3() {
  const [gasPrice, setGasPrice] = useState(50)
  const [transactionType, setTransactionType] = useState('transfer')

  const txTypes = {
    transfer: { gasLimit: 21000, name: 'ETH Transfer', icon: '💸' },
    erc20: { gasLimit: 65000, name: 'Token Transfer', icon: '🪙' },
    swap: { gasLimit: 150000, name: 'Uniswap Swap', icon: '🔄' },
    nft: { gasLimit: 100000, name: 'NFT Mint', icon: '🎨' },
  }

  const calculateCost = () => {
    const gasLimit = txTypes[transactionType].gasLimit
    const costInGwei = gasPrice * gasLimit
    const costInEth = costInGwei / 1000000000
    const costInUsd = costInEth * 2000
    return { costInGwei, costInEth, costInUsd }
  }

  const cost = calculateCost()

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={3}
      stageTitle="Gas & Transactions"
      stageDescription="Master Ethereum gas mechanics and transaction fees"
      nextStageHref="/ethereum/stage-4"
      estimatedTime="15 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">⛽ What is Gas?</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            <strong>Gas</strong> is the fuel for Ethereum. Every operation costs gas to prevent spam and pay validators.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
            <div className="text-sm space-y-2">
              <p><strong>Gas Price:</strong> How much you pay per unit (in Gwei)</p>
              <p><strong>Gas Limit:</strong> Maximum gas for your transaction</p>
              <p><strong>Total Fee:</strong> Gas Price × Gas Used</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">🧮 Gas Calculator</h3>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Transaction Type</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(txTypes).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setTransactionType(key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  transactionType === key
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{val.icon}</div>
                <div className="text-sm font-bold text-white">{val.name}</div>
                <div className="text-xs text-gray-500">{val.gasLimit.toLocaleString()} gas</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-400">Gas Price (Gwei)</label>
            <span className="text-lg font-bold text-blue-400">{gasPrice} Gwei</span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            value={gasPrice}
            onChange={(e) => setGasPrice(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Slow (cheap)</span>
            <span>Fast (expensive)</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h4 className="font-bold text-white mb-4">Transaction Cost</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Gas Limit:</span>
              <span className="text-white font-mono">{txTypes[transactionType].gasLimit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Gas Price:</span>
              <span className="text-white font-mono">{gasPrice} Gwei</span>
            </div>
            <div className="border-t border-gray-700 pt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total (Gwei):</span>
                <span className="text-white font-bold">{cost.costInGwei.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total (ETH):</span>
                <span className="text-blue-400 font-bold">{cost.costInEth.toFixed(6)} ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total (USD):</span>
                <span className="text-green-400 font-bold text-xl">${cost.costInUsd.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Gas-Saving Tips</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <span>⏰</span>
            <p>Transact during off-peak hours (weekends, late nights) for lower fees</p>
          </div>
          <div className="flex items-start gap-3">
            <span>📊</span>
            <p>Check gas trackers before important transactions</p>
          </div>
          <div className="flex items-start gap-3">
            <span>🔄</span>
            <p>Batch multiple operations into one transaction when possible</p>
          </div>
          <div className="flex items-start gap-3">
            <span>⚡</span>
            <p>Consider Layer 2 solutions (Arbitrum, Optimism) for cheaper fees</p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Gas prevents spam and compensates validators</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>More complex operations cost more gas</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Gas prices fluctuate based on network demand</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always check gas prices before transactions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Layer 2 solutions offer much cheaper alternatives</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
