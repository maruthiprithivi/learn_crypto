'use client'

import Link from 'next/link'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { useAppStore } from '@/lib/store'

export default function BitcoinTrack() {
  const { bitcoinProgress } = useAppStore()

  const stages = [
    {
      id: 1,
      title: 'Blockchain Basics',
      description: 'Visualize how blockchain works with interactive animations',
      icon: '⛓️',
      estimated: '10 min',
    },
    {
      id: 2,
      title: 'Your First Wallet',
      description: 'Generate your first Bitcoin wallet with real cryptographic keys',
      icon: '👛',
      estimated: '15 min',
    },
    {
      id: 3,
      title: 'Public & Private Keys',
      description: 'Understand encryption through interactive demonstrations',
      icon: '🔐',
      estimated: '12 min',
    },
    {
      id: 4,
      title: 'Sending Bitcoin',
      description: 'Build and sign transactions with drag-and-drop interface',
      icon: '💸',
      estimated: '20 min',
    },
    {
      id: 5,
      title: 'Understanding UTXOs',
      description: 'Learn how Bitcoin tracks coins differently than bank accounts',
      icon: '🪙',
      estimated: '18 min',
    },
    {
      id: 6,
      title: 'Transaction Fees',
      description: 'Master fee calculation and mempool dynamics',
      icon: '⛽',
      estimated: '15 min',
    },
    {
      id: 7,
      title: 'Hot vs Cold Wallets',
      description: 'Compare wallet security models with real examples',
      icon: '🔥',
      estimated: '12 min',
    },
    {
      id: 8,
      title: 'Multi-signature Wallets',
      description: 'Create wallets that require multiple signatures',
      icon: '✍️',
      estimated: '20 min',
    },
    {
      id: 9,
      title: 'Lightning Network',
      description: 'Experience instant Bitcoin payments',
      icon: '⚡',
      estimated: '15 min',
    },
    {
      id: 10,
      title: 'Bitcoin Security',
      description: 'Master best practices through interactive scenarios',
      icon: '🛡️',
      estimated: '18 min',
    },
  ]

  const isStageUnlocked = (stageId) => {
    if (stageId === 1) return true
    return bitcoinProgress.completedStages.includes(stageId - 1)
  }

  const isStageCompleted = (stageId) => {
    return bitcoinProgress.completedStages.includes(stageId)
  }

  const completedCount = bitcoinProgress.completedStages.length
  const progressPercent = (completedCount / stages.length) * 100

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <Link href="/" className="text-purple-400 hover:text-purple-300 mb-6 inline-block">
          ← Back to Tracks
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">₿</div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Bitcoin Track</h1>
              <p className="text-gray-400 text-lg">
                Master the fundamentals of Bitcoin, the original cryptocurrency
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Your Progress</span>
              <span className="text-orange-400 font-bold">
                {completedCount} / {stages.length} Completed
              </span>
            </div>
            <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stages Grid */}
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
              >
                {/* Completion Badge */}
                {completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    ✓
                  </div>
                )}

                {/* Lock Badge */}
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
                        <Link href={`/bitcoin/stage-${stage.id}`}>
                          <Button variant={completed ? 'secondary' : 'bitcoin'} size="sm">
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

        {/* Completion CTA */}
        {completedCount === stages.length && (
          <Card className="mt-12 text-center bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/50">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Congratulations! You've mastered Bitcoin!
            </h2>
            <p className="text-gray-300 mb-6">
              You've completed all Bitcoin stages. Ready to explore more?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ethereum">
                <Button variant="ethereum">Try Ethereum Track</Button>
              </Link>
              <Link href="/solana">
                <Button variant="solana">Try Solana Track</Button>
              </Link>
              <Link href="/trading-security">
                <Button variant="security">Learn Trading & Security</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
