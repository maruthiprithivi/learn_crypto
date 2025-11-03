'use client'

import Link from 'next/link'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { useAppStore } from '@/lib/store'

export default function TradingSecurityTrack() {
  const { tradingProgress } = useAppStore()

  const stages = [
    { id: 1, title: 'Trading Basics 101', description: 'Market orders, limit orders, candlestick charts', icon: '📊', estimated: '15 min' },
    { id: 2, title: 'Whale Watching', description: 'Track large transactions and their impact', icon: '🐋', estimated: '18 min' },
    { id: 3, title: 'Rug Pull Detection', description: 'Identify and avoid scams', icon: '🚨', estimated: '20 min' },
    { id: 4, title: 'Smart Contract Audits', description: 'Read audit reports and verify contracts', icon: '🔍', estimated: '15 min' },
    { id: 5, title: 'Staking Safety', description: 'Choose reliable validators', icon: '🛡️', estimated: '18 min' },
    { id: 6, title: 'DeFi Security', description: 'Impermanent loss and flash loan attacks', icon: '🏦', estimated: '20 min' },
    { id: 7, title: 'Scam Recognition', description: 'Spot phishing, ponzi schemes, and fakes', icon: '⚠️', estimated: '15 min' },
    { id: 8, title: 'Token Analysis', description: 'Market cap, tokenomics, holder distribution', icon: '🔬', estimated: '20 min' },
    { id: 9, title: 'Security Best Practices', description: 'Hardware wallets, 2FA, seed phrases', icon: '🔐', estimated: '15 min' },
    { id: 10, title: 'Risk Management', description: 'Position sizing and diversification', icon: '⚖️', estimated: '18 min' },
    { id: 11, title: 'On-Chain Analysis', description: 'Reading blockchain explorers', icon: '🔎', estimated: '20 min' },
    { id: 12, title: 'Red Flags Checklist', description: 'Comprehensive project evaluation', icon: '✅', estimated: '15 min' },
  ]

  const isStageUnlocked = (stageId) => {
    if (stageId === 1) return true
    return tradingProgress.completedStages.includes(stageId - 1)
  }

  const isStageCompleted = (stageId) => {
    return tradingProgress.completedStages.includes(stageId)
  }

  const completedCount = tradingProgress.completedStages.length
  const progressPercent = (completedCount / stages.length) * 100

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 mb-6 inline-block">
          ← Back to Tracks
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">🛡️</div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Trading & Security Track</h1>
              <p className="text-gray-400 text-lg">
                Stay safe: Learn to spot scams, analyze projects, and trade securely
              </p>
            </div>
          </div>

          <Card className="bg-yellow-500/10 border-yellow-500/50 mb-6">
            <div className="flex gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-yellow-200 text-sm">
                  <strong>Recommended:</strong> Complete at least one blockchain track (Bitcoin, Ethereum, or Solana) before starting this track.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Your Progress</span>
              <span className="text-purple-400 font-bold">
                {completedCount} / {stages.length} Completed
              </span>
            </div>
            <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-500"
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
                        <Link href={`/trading-security/stage-${stage.id}`}>
                          <Button variant={completed ? 'secondary' : 'security'} size="sm">
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
          <Card className="mt-12 text-center bg-gradient-to-r from-purple-500/20 to-pink-600/20 border-purple-500/50">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Trading & Security Track Complete!
            </h2>
            <p className="text-gray-300 mb-6">
              You're now equipped to navigate the crypto space safely. Stay vigilant!
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
