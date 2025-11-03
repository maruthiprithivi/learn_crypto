'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Link from 'next/link'

export default function BitcoinStage10() {
  const [completedScenarios, setCompletedScenarios] = useState([])
  const [currentScenario, setCurrentScenario] = useState(null)

  const scenarios = [
    {
      id: 1,
      title: 'Email from "Bitcoin Support"',
      situation:
        'You receive an email: "Your Bitcoin wallet has suspicious activity. Click here to verify your account or your funds will be locked."',
      options: [
        { id: 'a', text: 'Click the link immediately', correct: false },
        { id: 'b', text: 'Reply with your private key', correct: false },
        { id: 'c', text: 'Delete the email - Bitcoin is decentralized, no support team', correct: true },
        { id: 'd', text: 'Forward it to friends', correct: false },
      ],
      explanation:
        'Bitcoin is decentralized - there is NO official support team! This is a phishing scam. Never click links or share private keys.',
      tip: 'Real Bitcoin wallets never contact you via email about account issues.',
    },
    {
      id: 2,
      title: 'New Investment Opportunity',
      situation:
        'A friend tells you about a new crypto that guarantees 50% returns per month. They need you to send 1 BTC to get started.',
      options: [
        { id: 'a', text: 'Send the Bitcoin immediately', correct: false },
        { id: 'b', text: 'Ask for more details and research thoroughly', correct: true },
        { id: 'c', text: 'Send half (0.5 BTC) to test', correct: false },
        { id: 'd', text: 'Share with more friends', correct: false },
      ],
      explanation:
        'Guaranteed high returns are ALWAYS a red flag. This is likely a Ponzi scheme or scam. Do your research (DYOR) and be skeptical of "too good to be true" offers.',
      tip: 'If it sounds too good to be true, it probably is. No legitimate investment guarantees returns.',
    },
    {
      id: 3,
      title: 'Storing Your Seed Phrase',
      situation:
        'You just set up a hardware wallet. Where should you store your 24-word seed phrase?',
      options: [
        { id: 'a', text: 'Take a photo and save in Google Photos', correct: false },
        { id: 'b', text: 'Write on paper and store in a safe place', correct: true },
        { id: 'c', text: 'Save in a password manager', correct: false },
        { id: 'd', text: 'Email it to yourself', correct: false },
      ],
      explanation:
        'Seed phrases should NEVER be stored digitally (photos, cloud, email). Write them on paper or metal, store in a safe place. Digital storage can be hacked.',
      tip: 'Physical > Digital for seed phrases. Consider metal backup plates for fire/water resistance.',
    },
    {
      id: 4,
      title: 'Public Wi-Fi Transaction',
      situation: 'You need to send Bitcoin urgently but you\'re at a coffee shop with public Wi-Fi. What do you do?',
      options: [
        { id: 'a', text: 'Use the public Wi-Fi, it\'s fine', correct: false },
        { id: 'b', text: 'Wait until you have secure internet', correct: true },
        { id: 'c', text: 'Use mobile data instead', correct: true },
        { id: 'd', text: 'Ask the barista to send it for you', correct: false },
      ],
      explanation:
        'Public Wi-Fi can be monitored. For financial transactions, use mobile data or wait for secure connection. Never trust public networks with sensitive operations.',
      tip: 'Use VPN or mobile data for crypto transactions on the go.',
    },
    {
      id: 5,
      title: 'Stranger Wants to Trade',
      situation:
        'Someone online offers to buy your Bitcoin for cash in person. They suggest meeting in a parking lot.',
      options: [
        { id: 'a', text: 'Agree to meet in the parking lot', correct: false },
        { id: 'b', text: 'Use a trusted exchange instead', correct: true },
        { id: 'c', text: 'Meet at a police station if you must meet', correct: true },
        { id: 'd', text: 'Send Bitcoin first, get cash later', correct: false },
      ],
      explanation:
        'In-person trades are risky. Use established exchanges. If you must meet, choose public, safe locations like police stations. Never send crypto before receiving payment.',
      tip: 'Stick to reputable exchanges for buying/selling. Much safer than peer-to-peer with strangers.',
    },
  ]

  const securityChecklist = [
    { category: '🔐 Wallet Security', items: [
      'Use hardware wallet for large amounts',
      'Enable 2FA on all exchanges',
      'Never share private keys',
      'Verify addresses before sending',
      'Use strong, unique passwords',
    ]},
    { category: '📝 Backup & Recovery', items: [
      'Write down seed phrase on paper',
      'Store backup in secure location',
      'Consider metal backup plates',
      'Test recovery process',
      'Never store digitally (photos/cloud)',
    ]},
    { category: '🚨 Scam Prevention', items: [
      'No one can guarantee returns',
      'Research before investing (DYOR)',
      'Beware of phishing emails',
      'Don\'t trust "double your Bitcoin" schemes',
      'Verify smart contracts before using',
    ]},
    { category: '🌐 Online Safety', items: [
      'Avoid public Wi-Fi for transactions',
      'Use official websites only',
      'Check for HTTPS and certificates',
      'Be cautious of social media DMs',
      'Don\'t discuss holdings publicly',
    ]},
  ]

  const handleAnswer = (scenarioId, optionId) => {
    const scenario = scenarios.find((s) => s.id === scenarioId)
    const option = scenario.options.find((o) => o.id === optionId)

    setCurrentScenario({
      ...scenario,
      selectedOption: option,
      answered: true,
    })

    if (option.correct && !completedScenarios.includes(scenarioId)) {
      setCompletedScenarios([...completedScenarios, scenarioId])
    }
  }

  const resetScenario = () => {
    setCurrentScenario(null)
  }

  const allCompleted = completedScenarios.length === scenarios.length

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={10}
      stageTitle="Bitcoin Security"
      stageDescription="Master best practices through interactive scenarios"
      estimatedTime="18 min"
    >
      <Card className="mb-8 bg-red-500/10 border-red-500/50">
        <h2 className="text-2xl font-bold text-white mb-4">⚠️ Security is Your Responsibility</h2>
        <div className="space-y-3 text-gray-300">
          <p>
            With Bitcoin, <strong>you are your own bank</strong>. There's no customer service to
            call if something goes wrong. Security is critical!
          </p>
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-sm font-bold text-red-400 mb-2">
              "Not your keys, not your coins"
            </p>
            <p className="text-sm text-gray-400">
              If you don't control the private keys, you don't truly own the Bitcoin. This is why
              security matters so much.
            </p>
          </div>
        </div>
      </Card>

      {/* Progress Tracker */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white">Security Scenarios</h3>
          <span className="text-sm text-gray-400">
            {completedScenarios.length} / {scenarios.length} Completed
          </span>
        </div>
        <div className="bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedScenarios.length / scenarios.length) * 100}%` }}
          />
        </div>
      </Card>

      {/* Scenarios */}
      <Card className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">🎮 Test Your Security Knowledge</h3>
        <div className="space-y-4">
          {scenarios.map((scenario) => {
            const isCompleted = completedScenarios.includes(scenario.id)
            const isCurrent = currentScenario?.id === scenario.id

            return (
              <div
                key={scenario.id}
                className={`border rounded-lg p-4 ${
                  isCompleted
                    ? 'border-green-500 bg-green-500/10'
                    : isCurrent
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-700 bg-gray-800'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {isCompleted ? '✅' : `${scenario.id}.`}
                    </span>
                    <div>
                      <h4 className="font-bold text-white mb-1">{scenario.title}</h4>
                      <p className="text-sm text-gray-300">{scenario.situation}</p>
                    </div>
                  </div>
                </div>

                {!isCurrent ? (
                  <Button
                    onClick={() => setCurrentScenario({ ...scenario, answered: false })}
                    variant={isCompleted ? 'success' : 'secondary'}
                    size="sm"
                  >
                    {isCompleted ? '✓ Review' : 'Start Scenario'}
                  </Button>
                ) : (
                  <div className="mt-4 space-y-3">
                    {scenario.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => !currentScenario.answered && handleAnswer(scenario.id, option.id)}
                        disabled={currentScenario.answered}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          currentScenario.answered
                            ? option.correct
                              ? 'border-green-500 bg-green-500/20'
                              : currentScenario.selectedOption?.id === option.id
                              ? 'border-red-500 bg-red-500/20'
                              : 'border-gray-700 bg-gray-800 opacity-50'
                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white">{option.id.toUpperCase()}.</span>
                          <span className="text-gray-300">{option.text}</span>
                          {currentScenario.answered && option.correct && (
                            <span className="ml-auto text-green-400">✓</span>
                          )}
                        </div>
                      </button>
                    ))}

                    {currentScenario.answered && (
                      <div
                        className={`rounded-lg p-4 ${
                          currentScenario.selectedOption?.correct
                            ? 'bg-green-500/10 border border-green-500/50'
                            : 'bg-red-500/10 border border-red-500/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">
                            {currentScenario.selectedOption?.correct ? '✅' : '❌'}
                          </span>
                          <span className="font-bold text-white">
                            {currentScenario.selectedOption?.correct ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{scenario.explanation}</p>
                        <p className="text-sm text-gray-400 italic">💡 {scenario.tip}</p>
                        <Button onClick={resetScenario} variant="secondary" size="sm" className="mt-3">
                          Next Scenario
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Security Checklist */}
      <Card className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">✅ Security Checklist</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {securityChecklist.map((category, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-bold text-white mb-3">{category.category}</h4>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Completion */}
      {allCompleted && (
        <Card className="mb-8 bg-green-500/10 border-green-500/50 text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Bitcoin Track Complete!
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Congratulations! You've mastered Bitcoin fundamentals. You now understand blockchain,
            wallets, transactions, UTXOs, fees, security, and the Lightning Network. Ready to
            explore more?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ethereum">
              <Button variant="ethereum" size="lg">
                Start Ethereum Track →
              </Button>
            </Link>
            <Link href="/solana">
              <Button variant="solana" size="lg">
                Start Solana Track →
              </Button>
            </Link>
            <Link href="/trading-security">
              <Button variant="security" size="lg">
                Learn Trading & Security →
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Common Scams */}
      <Card className="mb-8 bg-yellow-500/10 border-yellow-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🚨 Common Bitcoin Scams</h3>
        <div className="space-y-3 text-sm">
          <div className="bg-gray-900 rounded-lg p-3">
            <div className="font-bold text-white mb-1">💰 Ponzi Schemes</div>
            <div className="text-gray-300">"Invest 1 BTC, get 2 BTC back!" - Classic scam. Too good to be true.</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3">
            <div className="font-bold text-white mb-1">🎣 Phishing</div>
            <div className="text-gray-300">Fake websites/emails pretending to be exchanges or wallets.</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3">
            <div className="font-bold text-white mb-1">👥 Fake Exchanges</div>
            <div className="text-gray-300">Websites that look real but steal your Bitcoin when you deposit.</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3">
            <div className="font-bold text-white mb-1">🎁 Giveaway Scams</div>
            <div className="text-gray-300">"Elon Musk is giving away Bitcoin!" - No one gives away free money.</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3">
            <div className="font-bold text-white mb-1">💔 Romance Scams</div>
            <div className="text-gray-300">Fake relationships leading to "investment opportunities."</div>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>You are responsible for your own security - there's no Bitcoin customer service</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Never share private keys or seed phrases with anyone, ever</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Store seed phrases physically (paper/metal), never digitally</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Be skeptical of guaranteed returns and "too good to be true" offers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Use hardware wallets for large amounts, enable 2FA everywhere</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always verify addresses before sending - transactions are irreversible!</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
