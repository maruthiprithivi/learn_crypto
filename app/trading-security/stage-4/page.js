'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'

export default function Stage4() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'trading-security'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 4 < maxStage ? 4 + 1 : null

  const [portfolioValue, setPortfolioValue] = useState(10000)
  const [riskPercent, setRiskPercent] = useState(2)
  const [entryPrice, setEntryPrice] = useState(50000)
  const [stopLoss, setStopLoss] = useState(48000)

  const calculatePositionSize = () => {
    const riskAmount = portfolioValue * (riskPercent / 100)
    const priceRisk = entryPrice - stopLoss
    const priceRiskPercent = (priceRisk / entryPrice) * 100
    const positionSize = riskAmount / priceRisk
    const positionValue = positionSize * entryPrice
    const positionPercent = (positionValue / portfolioValue) * 100

    return {
      riskAmount: riskAmount.toFixed(2),
      priceRisk: priceRisk.toFixed(2),
      priceRiskPercent: priceRiskPercent.toFixed(2),
      positionSize: positionSize.toFixed(4),
      positionValue: positionValue.toFixed(2),
      positionPercent: positionPercent.toFixed(2)
    }
  }

  const calc = calculatePositionSize()

  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={4}
      stageTitle="Risk Management & Position Sizing"
      stageDescription="Master the most important skill in trading - protecting your capital and managing risk"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🛡️ Risk Management & Position Sizing</h2>
        <p className="text-gray-300 mb-4">
          Risk management is THE most critical skill for long-term trading success. Even the best strategy will fail
          without proper risk management. Learn how to protect your capital and size positions correctly.
        </p>
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4">
          <h3 className="font-bold text-red-400 mb-2">⚠️ Critical Truth</h3>
          <p className="text-white text-lg font-semibold mb-2">
            "Risk management isn't about making money - it's about NOT losing it."
          </p>
          <p className="text-sm text-gray-300">
            95% of traders fail not because of bad strategies, but because of poor risk management.
            Master this and you're ahead of most traders.
          </p>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📐 Position Sizing Calculator</h3>
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Portfolio Value: ${portfolioValue.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={portfolioValue}
                onChange={(e) => setPortfolioValue(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Risk Per Trade: {riskPercent}%
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={riskPercent}
                onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5% (Very Conservative)</span>
                <span>5% (Very Aggressive)</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Entry Price: ${entryPrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="30000"
                max="70000"
                step="1000"
                value={entryPrice}
                onChange={(e) => setEntryPrice(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Stop-Loss: ${stopLoss.toLocaleString()}
              </label>
              <input
                type="range"
                min="20000"
                max={entryPrice - 1000}
                step="500"
                value={stopLoss}
                onChange={(e) => setStopLoss(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="bg-black/20 rounded-lg p-4 space-y-3">
              <h4 className="font-bold text-white">📊 Calculated Position</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Risk Amount:</span>
                  <span className="text-red-400 font-bold">${calc.riskAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price Risk:</span>
                  <span className="text-white">${calc.priceRisk} ({calc.priceRiskPercent}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Position Size:</span>
                  <span className="text-white font-bold">{calc.positionSize} BTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Position Value:</span>
                  <span className="text-white font-bold">${calc.positionValue}</span>
                </div>
                <div className="flex justify-between col-span-2">
                  <span className="text-gray-400">Portfolio %:</span>
                  <span className="text-purple-400 font-bold">{calc.positionPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📏 The Golden Rules of Risk</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6">
            <h4 className="text-lg font-bold text-green-400 mb-4">✅ DO These</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">1%</Badge>
                <span><strong>1-2% Rule:</strong> Never risk more than 1-2% of capital per trade</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">SL</Badge>
                <span><strong>Always Set Stop-Loss:</strong> BEFORE entering the trade</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">R:R</Badge>
                <span><strong>2:1 Minimum:</strong> Aim for at least 2:1 reward-to-risk ratio</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">📝</Badge>
                <span><strong>Track Every Trade:</strong> Journal wins AND losses</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">💰</Badge>
                <span><strong>Use Position Sizing:</strong> Calculate before every trade</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
            <h4 className="text-lg font-bold text-red-400 mb-4">❌ NEVER Do These</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-1">🎲</Badge>
                <span><strong>Revenge Trading:</strong> Don't try to "win back" losses</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-1">🔮</Badge>
                <span><strong>Move Stop-Loss:</strong> Especially moving it further away</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-1">💸</Badge>
                <span><strong>Over-Leverage:</strong> Using 10x+ leverage as a beginner</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-1">🎯</Badge>
                <span><strong>All-In Trades:</strong> Putting >10% in one position</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-1">😱</Badge>
                <span><strong>FOMO Trading:</strong> Chasing pumps without a plan</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Risk Management Strategies</h3>
        <div className="space-y-4">
          {[
            {
              title: 'Fixed Percentage Method',
              description: 'Risk same % of portfolio on every trade (most common)',
              example: '2% of $10,000 = $200 risk per trade',
              pros: 'Simple, consistent, protects from ruin',
              cons: 'Position size varies with portfolio value',
              color: 'blue'
            },
            {
              title: 'Fixed Dollar Amount',
              description: 'Risk same dollar amount regardless of portfolio size',
              example: 'Always risk $200 per trade',
              pros: 'Very simple to calculate',
              cons: "Doesn't scale with growth/losses",
              color: 'purple'
            },
            {
              title: 'Kelly Criterion',
              description: 'Mathematical formula based on win rate and avg win/loss',
              example: 'f = (bp - q) / b where b=win/loss ratio',
              pros: 'Mathematically optimal',
              cons: 'Complex, can be aggressive',
              color: 'green'
            },
            {
              title: 'Volatility-Based',
              description: 'Adjust position size based on asset volatility',
              example: 'Reduce size on high volatility assets',
              pros: 'Adapts to market conditions',
              cons: 'More complex to implement',
              color: 'orange'
            }
          ].map((strategy, idx) => (
            <div key={idx} className={`bg-gradient-to-r from-${strategy.color}-500/10 to-${strategy.color}-600/10 border border-${strategy.color}-500/30 rounded-lg p-4`}>
              <h4 className="font-bold text-white mb-2">{strategy.title}</h4>
              <p className="text-sm text-gray-300 mb-2">{strategy.description}</p>
              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-gray-400 mb-1">Example:</div>
                  <div className="text-white font-mono">{strategy.example}</div>
                </div>
                <div>
                  <div className="text-green-400 mb-1">Pros:</div>
                  <div className="text-gray-300">{strategy.pros}</div>
                </div>
                <div>
                  <div className="text-red-400 mb-1">Cons:</div>
                  <div className="text-gray-300">{strategy.cons}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📊 Win Rate vs Risk:Reward</h3>
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
          <p className="text-gray-300 mb-4">
            You don't need a high win rate to be profitable. Here's what you need to break even at different R:R ratios:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              { rr: '1:1', winRate: '50%', profit: 'Break even' },
              { rr: '1:2', winRate: '33%', profit: 'Break even' },
              { rr: '1:3', winRate: '25%', profit: 'Break even' },
              { rr: '2:1', winRate: '40%', profit: '+20% edge' },
              { rr: '3:1', winRate: '30%', profit: '+20% edge' },
              { rr: '2:1', winRate: '50%', profit: '+50% edge' }
            ].map((scenario, idx) => (
              <div key={idx} className="bg-black/20 rounded p-3">
                <div className="font-bold text-purple-400">{scenario.rr} R:R</div>
                <div className="text-white">Win Rate: {scenario.winRate}</div>
                <div className="text-gray-400 text-xs">= {scenario.profit}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm">
            <strong className="text-blue-400">Key Insight:</strong> With 2:1 R:R, you only need 40% win rate to be profitable!
            This is why risk management matters more than being "right" all the time.
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Portfolio Allocation</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              name: 'Conservative',
              allocation: { btc: 50, eth: 30, alts: 10, stable: 10 },
              volatility: 'Low',
              goal: 'Preserve capital, steady growth',
              color: 'green'
            },
            {
              name: 'Balanced',
              allocation: { btc: 40, eth: 30, alts: 20, stable: 10 },
              volatility: 'Medium',
              goal: 'Growth with manageable risk',
              color: 'blue'
            },
            {
              name: 'Aggressive',
              allocation: { btc: 30, eth: 25, alts: 40, stable: 5 },
              volatility: 'High',
              goal: 'Maximum growth potential',
              color: 'red'
            }
          ].map((portfolio, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${portfolio.color}-500/10 to-${portfolio.color}-600/10 border border-${portfolio.color}-500/30 rounded-lg p-4`}>
              <h4 className="font-bold text-white mb-3">{portfolio.name}</h4>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">BTC:</span>
                  <span className="text-white">{portfolio.allocation.btc}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ETH:</span>
                  <span className="text-white">{portfolio.allocation.eth}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Altcoins:</span>
                  <span className="text-white">{portfolio.allocation.alts}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stablecoins:</span>
                  <span className="text-white">{portfolio.allocation.stable}%</span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10">
                <Badge className={`bg-${portfolio.color}-500/20 text-${portfolio.color}-400 border-${portfolio.color}-500/30 mb-2`}>
                  {portfolio.volatility} Risk
                </Badge>
                <div className="text-xs text-gray-400">{portfolio.goal}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Never risk more than 1-2%</strong> of your portfolio on a single trade</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Always set stop-loss BEFORE</strong> entering - and stick to it</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Aim for minimum 2:1 R:R</strong> - reward should be at least 2x your risk</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Position sizing formula:</strong> Risk Amount ÷ (Entry - Stop Loss) = Position Size</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>You only need 40% win rate</strong> with 2:1 R:R to be profitable</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Diversify your portfolio</strong> - don't put all eggs in one basket</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">!</span>
            <span><strong>Risk management > Strategy:</strong> Poor risk management will blow up even the best strategy</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
