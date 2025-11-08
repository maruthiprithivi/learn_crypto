'use client'

import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'

export default function Stage12() {
  const tracksSummary = [
    {
      name: 'Bitcoin',
      icon: '₿',
      stages: 4,
      color: 'orange',
      learned: ['Proof of Work', 'UTXO Model', 'Mining', 'Digital Scarcity']
    },
    {
      name: 'Ethereum',
      icon: '⟠',
      stages: 12,
      color: 'blue',
      learned: ['Smart Contracts', 'Gas System', 'ERC Standards', 'DeFi', 'DApps']
    },
    {
      name: 'Solana',
      icon: '◎',
      stages: 10,
      color: 'purple',
      learned: ['Proof of History', 'High TPS', 'PDAs', 'SPL Tokens', 'Solana DeFi']
    },
    {
      name: 'Trading & Security',
      icon: '🛡️',
      stages: 12,
      color: 'green',
      learned: ['Trading Strategies', 'Wallet Security', 'Scam Prevention', 'DeFi Safety', 'Tax Compliance']
    }
  ]

  const yourJourneyPath = [
    {
      phase: 'Continue Learning',
      icon: '📚',
      actions: [
        'Read crypto news daily (CoinDesk, Decrypt, The Block)',
        'Follow thought leaders on Twitter',
        'Join crypto communities (Reddit, Discord)',
        'Take advanced courses (Bankless, Delphi Digital)',
        'Read whitepapers of projects you use'
      ]
    },
    {
      phase: 'Practice & Experiment',
      icon: '🧪',
      actions: [
        'Start with testnet before mainnet',
        'Use small amounts to learn',
        'Try different DeFi protocols',
        'Participate in DAOs',
        'Explore NFTs and gaming'
      ]
    },
    {
      phase: 'Contribute',
      icon: '🤝',
      actions: [
        'Help newcomers learn',
        'Contribute to open source projects',
        'Participate in governance',
        'Report bugs/scams',
        'Share knowledge responsibly'
      ]
    },
    {
      phase: 'Stay Safe',
      icon: '🔐',
      actions: [
        'Never stop being paranoid',
        'Verify everything, trust nothing',
        'Keep learning about new scams',
        'Maintain security hygiene',
        'Diversify risk always'
      ]
    }
  ]

  return (
    <StageLayout
      stage={12}
      track="trading-security"
      title="Putting It All Together"
      description="Congratulations on completing your crypto education journey!"
      estimatedTime="10 min"
    >
      {/* Congratulations */}
      <Card>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Congratulations!
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            You've completed the entire Crypto Learning Platform!
          </p>
          <p className="text-gray-400">
            You've journeyed through Bitcoin, Ethereum, Solana, and comprehensive Trading & Security.
            That's <strong className="text-white">44 stages</strong> of hands-on learning!
          </p>
        </div>
      </Card>

      {/* What You've Learned */}
      <Card>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Your Learning Journey
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {tracksSummary.map((track, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${track.color}-500/10 to-${track.color}-500/5 border border-${track.color}-500/20 rounded-lg p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{track.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold text-white">{track.name}</h4>
                    <p className="text-xs text-gray-400">{track.stages} stages completed</p>
                  </div>
                </div>
                <Badge variant="outline" className={`border-${track.color}-500 text-${track.color}-400`}>
                  ✓ DONE
                </Badge>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2">Key Concepts:</p>
                <div className="flex flex-wrap gap-2">
                  {track.learned.map((item, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-white mb-2">44 / 44 Stages</div>
          <div className="text-xl text-purple-400 font-semibold mb-2">100% Complete! 🎉</div>
          <p className="text-sm text-gray-300">
            You've covered Bitcoin fundamentals, Ethereum smart contracts, Solana's high performance blockchain,
            trading strategies, security best practices, scam prevention, DeFi safety, and tax compliance.
          </p>
        </div>
      </Card>

      {/* Your Path Forward */}
      <Card>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          Your Path Forward
        </h3>
        <p className="text-gray-300 mb-6">
          Learning never stops in crypto. The space evolves rapidly. Here's how to continue your journey:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {yourJourneyPath.map((phase, idx) => (
            <div key={idx} className="bg-gray-800/30 border border-gray-700 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{phase.icon}</span>
                <h4 className="text-lg font-bold text-white">{phase.phase}</h4>
              </div>
              <ul className="space-y-2">
                {phase.actions.map((action, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* The 10 Commandments of Crypto */}
      <Card>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-2xl">📜</span>
          The 10 Commandments of Crypto
        </h3>
        <p className="text-gray-300 mb-6">
          No matter where your crypto journey takes you, always remember these fundamental rules:
        </p>

        <div className="space-y-3">
          {[
            'Not your keys, not your coins - Always control your private keys',
            'NEVER share your seed phrase with anyone, ever',
            'If it sounds too good to be true, it definitely is',
            'Only invest what you can afford to lose completely',
            'Do your own research - Trust, but verify everything',
            'Security first, profits second - Protect what you have',
            'Diversify your holdings and strategies',
            'Stay humble and keep learning',
            'Tax compliance is not optional',
            'Help others, but never give financial advice'
          ].map((rule, idx) => (
            <div key={idx} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">{idx + 1}</span>
                </div>
                <p className="text-gray-300 flex-1">{rule}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommended Resources */}
      <Card>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-2xl">🔗</span>
          Recommended Resources
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3">📰 News & Research</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• CoinDesk</li>
              <li>• The Block</li>
              <li>• Decrypt</li>
              <li>• Messari</li>
              <li>• Delphi Digital</li>
            </ul>
          </div>

          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-3">📚 Learning</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Bankless</li>
              <li>• Finematics (YouTube)</li>
              <li>• Whiteboard Crypto</li>
              <li>• CryptoZombies</li>
              <li>• Buildspace</li>
            </ul>
          </div>

          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-3">🛠️ Tools</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Etherscan / Solscan</li>
              <li>• DeFi Llama</li>
              <li>• Revoke.cash</li>
              <li>• CoinTracker (taxes)</li>
              <li>• DeBank (portfolio)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Final Message */}
      <Card>
        <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 border border-purple-500/30 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-white mb-4">You're Ready!</h3>
          <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
            You've built a solid foundation in cryptocurrency and blockchain technology. You understand the
            technology, the opportunities, and the risks. You know how to protect yourself and navigate safely.
          </p>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            But remember: crypto never sleeps, and neither does innovation. Stay curious, stay safe, and most
            importantly - stay paranoid. The best defense against losses is constant vigilance.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-xl">
              <span>🚀</span>
              <span className="font-semibold text-white">Your Crypto Journey Starts Now</span>
              <span>🚀</span>
            </div>
            <p className="text-sm text-gray-400 italic">
              "The best time to learn about crypto was 10 years ago. The second best time is now."
            </p>
          </div>
        </div>
      </Card>

      {/* Thank You */}
      <Card>
        <div className="text-center py-6">
          <p className="text-gray-300 mb-4">
            Thank you for completing this comprehensive crypto learning journey!
          </p>
          <p className="text-gray-400 text-sm">
            Feel free to revisit any stage whenever you need a refresher. Knowledge retention comes from
            repetition and real-world application.
          </p>
          <div className="mt-6 text-3xl">
            ₿ ⟠ ◎ 🚀
          </div>
        </div>
      </Card>
    </StageLayout>
  )
}
