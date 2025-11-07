'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Stage7() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'solana'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 7 < maxStage ? 7 + 1 : null

  // DEX Swap Simulator State
  const [inputToken, setInputToken] = useState('SOL')
  const [outputToken, setOutputToken] = useState('USDC')
  const [inputAmount, setInputAmount] = useState(1)
  const [slippage, setSlippage] = useState(0.5)
  const [swapRoute, setSwapRoute] = useState('direct')

  // Liquidity Pool State
  const [lpAction, setLpAction] = useState('add')
  const [tokenAAmount, setTokenAAmount] = useState(10)
  const [tokenBAmount, setTokenBAmount] = useState(100)
  const [poolShare, setPoolShare] = useState(0)

  // Yield Farming State
  const [farmProtocol, setFarmProtocol] = useState('raydium')
  const [stakedAmount, setStakedAmount] = useState(0)
  const [farmingDays, setFarmingDays] = useState(30)

  // Mock prices (SOL/USD)
  const prices = {
    SOL: 100,
    USDC: 1,
    RAY: 2.5,
    ORCA: 1.8,
    JUP: 1.2,
    mSOL: 110
  }

  // DeFi Protocols
  const protocols = {
    jupiter: {
      name: 'Jupiter',
      type: 'DEX Aggregator',
      tvl: '$1.2B',
      description: 'Best price aggregator across Solana DEXs',
      features: ['Route optimization', 'Limit orders', 'DCA', 'Bridge'],
      icon: '🪐'
    },
    raydium: {
      name: 'Raydium',
      type: 'AMM & DEX',
      tvl: '$250M',
      description: 'Leading Solana AMM with concentrated liquidity',
      features: ['Liquidity pools', 'Yield farming', 'AcceleRaytor IDO', 'Fusion pools'],
      icon: '⚡'
    },
    orca: {
      name: 'Orca',
      type: 'AMM & DEX',
      tvl: '$180M',
      description: 'User-friendly AMM with Whirlpools (concentrated liquidity)',
      features: ['Whirlpools', 'Fair Price Indicator', 'Aquafarms', 'Low fees'],
      icon: '🐋'
    },
    marinade: {
      name: 'Marinade Finance',
      type: 'Liquid Staking',
      tvl: '$350M',
      description: 'Stake SOL and receive mSOL (liquid staking token)',
      features: ['Liquid staking', 'Delayed unstake', 'DeFi integration', 'Auto-compound'],
      icon: '🌊'
    },
    solend: {
      name: 'Solend',
      type: 'Lending Protocol',
      tvl: '$80M',
      description: 'Algorithmic money market for lending and borrowing',
      features: ['Supply assets', 'Borrow against collateral', 'Liquidations', 'Governance'],
      icon: '💰'
    },
    drift: {
      name: 'Drift Protocol',
      type: 'Perpetuals DEX',
      tvl: '$120M',
      description: 'Decentralized perpetual futures exchange',
      features: ['Perpetual swaps', 'Up to 10x leverage', 'Cross-margining', 'Low fees'],
      icon: '🎯'
    }
  }

  // Calculate swap output
  const calculateSwapOutput = () => {
    const inputValue = inputAmount * prices[inputToken]
    let output = inputValue / prices[outputToken]

    // Apply slippage
    const slippageAmount = output * (slippage / 100)
    output = output - slippageAmount

    // Add routing bonus for Jupiter
    if (swapRoute === 'jupiter') {
      output = output * 1.002 // 0.2% better rate
    }

    return output.toFixed(4)
  }

  // Calculate minimum received
  const calculateMinReceived = () => {
    const output = parseFloat(calculateSwapOutput())
    const minReceived = output * (1 - slippage / 100)
    return minReceived.toFixed(4)
  }

  // Calculate price impact
  const calculatePriceImpact = () => {
    const impact = (inputAmount / 10000) * 100 // Simplified calculation
    return impact.toFixed(2)
  }

  // Calculate LP share
  const calculateLPShare = () => {
    const totalPoolValue = 1000000 // Mock total pool
    const userValue = (tokenAAmount * prices.SOL) + (tokenBAmount * prices.USDC)
    const share = (userValue / totalPoolValue) * 100
    return share.toFixed(4)
  }

  // Calculate farming APY
  const calculateFarmingAPY = () => {
    const apys = {
      raydium: 45.5,
      orca: 38.2,
      marinade: 6.8,
      solend: 12.3
    }
    return apys[farmProtocol] || 0
  }

  // Calculate farming rewards
  const calculateFarmingRewards = () => {
    const apy = calculateFarmingAPY()
    const dailyRate = apy / 365 / 100
    const rewards = stakedAmount * dailyRate * farmingDays
    return rewards.toFixed(2)
  }

  // Available tokens
  const tokens = ['SOL', 'USDC', 'RAY', 'ORCA', 'JUP', 'mSOL']

  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={7}
      stageTitle="DeFi on Solana"
      stageDescription="Explore decentralized finance protocols, DEX trading, liquidity pools, and yield farming on Solana"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="25 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🏦 DeFi on Solana</h2>
        <p className="text-gray-300 mb-4">
          Solana's high throughput and low fees make it ideal for DeFi applications.
          The ecosystem includes DEXs, lending protocols, liquid staking, and derivatives platforms.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">$4B+</div>
            <div className="text-sm text-gray-400">Total Value Locked</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">65,000+</div>
            <div className="text-sm text-gray-400">TPS Capacity</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">$0.00025</div>
            <div className="text-sm text-gray-400">Avg TX Fee</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">400ms</div>
            <div className="text-sm text-gray-400">Block Time</div>
          </div>
        </div>
      </Card>

      {/* Major DeFi Protocols */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🌟 Major DeFi Protocols</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.values(protocols).map((protocol, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{protocol.icon}</span>
                  <div>
                    <h4 className="font-bold text-white">{protocol.name}</h4>
                    <Badge variant="outline" className="text-xs">{protocol.type}</Badge>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  TVL: {protocol.tvl}
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-3">{protocol.description}</p>
              <div className="flex flex-wrap gap-2">
                {protocol.features.map((feature, fidx) => (
                  <Badge key={fidx} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Interactive Simulators */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎮 Interactive DeFi Simulators</h3>

        <Tabs defaultValue="swap" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="swap">DEX Swap</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity Pool</TabsTrigger>
            <TabsTrigger value="farming">Yield Farming</TabsTrigger>
          </TabsList>

          {/* DEX Swap Simulator */}
          <TabsContent value="swap" className="space-y-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
              <h4 className="font-bold text-white mb-4">🔄 Swap Tokens</h4>

              <div className="space-y-4">
                {/* Input Token */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">You Pay</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputAmount}
                      onChange={(e) => setInputAmount(parseFloat(e.target.value) || 0)}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                      placeholder="0.00"
                      step="0.1"
                    />
                    <select
                      value={inputToken}
                      onChange={(e) => setInputToken(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                    >
                      {tokens.map(token => (
                        <option key={token} value={token}>{token}</option>
                      ))}
                    </select>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ≈ ${(inputAmount * prices[inputToken]).toFixed(2)} USD
                  </div>
                </div>

                {/* Swap Route */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Route</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSwapRoute('direct')}
                      className={`flex-1 px-3 py-2 rounded border ${
                        swapRoute === 'direct'
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                          : 'bg-white/5 border-white/10 text-gray-400'
                      }`}
                    >
                      Direct
                    </button>
                    <button
                      onClick={() => setSwapRoute('jupiter')}
                      className={`flex-1 px-3 py-2 rounded border ${
                        swapRoute === 'jupiter'
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                          : 'bg-white/5 border-white/10 text-gray-400'
                      }`}
                    >
                      🪐 Jupiter (Better Rate)
                    </button>
                  </div>
                </div>

                {/* Output Token */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">You Receive</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={calculateSwapOutput()}
                      readOnly
                      className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                    />
                    <select
                      value={outputToken}
                      onChange={(e) => setOutputToken(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                    >
                      {tokens.map(token => (
                        <option key={token} value={token}>{token}</option>
                      ))}
                    </select>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ≈ ${(parseFloat(calculateSwapOutput()) * prices[outputToken]).toFixed(2)} USD
                  </div>
                </div>

                {/* Slippage */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Slippage Tolerance: {slippage}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={slippage}
                    onChange={(e) => setSlippage(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0.1%</span>
                    <span>5%</span>
                  </div>
                </div>

                {/* Swap Details */}
                <div className="bg-black/20 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rate</span>
                    <span className="text-white">
                      1 {inputToken} = {(prices[inputToken] / prices[outputToken]).toFixed(4)} {outputToken}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price Impact</span>
                    <span className={parseFloat(calculatePriceImpact()) > 1 ? 'text-red-400' : 'text-green-400'}>
                      {calculatePriceImpact()}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Minimum Received</span>
                    <span className="text-white">{calculateMinReceived()} {outputToken}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network Fee</span>
                    <span className="text-green-400">~0.00025 SOL</span>
                  </div>
                  {swapRoute === 'jupiter' && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Route Optimization</span>
                      <span className="text-purple-400">+0.2% better rate</span>
                    </div>
                  )}
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Swap Tokens
                </button>
              </div>
            </div>

            {/* Why Solana DeFi is Fast */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-bold text-green-400 mb-2">⚡ Why Solana DeFi is Different</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>Sub-second finality:</strong> Trades confirm in ~400ms vs 12+ seconds on Ethereum</li>
                <li>• <strong>Ultra-low fees:</strong> ~$0.00025 per transaction vs $5-50 on Ethereum</li>
                <li>• <strong>No MEV extraction:</strong> Fair ordering reduces sandwich attacks</li>
                <li>• <strong>Composability:</strong> Call multiple protocols in single transaction</li>
                <li>• <strong>Better UX:</strong> Fast confirmations enable CEX-like trading experience</li>
              </ul>
            </div>
          </TabsContent>

          {/* Liquidity Pool Simulator */}
          <TabsContent value="liquidity" className="space-y-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
              <h4 className="font-bold text-white mb-4">💧 Provide Liquidity</h4>

              <div className="space-y-4">
                {/* Action Selector */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setLpAction('add')}
                    className={`flex-1 px-3 py-2 rounded border ${
                      lpAction === 'add'
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    Add Liquidity
                  </button>
                  <button
                    onClick={() => setLpAction('remove')}
                    className={`flex-1 px-3 py-2 rounded border ${
                      lpAction === 'remove'
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    Remove Liquidity
                  </button>
                </div>

                {/* Token A */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">SOL Amount</label>
                  <input
                    type="number"
                    value={tokenAAmount}
                    onChange={(e) => setTokenAAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                    placeholder="0.00"
                    step="1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    ≈ ${(tokenAAmount * prices.SOL).toFixed(2)} USD
                  </div>
                </div>

                {/* Token B */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">USDC Amount</label>
                  <input
                    type="number"
                    value={tokenBAmount}
                    onChange={(e) => setTokenBAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                    placeholder="0.00"
                    step="10"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    ≈ ${(tokenBAmount * prices.USDC).toFixed(2)} USD
                  </div>
                </div>

                {/* LP Details */}
                <div className="bg-black/20 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Pool Share</span>
                    <span className="text-white">{calculateLPShare()}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">LP Tokens</span>
                    <span className="text-white">
                      {Math.sqrt(tokenAAmount * tokenBAmount).toFixed(4)} LP
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Ratio</span>
                    <span className="text-white">
                      1 SOL = {(tokenBAmount / tokenAAmount).toFixed(2)} USDC
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Position Value</span>
                    <span className="text-white">
                      ${((tokenAAmount * prices.SOL) + (tokenBAmount * prices.USDC)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                  {lpAction === 'add' ? 'Add Liquidity' : 'Remove Liquidity'}
                </button>
              </div>
            </div>

            {/* Liquidity Provider Benefits */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-bold text-green-400 mb-2">✅ Benefits</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Earn trading fees (0.25% - 1%)</li>
                  <li>• Additional liquidity mining rewards</li>
                  <li>• Participate in protocol governance</li>
                  <li>• Compound returns automatically</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">⚠️ Risks</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Impermanent loss risk</li>
                  <li>• Smart contract vulnerabilities</li>
                  <li>• Price volatility exposure</li>
                  <li>• Token concentration risk</li>
                </ul>
              </div>
            </div>

            {/* Concentrated Liquidity */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-bold text-blue-400 mb-2">🎯 Concentrated Liquidity (Orca Whirlpools)</h4>
              <p className="text-sm text-gray-300 mb-3">
                Provide liquidity in specific price ranges for up to 4000x capital efficiency compared to traditional AMMs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Full Range LP</div>
                  <div className="text-lg font-bold text-white">12% APY</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Concentrated (±2%)</div>
                  <div className="text-lg font-bold text-green-400">78% APY</div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Yield Farming Simulator */}
          <TabsContent value="farming" className="space-y-4">
            <div className="bg-gradient-to-br from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-lg p-6">
              <h4 className="font-bold text-white mb-4">🌾 Yield Farming Calculator</h4>

              <div className="space-y-4">
                {/* Protocol Selector */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Select Protocol</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['raydium', 'orca', 'marinade', 'solend'].map(protocol => (
                      <button
                        key={protocol}
                        onClick={() => setFarmProtocol(protocol)}
                        className={`px-3 py-2 rounded border capitalize ${
                          farmProtocol === protocol
                            ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                            : 'bg-white/5 border-white/10 text-gray-400'
                        }`}
                      >
                        {protocols[protocol].icon} {protocol}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stake Amount */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Amount to Stake (LP Tokens)</label>
                  <input
                    type="number"
                    value={stakedAmount}
                    onChange={(e) => setStakedAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                    placeholder="0.00"
                    step="100"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    ≈ ${stakedAmount.toFixed(2)} USD value
                  </div>
                </div>

                {/* Farming Duration */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Farming Duration: {farmingDays} days
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="365"
                    value={farmingDays}
                    onChange={(e) => setFarmingDays(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 day</span>
                    <span>1 year</span>
                  </div>
                </div>

                {/* Farming Stats */}
                <div className="bg-black/20 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current APY</span>
                    <span className="text-2xl font-bold text-green-400">
                      {calculateFarmingAPY()}%
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Rewards</span>
                    <span className="text-white">
                      ${(parseFloat(calculateFarmingRewards()) / farmingDays).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Rewards ({farmingDays} days)</span>
                    <span className="text-white">${calculateFarmingRewards()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Final Value</span>
                    <span className="text-green-400 font-bold">
                      ${(stakedAmount + parseFloat(calculateFarmingRewards())).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI</span>
                    <span className="text-green-400">
                      +{stakedAmount > 0 ? ((parseFloat(calculateFarmingRewards()) / stakedAmount) * 100).toFixed(2) : 0}%
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-500 to-green-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Start Farming
                </button>
              </div>
            </div>

            {/* Farming Strategies */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-bold text-purple-400 mb-3">💡 Farming Strategies</h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded p-3">
                  <div className="font-semibold text-white mb-1">Conservative (Low Risk)</div>
                  <div className="text-sm text-gray-400">Stablecoins only (USDC/USDT) • 5-15% APY</div>
                </div>
                <div className="bg-black/20 rounded p-3">
                  <div className="font-semibold text-white mb-1">Balanced (Medium Risk)</div>
                  <div className="text-sm text-gray-400">SOL/Stablecoin pairs • 20-50% APY</div>
                </div>
                <div className="bg-black/20 rounded p-3">
                  <div className="font-semibold text-white mb-1">Aggressive (High Risk)</div>
                  <div className="text-sm text-gray-400">Volatile pairs (SOL/memecoins) • 100%+ APY</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Solana vs Ethereum DeFi */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚔️ Solana vs Ethereum DeFi</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Feature</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Solana</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Ethereum</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-semibold">Transaction Speed</td>
                <td className="py-3 px-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">~400ms</Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">12-15 sec</Badge>
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-semibold">Transaction Fee</td>
                <td className="py-3 px-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">$0.00025</Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">$5-50</Badge>
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-semibold">TVL</td>
                <td className="py-3 px-4">$4B+</td>
                <td className="py-3 px-4">$50B+</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-semibold">Maturity</td>
                <td className="py-3 px-4">Young ecosystem</td>
                <td className="py-3 px-4">Battle-tested</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 font-semibold">MEV Resistance</td>
                <td className="py-3 px-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Better</Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Extractable</Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Developer Ecosystem</td>
                <td className="py-3 px-4">Growing rapidly</td>
                <td className="py-3 px-4">Largest</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key Learnings */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Speed advantage:</strong> Solana's 400ms block time enables CEX-like trading UX with near-instant confirmations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Cost efficiency:</strong> $0.00025 fees make micro-transactions and frequent rebalancing viable</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Jupiter aggregation:</strong> Automatically finds best prices across all Solana DEXs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Concentrated liquidity:</strong> Orca Whirlpools and Raydium enable 4000x capital efficiency</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Yield opportunities:</strong> Farming, staking, and lending offer various risk/return profiles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Composability:</strong> Call multiple protocols in one transaction for complex strategies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 mt-1">!</span>
            <span><strong>Impermanent loss:</strong> LPs can lose value if token prices diverge significantly</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
