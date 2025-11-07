'use client'

import { Suspense, lazy } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Shield, TrendingUp, Zap, CheckCircle2, Sparkles } from 'lucide-react'
import DisclaimerModal from '@/components/common/DisclaimerModal'
import PriceWidget from '@/components/common/PriceWidget'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/lib/store'

const CryptoOrb = lazy(() => import('@/components/3d/CryptoOrb'))

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  const { bitcoinProgress, ethereumProgress, solanaProgress, tradingProgress } = useAppStore()

  const tracks = [
    {
      id: 'bitcoin',
      name: 'Bitcoin Track',
      icon: '₿',
      color: 'from-orange-500 to-amber-500',
      bgGlow: 'bg-orange-500/10',
      borderGlow: 'border-orange-500/30',
      description: 'Master the original cryptocurrency from basics to advanced concepts',
      stages: 10,
      progress: bitcoinProgress,
      href: '/bitcoin',
      difficulty: 'Beginner Friendly',
      duration: '~3 hours',
      highlights: ['Blockchain Fundamentals', 'UTXO Model', 'Lightning Network', 'Security Practices'],
    },
    {
      id: 'ethereum',
      name: 'Ethereum Track',
      icon: 'Ξ',
      color: 'from-blue-500 to-indigo-600',
      bgGlow: 'bg-blue-500/10',
      borderGlow: 'border-blue-500/30',
      description: 'Dive into smart contracts, DeFi, and the programmable blockchain',
      stages: 12,
      progress: ethereumProgress,
      href: '/ethereum',
      difficulty: 'Intermediate',
      duration: '~4 hours',
      highlights: ['Smart Contracts', 'ERC-20 Tokens', 'Gas Optimization', 'DeFi Protocols'],
    },
    {
      id: 'solana',
      name: 'Solana Track',
      icon: 'S',
      color: 'from-purple-500 to-pink-600',
      bgGlow: 'bg-purple-500/10',
      borderGlow: 'border-purple-500/30',
      description: 'Experience the fastest blockchain with proof-of-history',
      stages: 10,
      progress: solanaProgress,
      href: '/solana',
      difficulty: 'Intermediate',
      duration: '~3 hours',
      highlights: ['High-Speed TPS', 'SPL Tokens', 'Solana Programs', 'Validator Networks'],
    },
    {
      id: 'trading',
      name: 'Trading & Security',
      icon: '🛡️',
      color: 'from-red-500 to-pink-600',
      bgGlow: 'bg-red-500/10',
      borderGlow: 'border-red-500/30',
      description: 'Learn to protect yourself and make informed trading decisions',
      stages: 12,
      progress: tradingProgress,
      href: '/trading-security',
      difficulty: 'All Levels',
      duration: '~4 hours',
      highlights: ['Scam Detection', 'Technical Analysis', 'Risk Management', 'On-Chain Analytics'],
      recommended: true,
    },
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Interactive Learning',
      description: 'No boring lectures. Build, experiment, and learn by doing with real-time feedback.',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Real Blockchain Data',
      description: 'Analyze real transactions, wallets, and smart contracts on live networks.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security First',
      description: 'Learn to spot scams, rug pulls, and protect your crypto assets.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Progressive Path',
      description: 'From zero to advanced. Each stage builds on the previous one.',
    },
  ]

  const calculateProgress = (progress) => {
    if (!progress || !progress.completedStages) return 0
    return progress.completedStages.length
  }

  return (
    <>
      <DisclaimerModal />

      <div className="min-h-screen relative overflow-hidden">
        {/* Gradient Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 pointer-events-none" />
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative container mx-auto px-4 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <Badge className="mb-6 text-base px-6 py-2" variant="outline">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Learn Crypto the Right Way
            </Badge>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Master Crypto
              </span>
              <br />
              <span className="text-white">Through Practice</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Interactive platform to learn Bitcoin, Ethereum, Solana, and trading security.
              No boring videos—just hands-on experience with real blockchain data.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="/bitcoin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-shadow flex items-center gap-2"
                >
                  Start Learning Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="#tracks">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Explore Tracks
                </motion.button>
              </Link>
            </div>

            {/* 3D Visualization */}
            <div className="relative h-[300px] md:h-[400px] max-w-3xl mx-auto">
              <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="text-white">Loading...</div></div>}>
                <CryptoOrb color="#8b5cf6" />
              </Suspense>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="relative container mx-auto px-4 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { value: '44', label: 'Interactive Stages', suffix: '+' },
              { value: '4', label: 'Learning Tracks', suffix: '' },
              { value: '100', label: 'Free Forever', suffix: '%' },
              { value: '∞', label: 'Real Blockchain Data', suffix: '' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Live Prices */}
        <section className="relative container mx-auto px-4 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Live Market Prices</h2>
              <p className="text-gray-400">Real-time data from CoinGecko API</p>
            </div>
            <PriceWidget />
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="relative container mx-auto px-4 mb-32">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Choose CryptoLearn?
              </h2>
              <p className="text-xl text-gray-400">The most interactive way to master crypto</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={item}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Learning Tracks */}
        <section id="tracks" className="relative container mx-auto px-4 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Choose Your Learning Path
              </h2>
              <p className="text-xl text-gray-400">Each track is designed to take you from zero to hero</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {tracks.map((track, idx) => {
                const completedStages = calculateProgress(track.progress)
                const progressPercent = (completedStages / track.stages) * 100

                return (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-opacity`} />

                    <div className={`relative bg-white/5 backdrop-blur-sm border-2 ${track.borderGlow} rounded-3xl p-8 hover:border-white/30 transition-all`}>
                      {track.recommended && (
                        <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-orange-500">
                          Recommended
                        </Badge>
                      )}

                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`text-6xl p-4 rounded-2xl ${track.bgGlow}`}>
                            {track.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{track.name}</h3>
                            <div className="flex gap-2">
                              <Badge variant="outline">{track.difficulty}</Badge>
                              <Badge variant="outline">{track.duration}</Badge>
                            </div>
                          </div>
                        </div>
                        {completedStages > 0 && (
                          <Badge variant="success" className="text-lg px-3 py-1">
                            {completedStages}/{track.stages}
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-300 mb-6 text-lg">{track.description}</p>

                      {/* Progress */}
                      {completedStages > 0 && (
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white font-bold">{progressPercent.toFixed(0)}%</span>
                          </div>
                          <Progress value={progressPercent} indicatorClassName={`bg-gradient-to-r ${track.color}`} />
                        </div>
                      )}

                      {/* Highlights */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-400 mb-3">What You'll Master:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {track.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-sm text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator className="mb-6" />

                      <Link href={track.href}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${track.color} shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2`}
                        >
                          {completedStages > 0 ? 'Continue Learning' : 'Start Learning'}
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="relative container mx-auto px-4 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30" />
              <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready to Start Your Crypto Journey?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands learning crypto the right way. No credit card required.
                  100% free forever.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/bitcoin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      Start with Bitcoin
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link href="/ethereum">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      Explore All Tracks
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Disclaimer Banner */}
        <section className="relative container mx-auto px-4 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
              <p className="text-yellow-200 text-center">
                ⚠️ <strong>Educational Platform Only</strong> - This platform provides educational content only.
                Not financial advice. All investment decisions are your responsibility.{' '}
                <Link href="/legal/disclaimer" className="underline hover:text-yellow-100">
                  Read full disclaimer
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                CryptoLearn
              </div>
              <p className="text-gray-400 mb-6">
                Master crypto through interactive, hands-on learning
              </p>
              <div className="flex justify-center gap-6 text-sm text-gray-500 mb-4">
                <Link href="/legal/disclaimer" className="hover:text-purple-400 transition-colors">
                  Disclaimer
                </Link>
                <span>•</span>
                <Link href="/bitcoin" className="hover:text-purple-400 transition-colors">
                  Bitcoin Track
                </Link>
                <span>•</span>
                <Link href="/ethereum" className="hover:text-purple-400 transition-colors">
                  Ethereum Track
                </Link>
                <span>•</span>
                <Link href="/solana" className="hover:text-purple-400 transition-colors">
                  Solana Track
                </Link>
              </div>
              <p className="text-sm text-gray-600">
                © 2024 CryptoLearn. Built for education and learning. Not financial advice.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
