'use client'

import Link from 'next/link'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { useAppStore } from '@/lib/store'

export default function EthereumTrack() {
  const { ethereumProgress } = useAppStore()

  const stages = [
    {
      id: 1,
      title: 'Smart Contracts Introduction',
      description: 'Learn what smart contracts are and how they power Ethereum',
      icon: '📜',
      estimated: '12 min',
    },
    {
      id: 2,
      title: 'Create Your Ethereum Wallet',
      description: 'Generate an Ethereum wallet with real cryptographic keys',
      icon: '👛',
      estimated: '15 min',
    },
    {
      id: 3,
      title: 'Gas & Transactions',
      description: 'Master Ethereum gas mechanics and transaction fees',
      icon: '⛽',
      estimated: '15 min',
    },
    {
      id: 4,
      title: 'ERC-20 Tokens',
      description: 'Understand the most popular Ethereum token standard',
      icon: '🪙',
      estimated: '12 min',
    },
    {
      id: 5,
      title: 'Create Your Token',
      description: 'Deploy your own ERC-20 token with a visual wizard',
      icon: '🏭',
      estimated: '20 min',
    },
    {
      id: 6,
      title: 'Token Operations',
      description: 'Mint, burn, and transfer tokens interactively',
      icon: '⚙️',
      estimated: '18 min',
    },
    {
      id: 7,
      title: 'NFTs (ERC-721)',
      description: 'Create and manage Non-Fungible Tokens',
      icon: '🎨',
      estimated: '20 min',
    },
    {
      id: 8,
      title: 'Token Standards',
      description: 'Compare ERC-20, ERC-721, ERC-1155, and more',
      icon: '📊',
      estimated: '15 min',
    },
    {
      id: 9,
      title: 'DeFi Basics',
      description: 'Explore decentralized finance with interactive demos',
      icon: '🏦',
      estimated: '18 min',
    },
    {
      id: 10,
      title: 'Interacting with DApps',
      description: 'Connect wallets and use decentralized applications',
      icon: '🔗',
      estimated: '15 min',
    },
    {
      id: 11,
      title: 'Smart Contract Calls',
      description: 'Read and write data to smart contracts',
      icon: '📞',
      estimated: '18 min',
    },
    {
      id: 12,
      title: 'Security & Audits',
      description: 'Learn to identify vulnerabilities and read audit reports',
      icon: '🛡️',
      estimated: '20 min',
    },
  ]

  const isStageUnlocked = (stageId) => {
    if (stageId === 1) return true
    return ethereumProgress.completedStages.includes(stageId - 1)
  }

  const isStageCompleted = (stageId) => {
    return ethereumProgress.completedStages.includes(stageId)
  }

  const completedCount = ethereumProgress.completedStages.length
  const progressPercent = (completedCount / stages.length) * 100

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 mb-6 inline-block">
          ← Back to Tracks
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">Ξ</div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Ethereum Track</h1>
              <p className="text-gray-400 text-lg">
                Master smart contracts, tokens, and decentralized applications
              </p>
            </div>
          </div>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Your Progress</span>
              <span className="text-blue-400 font-bold">
                {completedCount} / {stages.length} Completed
              </span>
            </div>
            <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {stages.map((stage) => {
            const unlocked = isStageUnlocked(stage.id)
            const completed = isStageCompleted(stage.id)

            return (
              <Card
                key={stage.id}
                className={`relative ${
                  unlocked ? 'hover:scale-105 cursor-pointer' : 'opacity-50'
                }`}
                hover={unlocked}
              >
                {completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    ✓
                  </div>
                )}

                {!unlocked && (
                  <div className="absolute top-4 right-4 bg-gray-700 text-gray-400 rounded-full w-8 h-8 flex items-center justify-center">
                    🔒
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="text-5xl">{stage.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Stage {stage.id}</div>
                        <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{stage.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">⏱️ {stage.estimated}</span>
                      {unlocked ? (
                        <Link href={`/ethereum/stage-${stage.id}`}>
                          <Button variant={completed ? 'secondary' : 'ethereum'} size="sm">
                            {completed ? 'Review' : 'Start'} →
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="secondary" size="sm" disabled>
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {completedCount === stages.length && (
          <Card className="mt-12 text-center bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border-blue-500/50">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Congratulations! You've mastered Ethereum!
            </h2>
            <p className="text-gray-300 mb-6">
              You've completed all Ethereum stages. Ready to explore more?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/solana">
                <Button variant="solana">Try Solana Track</Button>
              </Link>
              <Link href="/trading-security">
                <Button variant="security">Learn Trading & Security</Button>
              </Link>
              <Link href="/bitcoin">
                <Button variant="bitcoin">Review Bitcoin Track</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
