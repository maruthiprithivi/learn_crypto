'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function TradingStage1() {
  const [portfolio, setPortfolio] = useState({
    cash: 10000,
    btc: 0,
    eth: 0,
    sol: 0,
  })
  const [prices] = useState({
    btc: 45000,
    eth: 2500,
    sol: 100,
  })
  const [tradeAmount, setTradeAmount] = useState(1000)
  const [selectedCrypto, setSelectedCrypto] = useState('btc')
  const [tradeHistory, setTradeHistory] = useState([])
  const [selectedScenario, setSelectedScenario] = useState(null)

  const scenarios = [
    {
      title: "Scenario 1: The FOMO Trade",
      question: "Bitcoin just jumped 20% in one day. Your friend says 'buy now or miss out!' What do you do?",
      options: [
        { text: "Buy immediately with all my money", isCorrect: false, explanation: "❌ This is FOMO (Fear of Missing Out). Prices often correct after sudden pumps. You'd likely buy at the peak!" },
        { text: "Research why it pumped, then decide", isCorrect: true, explanation: "✅ Smart! Understanding the reason helps you make informed decisions, not emotional ones." },
        { text: "Wait for a dip to buy", isCorrect: true, explanation: "✅ Good strategy! Patience often pays off. Markets are volatile and corrections happen." },
      ]
    },
    {
      title: "Scenario 2: The Crash",
      question: "You bought at $50,000. Bitcoin crashes to $30,000 (-40%). What's your move?",
      options: [
        { text: "Panic sell everything to stop losses", isCorrect: false, explanation: "❌ Panic selling locks in your losses. The market is cyclical - patience is key." },
        { text: "Hold if my research is still valid", isCorrect: true, explanation: "✅ If fundamentals haven't changed, the dip might be temporary. Don't let emotions drive decisions." },
        { text: "Average down by buying more", isCorrect: true, explanation: "✅ If you believe in the asset long-term, buying the dip lowers your average cost. But only invest what you can afford!" },
      ]
    },
    {
      title: "Scenario 3: Too Good to Be True",
      question: "A new token promises '1000x returns in 30 days!' What do you think?",
      options: [
        { text: "Invest everything! I'll be rich!", isCorrect: false, explanation: "❌ If it sounds too good to be true, it probably is. This is likely a scam or rug pull." },
        { text: "Invest a small amount to test", isCorrect: false, explanation: "❌ Even small amounts can be lost. Unrealistic promises are major red flags." },
        { text: "Avoid it - it's likely a scam", isCorrect: true, explanation: "✅ Correct! No legitimate investment promises guaranteed 1000x returns. This screams scam." },
      ]
    },
  ]

  const buyCrypto = () => {
    const cryptoPrice = prices[selectedCrypto]
    const amount = tradeAmount / cryptoPrice

    if (portfolio.cash < tradeAmount) {
      alert('Insufficient cash!')
      return
    }

    setPortfolio({
      ...portfolio,
      cash: portfolio.cash - tradeAmount,
      [selectedCrypto]: portfolio[selectedCrypto] + amount,
    })

    addToHistory('BUY', selectedCrypto.toUpperCase(), amount, cryptoPrice)
  }

  const sellCrypto = () => {
    const cryptoPrice = prices[selectedCrypto]
    const amountToSell = tradeAmount / cryptoPrice

    if (portfolio[selectedCrypto] < amountToSell) {
      alert('Insufficient crypto!')
      return
    }

    setPortfolio({
      ...portfolio,
      cash: portfolio.cash + tradeAmount,
      [selectedCrypto]: portfolio[selectedCrypto] - amountToSell,
    })

    addToHistory('SELL', selectedCrypto.toUpperCase(), amountToSell, cryptoPrice)
  }

  const addToHistory = (action, crypto, amount, price) => {
    setTradeHistory([
      { action, crypto, amount, price, time: new Date().toLocaleTimeString() },
      ...tradeHistory.slice(0, 9)
    ])
  }

  const totalPortfolioValue = portfolio.cash +
    (portfolio.btc * prices.btc) +
    (portfolio.eth * prices.eth) +
    (portfolio.sol * prices.sol)

  return (
    <StageLayout
      trackName="Trading & Security Track"
      trackHref="/trading-security"
      trackColor="security"
      stageNumber={1}
      stageTitle="Trading Basics 101"
      stageDescription="Learn fundamental trading concepts and avoid common pitfalls"
      nextStageHref="/trading-security/stage-2"
      estimatedTime="30 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">📈</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome to Crypto Trading</h2>
            <p className="text-gray-400">Learn the fundamentals before risking real money</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <span className="font-bold text-red-400">⚠️ Educational Disclaimer:</span> This is a simulation for learning only.
            Real trading involves significant risk. Never invest more than you can afford to lose. This is NOT financial advice!
          </p>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💼 Simulated Trading Portfolio</h3>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Total Portfolio Value</div>
              <div className="text-3xl font-bold text-white">${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-xs text-gray-500 mt-1">
                P/L: ${(totalPortfolioValue - 10000).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                ({((totalPortfolioValue - 10000) / 10000 * 100).toFixed(2)}%)
              </div>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Cash Balance</div>
            <div className="text-2xl font-bold text-green-400">${portfolio.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">Crypto Holdings Value</div>
            <div className="text-2xl font-bold text-blue-400">
              ${((portfolio.btc * prices.btc) + (portfolio.eth * prices.eth) + (portfolio.sol * prices.sol)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500">Bitcoin</div>
            <div className="text-lg font-bold text-orange-400">{portfolio.btc.toFixed(6)} BTC</div>
            <div className="text-xs text-gray-500">${(portfolio.btc * prices.btc).toLocaleString()}</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500">Ethereum</div>
            <div className="text-lg font-bold text-blue-400">{portfolio.eth.toFixed(6)} ETH</div>
            <div className="text-xs text-gray-500">${(portfolio.eth * prices.eth).toLocaleString()}</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500">Solana</div>
            <div className="text-lg font-bold text-green-400">{portfolio.sol.toFixed(6)} SOL</div>
            <div className="text-xs text-gray-500">${(portfolio.sol * prices.sol).toLocaleString()}</div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔄 Make a Trade (Simulated)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Cryptocurrency</label>
            <div className="grid grid-cols-3 gap-3">
              {['btc', 'eth', 'sol'].map(crypto => (
                <button
                  key={crypto}
                  onClick={() => setSelectedCrypto(crypto)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedCrypto === crypto
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <div className="font-bold text-sm">{crypto.toUpperCase()}</div>
                  <div className="text-xs">${prices[crypto].toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Trade Amount (USD)</label>
            <input
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(parseFloat(e.target.value) || 0)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              placeholder="1000"
            />
            <p className="text-xs text-gray-500 mt-1">
              = {(tradeAmount / prices[selectedCrypto]).toFixed(6)} {selectedCrypto.toUpperCase()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={buyCrypto} variant="success" className="w-full">
              🟢 Buy {selectedCrypto.toUpperCase()}
            </Button>
            <Button onClick={sellCrypto} variant="danger" className="w-full">
              🔴 Sell {selectedCrypto.toUpperCase()}
            </Button>
          </div>
        </div>
      </Card>

      {tradeHistory.length > 0 && (
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">📜 Trade History</h3>
          <div className="space-y-2">
            {tradeHistory.map((trade, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    trade.action === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {trade.action}
                  </span>
                  <div>
                    <div className="text-white font-bold text-sm">
                      {trade.amount.toFixed(6)} {trade.crypto}
                    </div>
                    <div className="text-xs text-gray-500">@ ${trade.price.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{trade.time}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🧠 Test Your Trading Knowledge</h3>
        <p className="text-gray-400 mb-4">Real trading scenarios - what would YOU do?</p>

        <div className="space-y-4">
          {scenarios.map((scenario, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2">{scenario.title}</h4>
              <p className="text-sm text-gray-300 mb-3">{scenario.question}</p>
              <div className="space-y-2">
                {scenario.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => setSelectedScenario({ scenarioIdx: idx, optionIdx: optIdx })}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedScenario?.scenarioIdx === idx && selectedScenario?.optionIdx === optIdx
                        ? option.isCorrect
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-red-500 bg-red-500/10'
                        : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                    }`}
                  >
                    <div className="text-sm text-white">{option.text}</div>
                    {selectedScenario?.scenarioIdx === idx && selectedScenario?.optionIdx === optIdx && (
                      <div className="mt-2 text-xs text-gray-300 animate-fade-in">{option.explanation}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📚 Essential Trading Concepts</h3>
        <div className="space-y-3">
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-purple-400 mb-2">💎 HODL vs Trading</h4>
            <p className="text-sm text-gray-300">
              <span className="font-bold">HODL</span> (Hold On for Dear Life): Buy and hold long-term, regardless of price swings.
              Good for believers in the technology. <span className="font-bold">Trading</span>: Buy low, sell high repeatedly.
              Requires time, skill, and emotional control.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-blue-400 mb-2">📊 Market Orders vs Limit Orders</h4>
            <p className="text-sm text-gray-300">
              <span className="font-bold">Market Order</span>: Buy/sell immediately at current price. Fast but you might get a worse price.
              <span className="font-bold"> Limit Order</span>: Set your price - trade only executes if price reaches your target. More control.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-2">🎯 Dollar-Cost Averaging (DCA)</h4>
            <p className="text-sm text-gray-300">
              Instead of investing $10,000 at once, invest $1,000 monthly for 10 months. This reduces impact of volatility
              and removes emotion from timing. Popular strategy for long-term investors.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-yellow-400 mb-2">⚖️ Risk Management</h4>
            <p className="text-sm text-gray-300">
              Never invest more than you can afford to lose. Diversify (don't put everything in one coin). Use stop-losses
              to limit downside. The golden rule: <span className="font-bold text-yellow-400">Only risk 1-5% of your portfolio per trade.</span>
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2">😱 FOMO & FUD</h4>
            <p className="text-sm text-gray-300">
              <span className="font-bold">FOMO</span> (Fear of Missing Out): Buying because everyone else is. Usually leads to buying at peaks.
              <span className="font-bold"> FUD</span> (Fear, Uncertainty, Doubt): Negative news causing panic selling. Don't let emotions drive decisions!
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-purple-500/10 border-purple-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Never invest more than you can afford to lose - crypto is highly volatile</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Emotion is your enemy - FOMO and panic selling destroy portfolios</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Dollar-cost averaging removes timing stress and reduces volatility impact</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>If it sounds too good to be true, it probably is - avoid scam promises</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Practice with simulations before risking real money!</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
