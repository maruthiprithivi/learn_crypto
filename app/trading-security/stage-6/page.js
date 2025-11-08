'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function Stage6() {
  const [selectedStrategy, setSelectedStrategy] = useState('scalping')
  const [selectedSystem, setSelectedSystem] = useState('trend')

  const tradingStyles = {
    scalping: {
      name: 'Scalping',
      timeframe: '1m - 5m',
      holdTime: 'Seconds to Minutes',
      tradesPerDay: '50-200',
      profitTarget: '0.1% - 0.5% per trade',
      difficulty: 'Very Hard',
      timeCommitment: 'Full-time monitoring',
      advantages: [
        'Many opportunities daily',
        'Quick profit realization',
        'Less overnight risk',
        'Compound small gains'
      ],
      disadvantages: [
        'High stress & intense focus required',
        'High trading fees accumulation',
        'Requires very fast execution',
        'Mental exhaustion'
      ],
      bestFor: 'Experienced traders with excellent discipline',
      requirements: [
        'Low-latency connection',
        'Advanced charting software',
        'High trading capital',
        'Strong emotional control'
      ]
    },
    dayTrading: {
      name: 'Day Trading',
      timeframe: '5m - 1h',
      holdTime: 'Minutes to Hours (same day)',
      tradesPerDay: '5-20',
      profitTarget: '0.5% - 2% per trade',
      difficulty: 'Hard',
      timeCommitment: '4-8 hours daily',
      advantages: [
        'No overnight risk',
        'Multiple daily opportunities',
        'Defined trading hours',
        'Quick feedback on trades'
      ],
      disadvantages: [
        'Requires daily commitment',
        'Stressful during market hours',
        'Trading fees add up',
        'Difficult work-life balance'
      ],
      bestFor: 'Full-time traders or those with flexible schedules',
      requirements: [
        'Reliable trading setup',
        'Technical analysis skills',
        'Risk management system',
        'Market knowledge'
      ]
    },
    swingTrading: {
      name: 'Swing Trading',
      timeframe: '4h - 1D',
      holdTime: 'Days to Weeks',
      tradesPerDay: '1-5 per week',
      profitTarget: '2% - 10% per trade',
      difficulty: 'Medium',
      timeCommitment: '1-2 hours daily',
      advantages: [
        'Flexible time commitment',
        'Less stressful than day trading',
        'Captures larger price moves',
        'Works with full-time job'
      ],
      disadvantages: [
        'Overnight & weekend risk',
        'Requires patience',
        'Fewer trading opportunities',
        'Gap risk on news'
      ],
      bestFor: 'Part-time traders with some market experience',
      requirements: [
        'Technical & fundamental analysis',
        'Patience and discipline',
        'Moderate capital',
        'Risk management plan'
      ]
    },
    positionTrading: {
      name: 'Position Trading',
      timeframe: '1D - 1W',
      holdTime: 'Weeks to Months',
      tradesPerDay: '1-5 per month',
      profitTarget: '10% - 50%+ per trade',
      difficulty: 'Medium',
      timeCommitment: 'Few hours weekly',
      advantages: [
        'Minimal time requirement',
        'Low stress & fees',
        'Captures major trends',
        'Easy to manage alongside job'
      ],
      disadvantages: [
        'Requires large capital',
        'Long holding periods',
        'Subject to market cycles',
        'Drawdowns can be large'
      ],
      bestFor: 'Patient investors with long-term view',
      requirements: [
        'Strong fundamental analysis',
        'Market cycle understanding',
        'Large capital base',
        'Strong conviction'
      ]
    }
  }

  const tradingSystems = {
    trend: {
      name: 'Trend Following',
      description: 'Trade in the direction of the prevailing trend',
      winRate: '40-50%',
      riskReward: '1:2 or better',
      entry: [
        'Wait for confirmed trend (higher highs/higher lows)',
        'Enter on pullback to support/resistance',
        'Use moving average crossovers',
        'Confirm with volume & momentum'
      ],
      exit: [
        'Exit when trend reverses',
        'Trailing stop loss',
        'Target previous high/low',
        'Use indicator divergence'
      ],
      indicators: ['Moving Averages (20, 50, 200)', 'MACD', 'ADX', 'Volume'],
      strengths: [
        'Captures large moves',
        'Clear rules',
        'Works in trending markets',
        'Good R:R ratio'
      ],
      weaknesses: [
        'Suffers in ranging markets',
        'Late entries',
        'Whipsaws during consolidation'
      ]
    },
    breakout: {
      name: 'Breakout Trading',
      description: 'Trade when price breaks through key levels',
      winRate: '35-45%',
      riskReward: '1:3 or better',
      entry: [
        'Identify key support/resistance',
        'Wait for price to break level',
        'Confirm with increased volume',
        'Enter on retest or immediately'
      ],
      exit: [
        'Target measured move',
        'Exit on volume decrease',
        'Trail stop below support',
        'Exit on pattern failure'
      ],
      indicators: ['Volume', 'Bollinger Bands', 'Support/Resistance', 'ATR'],
      strengths: [
        'Catches strong moves early',
        'Clear entry signals',
        'Good profit potential',
        'Works on all timeframes'
      ],
      weaknesses: [
        'Many false breakouts',
        'Requires quick execution',
        'Gap risk',
        'Emotional pressure'
      ]
    },
    reversal: {
      name: 'Reversal Trading',
      description: 'Trade when price reverses at key levels',
      winRate: '50-60%',
      riskReward: '1:1.5 to 1:2',
      entry: [
        'Identify overbought/oversold conditions',
        'Look for divergence on indicators',
        'Wait for reversal candlestick pattern',
        'Enter at support/resistance'
      ],
      exit: [
        'Exit at next resistance/support',
        'Use swing high/low targets',
        'Exit on momentum loss',
        'Tight stop below entry area'
      ],
      indicators: ['RSI', 'Stochastic', 'MACD', 'Candlestick Patterns'],
      strengths: [
        'Good entry prices',
        'Higher win rate',
        'Defined risk',
        'Works in ranging markets'
      ],
      weaknesses: [
        'Catching falling knives',
        'Can reverse against you',
        'Requires patience',
        'Fighting the trend'
      ]
    },
    rangeTrading: {
      name: 'Range Trading',
      description: 'Trade between support and resistance in ranging markets',
      winRate: '55-65%',
      riskReward: '1:1 to 1:1.5',
      entry: [
        'Identify clear range boundaries',
        'Buy at support, sell at resistance',
        'Use oscillators for timing',
        'Wait for rejection confirmation'
      ],
      exit: [
        'Exit at opposite range boundary',
        'Use middle of range as target',
        'Exit on range break',
        'Scale out as approaching target'
      ],
      indicators: ['Bollinger Bands', 'RSI', 'Stochastic', 'Support/Resistance'],
      strengths: [
        'High win rate',
        'Predictable price action',
        'Multiple opportunities',
        'Clear risk/reward'
      ],
      weaknesses: [
        'Only works in ranging markets',
        'Small profit targets',
        'Breakout risk',
        'Boring & requires patience'
      ]
    }
  }

  const selectedStyleData = tradingStyles[selectedStrategy]
  const selectedSystemData = tradingSystems[selectedSystem]

  return (
    <StageLayout
      stage={6}
      track="trading-security"
      title="Trading Strategies & Systems"
      description="Learn different trading styles and proven trading systems"
      estimatedTime="30 min"
    >
      {/* Introduction */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          📊 Trading Strategies & Systems
        </h2>
        <p className="text-gray-300 mb-4">
          Every trader needs a well-defined strategy and trading system. Your strategy determines WHEN and HOW
          you trade, while your system provides the rules for execution. This stage covers the major trading styles
          and proven trading systems you can use.
        </p>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-yellow-400 text-sm">
            <strong>⚠️ Important:</strong> No strategy works all the time. The key is finding a strategy that
            matches your personality, time availability, and risk tolerance. Stick with ONE strategy until you
            master it before exploring others.
          </p>
        </div>
      </Card>

      {/* Trading Styles Comparison */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          Trading Styles: Find Your Fit
        </h3>
        <p className="text-gray-300 mb-6">
          Different trading styles require different time commitments, skills, and personalities. Choose the style
          that fits your lifestyle and temperament.
        </p>

        {/* Style Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(tradingStyles).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setSelectedStrategy(key)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedStrategy === key
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <div className="font-semibold text-sm">{style.name}</div>
              <div className="text-xs text-gray-400 mt-1">{style.timeframe}</div>
            </button>
          ))}
        </div>

        {/* Selected Style Details */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold text-blue-400">{selectedStyleData.name}</h4>
              <p className="text-gray-300 mt-1">Best for: {selectedStyleData.bestFor}</p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {selectedStyleData.difficulty}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-3">
                <span className="text-gray-400">Timeframe:</span>
                <span className="text-white font-semibold ml-2">{selectedStyleData.timeframe}</span>
              </div>
              <div className="mb-3">
                <span className="text-gray-400">Hold Time:</span>
                <span className="text-white font-semibold ml-2">{selectedStyleData.holdTime}</span>
              </div>
              <div className="mb-3">
                <span className="text-gray-400">Trades Per Day:</span>
                <span className="text-white font-semibold ml-2">{selectedStyleData.tradesPerDay}</span>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <span className="text-gray-400">Profit Target:</span>
                <span className="text-green-400 font-semibold ml-2">{selectedStyleData.profitTarget}</span>
              </div>
              <div className="mb-3">
                <span className="text-gray-400">Time Commitment:</span>
                <span className="text-white font-semibold ml-2">{selectedStyleData.timeCommitment}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <span>✅</span> Advantages
              </h5>
              <ul className="space-y-2">
                {selectedStyleData.advantages.map((adv, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <span>❌</span> Disadvantages
              </h5>
              <ul className="space-y-2">
                {selectedStyleData.disadvantages.map((dis, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h5 className="text-blue-400 font-semibold mb-3">Requirements:</h5>
            <div className="grid md:grid-cols-2 gap-2">
              {selectedStyleData.requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-blue-400">▸</span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Trading Systems */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Trading Systems: Proven Approaches
        </h3>
        <p className="text-gray-300 mb-6">
          A trading system is a complete set of rules for entering and exiting trades. Here are four proven
          systems that can be adapted to any trading style.
        </p>

        {/* System Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(tradingSystems).map(([key, system]) => (
            <button
              key={key}
              onClick={() => setSelectedSystem(key)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedSystem === key
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <div className="font-semibold text-sm">{system.name}</div>
              <div className="text-xs text-gray-400 mt-1">WR: {system.winRate}</div>
            </button>
          ))}
        </div>

        {/* Selected System Details */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
          <h4 className="text-2xl font-bold text-purple-400 mb-2">{selectedSystemData.name}</h4>
          <p className="text-gray-300 mb-4">{selectedSystemData.description}</p>

          <div className="flex gap-4 mb-6">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-4 py-2">
              <div className="text-xs text-gray-400">Win Rate</div>
              <div className="text-lg font-bold text-blue-400">{selectedSystemData.winRate}</div>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2">
              <div className="text-xs text-gray-400">Risk:Reward</div>
              <div className="text-lg font-bold text-green-400">{selectedSystemData.riskReward}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <span>🟢</span> Entry Rules
              </h5>
              <ul className="space-y-2">
                {selectedSystemData.entry.map((rule, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 font-bold">{idx + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <span>🔴</span> Exit Rules
              </h5>
              <ul className="space-y-2">
                {selectedSystemData.exit.map((rule, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 font-bold">{idx + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h5 className="text-blue-400 font-semibold mb-3">Key Indicators:</h5>
            <div className="flex flex-wrap gap-2">
              {selectedSystemData.indicators.map((indicator, idx) => (
                <Badge key={idx} variant="secondary" className="px-3 py-1">
                  {indicator}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-green-400 font-semibold mb-2">Strengths:</h5>
              <ul className="space-y-1">
                {selectedSystemData.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-green-400">+</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-yellow-400 font-semibold mb-2">Weaknesses:</h5>
              <ul className="space-y-1">
                {selectedSystemData.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-yellow-400">-</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Building Your Trading Plan */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">📝</span>
          Building Your Trading Plan
        </h3>
        <p className="text-gray-300 mb-6">
          A trading plan is your roadmap to success. It combines your chosen style and system with specific rules
          tailored to your situation. Here's what every trading plan must include:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <span>1️⃣</span> Market Selection
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Which cryptocurrencies will you trade?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>What are the minimum volume requirements?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Which exchanges will you use?</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <span>2️⃣</span> Timeframe & Schedule
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>What timeframe charts will you use?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>When will you actively trade?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>How much time can you dedicate daily?</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <span>3️⃣</span> Entry Criteria
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Specific setup requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Indicator confirmations needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Entry trigger (market/limit order)</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
              <span>4️⃣</span> Exit Criteria
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Stop-loss placement rules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Take-profit targets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Trailing stop strategy</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <span>5️⃣</span> Risk Management
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Risk per trade (% of capital)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Maximum daily/weekly loss limit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Position sizing formula</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
              <span>6️⃣</span> Record Keeping
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Trading journal format</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>What to record for each trade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Weekly/monthly review process</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Golden Rules for Strategy Success */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">👑</span>
          Golden Rules for Strategy Success
        </h3>

        <div className="space-y-3">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-1">Master ONE Strategy First</h4>
                <p className="text-sm text-gray-300">
                  Don't jump between strategies. Pick one that fits your lifestyle and master it through at least
                  100 trades before considering others. Jack of all trades, master of none = broke trader.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">Backtest Before Live Trading</h4>
                <p className="text-sm text-gray-300">
                  Test your strategy on historical data. If it doesn't work in backtesting, it won't work live.
                  Aim for at least 100 backtested trades with positive expectancy before risking real money.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <h4 className="font-semibold text-green-400 mb-1">Paper Trade First</h4>
                <p className="text-sm text-gray-300">
                  After backtesting, paper trade (simulate trades) for at least 1 month. This tests your ability
                  to execute the strategy in real-time without risking capital. Track every trade as if it's real.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <div>
                <h4 className="font-semibold text-purple-400 mb-1">Follow Your Rules Religiously</h4>
                <p className="text-sm text-gray-300">
                  Your strategy is only as good as your discipline to follow it. Breaking rules "just this once"
                  becomes a habit that destroys accounts. If you can't follow your own rules, you can't trade.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">5️⃣</span>
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Adapt to Market Conditions</h4>
                <p className="text-sm text-gray-300">
                  No strategy works in all market conditions. Trend systems fail in ranges, range systems fail in
                  trends. Learn to identify market regime and either adapt your strategy or sit out unfavorable conditions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">6️⃣</span>
              <div>
                <h4 className="font-semibold text-orange-400 mb-1">Review and Improve Weekly</h4>
                <p className="text-sm text-gray-300">
                  Every week, review all your trades. What worked? What didn't? Are you following your plan? Use
                  this feedback to refine your strategy incrementally. Small improvements compound over time.
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
            <h4 className="font-semibold text-blue-400 mb-2">Choose Your Style</h4>
            <p className="text-sm text-gray-300">
              Pick a trading style that matches your time availability, personality, and goals. Don't force
              yourself into a style that doesn't fit your life.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">System Over Emotion</h4>
            <p className="text-sm text-gray-300">
              A trading system removes emotion from trading. Follow your system even when it feels wrong.
              Consistency beats occasional brilliance.
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Plan Everything</h4>
            <p className="text-sm text-gray-300">
              Your trading plan should answer every question before you take a trade. If your plan doesn't
              cover something, add it after review.
            </p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2">Test, Test, Test</h4>
            <p className="text-sm text-gray-300">
              Never trade a strategy with real money until you've backtested and paper traded it successfully.
              Your capital is too valuable to experiment with.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-purple-400">Remember:</strong> The best trading strategy is the one you can
            execute consistently. A simple strategy followed religiously beats a complex strategy followed poorly.
            Start simple, master the basics, then add complexity only if needed.
          </p>
        </div>
      </Card>
    </StageLayout>
  )
}
