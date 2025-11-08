'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function Stage8() {
  const [exchangeSecurityScore, setExchangeSecurityScore] = useState(0)
  const [selectedPractices, setSelectedPractices] = useState([])

  const exchangeFeatures = [
    {
      feature: '2FA (Two-Factor Authentication)',
      importance: 'CRITICAL',
      description: 'Adds second layer beyond password',
      howTo: [
        'Use authenticator app (Google Authenticator, Authy)',
        'NEVER use SMS 2FA if avoidable (SIM swap risk)',
        'Save backup codes in secure location',
        'Enable for login, withdrawals, and API access'
      ],
      color: 'red'
    },
    {
      feature: 'Withdrawal Whitelist',
      importance: 'CRITICAL',
      description: 'Only allow withdrawals to pre-approved addresses',
      howTo: [
        'Add your wallet addresses to whitelist',
        'Set 24-48 hour delay for new addresses',
        'Verify addresses multiple times before adding',
        'Regularly review whitelisted addresses'
      ],
      color: 'red'
    },
    {
      feature: 'Anti-Phishing Code',
      importance: 'HIGH',
      description: 'Personal code in all legitimate exchange emails',
      howTo: [
        'Set unique code in exchange settings',
        'Verify code appears in ALL exchange emails',
        'If email lacks your code = PHISHING',
        'Never click links in emails without code'
      ],
      color: 'orange'
    },
    {
      feature: 'API Key Management',
      importance: 'HIGH',
      description: 'Secure access for trading bots and apps',
      howTo: [
        'Never enable withdrawal permissions for API keys',
        'Use IP whitelisting for API keys',
        'Create separate keys for different purposes',
        'Regularly rotate and audit API keys',
        'Delete unused keys immediately'
      ],
      color: 'orange'
    },
    {
      feature: 'Session Management',
      importance: 'MEDIUM',
      description: 'Control active logins to your account',
      howTo: [
        'Regularly check active sessions',
        'Terminate unknown or old sessions',
        'Enable notifications for new logins',
        'Log out when done trading'
      ],
      color: 'yellow'
    },
    {
      feature: 'Email Security',
      importance: 'HIGH',
      description: 'Secure the email linked to your exchange',
      howTo: [
        'Use unique email for each exchange',
        'Enable 2FA on email account',
        'Use strong, unique password',
        'Never share or reuse exchange email'
      ],
      color: 'orange'
    }
  ]

  const exchangeSelectionCriteria = {
    security: {
      name: 'Security Features',
      icon: '🔒',
      factors: [
        { name: 'Cold storage percentage', description: '95%+ of funds in cold storage', critical: true },
        { name: 'Insurance fund', description: 'SAFU or similar protection fund', critical: true },
        { name: 'Security certifications', description: 'SOC 2, ISO 27001, etc.', critical: false },
        { name: 'Proof of reserves', description: 'Regular audited proof of funds', critical: true },
        { name: 'Hack history', description: 'Past security incidents and response', critical: true }
      ]
    },
    reputation: {
      name: 'Reputation & Trust',
      icon: '⭐',
      factors: [
        { name: 'Years in operation', description: '3+ years preferred', critical: false },
        { name: 'Trading volume', description: 'Top 20 exchanges by volume', critical: false },
        { name: 'User reviews', description: 'Check Reddit, Trustpilot, etc.', critical: false },
        { name: 'Regulatory compliance', description: 'Licensed in major jurisdictions', critical: true },
        { name: 'Transparency', description: 'Clear team, location, policies', critical: true }
      ]
    },
    usability: {
      name: 'Features & Usability',
      icon: '⚡',
      factors: [
        { name: 'Available trading pairs', description: 'Coins you want to trade', critical: false },
        { name: 'Fees structure', description: 'Competitive maker/taker fees', critical: false },
        { name: 'Withdrawal limits', description: 'Limits that work for your needs', critical: false },
        { name: 'Customer support', description: 'Responsive and helpful', critical: false },
        { name: 'Mobile app quality', description: 'If you trade on mobile', critical: false }
      ]
    }
  }

  const securityChecklist = [
    { id: '2fa', text: 'Enable 2FA with authenticator app (not SMS)', points: 20, category: 'critical' },
    { id: 'whitelist', text: 'Set up withdrawal address whitelist', points: 20, category: 'critical' },
    { id: 'unique-pass', text: 'Use unique, strong password (20+ characters)', points: 15, category: 'critical' },
    { id: 'anti-phish', text: 'Set up anti-phishing code', points: 10, category: 'high' },
    { id: 'email-2fa', text: 'Enable 2FA on linked email account', points: 10, category: 'high' },
    { id: 'api-secure', text: 'Secure API keys (no withdrawal permission)', points: 10, category: 'high' },
    { id: 'monitor', text: 'Enable login/withdrawal notifications', points: 5, category: 'medium' },
    { id: 'sessions', text: 'Regularly check and clear active sessions', points: 5, category: 'medium' },
    { id: 'limited-funds', text: 'Keep only trading amount on exchange', points: 5, category: 'medium' }
  ]

  const handleChecklistToggle = (id) => {
    const item = securityChecklist.find(c => c.id === id)
    if (selectedPractices.includes(id)) {
      const newSelected = selectedPractices.filter(i => i !== id)
      setSelectedPractices(newSelected)
      setExchangeSecurityScore(exchangeSecurityScore - item.points)
    } else {
      setSelectedPractices([...selectedPractices, id])
      setExchangeSecurityScore(exchangeSecurityScore + item.points)
    }
  }

  const getSecurityRating = () => {
    if (exchangeSecurityScore >= 80) return { text: 'Excellent - Very Secure', color: 'text-green-400', bgColor: 'bg-green-500' }
    if (exchangeSecurityScore >= 60) return { text: 'Good - Reasonably Secure', color: 'text-blue-400', bgColor: 'bg-blue-500' }
    if (exchangeSecurityScore >= 40) return { text: 'Fair - Needs Improvement', color: 'text-yellow-400', bgColor: 'bg-yellow-500' }
    return { text: 'Poor - High Risk!', color: 'text-red-400', bgColor: 'bg-red-500' }
  }

  const rating = getSecurityRating()

  return (
    <StageLayout
      stage={8}
      track="trading-security"
      title="Exchange Security & Best Practices"
      description="Learn how to secure your exchange accounts and choose safe platforms"
      estimatedTime="25 min"
    >
      {/* Introduction */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🏦 Exchange Security: Protecting Your Trading Account
        </h2>
        <p className="text-gray-300 mb-4">
          Centralized exchanges are the most common target for hackers. Billions of dollars have been stolen from
          exchanges and individual accounts. While you can't control exchange security, you CAN maximize your
          account protection and minimize risk.
        </p>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            <strong>⚠️ Remember:</strong> "Not your keys, not your coins." Exchanges hold your crypto, not you.
            Only keep funds on an exchange while actively trading. Transfer everything else to your own wallet.
            Even the "safest" exchanges can be hacked, frozen, or go bankrupt.
          </p>
        </div>
      </Card>

      {/* Essential Security Features */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          Essential Security Features
        </h3>
        <p className="text-gray-300 mb-6">
          Every reputable exchange offers these security features. You MUST enable and properly configure ALL of them.
          Skipping even one creates a vulnerability.
        </p>

        <div className="space-y-4">
          {exchangeFeatures.map((item, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-r from-${item.color}-500/10 to-${item.color}-500/5 border border-${item.color}-500/20 rounded-lg p-5`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-white">{item.feature}</h4>
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`
                    ${item.importance === 'CRITICAL' ? 'border-red-500 text-red-400' : ''}
                    ${item.importance === 'HIGH' ? 'border-orange-500 text-orange-400' : ''}
                    ${item.importance === 'MEDIUM' ? 'border-yellow-500 text-yellow-400' : ''}
                  `}
                >
                  {item.importance}
                </Badge>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-blue-400 mb-2">How to Set Up:</h5>
                <ul className="space-y-2">
                  {item.howTo.map((step, stepIdx) => (
                    <li key={stepIdx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 font-bold flex-shrink-0">{stepIdx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Exchange Security Checklist */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">✅</span>
          Your Exchange Security Score
        </h3>
        <p className="text-gray-300 mb-6">
          Check off each security practice you've implemented. Aim for 100/100 to minimize your risk.
        </p>

        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold text-white">Security Score</h4>
              <p className="text-sm text-gray-400">Check practices below</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{exchangeSecurityScore}/100</div>
              <div className={`text-sm font-semibold ${rating.color}`}>{rating.text}</div>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${rating.bgColor}`}
              style={{ width: `${exchangeSecurityScore}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {securityChecklist.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChecklistToggle(item.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPractices.includes(item.id)
                  ? 'border-green-500 bg-green-500/10'
                  : `border-gray-700 bg-gray-800/30 hover:border-gray-600 ${
                      item.category === 'critical' ? 'border-l-4 border-l-red-500' : ''
                    }`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  selectedPractices.includes(item.id)
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-600'
                }`}>
                  {selectedPractices.includes(item.id) && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-300">{item.text}</p>
                  {item.category === 'critical' && !selectedPractices.includes(item.id) && (
                    <p className="text-xs text-red-400 mt-1">⚠️ Critical - Do this now!</p>
                  )}
                </div>
                <Badge variant="secondary" className="flex-shrink-0">
                  +{item.points} pts
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {exchangeSecurityScore < 55 && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm">
              <strong>⚠️ Warning:</strong> Your exchange account security is inadequate. You're at high risk of
              account compromise. Enable the missing features immediately, especially the CRITICAL ones.
            </p>
          </div>
        )}
      </Card>

      {/* Choosing a Safe Exchange */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          Choosing a Safe Exchange
        </h3>
        <p className="text-gray-300 mb-6">
          Not all exchanges are created equal. Some are rock-solid, others are disasters waiting to happen.
          Evaluate exchanges across these three critical dimensions:
        </p>

        <div className="space-y-6">
          {Object.entries(exchangeSelectionCriteria).map(([key, category]) => (
            <div key={key} className="bg-gray-800/30 border border-gray-700 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h4 className="text-xl font-bold text-white">{category.name}</h4>
              </div>

              <div className="space-y-3">
                {category.factors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      factor.critical ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-semibold text-white text-sm">{factor.name}</h5>
                          <p className="text-xs text-gray-400 mt-1">{factor.description}</p>
                        </div>
                        {factor.critical && (
                          <Badge variant="outline" className="border-red-500 text-red-400 text-xs flex-shrink-0">
                            CRITICAL
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h5 className="font-semibold text-blue-400 mb-2">Pro Tip: Diversify Exchange Risk</h5>
          <p className="text-sm text-gray-300">
            Don't put all your eggs in one basket. If you must keep significant funds on exchanges, split them
            across 2-3 top-tier platforms. If one gets hacked or frozen, you don't lose everything.
          </p>
        </div>
      </Card>

      {/* Common Exchange Attacks */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚔️</span>
          Common Exchange Account Attacks
        </h3>
        <p className="text-gray-300 mb-6">
          Understanding how attackers compromise exchange accounts helps you defend against them.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
              <span className="text-xl">🎣</span>
              Phishing Emails
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Fake emails pretending to be from your exchange, asking you to "verify" or "secure" your account.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-400 mb-1">Defense:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Check anti-phishing code</li>
                <li>• Never click email links</li>
                <li>• Manually type exchange URL</li>
                <li>• Verify sender email domain</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
              <span className="text-xl">📱</span>
              SIM Swap Attacks
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Attacker convinces phone provider to transfer your number to their SIM, bypassing SMS 2FA.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-400 mb-1">Defense:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Use authenticator app, not SMS</li>
                <li>• Add PIN to mobile account</li>
                <li>• Enable withdrawal whitelist</li>
                <li>• Monitor for unusual activity</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
              <span className="text-xl">🦠</span>
              Malware & Keyloggers
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Malicious software that records your keystrokes or steals session cookies to access your account.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-400 mb-1">Defense:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Use dedicated device for trading</li>
                <li>• Keep antivirus updated</li>
                <li>• Don't download suspicious files</li>
                <li>• Use hardware wallet when possible</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-green-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <span className="text-xl">🔑</span>
              API Key Compromise
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Attackers steal or guess your API keys to execute trades or withdraw funds via API.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-400 mb-1">Defense:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Never enable withdrawal for API</li>
                <li>• Use IP whitelisting</li>
                <li>• Rotate keys regularly</li>
                <li>• Delete unused keys immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Exchange Security Best Practices
        </h3>

        <div className="space-y-3">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
              <span>✓</span> Withdraw to Your Wallet Regularly
            </h4>
            <p className="text-sm text-gray-300">
              Don't leave funds sitting on exchanges. After trading, withdraw to your own wallet. Set a schedule
              (daily/weekly) to move funds to cold storage. "If you're not trading it, you shouldn't be storing it."
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <span>✓</span> Use Unique Credentials
            </h4>
            <p className="text-sm text-gray-300">
              Never reuse passwords or emails across exchanges. If one exchange is breached, attackers will try
              those credentials everywhere. Use a password manager to generate and store unique 20+ character passwords.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
              <span>✓</span> Monitor Account Activity
            </h4>
            <p className="text-sm text-gray-300">
              Check login history, active sessions, and withdrawal history weekly. Enable all notification options
              (login alerts, withdrawal confirmations, API activity). Catch suspicious activity early.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
              <span>✓</span> Test Security Features
            </h4>
            <p className="text-sm text-gray-300">
              Before trusting an exchange with large amounts, test their security. Try to withdraw to an address
              NOT on your whitelist (it should fail). Try logging in from new device (should require 2FA). Verify
              your defenses actually work.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Takeaways */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Key Takeaways
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Exchanges Are Targets</h4>
            <p className="text-sm text-gray-300">
              Exchanges hold billions in crypto, making them prime targets. Even with perfect account security,
              the exchange itself can be hacked. Minimize your exposure.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Layer Your Security</h4>
            <p className="text-sm text-gray-300">
              Use ALL available security features: 2FA, whitelist, anti-phishing, unique credentials, email
              security. Each layer makes it harder for attackers to succeed.
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Choose Carefully</h4>
            <p className="text-sm text-gray-300">
              Not all exchanges are equal. Research security track record, proof of reserves, cold storage
              practices, and regulatory compliance before trusting them.
            </p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-2">Withdraw Regularly</h4>
            <p className="text-sm text-gray-300">
              The safest crypto on an exchange is the crypto that's NOT on an exchange. Only keep what you need
              for active trading. Everything else belongs in your own wallet.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-yellow-400">Final Reminder:</strong> Exchange security is a compromise between
            convenience and safety. The more convenient it is to access your funds, the more convenient it is for
            attackers too. Find the balance that protects your assets while allowing you to trade effectively.
          </p>
        </div>
      </Card>
    </StageLayout>
  )
}
