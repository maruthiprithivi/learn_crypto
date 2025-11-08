'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function Stage7() {
  const [selectedWalletType, setSelectedWalletType] = useState('hot')
  const [securityScore, setSecurityScore] = useState(0)
  const [selectedBestPractices, setSelectedBestPractices] = useState([])

  const walletTypes = {
    hot: {
      name: 'Hot Wallets',
      icon: '🔥',
      description: 'Connected to the internet for easy access',
      examples: [
        { name: 'MetaMask', type: 'Browser Extension', security: 'Medium' },
        { name: 'Phantom', type: 'Browser Extension', security: 'Medium' },
        { name: 'Trust Wallet', type: 'Mobile App', security: 'Medium' },
        { name: 'Coinbase Wallet', type: 'Mobile App', security: 'Medium' },
        { name: 'Exodus', type: 'Desktop/Mobile', security: 'Medium' }
      ],
      pros: [
        'Convenient for daily transactions',
        'Easy to use and set up',
        'Quick access to funds',
        'Free or low cost',
        'Perfect for small amounts'
      ],
      cons: [
        'Always connected to internet',
        'Vulnerable to hacks & malware',
        'Phishing attack risk',
        'Device theft risk',
        'Not suitable for large holdings'
      ],
      bestFor: 'Daily trading, small amounts, frequent transactions',
      securityLevel: 'Medium',
      color: 'orange'
    },
    cold: {
      name: 'Cold Wallets',
      icon: '❄️',
      description: 'Offline storage for maximum security',
      examples: [
        { name: 'Ledger Nano X/S', type: 'Hardware Wallet', security: 'Very High' },
        { name: 'Trezor Model T/One', type: 'Hardware Wallet', security: 'Very High' },
        { name: 'Paper Wallet', type: 'Physical Paper', security: 'High' },
        { name: 'Steel Wallet', type: 'Metal Backup', security: 'Very High' },
        { name: 'Air-gapped Computer', type: 'Offline Device', security: 'Very High' }
      ],
      pros: [
        'Maximum security (offline)',
        'Protection from online threats',
        'Full control of private keys',
        'Ideal for long-term storage',
        'Protected from malware'
      ],
      cons: [
        'Less convenient for frequent use',
        'Hardware wallets cost money ($50-200)',
        'Can be physically lost or damaged',
        'Requires technical knowledge',
        'Slower transaction process'
      ],
      bestFor: 'Long-term holdings, large amounts, retirement savings',
      securityLevel: 'Very High',
      color: 'blue'
    },
    hybrid: {
      name: 'Hybrid Approach',
      icon: '⚖️',
      description: 'Combination of hot and cold wallets',
      examples: [
        { name: 'Hot wallet for trading', type: '10-20% of portfolio', security: 'Medium' },
        { name: 'Cold wallet for savings', type: '80-90% of portfolio', security: 'Very High' },
        { name: 'Multiple cold wallets', type: 'Geographic distribution', security: 'Very High' },
        { name: 'Multisig setup', type: '2-of-3 or 3-of-5', security: 'Very High' },
        { name: 'Exchange + Hardware', type: 'Small amount on exchange', security: 'Medium-High' }
      ],
      pros: [
        'Balance of security & convenience',
        'Diversified risk',
        'Flexibility for different use cases',
        'Best of both worlds',
        'Scalable approach'
      ],
      cons: [
        'More complex to manage',
        'Multiple backups needed',
        'Requires discipline',
        'Higher initial cost',
        'Learning curve'
      ],
      bestFor: 'Active traders with significant holdings, balanced approach',
      securityLevel: 'High',
      color: 'purple'
    }
  }

  const securityChecklist = [
    { id: 'backup', text: 'Backed up seed phrase in multiple secure locations', points: 15 },
    { id: 'offline', text: 'Seed phrase never stored digitally or online', points: 15 },
    { id: 'hardware', text: 'Using hardware wallet for large holdings', points: 10 },
    { id: '2fa', text: 'Two-factor authentication enabled everywhere', points: 10 },
    { id: 'verify', text: 'Always verify transaction addresses', points: 10 },
    { id: 'updates', text: 'Keep wallet software updated', points: 5 },
    { id: 'network', text: 'Never use public WiFi for crypto transactions', points: 10 },
    { id: 'phishing', text: 'Bookmark official wallet sites, avoid phishing links', points: 10 },
    { id: 'test', text: 'Test with small amounts first', points: 5 },
    { id: 'separate', text: 'Use separate devices for large holdings', points: 10 }
  ]

  const handleChecklistToggle = (id) => {
    if (selectedBestPractices.includes(id)) {
      const newSelected = selectedBestPractices.filter(item => item !== id)
      setSelectedBestPractices(newSelected)
      const newScore = newSelected.reduce((acc, itemId) => {
        const item = securityChecklist.find(c => c.id === itemId)
        return acc + (item?.points || 0)
      }, 0)
      setSecurityScore(newScore)
    } else {
      const newSelected = [...selectedBestPractices, id]
      setSelectedBestPractices(newSelected)
      const newScore = newSelected.reduce((acc, itemId) => {
        const item = securityChecklist.find(c => c.id === itemId)
        return acc + (item?.points || 0)
      }, 0)
      setSecurityScore(newScore)
    }
  }

  const getSecurityRating = () => {
    if (securityScore >= 80) return { text: 'Excellent', color: 'text-green-400' }
    if (securityScore >= 60) return { text: 'Good', color: 'text-blue-400' }
    if (securityScore >= 40) return { text: 'Fair', color: 'text-yellow-400' }
    return { text: 'Poor - Needs Improvement', color: 'text-red-400' }
  }

  const selectedWallet = walletTypes[selectedWalletType]
  const rating = getSecurityRating()

  return (
    <StageLayout
      stage={7}
      track="trading-security"
      title="Wallet Security Fundamentals"
      description="Learn how to secure your crypto assets with proper wallet management"
      estimatedTime="25 min"
    >
      {/* Introduction */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🔐 Wallet Security: Your First Line of Defense
        </h2>
        <p className="text-gray-300 mb-4">
          In crypto, YOU are the bank. There's no customer service to call if you lose your funds. Proper wallet
          security is the difference between sleeping well and losing everything. This stage covers the fundamentals
          of securing your crypto assets.
        </p>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            <strong>⚠️ Critical:</strong> "Not your keys, not your coins." If you don't control your private keys,
            you don't truly own your crypto. Never share your seed phrase with ANYONE - not even "support staff."
            There is no legitimate reason for anyone to ever ask for it.
          </p>
        </div>
      </Card>

      {/* Wallet Types Comparison */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">👛</span>
          Types of Wallets
        </h3>
        <p className="text-gray-300 mb-6">
          Different wallets serve different purposes. Understanding the trade-offs between security and convenience
          is crucial for protecting your assets.
        </p>

        {/* Wallet Type Selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.entries(walletTypes).map(([key, wallet]) => (
            <button
              key={key}
              onClick={() => setSelectedWalletType(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedWalletType === key
                  ? `border-${wallet.color}-500 bg-${wallet.color}-500/20`
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <div className="text-3xl mb-2">{wallet.icon}</div>
              <div className="font-semibold text-sm">{wallet.name}</div>
              <div className="text-xs text-gray-400 mt-1">{wallet.securityLevel}</div>
            </button>
          ))}
        </div>

        {/* Selected Wallet Details */}
        <div className={`bg-gradient-to-br from-${selectedWallet.color}-500/10 to-${selectedWallet.color}-500/5 border border-${selectedWallet.color}-500/20 rounded-lg p-6`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{selectedWallet.icon}</span>
                <div>
                  <h4 className="text-2xl font-bold text-white">{selectedWallet.name}</h4>
                  <p className="text-gray-300 text-sm">{selectedWallet.description}</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {selectedWallet.securityLevel}
            </Badge>
          </div>

          <div className="mb-6">
            <h5 className="text-blue-400 font-semibold mb-3">Popular Examples:</h5>
            <div className="grid md:grid-cols-2 gap-3">
              {selectedWallet.examples.map((example, idx) => (
                <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-white">{example.name}</div>
                      <div className="text-xs text-gray-400">{example.type}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {example.security}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <span>✅</span> Advantages
              </h5>
              <ul className="space-y-2">
                {selectedWallet.pros.map((pro, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <span>❌</span> Disadvantages
              </h5>
              <ul className="space-y-2">
                {selectedWallet.cons.map((con, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h5 className="text-purple-400 font-semibold mb-2">Best For:</h5>
            <p className="text-gray-300 text-sm">{selectedWallet.bestFor}</p>
          </div>
        </div>
      </Card>

      {/* Seed Phrase & Private Keys */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🔑</span>
          Understanding Seeds & Keys
        </h3>
        <p className="text-gray-300 mb-6">
          Your seed phrase and private keys are the MOST IMPORTANT aspects of crypto security. Lose them, lose
          your crypto forever. Compromise them, lose your crypto immediately.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
            <h4 className="text-xl font-bold text-blue-400 mb-3">🌱 Seed Phrase (Recovery Phrase)</h4>
            <p className="text-gray-300 text-sm mb-4">
              12-24 words that represent your wallet. This is your master key to ALL your crypto in that wallet.
            </p>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 mb-4 font-mono text-xs text-gray-400">
              <div className="grid grid-cols-3 gap-2">
                {['witch', 'collapse', 'practice', 'feed', 'shame', 'open', 'despair', 'creek', 'road', 'again', 'ice', 'least'].map((word, idx) => (
                  <div key={idx}>{idx + 1}. {word}</div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-400 text-xl">✓</span>
                <div className="text-sm">
                  <strong className="text-green-400">DO:</strong>
                  <p className="text-gray-300 mt-1">Write it down on paper or metal backup</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 text-xl">✓</span>
                <div className="text-sm">
                  <strong className="text-green-400">DO:</strong>
                  <p className="text-gray-300 mt-1">Store in multiple secure physical locations</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 text-xl">✓</span>
                <div className="text-sm">
                  <strong className="text-green-400">DO:</strong>
                  <p className="text-gray-300 mt-1">Keep it offline and away from cameras</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-xl">✗</span>
                <div className="text-sm">
                  <strong className="text-red-400">NEVER:</strong>
                  <p className="text-gray-300 mt-1">Take screenshots or store digitally</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-xl">✗</span>
                <div className="text-sm">
                  <strong className="text-red-400">NEVER:</strong>
                  <p className="text-gray-300 mt-1">Share with anyone, even "support"</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-xl">✗</span>
                <div className="text-sm">
                  <strong className="text-red-400">NEVER:</strong>
                  <p className="text-gray-300 mt-1">Enter into websites or apps (except your wallet)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
            <h4 className="text-xl font-bold text-purple-400 mb-3">🔐 Private Key</h4>
            <p className="text-gray-300 text-sm mb-4">
              A long string of characters that proves ownership of your crypto. Your seed phrase generates these.
            </p>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 mb-4 font-mono text-xs text-gray-400 break-all">
              5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299...
            </div>

            <div className="space-y-3">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <h5 className="font-semibold text-blue-400 text-sm mb-2">Key Facts:</h5>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li>• Each address has its own private key</li>
                  <li>• Derived from your seed phrase</li>
                  <li>• Never share or expose it</li>
                  <li>• Required to sign transactions</li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <h5 className="font-semibold text-yellow-400 text-sm mb-2">Public vs Private:</h5>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li><strong>Public Key (Address):</strong> Safe to share, like your email</li>
                  <li><strong>Private Key:</strong> NEVER share, like your password</li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-xs text-red-400">
                  <strong>⚠️ Warning:</strong> Anyone with your private key or seed phrase can steal ALL your crypto
                  instantly and irreversibly. There is NO recovery if compromised.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Best Practices Checklist */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">✅</span>
          Security Checklist: How Secure Are You?
        </h3>
        <p className="text-gray-300 mb-6">
          Check off the security practices you're currently following. The more you implement, the safer your
          crypto assets will be.
        </p>

        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold text-white">Your Security Score</h4>
              <p className="text-sm text-gray-400">Select practices you follow below</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{securityScore}/100</div>
              <div className={`text-sm font-semibold ${rating.color}`}>{rating.text}</div>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                securityScore >= 80 ? 'bg-green-500' :
                securityScore >= 60 ? 'bg-blue-500' :
                securityScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${securityScore}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {securityChecklist.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChecklistToggle(item.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedBestPractices.includes(item.id)
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  selectedBestPractices.includes(item.id)
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-600'
                }`}>
                  {selectedBestPractices.includes(item.id) && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-300">{item.text}</p>
                </div>
                <Badge variant="secondary" className="flex-shrink-0">
                  +{item.points} pts
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Common Mistakes to Avoid */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Critical Mistakes to Avoid
        </h3>
        <p className="text-gray-300 mb-6">
          These mistakes have cost people millions. Learn from others' losses - don't make these errors.
        </p>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💀</span>
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Storing Seed Phrase Digitally</h4>
                <p className="text-sm text-gray-300">
                  Photos, screenshots, cloud storage, password managers - all can be hacked. Your seed phrase
                  should ONLY exist on physical media (paper/metal) stored securely offline.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💀</span>
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Using Public WiFi for Transactions</h4>
                <p className="text-sm text-gray-300">
                  Public networks can be monitored. Attackers can intercept data or perform man-in-the-middle
                  attacks. ONLY use secure, private networks for crypto transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💀</span>
              <div>
                <h4 className="font-semibold text-orange-400 mb-1">Not Verifying Addresses</h4>
                <p className="text-sm text-gray-300">
                  Malware can change clipboard contents. ALWAYS verify the first AND last characters of an
                  address before sending. One wrong character = funds lost forever.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💀</span>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-1">Keeping Large Amounts on Exchanges</h4>
                <p className="text-sm text-gray-300">
                  Exchanges are honeypots for hackers and can freeze your account anytime. If you're not actively
                  trading it, move it to your own wallet. History is full of exchange hacks and bankruptcies.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💀</span>
              <div>
                <h4 className="font-semibold text-purple-400 mb-1">Single Point of Failure</h4>
                <p className="text-sm text-gray-300">
                  Only one seed phrase backup? House fire = crypto gone. Multiple backups in different secure
                  locations (bank deposit box, trusted family member, etc.) protect against disasters.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💀</span>
              <div>
                <h4 className="font-semibold text-pink-400 mb-1">Bragging About Holdings</h4>
                <p className="text-sm text-gray-300">
                  Announcing your crypto wealth makes you a target. Don't post screenshots, don't brag on social
                  media, don't tell strangers. Criminals can use this information for targeted attacks.
                </p>
              </div>
            </div>
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
            <h4 className="font-semibold text-blue-400 mb-2">You Are The Bank</h4>
            <p className="text-sm text-gray-300">
              In crypto, there's no customer support to reverse transactions or recover lost funds. Security
              is 100% your responsibility. Take it seriously.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Hot for Spending, Cold for Saving</h4>
            <p className="text-sm text-gray-300">
              Use hot wallets for small amounts you need daily access to. Store the majority (80-90%) in
              cold storage. Never keep more in a hot wallet than you can afford to lose.
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Seed Phrase = Everything</h4>
            <p className="text-sm text-gray-300">
              Your seed phrase is your crypto. Protect it like it's worth everything you own - because it is.
              Multiple physical backups, never digital, never shared.
            </p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2">Trust No One</h4>
            <p className="text-sm text-gray-300">
              No legitimate person will EVER ask for your seed phrase or private keys. Not support, not
              developers, not "security teams." If someone asks, it's a scam. No exceptions.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-red-400">Final Warning:</strong> Crypto transactions are irreversible. Once
            it's sent, it's gone. There is no "undo." A single mistake can cost you everything. Take security
            seriously from day one. Better paranoid than poor.
          </p>
        </div>
      </Card>
    </StageLayout>
  )
}
