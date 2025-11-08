'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Stage3() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'trading-security'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 3 < maxStage ? 3 + 1 : null

  const [selectedChart, setSelectedChart] = useState('candlestick')
  const [selectedIndicator, setSelectedIndicator] = useState('ma')

  // Chart Types
  const chartTypes = {
    candlestick: {
      name: 'Candlestick Chart',
      icon: '🕯️',
      description: 'Shows open, high, low, close (OHLC) data',
      pros: ['Most informative', 'Shows price action', 'Industry standard'],
      useCase: 'Default choice for most traders',
      color: 'green'
    },
    line: {
      name: 'Line Chart',
      icon: '📈',
      description: 'Connects closing prices with a line',
      pros: ['Simple', 'Clear trend view', 'Less noise'],
      useCase: 'Quick trend overview',
      color: 'blue'
    },
    bar: {
      name: 'Bar Chart',
      icon: '📊',
      description: 'Vertical bars showing OHLC data',
      pros: ['Shows all price data', 'Easy to read', 'Classic'],
      useCase: 'Alternative to candlesticks',
      color: 'purple'
    },
    heikinAshi: {
      name: 'Heikin-Ashi',
      icon: '🎌',
      description: 'Modified candlesticks that smooth trends',
      pros: ['Filters noise', 'Clear trends', 'Fewer false signals'],
      useCase: 'Trend trading',
      color: 'orange'
    }
  }

  // Technical Indicators
  const indicators = {
    ma: {
      name: 'Moving Averages (MA)',
      type: 'Trend',
      icon: '📉',
      description: 'Average price over a period, smooths out noise',
      types: ['SMA (Simple)', 'EMA (Exponential)', 'WMA (Weighted)'],
      signals: ['Price above MA = bullish', 'Price below MA = bearish', 'MA crossovers = trend change'],
      common: '50 MA, 100 MA, 200 MA',
      color: 'blue'
    },
    rsi: {
      name: 'RSI (Relative Strength Index)',
      type: 'Momentum',
      icon: '⚡',
      description: 'Measures speed and magnitude of price changes',
      range: '0-100',
      signals: ['Above 70 = overbought', 'Below 30 = oversold', 'Divergences signal reversals'],
      common: '14-period RSI',
      color: 'purple'
    },
    macd: {
      name: 'MACD',
      type: 'Momentum & Trend',
      icon: '🔄',
      description: 'Shows relationship between two moving averages',
      components: ['MACD Line', 'Signal Line', 'Histogram'],
      signals: ['MACD crosses above signal = buy', 'MACD crosses below signal = sell', 'Divergences'],
      common: '12, 26, 9 settings',
      color: 'green'
    },
    bb: {
      name: 'Bollinger Bands',
      type: 'Volatility',
      icon: '📊',
      description: 'Price channel with standard deviations',
      components: ['Middle Band (20 SMA)', 'Upper Band (+2σ)', 'Lower Band (-2σ)'],
      signals: ['Price at upper band = overbought', 'Price at lower band = oversold', 'Squeeze = breakout coming'],
      common: '20, 2 settings',
      color: 'yellow'
    },
    volume: {
      name: 'Volume',
      type: 'Confirmation',
      icon: '📊',
      description: 'Amount of asset traded in a period',
      importance: 'Confirms trend strength',
      signals: ['High volume + price up = strong uptrend', 'High volume + price down = strong downtrend', 'Low volume = weak move'],
      common: 'Always displayed',
      color: 'cyan'
    },
    fibonacci: {
      name: 'Fibonacci Retracement',
      type: 'Support/Resistance',
      icon: '🔢',
      description: 'Horizontal lines at key Fibonacci levels',
      levels: ['23.6%', '38.2%', '50%', '61.8%', '78.6%'],
      signals: ['Identifies potential reversal levels', 'Support/resistance zones', 'Entry/exit points'],
      common: 'Draw from swing low to high',
      color: 'orange'
    }
  }

  // Candlestick Patterns
  const candlePatterns = {
    bullish: [
      { name: 'Hammer', description: 'Small body, long lower wick at bottom of downtrend', strength: 'Strong reversal' },
      { name: 'Bullish Engulfing', description: 'Large green candle engulfs previous red candle', strength: 'Very strong' },
      { name: 'Morning Star', description: 'Three-candle pattern: down, small, up', strength: 'Strong reversal' },
      { name: 'Three White Soldiers', description: 'Three consecutive long green candles', strength: 'Very bullish' }
    ],
    bearish: [
      { name: 'Shooting Star', description: 'Small body, long upper wick at top of uptrend', strength: 'Strong reversal' },
      { name: 'Bearish Engulfing', description: 'Large red candle engulfs previous green candle', strength: 'Very strong' },
      { name: 'Evening Star', description: 'Three-candle pattern: up, small, down', strength: 'Strong reversal' },
      { name: 'Three Black Crows', description: 'Three consecutive long red candles', strength: 'Very bearish' }
    ]
  }

  // Support & Resistance
  const supportResistance = {
    support: {
      name: 'Support Level',
      icon: '🛡️',
      description: 'Price level where buying pressure prevents further decline',
      identification: ['Previous lows', 'Round numbers', 'Moving averages', 'Fibonacci levels'],
      trading: ['Buy near support', 'Stop-loss below support', 'Watch for break']
    },
    resistance: {
      name: 'Resistance Level',
      icon: '🚧',
      description: 'Price level where selling pressure prevents further rise',
      identification: ['Previous highs', 'Round numbers', 'Moving averages', 'Fibonacci levels'],
      trading: ['Sell near resistance', 'Buy breakout above', 'Watch for rejection']
    }
  }

  // Trend Analysis
  const trends = {
    uptrend: {
      name: 'Uptrend',
      icon: '📈',
      definition: 'Series of higher highs and higher lows',
      characteristics: ['Price above rising MAs', 'Strong volume on up moves', 'Support holds'],
      strategy: 'Buy dips, ride the trend',
      color: 'green'
    },
    downtrend: {
      name: 'Downtrend',
      icon: '📉',
      definition: 'Series of lower highs and lower lows',
      characteristics: ['Price below falling MAs', 'Strong volume on down moves', 'Resistance holds'],
      strategy: 'Sell rallies, short or stay out',
      color: 'red'
    },
    sideways: {
      name: 'Sideways/Range',
      icon: '↔️',
      definition: 'Price oscillates between support and resistance',
      characteristics: ['Horizontal MAs', 'Choppy price action', 'Both levels hold'],
      strategy: 'Buy support, sell resistance, or wait',
      color: 'yellow'
    }
  }

  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={3}
      stageTitle="Technical Analysis Basics"
      stageDescription="Master chart reading, indicators, patterns, and trend analysis for crypto trading"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="30 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">📈 Technical Analysis Basics</h2>
        <p className="text-gray-300 mb-4">
          Technical Analysis (TA) is the study of price charts and trading volume to identify patterns and predict
          future price movements. It's the foundation of most trading strategies in crypto markets.
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
          <h3 className="font-bold text-white mb-2">🎯 What You'll Learn</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Reading different chart types and timeframes</li>
            <li>• Essential technical indicators and how to use them</li>
            <li>• Candlestick patterns for entry/exit signals</li>
            <li>• Support and resistance levels</li>
            <li>• Identifying and trading trends</li>
          </ul>
        </div>
      </Card>

      {/* Chart Types */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📊 Chart Types</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(chartTypes).map(([key, chart]) => (
            <button
              key={key}
              onClick={() => setSelectedChart(key)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedChart === key
                  ? `bg-${chart.color}-500/20 border-${chart.color}-500/50`
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{chart.icon}</span>
                <h4 className="font-bold text-white">{chart.name}</h4>
              </div>
              <p className="text-sm text-gray-400 mb-2">{chart.description}</p>
              <div className="text-xs text-gray-500 mb-2">Use Case: {chart.useCase}</div>
              <div className="flex flex-wrap gap-1">
                {chart.pros.map((pro, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {pro}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-bold text-blue-400 mb-2">🕐 Timeframes Matter</h4>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div>
              <div className="font-semibold text-white mb-1">Short-term (Scalping/Day Trading)</div>
              <div className="text-gray-300">1m, 5m, 15m, 1h charts</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Medium-term (Swing Trading)</div>
              <div className="text-gray-300">4h, 1D charts</div>
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Long-term (Position Trading)</div>
              <div className="text-gray-300">1D, 1W, 1M charts</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Technical Indicators */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔧 Essential Technical Indicators</h3>

        <Tabs value={selectedIndicator} onValueChange={setSelectedIndicator} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6">
            {Object.keys(indicators).map(key => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {indicators[key].icon}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(indicators).map(([key, indicator]) => (
            <TabsContent key={key} value={key}>
              <div className={`bg-gradient-to-br from-${indicator.color}-500/10 to-${indicator.color}-600/10 border border-${indicator.color}-500/30 rounded-lg p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{indicator.icon}</span>
                  <div>
                    <h4 className="text-xl font-bold text-white">{indicator.name}</h4>
                    <Badge variant="outline">{indicator.type}</Badge>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{indicator.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">
                      {indicator.types ? 'Types' : indicator.components ? 'Components' : indicator.levels ? 'Levels' : 'Key Info'}
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {(indicator.types || indicator.components || indicator.levels || [indicator.range || indicator.importance]).map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Trading Signals</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {indicator.signals.map((signal, idx) => (
                        <li key={idx}>• {signal}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Common Settings:</div>
                  <div className="text-sm text-white font-semibold">{indicator.common}</div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="font-bold text-yellow-400 mb-2">⚠️ Indicator Tips</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Don't rely on a single indicator - use multiple for confirmation</li>
            <li>• Indicators lag price - they show what happened, not what will happen</li>
            <li>• Different indicators work better in different market conditions</li>
            <li>• Less is more - too many indicators create confusion</li>
          </ul>
        </div>
      </Card>

      {/* Candlestick Patterns */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🕯️ Candlestick Patterns</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-6">
            <h4 className="text-lg font-bold text-green-400 mb-4">📈 Bullish Patterns</h4>
            <div className="space-y-3">
              {candlePatterns.bullish.map((pattern, idx) => (
                <div key={idx} className="bg-black/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-white">{pattern.name}</div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      {pattern.strength}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300">{pattern.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg p-6">
            <h4 className="text-lg font-bold text-red-400 mb-4">📉 Bearish Patterns</h4>
            <div className="space-y-3">
              {candlePatterns.bearish.map((pattern, idx) => (
                <div key={idx} className="bg-black/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-white">{pattern.name}</div>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                      {pattern.strength}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300">{pattern.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-bold text-purple-400 mb-2">💡 Pattern Trading Tips</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Patterns are more reliable on higher timeframes (4h, 1D)</li>
            <li>• Always wait for confirmation (next candle)</li>
            <li>• Check volume - high volume strengthens the signal</li>
            <li>• Combine with support/resistance for better entries</li>
          </ul>
        </div>
      </Card>

      {/* Support & Resistance */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Support & Resistance</h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {Object.entries(supportResistance).map(([key, level]) => (
            <div key={key} className={`bg-gradient-to-br ${
              key === 'support' ? 'from-green-500/10 to-blue-500/10 border-green-500/30' : 'from-red-500/10 to-orange-500/10 border-red-500/30'
            } border rounded-lg p-6`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{level.icon}</span>
                <h4 className="text-lg font-bold text-white">{level.name}</h4>
              </div>
              <p className="text-sm text-gray-300 mb-4">{level.description}</p>

              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-400 mb-1">How to Identify:</div>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {level.identification.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-semibold text-gray-400 mb-1">Trading Strategy:</div>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {level.trading.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-bold text-blue-400 mb-2">🔄 Role Reversal</h4>
          <p className="text-sm text-gray-300">
            When support breaks, it often becomes resistance. When resistance breaks, it often becomes support.
            This "role reversal" is a key concept for identifying strong entry points after breakouts.
          </p>
        </div>
      </Card>

      {/* Trend Analysis */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📊 Trend Analysis</h3>

        <div className="space-y-4">
          {Object.entries(trends).map(([key, trend]) => (
            <div key={key} className={`bg-gradient-to-r from-${trend.color}-500/10 to-${trend.color}-600/10 border border-${trend.color}-500/30 rounded-lg p-6`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{trend.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold text-white">{trend.name}</h4>
                    <div className="text-sm text-gray-400">{trend.definition}</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-gray-400 mb-2">Characteristics:</div>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {trend.characteristics.map((char, idx) => (
                      <li key={idx}>• {char}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 mb-2">Strategy:</div>
                  <div className={`text-sm font-semibold text-${trend.color}-400`}>
                    {trend.strategy}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-bold text-purple-400 mb-2">💎 The Golden Rule</h4>
          <p className="text-lg text-white font-semibold mb-2">
            "The trend is your friend (until it ends)"
          </p>
          <p className="text-sm text-gray-300">
            Trading with the trend has higher probability of success than counter-trend trading.
            However, be ready to exit when the trend shows signs of reversing.
          </p>
        </div>
      </Card>

      {/* Putting It All Together */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Putting It All Together</h3>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-3">Step-by-Step Analysis Process</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">1</Badge>
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Identify the trend</strong> on higher timeframe (1D or 4h)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">2</Badge>
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Mark support and resistance</strong> levels
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">3</Badge>
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Check indicators</strong> for confluence (RSI, MACD, volume)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">4</Badge>
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Look for entry signals</strong> (patterns, breakouts, bounces)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">5</Badge>
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Set stop-loss and take-profit</strong> based on S/R levels
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">6</Badge>
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Monitor and manage</strong> the trade
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-bold text-green-400 mb-2">✅ Best Practices</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Multiple timeframe analysis</li>
                <li>• Wait for confirmation</li>
                <li>• Trade with the trend</li>
                <li>• Use confluence of signals</li>
                <li>• Always have a plan</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-bold text-red-400 mb-2">❌ Common Mistakes</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Over-reliance on indicators</li>
                <li>• Ignoring the trend</li>
                <li>• Trading every signal</li>
                <li>• Analysis paralysis</li>
                <li>• No risk management</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Learnings */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Candlestick charts:</strong> Most informative chart type showing OHLC data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Moving averages:</strong> Smooth price action and identify trend direction</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>RSI & MACD:</strong> Momentum indicators that show overbought/oversold conditions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Support & resistance:</strong> Key price levels where reversals are likely</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Trend is your friend:</strong> Trading with the trend increases success probability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Candlestick patterns:</strong> Visual signals for potential reversals or continuations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 mt-1">!</span>
            <span><strong>Use confluence:</strong> Combine multiple indicators and signals for better accuracy</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
