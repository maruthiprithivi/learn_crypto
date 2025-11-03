'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function BitcoinStage1() {
  const [blocks, setBlocks] = useState([
    {
      id: 0,
      hash: '000000',
      data: 'Genesis Block',
      previousHash: '0',
      timestamp: Date.now() - 30000,
      nonce: 0,
    },
  ])
  const [newData, setNewData] = useState('')
  const [isMining, setIsMining] = useState(false)

  const generateHash = (data, previousHash, nonce) => {
    // Simplified hash function for demo
    const input = `${data}${previousHash}${nonce}`
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i)
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(6, '0').substring(0, 6)
  }

  const mineBlock = async () => {
    if (!newData.trim()) {
      alert('Please enter some data for the block!')
      return
    }

    setIsMining(true)

    // Simulate mining delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const previousBlock = blocks[blocks.length - 1]
    const nonce = Math.floor(Math.random() * 10000)
    const hash = generateHash(newData, previousBlock.hash, nonce)

    const newBlock = {
      id: blocks.length,
      hash: hash,
      data: newData,
      previousHash: previousBlock.hash,
      timestamp: Date.now(),
      nonce: nonce,
    }

    setBlocks([...blocks, newBlock])
    setNewData('')
    setIsMining(false)
  }

  const tamperBlock = (blockId) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.id === blockId) {
        return {
          ...block,
          data: block.data + ' [TAMPERED]',
          hash: 'INVALID',
        }
      }
      return block
    })
    setBlocks(updatedBlocks)
  }

  const isChainValid = () => {
    for (let i = 1; i < blocks.length; i++) {
      if (blocks[i].previousHash !== blocks[i - 1].hash) {
        return false
      }
      if (blocks[i].hash === 'INVALID') {
        return false
      }
    }
    return true
  }

  const chainValid = isChainValid()

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={1}
      stageTitle="Blockchain Basics"
      stageDescription="Learn how blockchain works by creating your own chain!"
      nextStageHref="/bitcoin/stage-2"
      estimatedTime="10 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">What is a Blockchain?</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            A blockchain is like a <strong>chain of digital blocks</strong>, where each block
            contains:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Data</strong> - Transactions or information
            </li>
            <li>
              <strong>Hash</strong> - A unique fingerprint of this block
            </li>
            <li>
              <strong>Previous Hash</strong> - Links to the previous block
            </li>
          </ul>
          <p>
            This creates a <strong>chain</strong> that's incredibly hard to tamper with. If
            someone changes one block, all following blocks become invalid!
          </p>
        </div>
      </Card>

      {/* Chain Status */}
      <Card
        className={`mb-8 ${
          chainValid
            ? 'bg-green-500/10 border-green-500/50'
            : 'bg-red-500/10 border-red-500/50'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{chainValid ? '✅' : '❌'}</span>
            <div>
              <h3 className="text-xl font-bold text-white">
                Chain Status: {chainValid ? 'Valid' : 'INVALID'}
              </h3>
              <p className="text-sm text-gray-400">
                {chainValid
                  ? 'All blocks are properly linked'
                  : 'Chain integrity compromised! One or more blocks have been tampered with.'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{blocks.length}</div>
            <div className="text-sm text-gray-400">Blocks</div>
          </div>
        </div>
      </Card>

      {/* Add New Block */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⛏️ Mine a New Block</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Block Data</label>
            <input
              type="text"
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
              placeholder="Enter transaction data (e.g., 'Alice sends 5 BTC to Bob')"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              disabled={isMining}
            />
          </div>
          <Button
            onClick={mineBlock}
            variant="bitcoin"
            disabled={isMining || !newData.trim()}
            className="w-full"
          >
            {isMining ? '⛏️ Mining Block...' : '⛏️ Mine Block'}
          </Button>
          {isMining && (
            <p className="text-center text-gray-400 animate-pulse">
              Finding a valid hash... (Proof of Work)
            </p>
          )}
        </div>
      </Card>

      {/* Blockchain Visualization */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Your Blockchain</h3>

        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={block.id} className="relative">
              {/* Block Card */}
              <Card
                className={`${
                  block.hash === 'INVALID'
                    ? 'border-red-500/50 bg-red-500/10'
                    : 'border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Block #{block.id}
                      {block.id === 0 && ' (Genesis)'}
                    </div>
                    <div className="font-mono text-xs text-gray-400">
                      {new Date(block.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  {block.id !== 0 && (
                    <Button
                      onClick={() => tamperBlock(block.id)}
                      variant="danger"
                      size="sm"
                    >
                      🔧 Tamper
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Data</div>
                    <div className="bg-gray-900 rounded px-3 py-2 text-white break-all">
                      {block.data}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Hash</div>
                      <div
                        className={`bg-gray-900 rounded px-3 py-2 font-mono text-sm break-all ${
                          block.hash === 'INVALID' ? 'text-red-400' : 'text-green-400'
                        }`}
                      >
                        {block.hash === 'INVALID' ? 'INVALID' : `0x${block.hash}`}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">Previous Hash</div>
                      <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm break-all text-blue-400">
                        {block.previousHash === '0' ? 'None' : `0x${block.previousHash}`}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Nonce (Proof of Work)</div>
                    <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm text-purple-400">
                      {block.nonce}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Arrow to next block */}
              {index < blocks.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="text-3xl text-gray-600">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Learnings */}
      <Card className="mt-8 bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              Each block contains data and is linked to the previous block through hashes
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Changing one block breaks the entire chain - making tampering obvious</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              Mining requires computational work (Proof of Work) to create new valid blocks
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              This immutability is what makes blockchain secure and trustworthy
            </span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
