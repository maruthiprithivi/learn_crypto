'use client'

import Link from 'next/link'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import DisclaimerModal from '@/components/common/DisclaimerModal'
import { useAppStore } from '@/lib/store'

export default function Home() {
  const { bitcoinProgress, ethereumProgress, solanaProgress, tradingProgress } = useAppStore()

  const tracks = [
    {
      id: 'bitcoin',
      name: 'Bitcoin Track',
      icon: '₿',
      color: 'bitcoin',
      gradient: 'from-orange-500 to-yellow-500',
      description: 'Master the fundamentals of Bitcoin, the original cryptocurrency',
      stages: 10,
      progress: bitcoinProgress,
      href: '/bitcoin',
      topics: [
        'Blockchain Basics & Visualization',
        'Wallet Creation & Key Management',
        'Public & Private Keys',
        'Sending & Receiving Bitcoin',
        'Understanding UTXOs',
        'Transaction Fees & Mempool',
        'Hot vs Cold Wallets',
        'Multi-signature Wallets',
        'Lightning Network',
        'Security Best Practices',
      ],
    },
    {
      id: 'ethereum',
      name: 'Ethereum Track',
      icon: 'Ξ',
      color: 'ethereum',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Explore smart contracts, tokens, and decentralized applications',
      stages: 12,
      progress: ethereumProgress,
      href: '/ethereum',
      topics: [
        'Smart Contracts Introduction',
        'Create Your Ethereum Wallet',
        'Gas & Transaction Fees',
        'ERC-20 Tokens Explained',
        'Token Creation Wizard',
        'Minting, Burning & Transfers',
        'NFTs (ERC-721)',
        'Token Standards Comparison',
        'DeFi Basics',
        'DApp Interactions',
        'Contract Calls',
        'Security & Audits',
      ],
    },
    {
      id: 'solana',
      name: 'Solana Track',
      icon: 'S',
      color: 'solana',
      gradient: 'from-green-400 to-cyan-500',
      description: 'Learn about high-speed blockchain and SPL tokens',
      stages: 10,
      progress: solanaProgress,
      href: '/solana',
      topics: [
        'High-Speed Blockchains',
        'Create Solana Wallet',
        'SOL & Lamports',
        'Solana Programs',
        'SPL Token Standard',
        'Token Creation',
        'Token Extensions',
        'Minting & Burning',
        'Solana NFTs',
        'Transaction Speed Demo',
      ],
    },
    {
      id: 'trading',
      name: 'Trading & Security',
      icon: '🛡️',
      color: 'security',
      gradient: 'from-purple-500 to-pink-600',
      description: 'Stay safe: Learn to spot scams, analyze projects, and trade securely',
      stages: 12,
      progress: tradingProgress,
      href: '/trading-security',
      topics: [
        'Trading Basics 101',
        'Whale Watching & Tracking',
        'Rug Pull Detection',
        'Smart Contract Audits',
        'Staking Safety',
        'DeFi Security',
        'Scam Recognition',
        'Token Analysis',
        'Security Best Practices',
        'Risk Management',
        'On-Chain Analysis',
        'Red Flags Checklist',
      ],
      recommended: 'Complete at least one track first',
    },
  ]

  const calculateProgress = (progress) => {
    if (!progress || !progress.completedStages) return 0
    return progress.completedStages.length
  }

  return (
    <>
      <DisclaimerModal />

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold mb-4">
              <span className="gradient-text">CryptoLearn</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-2">
              Interactive Crypto Education Platform
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Master Bitcoin, Ethereum, Solana, and crypto trading security through hands-on
              interactive experiences. Learn by doing, not just reading.
            </p>
          </div>

          {/* Disclaimer Banner */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4">
              <p className="text-yellow-200 text-center text-sm">
                ⚠️ <strong>Educational Platform Only</strong> - Not financial advice. All
                investment decisions are your responsibility.{' '}
                <Link href="/legal/disclaimer" className="underline hover:text-yellow-100">
                  Learn more
                </Link>
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            <Card className="text-center">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-xl font-bold text-white mb-2">Learn by Doing</h3>
              <p className="text-gray-400 text-sm">
                Interactive simulations and real blockchain analysis - no boring lectures
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">Real Data Analysis</h3>
              <p className="text-gray-400 text-sm">
                Analyze real wallets, contracts, and transactions on live blockchains
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Safe</h3>
              <p className="text-gray-400 text-sm">
                Learn to spot scams, rug pulls, and protect yourself in the crypto space
              </p>
            </Card>
          </div>

          {/* Learning Tracks */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Choose Your Learning Track
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {tracks.map((track) => {
                const completedStages = calculateProgress(track.progress)
                const progressPercent = (completedStages / track.stages) * 100

                return (
                  <Card
                    key={track.id}
                    className="relative overflow-hidden group"
                    hover={true}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-5xl">{track.icon}</div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{track.name}</h3>
                            <p className="text-gray-400 text-sm">{track.stages} stages</p>
                          </div>
                        </div>
                        {completedStages > 0 && (
                          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            {completedStages}/{track.stages} ✓
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4">{track.description}</p>

                      {/* Progress Bar */}
                      {completedStages > 0 && (
                        <div className="mb-4">
                          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${track.gradient} transition-all duration-500`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Topics */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-400 mb-2">What you'll learn:</p>
                        <div className="flex flex-wrap gap-2">
                          {track.topics.slice(0, 4).map((topic, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300"
                            >
                              {topic}
                            </span>
                          ))}
                          <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-400">
                            +{track.topics.length - 4} more
                          </span>
                        </div>
                      </div>

                      {/* Recommendation */}
                      {track.recommended && (
                        <p className="text-yellow-400 text-sm mb-4">
                          💡 {track.recommended}
                        </p>
                      )}

                      {/* CTA Button */}
                      <Link href={track.href}>
                        <Button
                          variant={track.color}
                          className="w-full"
                        >
                          {completedStages > 0 ? 'Continue Learning' : 'Start Learning'} →
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <Card className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Master Crypto?
              </h3>
              <p className="text-gray-400 mb-6">
                Start with any track above. Learn at your own pace, practice in a safe environment,
                and graduate with real-world skills.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/bitcoin">
                  <Button variant="bitcoin">Start with Bitcoin</Button>
                </Link>
                <Link href="/ethereum">
                  <Button variant="ethereum">Start with Ethereum</Button>
                </Link>
                <Link href="/solana">
                  <Button variant="solana">Start with Solana</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-20 py-8">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p className="mb-2">
              Educational platform only. Not financial advice.{' '}
              <Link href="/legal/disclaimer" className="text-purple-400 hover:text-purple-300">
                Read full disclaimer
              </Link>
            </p>
            <p>© 2024 CryptoLearn. Built for education and learning.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
