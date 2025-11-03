'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function BitcoinStage7() {
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [scenario, setScenario] = useState(null)

  const wallets = [
    {
      id: 'hot',
      name: 'Hot Wallet',
      icon: '🔥',
      type: 'Software/Exchange',
      examples: ['Mobile apps', 'Desktop wallets', 'Exchange accounts', 'Web wallets'],
      pros: [
        'Convenient for daily use',
        'Quick access to funds',
        'Easy to send/receive',
        'Good for small amounts',
      ],
      cons: [
        'Connected to internet',
        'Vulnerable to hacks',
        'Risk of malware/phishing',
        'Exchange can be hacked',
      ],
      security: 30,
      convenience: 95,
      bestFor: 'Daily spending, trading, small amounts',
      color: 'orange',
    },
    {
      id: 'cold',
      name: 'Cold Wallet',
      icon: '❄️',
      type: 'Offline Storage',
      examples: ['Hardware wallets', 'Paper wallets', 'Metal backup plates', 'Air-gapped devices'],
      pros: [
        'Maximum security',
        'Offline storage',
        'Protected from hackers',
        'Full control of keys',
      ],
      cons: [
        'Less convenient',
        'Costs money (hardware)',
        'Can be lost/damaged',
        'Slower to access funds',
      ],
      security: 95,
      convenience: 40,
      bestFor: 'Long-term holdings, large amounts, savings',
      color: 'blue',
    },
  ]

  const scenarios = [
    {
      id: 1,
      title: 'Daily Coffee Purchases',
      question: 'You buy coffee with Bitcoin every morning. Which wallet?',
      correct: 'hot',
      explanation: 'Hot wallets are perfect for daily small transactions. Quick and convenient!',
    },
    {
      id: 2,
      title: 'Life Savings',
      question: 'Storing your entire Bitcoin life savings (10 BTC). Which wallet?',
      correct: 'cold',
      explanation: 'Always use cold storage for large amounts. Security over convenience!',
    },
    {
      id: 3,
      title: 'Active Trading',
      question: 'Trading Bitcoin daily on an exchange. Which wallet?',
      correct: 'hot',
      explanation: 'Hot wallets (exchanges) are necessary for active trading. But only keep trading amounts there!',
    },
    {
      id: 4,
      title: 'Long-term Investment',
      question: 'HODLing Bitcoin for 5-10 years. Which wallet?',
      correct: 'cold',
      explanation: 'Cold storage is ideal for long-term holding. Maximum security for your investment!',
    },
  ]

  const checkScenario = (scenarioId, answer) => {
    const current = scenarios.find((s) => s.id === scenarioId)
    setScenario({
      ...current,
      userAnswer: answer,
      correct: answer === current.correct,
    })
  }

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={7}
      stageTitle="Hot vs Cold Wallets"
      stageDescription="Compare wallet security models and choose the right one"
      nextStageHref="/bitcoin/stage-8"
      estimatedTime="12 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Two Types of Bitcoin Wallets</h2>
        <p className="text-gray-300 mb-4">
          Like keeping money in your pocket vs in a safe, Bitcoin wallets come in two main types:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {wallets.map((wallet) => (
            <Card
              key={wallet.id}
              className={`cursor-pointer transition-all ${
                selectedWallet?.id === wallet.id ? 'border-2 border-' + wallet.color + '-500' : ''
              }`}
              hover={true}
              onClick={() => setSelectedWallet(wallet)}
            >
              <div className="text-6xl mb-4 text-center">{wallet.icon}</div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">{wallet.name}</h3>
              <p className="text-gray-400 text-center mb-4 text-sm">{wallet.type}</p>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-2">Security Level</div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-${wallet.color}-500`}
                      style={{ width: `${wallet.security}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{wallet.security}/100</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-2">Convenience</div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-${wallet.color}-500`}
                      style={{ width: `${wallet.convenience}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{wallet.convenience}/100</div>
                </div>
              </div>

              <Button
                variant={wallet.color === 'orange' ? 'bitcoin' : 'primary'}
                size="sm"
                className="w-full mt-4"
                onClick={() => setSelectedWallet(wallet)}
              >
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {selectedWallet && (
        <Card className="mb-8 animate-slide-up">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{selectedWallet.icon}</span>
            <div>
              <h3 className="text-3xl font-bold text-white">{selectedWallet.name}</h3>
              <p className="text-gray-400">{selectedWallet.type}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
              <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <span>✅</span> Pros
              </h4>
              <ul className="space-y-2 text-sm">
                {selectedWallet.pros.map((pro, idx) => (
                  <li key={idx} className="text-gray-300">• {pro}</li>
                ))}
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                <span>❌</span> Cons
              </h4>
              <ul className="space-y-2 text-sm">
                {selectedWallet.cons.map((con, idx) => (
                  <li key={idx} className="text-gray-300">• {con}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-white mb-2">Examples:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedWallet.examples.map((example, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>

          <div className={`bg-${selectedWallet.color}-500/10 border border-${selectedWallet.color}-500/50 rounded-lg p-4`}>
            <div className="text-sm text-gray-400 mb-1">Best For:</div>
            <div className="text-white font-bold">{selectedWallet.bestFor}</div>
          </div>
        </Card>
      )}

      <Card className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">🎯 Practice: Choose the Right Wallet</h3>
        <div className="space-y-4">
          {scenarios.map((s) => (
            <div
              key={s.id}
              className={`border rounded-lg p-4 ${
                scenario?.id === s.id
                  ? scenario.correct
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800'
              }`}
            >
              <h4 className="font-bold text-white mb-2">{s.title}</h4>
              <p className="text-gray-300 mb-4 text-sm">{s.question}</p>

              {scenario?.id !== s.id ? (
                <div className="flex gap-3">
                  <Button
                    onClick={() => checkScenario(s.id, 'hot')}
                    variant="secondary"
                    size="sm"
                  >
                    🔥 Hot Wallet
                  </Button>
                  <Button
                    onClick={() => checkScenario(s.id, 'cold')}
                    variant="secondary"
                    size="sm"
                  >
                    ❄️ Cold Wallet
                  </Button>
                </div>
              ) : (
                <div className={`rounded-lg p-3 ${scenario.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{scenario.correct ? '✅' : '❌'}</span>
                    <span className="font-bold text-white">
                      {scenario.correct ? 'Correct!' : 'Not quite!'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{s.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8 bg-yellow-500/10 border-yellow-500/50">
        <h3 className="text-xl font-bold text-white mb-4">💡 Best Practices</h3>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <p><strong>Hybrid Approach:</strong> Use both! Hot wallet for spending, cold wallet for savings</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📊</span>
            <p><strong>80/20 Rule:</strong> Keep 80% in cold storage, 20% in hot wallet for daily use</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🔐</span>
            <p><strong>Hardware Wallets:</strong> Ledger, Trezor are popular cold wallet options (~$50-150)</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <p><strong>Never leave large amounts on exchanges</strong> - they're hot wallets you don't control!</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📝</span>
            <p><strong>Backup everything:</strong> Write down seed phrases, store securely offline</p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Hot wallets are convenient but less secure (online/connected)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Cold wallets are most secure but less convenient (offline storage)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Use hot wallets for daily spending and small amounts</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Use cold wallets for long-term savings and large amounts</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Most people benefit from using both types strategically</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
