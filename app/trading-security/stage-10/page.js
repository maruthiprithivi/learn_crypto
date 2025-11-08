'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'

export default function Stage10() {
  const [riskScore, setRiskScore] = useState(0)
  const [selectedChecks, setSelectedChecks] = useState([])

  const defiRisks = [
    {
      name: 'Smart Contract Risk',
      icon: '📜',
      severity: 'CRITICAL',
      description: 'Bugs or exploits in protocol code can drain all funds',
      examples: ['DAO Hack - $60M stolen', 'Poly Network - $611M exploited', 'Wormhole - $325M bridge hack'],
      mitigation: ['Use only audited protocols', 'Check audit reports', 'Look for bug bounty programs', 'Start with small amounts']
    },
    {
      name: 'Unlimited Approvals',
      icon: '♾️',
      severity: 'CRITICAL',
      description: 'Giving unlimited token spending permission to smart contracts',
      examples: ['Approving scam tokens that drain wallet', 'Compromised DApp draining approved tokens'],
      mitigation: ['Set limited approvals', 'Revoke old approvals regularly', 'Use tools like Revoke.cash', 'Never approve unknown contracts']
    },
    {
      name: 'Impermanent Loss',
      icon: '📉',
      severity: 'MEDIUM',
      description: 'Loss from providing liquidity when token prices diverge',
      examples: ['Providing ETH/ALT liquidity, ALT drops 50%', 'Better to just hold than LP in volatile pairs'],
      mitigation: ['Understand IL before LPing', 'Use stablecoin pairs', 'Calculate IL risk', 'Higher fees can offset IL']
    },
    {
      name: 'Rug Pulls & Exit Scams',
      icon: '🏃',
      severity: 'CRITICAL',
      description: 'Developers drain liquidity or have backdoors in contracts',
      examples: ['AnubisDAO - $60M day one rug', 'Meerkat Finance - $31M drained'],
      mitigation: ['Check liquidity locks', 'Verify no mint functions', 'Look for renounced ownership', 'Research team thoroughly']
    },
    {
      name: 'Oracle Manipulation',
      icon: '🔮',
      severity: 'HIGH',
      description: 'Attackers manipulate price feeds to exploit protocols',
      examples: ['Flash loan attacks manipulating DEX prices', 'Lending protocols liquidated via oracle exploit'],
      mitigation: ['Use protocols with multiple oracles', 'Check oracle security', 'Prefer time-weighted prices']
    },
    {
      name: 'Front-Running & MEV',
      icon: '🏎️',
      severity: 'MEDIUM',
      description: 'Bots watching mempool and front-running your transactions',
      examples: ['Large DEX swaps getting sandwiched', 'NFT mints being sniped'],
      mitigation: ['Use private transactions', 'Set slippage limits', 'Expect some MEV on large trades']
    }
  ]

  const dueDiligenceChecklist = [
    { id: 'audit', text: 'Protocol has been audited by reputable firm (CertiK, Trail of Bits, etc.)', points: 20, category: 'critical' },
    { id: 'tvl', text: 'TVL is substantial ($10M+) and has been stable for 3+ months', points: 15, category: 'high' },
    { id: 'team', text: 'Team is doxxed or well-known in crypto', points: 15, category: 'high' },
    { id: 'liquidity', text: 'Liquidity is locked or owned by protocol (not team wallet)', points: 15, category: 'critical' },
    { id: 'bug-bounty', text: 'Active bug bounty program', points: 10, category: 'medium' },
    { id: 'timelock', text: 'Protocol uses timelocks for admin actions', points: 10, category: 'high' },
    { id: 'multisig', text: 'Admin keys are multisig (3+ signers)', points: 10, category: 'medium' },
    { id: 'open-source', text: 'Code is open source and verifiable', points: 5, category: 'medium' }
  ]

  const handleCheckToggle = (id) => {
    const item = dueDiligenceChecklist.find(c => c.id === id)
    if (selectedChecks.includes(id)) {
      const newChecks = selectedChecks.filter(i => i !== id)
      setSelectedChecks(newChecks)
      setRiskScore(riskScore - item.points)
    } else {
      setSelectedChecks([...selectedChecks, id])
      setRiskScore(riskScore + item.points)
    }
  }

  const getSecurityRating = () => {
    if (riskScore >= 80) return { text: 'Excellent - Low Risk', color: 'text-green-400', bg: 'bg-green-500' }
    if (riskScore >= 60) return { text: 'Good - Moderate Risk', color: 'text-blue-400', bg: 'bg-blue-500' }
    if (riskScore >= 40) return { text: 'Fair - High Risk', color: 'text-yellow-400', bg: 'bg-yellow-500' }
    return { text: 'Poor - Very High Risk!', color: 'text-red-400', bg: 'bg-red-500' }
  }

  const rating = getSecurityRating()

  return (
    <StageLayout
      stage={10}
      track="trading-security"
      title="DeFi Security"
      description="Learn to navigate DeFi safely and avoid common pitfalls"
      estimatedTime="25 min"
    >
      <Card>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🔐 DeFi Security: Navigating the Wild West
        </h2>
        <p className="text-gray-300 mb-4">
          DeFi offers incredible opportunities but comes with unique risks. Unlike centralized exchanges, there's
          no support to call when things go wrong. Smart contract bugs, unlimited approvals, rug pulls - the list
          of risks is long. This stage teaches you how to navigate DeFi safely.
        </p>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            <strong>⚠️ Critical:</strong> Code is law in DeFi. If a smart contract has a bug or backdoor, your
            funds can be drained instantly and irreversibly. Always assume protocols can be hacked. Never invest
            more than you can afford to lose. Due diligence is your ONLY protection.
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Major DeFi Risks
        </h3>
        <div className="space-y-4">
          {defiRisks.map((risk, idx) => (
            <div key={idx} className="bg-gray-800/30 border border-gray-700 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{risk.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold text-white">{risk.name}</h4>
                    <p className="text-sm text-gray-400 mt-1">{risk.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className={`
                  ${risk.severity === 'CRITICAL' ? 'border-red-500 text-red-400' : ''}
                  ${risk.severity === 'HIGH' ? 'border-orange-500 text-orange-400' : ''}
                  ${risk.severity === 'MEDIUM' ? 'border-yellow-500 text-yellow-400' : ''}
                `}>
                  {risk.severity}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-red-400 mb-2">Examples:</h5>
                  <ul className="space-y-1">
                    {risk.examples.map((ex, i) => (
                      <li key={i} className="text-xs text-gray-300">• {ex}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-green-400 mb-2">Protection:</h5>
                  <ul className="space-y-1">
                    {risk.mitigation.map((mit, i) => (
                      <li key={i} className="text-xs text-gray-300">✓ {mit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">✅</span>
          Protocol Due Diligence Checklist
        </h3>
        <p className="text-gray-300 mb-6">
          Before using any DeFi protocol, check these items. The more boxes you can check, the safer the protocol.
        </p>

        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold text-white">Safety Score</h4>
              <p className="text-sm text-gray-400">Check items that apply to the protocol</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{riskScore}/100</div>
              <div className={`text-sm font-semibold ${rating.color}`}>{rating.text}</div>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-full h-4 overflow-hidden">
            <div className={`h-full transition-all duration-500 ${rating.bg}`} style={{ width: `${riskScore}%` }} />
          </div>
        </div>

        <div className="space-y-3">
          {dueDiligenceChecklist.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCheckToggle(item.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedChecks.includes(item.id)
                  ? 'border-green-500 bg-green-500/10'
                  : `border-gray-700 bg-gray-800/30 hover:border-gray-600 ${
                      item.category === 'critical' ? 'border-l-4 border-l-red-500' : ''
                    }`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  selectedChecks.includes(item.id) ? 'border-green-500 bg-green-500' : 'border-gray-600'
                }`}>
                  {selectedChecks.includes(item.id) && <span className="text-white text-sm">✓</span>}
                </div>
                <div className="flex-1">
                  <p className="text-gray-300">{item.text}</p>
                  {item.category === 'critical' && !selectedChecks.includes(item.id) && (
                    <p className="text-xs text-red-400 mt-1">⚠️ Critical - Must have!</p>
                  )}
                </div>
                <Badge variant="secondary">+{item.points} pts</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          DeFi Best Practices
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Manage Approvals</h4>
            <p className="text-sm text-gray-300">
              Regularly revoke old approvals using Revoke.cash or Etherscan. Only approve exact amounts needed,
              not unlimited. Check approvals before connecting to new DApps.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Start Small</h4>
            <p className="text-sm text-gray-300">
              Test new protocols with small amounts first. Withdraw successfully before committing large sums.
              Even audited protocols can have bugs. Your test deposit is insurance.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Use Separate Wallets</h4>
            <p className="text-sm text-gray-300">
              Keep a separate "hot" wallet for DeFi with limited funds. Never connect your main cold storage
              to DApps. If DApp is compromised, losses are contained.
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-2">Monitor Positions</h4>
            <p className="text-sm text-gray-300">
              Check your DeFi positions daily. Set alerts for large price movements. Be ready to exit if protocol
              shows signs of trouble. Exit early if something feels wrong.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Key Takeaways
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Code Is Law</h4>
            <p className="text-sm text-gray-300">
              Smart contracts execute exactly as programmed, bugs and all. No one can reverse DeFi transactions.
              Audit reports reduce but don't eliminate risk.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Approvals Are Dangerous</h4>
            <p className="text-sm text-gray-300">
              Unlimited approvals give contracts permission to drain your wallet. Revoke old approvals. Only
              approve exact amounts needed. Check what you're approving.
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Do Your Research</h4>
            <p className="text-sm text-gray-300">
              Check audits, TVL, team, liquidity locks before using protocols. New protocols are highest risk.
              Blue-chip DeFi is safer but not risk-free.
            </p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-2">Never Go All In</h4>
            <p className="text-sm text-gray-300">
              Diversify across protocols. Don't put all funds in one platform. Even the "safest" DeFi can be
              hacked. Expect the unexpected.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-yellow-400">Remember:</strong> DeFi yields often come with hidden risks.
            If you don't understand why a yield exists, you're likely the one providing it. High APY = high risk,
            always. Sustainable yields are typically under 20% APY. Anything higher is usually temporary or risky.
          </p>
        </div>
      </Card>
    </StageLayout>
  )
}
