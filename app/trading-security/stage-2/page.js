'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Stage2() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'trading-security'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 2 < maxStage ? 2 + 1 : null

  // Order Book State
  const [selectedOrderType, setSelectedOrderType] = useState('market')
  const [orderSide, setOrderSide] = useState('buy')
  const [orderAmount, setOrderAmount] = useState(1)
  const [limitPrice, setLimitPrice] = useState(50000)
  const [stopPrice, setStopPrice] = useState(48000)

  // Mock market price
  const currentPrice = 50000

  // Mock Order Book Data
  const orderBook = {
    bids: [
      { price: 49995, amount: 2.5, total: 124987.5 },
      { price: 49990, amount: 1.8, total: 89982 },
      { price: 49985, amount: 3.2, total: 159952 },
      { price: 49980, amount: 1.5, total: 74970 },
      { price: 49975, amount: 4.1, total: 204897.5 },
      { price: 49970, amount: 2.3, total: 114931 },
      { price: 49965, amount: 1.9, total: 94933.5 },
      { price: 49960, amount: 2.7, total: 134892 },
    ],
    asks: [
      { price: 50005, amount: 1.2, total: 60006 },
      { price: 50010, amount: 3.4, total: 170034 },
      { price: 50015, amount: 2.1, total: 105031.5 },
      { price: 50020, amount: 1.6, total: 80032 },
      { price: 50025, amount: 2.8, total: 140070 },
      { price: 50030, amount: 1.4, total: 70042 },
      { price: 50035, amount: 3.3, total: 165115.5 },
      { price: 50040, amount: 2.5, total: 125100 },
    ]
  }

  // Order Types
  const orderTypes = {
    market: {
      name: 'Market Order',
      icon: '⚡',
      description: 'Executes immediately at the best available price',
      pros: ['Guaranteed execution', 'Instant', 'Simple to use'],
      cons: ['Price uncertainty', 'Slippage risk', 'Higher fees'],
      useCase: 'When you need to enter/exit quickly',
      color: 'blue'
    },
    limit: {
      name: 'Limit Order',
      icon: '🎯',
      description: 'Executes only at your specified price or better',
      pros: ['Price control', 'Lower fees', 'No slippage'],
      cons: ['May not execute', 'Requires patience', 'Can miss moves'],
      useCase: 'When you want a specific price',
      color: 'purple'
    },
    stopLoss: {
      name: 'Stop-Loss Order',
      icon: '🛡️',
      description: 'Triggers a market order when price reaches stop level',
      pros: ['Risk management', 'Automated', 'Prevents large losses'],
      cons: ['Can trigger on wicks', 'Slippage', 'May execute poorly'],
      useCase: 'To limit losses on positions',
      color: 'red'
    },
    stopLimit: {
      name: 'Stop-Limit Order',
      icon: '🎚️',
      description: 'Triggers a limit order when stop price is reached',
      pros: ['Price control', 'Risk management', 'No slippage'],
      cons: ['May not execute', 'Complex', 'Double uncertainty'],
      useCase: 'When you need both control and protection',
      color: 'orange'
    },
    trailingStop: {
      name: 'Trailing Stop',
      icon: '📈',
      description: 'Stop that follows price at a set distance',
      pros: ['Locks in profits', 'Automated', 'Follows trends'],
      cons: ['Can trigger early', 'Complex setup', 'Slippage'],
      useCase: 'To let winners run while protecting gains',
      color: 'green'
    },
    oco: {
      name: 'OCO (One-Cancels-Other)',
      icon: '⚖️',
      description: 'Two orders where execution of one cancels the other',
      pros: ['Covers both scenarios', 'Automated', 'Strategic'],
      cons: ['Complex', 'Requires planning', 'Not always available'],
      useCase: 'Breakout trades with both profit and stop',
      color: 'cyan'
    }
  }

  // Calculate order execution
  const calculateExecution = () => {
    if (selectedOrderType === 'market') {
      const orders = orderSide === 'buy' ? orderBook.asks : orderBook.bids
      return {
        price: orders[0].price,
        amount: orderAmount,
        total: orders[0].price * orderAmount,
        type: 'Instant execution'
      }
    } else if (selectedOrderType === 'limit') {
      return {
        price: limitPrice,
        amount: orderAmount,
        total: limitPrice * orderAmount,
        type: limitPrice > currentPrice ? 'Pending (above market)' : 'Pending (below market)'
      }
    } else if (selectedOrderType === 'stopLoss') {
      return {
        price: stopPrice,
        amount: orderAmount,
        total: stopPrice * orderAmount,
        type: stopPrice < currentPrice ? 'Stop-loss set' : 'Invalid (stop above market)'
      }
    }
    return { price: 0, amount: 0, total: 0, type: 'Unknown' }
  }

  // Calculate spread
  const calculateSpread = () => {
    const bestBid = orderBook.bids[0].price
    const bestAsk = orderBook.asks[0].price
    const spread = bestAsk - bestBid
    const spreadPercent = (spread / currentPrice) * 100
    return { spread, spreadPercent, bestBid, bestAsk }
  }

  const spreadData = calculateSpread()
  const execution = calculateExecution()

  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={2}
      stageTitle="Market Basics & Order Types"
      stageDescription="Learn how cryptocurrency markets work, understand different order types, and master the order book"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="25 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">📊 Market Basics & Order Types</h2>
        <p className="text-gray-300 mb-4">
          Understanding how crypto markets work is fundamental to successful trading. Learn about order types,
          the order book, bid-ask spreads, and how trades are executed on exchanges.
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
          <h3 className="font-bold text-white mb-2">🎯 What You'll Master</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• How cryptocurrency markets and exchanges operate</li>
            <li>• Different order types and when to use them</li>
            <li>• Reading and understanding the order book</li>
            <li>• Bid-ask spreads and market depth</li>
            <li>• Makers vs takers and fee structures</li>
          </ul>
        </div>
      </Card>

      {/* How Markets Work */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🏢 How Crypto Markets Work</h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">📈 The Order Book</h4>
            <p className="text-sm text-gray-300 mb-3">
              The order book is a real-time list of all buy and sell orders for a trading pair. It shows
              the supply and demand at different price levels, helping traders make informed decisions.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                <div className="font-semibold text-green-400 mb-1">Buy Side (Bids)</div>
                <div className="text-xs text-gray-300">Orders to buy at specified prices</div>
                <div className="text-xs text-gray-400 mt-1">Higher prices = willing to pay more</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                <div className="font-semibold text-red-400 mb-1">Sell Side (Asks)</div>
                <div className="text-xs text-gray-300">Orders to sell at specified prices</div>
                <div className="text-xs text-gray-400 mt-1">Lower prices = willing to accept less</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-bold text-white mb-2">Makers vs Takers</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>Maker:</strong> Adds liquidity with limit orders</li>
                <li>• <strong>Taker:</strong> Removes liquidity with market orders</li>
                <li>• Makers typically pay lower fees (or get rebates)</li>
                <li>• Takers pay higher fees for instant execution</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4">
              <div className="text-2xl mb-2">💱</div>
              <h4 className="font-bold text-white mb-2">Trading Pairs</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>BTC/USDT:</strong> Bitcoin priced in Tether</li>
                <li>• <strong>ETH/BTC:</strong> Ethereum priced in Bitcoin</li>
                <li>• <strong>SOL/USD:</strong> Solana priced in US Dollar</li>
                <li>• Base currency vs Quote currency</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Order Book */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📚 Interactive Order Book</h3>
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-400">BTC/USDT</div>
              <div className="text-3xl font-bold text-white">${currentPrice.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Spread</div>
              <div className="text-xl font-bold text-yellow-400">
                ${spreadData.spread.toFixed(2)} ({spreadData.spreadPercent.toFixed(3)}%)
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Bids (Buy Orders) */}
            <div>
              <h4 className="font-semibold text-green-400 mb-2 text-sm">Bids (Buy Orders)</h4>
              <div className="space-y-1">
                {orderBook.bids.map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-green-500/5 hover:bg-green-500/10 rounded px-2 py-1 transition-colors">
                    <span className="text-green-400 font-mono">${order.price.toLocaleString()}</span>
                    <span className="text-white font-mono">{order.amount}</span>
                    <span className="text-gray-400 font-mono">${order.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Asks (Sell Orders) */}
            <div>
              <h4 className="font-semibold text-red-400 mb-2 text-sm">Asks (Sell Orders)</h4>
              <div className="space-y-1">
                {orderBook.asks.map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-red-500/5 hover:bg-red-500/10 rounded px-2 py-1 transition-colors">
                    <span className="text-red-400 font-mono">${order.price.toLocaleString()}</span>
                    <span className="text-white font-mono">{order.amount}</span>
                    <span className="text-gray-400 font-mono">${order.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Price</span>
              <span className="text-gray-400">Amount (BTC)</span>
              <span className="text-gray-400">Total (USDT)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-bold text-blue-400 mb-2">📖 Reading the Order Book</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <strong>Best Bid (${spreadData.bestBid.toLocaleString()}):</strong> Highest price someone will pay</li>
            <li>• <strong>Best Ask (${spreadData.bestAsk.toLocaleString()}):</strong> Lowest price someone will sell</li>
            <li>• <strong>Spread:</strong> Difference between best bid and ask</li>
            <li>• <strong>Market Depth:</strong> Total volume at each price level</li>
            <li>• <strong>Liquidity:</strong> Tighter spreads = more liquid market</li>
          </ul>
        </div>
      </Card>

      {/* Order Types */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Order Types Explained</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(orderTypes).map(([key, type]) => (
            <button
              key={key}
              onClick={() => setSelectedOrderType(key)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedOrderType === key
                  ? `bg-${type.color}-500/20 border-${type.color}-500/50`
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{type.icon}</span>
                <div>
                  <h4 className="font-bold text-white">{type.name}</h4>
                  <div className="text-xs text-gray-400">{type.useCase}</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3">{type.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-500/10 rounded p-2">
                  <div className="font-semibold text-green-400 mb-1">Pros:</div>
                  {type.pros.slice(0, 2).map((pro, idx) => (
                    <div key={idx} className="text-gray-300">• {pro}</div>
                  ))}
                </div>
                <div className="bg-red-500/10 rounded p-2">
                  <div className="font-semibold text-red-400 mb-1">Cons:</div>
                  {type.cons.slice(0, 2).map((con, idx) => (
                    <div key={idx} className="text-gray-300">• {con}</div>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Interactive Order Placement */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎮 Place an Order (Simulator)</h3>

        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
          <div className="space-y-4">
            {/* Order Type Selection */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Order Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['market', 'limit', 'stopLoss'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedOrderType(type)}
                    className={`px-3 py-2 rounded border capitalize ${
                      selectedOrderType === type
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    {orderTypes[type].icon} {orderTypes[type].name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy/Sell */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Side</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderSide('buy')}
                  className={`px-4 py-3 rounded border font-bold ${
                    orderSide === 'buy'
                      ? 'bg-green-500/20 border-green-500/50 text-green-400'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  🟢 Buy
                </button>
                <button
                  onClick={() => setOrderSide('sell')}
                  className={`px-4 py-3 rounded border font-bold ${
                    orderSide === 'sell'
                      ? 'bg-red-500/20 border-red-500/50 text-red-400'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  🔴 Sell
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Amount: {orderAmount} BTC
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={orderAmount}
                onChange={(e) => setOrderAmount(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.1 BTC</span>
                <span>10 BTC</span>
              </div>
            </div>

            {/* Price (for limit/stop orders) */}
            {selectedOrderType === 'limit' && (
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Limit Price: ${limitPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="45000"
                  max="55000"
                  step="100"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$45,000</span>
                  <span>$55,000</span>
                </div>
              </div>
            )}

            {selectedOrderType === 'stopLoss' && (
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Stop Price: ${stopPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="40000"
                  max="50000"
                  step="100"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$40,000</span>
                  <span>$50,000</span>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-black/20 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Type</span>
                <span className="text-white font-semibold">{orderTypes[selectedOrderType].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Side</span>
                <span className={orderSide === 'buy' ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                  {orderSide.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="text-white">{orderAmount} BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-white">${execution.price.toLocaleString()}</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-white font-bold">${execution.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {execution.type}
                </Badge>
              </div>
            </div>

            <button className={`w-full font-bold py-3 rounded-lg transition-opacity ${
              orderSide === 'buy'
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : 'bg-gradient-to-r from-red-500 to-red-600'
            } text-white hover:opacity-90`}>
              Place {orderSide.toUpperCase()} Order
            </button>
          </div>
        </div>

        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="font-bold text-yellow-400 mb-2">⚠️ This is a Simulator</h4>
          <p className="text-sm text-gray-300">
            This is for learning purposes only. Real trading involves actual money and risk. Always practice
            with small amounts first and never trade what you can't afford to lose.
          </p>
        </div>
      </Card>

      {/* Market Concepts */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Key Market Concepts</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">💧</div>
            <h4 className="font-bold text-white mb-2">Liquidity</h4>
            <p className="text-sm text-gray-300 mb-2">
              How easily you can buy/sell without affecting the price
            </p>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• High liquidity = tight spreads, large orders possible</li>
              <li>• Low liquidity = wide spreads, price impact</li>
              <li>• BTC/USDT has highest liquidity</li>
              <li>• Small-cap coins often have low liquidity</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-bold text-white mb-2">Slippage</h4>
            <p className="text-sm text-gray-300 mb-2">
              Difference between expected and actual execution price
            </p>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• Occurs with market orders in thin markets</li>
              <li>• Can be significant during high volatility</li>
              <li>• Larger orders = more slippage</li>
              <li>• Use limit orders to avoid slippage</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">📈</div>
            <h4 className="font-bold text-white mb-2">Market Depth</h4>
            <p className="text-sm text-gray-300 mb-2">
              Total volume of orders at different price levels
            </p>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• Deep market = many orders, absorbs trades</li>
              <li>• Shallow market = few orders, price sensitive</li>
              <li>• Look at cumulative volume in order book</li>
              <li>• Depth charts visualize this data</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-bold text-white mb-2">Volatility</h4>
            <p className="text-sm text-gray-300 mb-2">
              How much and how quickly price moves
            </p>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• Crypto is highly volatile compared to stocks</li>
              <li>• Volatility creates opportunity and risk</li>
              <li>• Higher volatility = wider stop-losses needed</li>
              <li>• BTC less volatile than altcoins</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Trading Fees */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💰 Understanding Trading Fees</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Fee Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Typical Range</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-semibold">Maker Fee</td>
                <td className="py-3 px-4">0% - 0.1%</td>
                <td className="py-3 px-4">For adding liquidity with limit orders</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-semibold">Taker Fee</td>
                <td className="py-3 px-4">0.05% - 0.2%</td>
                <td className="py-3 px-4">For removing liquidity with market orders</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-semibold">Withdrawal Fee</td>
                <td className="py-3 px-4">Varies</td>
                <td className="py-3 px-4">Network fee for withdrawing to wallet</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Funding Rate</td>
                <td className="py-3 px-4">±0.01% / 8hrs</td>
                <td className="py-3 px-4">For perpetual futures positions</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <h4 className="font-bold text-green-400 mb-2">💡 Fee Optimization Tips</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Use limit orders to pay maker fees instead of taker fees</li>
            <li>• Hold exchange tokens (BNB, FTT, etc.) for discounts</li>
            <li>• Higher trading volume = lower fee tiers</li>
            <li>• Factor fees into your profit calculations</li>
          </ul>
        </div>
      </Card>

      {/* Key Learnings */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Order book:</strong> Real-time list showing all buy (bids) and sell (asks) orders</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Market orders:</strong> Execute instantly at best price but risk slippage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Limit orders:</strong> Execute only at your price, lower fees, but may not fill</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Stop-loss orders:</strong> Critical for risk management, triggers at stop price</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Spread:</strong> Difference between best bid and ask, indicates liquidity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Makers vs takers:</strong> Makers add liquidity (lower fees), takers remove it (higher fees)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 mt-1">!</span>
            <span><strong>Always consider fees:</strong> They significantly impact profitability, especially for frequent traders</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
