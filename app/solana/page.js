'use client'

import Link from 'next/link'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { useAppStore } from '@/lib/store'

export default function SolanaTrack() {
  const { solanaProgress } = useAppStore()

  const stages = [
    { id: 1, title: 'High-Speed Blockchains', description: 'Learn why Solana is so fast', icon: '⚡', estimated: '10 min' },
    { id: 2, title: 'Create Solana Wallet', description: 'Generate your Phantom-style wallet', icon: '👻', estimated: '15 min' },
    { id: 3, title: 'SOL & Lamports', description: 'Understand Solana denominations', icon: '🪙', estimated: '12 min' },
    { id: 4, title: 'Solana Programs', description: 'How Solana differs from Ethereum', icon: '📜', estimated: '15 min' },
    { id: 5, title: 'SPL Token Standard', description: 'Solana Program Library tokens', icon: '🏭', estimated: '12 min' },
    { id: 6, title: 'Create SPL Token', description: 'Deploy your own token', icon: '🚀', estimated: '20 min' },
    { id: 7, title: 'Token Extensions', description: 'Transfer fees, confidential transfers', icon: '⚙️', estimated: '18 min' },
    { id: 8, title: 'Minting & Burning', description: 'Supply management demo', icon: '🔥', estimated: '15 min' },
    { id: 9, title: 'Solana NFTs', description: 'Metaplex candy machine concepts', icon: '🎨', estimated: '20 min' },
    { id: 10, title: 'Speed Demo', description: 'Transaction throughput visualization', icon: '💨', estimated: '15 min' },
  ]

  const isStageUnlocked = (stageId) => {
    if (stageId === 1) return true
    return solanaProgress.completedStages.includes(stageId - 1)
  }

  const isStageCompleted = (stageId) => {
    return solanaProgress.completedStages.includes(stageId)
  }

  const completedCount = solanaProgress.completedStages.length
  const progressPercent = (completedCount / stages.length) * 100

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 mb-6 inline-block">
          ← Back to Tracks
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">◎</div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Solana Track</h1>
              <p className="text-gray-400 text-lg">
                Master high-speed blockchain and SPL tokens
              </p>
            </div>
          </div>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Your Progress</span>
              <span className="text-green-400 font-bold">
                {completedCount} / {stages.length} Completed
              </span>
            </div>
            <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-cyan-500 transition-all duration-500"
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
                className={`relative ${unlocked ? 'hover:scale-105 cursor-pointer' : 'opacity-50'}`}
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
                    <div className="text-sm text-gray-500 mb-1">Stage {stage.id}</div>
                    <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{stage.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">⏱️ {stage.estimated}</span>
                      {unlocked ? (
                        <Link href={`/solana/stage-${stage.id}`}>
                          <Button variant={completed ? 'secondary' : 'solana'} size="sm">
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
          <Card className="mt-12 text-center bg-gradient-to-r from-green-400/20 to-cyan-500/20 border-green-500/50">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Solana Track Complete!
            </h2>
            <p className="text-gray-300 mb-6">
              You've mastered Solana. Keep exploring!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
