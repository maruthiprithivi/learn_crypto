'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Stage8() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'solana'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 8 < maxStage ? 8 + 1 : null

  // Staking Calculator State
  const [stakeAmount, setStakeAmount] = useState(100)
  const [stakingPeriod, setStakingPeriod] = useState(365)
  const [validatorCommission, setValidatorCommission] = useState(7)
  const [stakingType, setStakingType] = useState('native')

  // Validator Selection State
  const [selectedValidator, setSelectedValidator] = useState('validator1')

  // Liquid Staking State
  const [liquidStakingProtocol, setLiquidStakingProtocol] = useState('marinade')
  const [liquidStakeAmount, setLiquidStakeAmount] = useState(10)

  // Average APY on Solana
  const baseAPY = 6.5

  // Validator data
  const validators = {
    validator1: {
      name: 'Solana Foundation',
      commission: 7,
      uptime: 99.9,
      staked: '3.2M SOL',
      apy: 6.5,
      reliability: 'Excellent',
      icon: '🏛️'
    },
    validator2: {
      name: 'Marinade Validators',
      commission: 5,
      uptime: 99.8,
      staked: '15M SOL',
      apy: 7.2,
      reliability: 'Excellent',
      icon: '🌊'
    },
    validator3: {
      name: 'Jito Labs',
      commission: 10,
      uptime: 99.7,
      staked: '2.8M SOL',
      apy: 6.0,
      reliability: 'Very Good',
      icon: '⚡'
    },
    validator4: {
      name: 'Community Validator',
      commission: 3,
      uptime: 98.5,
      staked: '500K SOL',
      apy: 6.8,
      reliability: 'Good',
      icon: '🤝'
    }
  }

  // Liquid Staking Protocols
  const liquidStakingProtocols = {
    marinade: {
      name: 'Marinade Finance',
      token: 'mSOL',
      apy: 6.8,
      tvl: '$350M',
      commission: 2,
      features: ['Auto-staking', 'Instant unstake', 'DeFi composable', '400+ validators'],
      icon: '🌊'
    },
    jito: {
      name: 'Jito',
      token: 'JitoSOL',
      apy: 7.2,
      tvl: '$180M',
      commission: 4,
      features: ['MEV rewards', 'High APY', 'Stake pool', 'Liquid staking'],
      icon: '⚡'
    },
    lido: {
      name: 'Lido',
      token: 'stSOL',
      apy: 6.5,
      tvl: '$120M',
      commission: 5,
      features: ['Multi-chain', 'Established brand', 'DAO governed', 'Liquid staking'],
      icon: '🏰'
    }
  }

  // Calculate native staking rewards
  const calculateNativeRewards = () => {
    const effectiveAPY = baseAPY * (1 - validatorCommission / 100)
    const dailyRate = effectiveAPY / 365 / 100
    const rewards = stakeAmount * dailyRate * stakingPeriod
    return rewards.toFixed(4)
  }

  // Calculate liquid staking rewards
  const calculateLiquidRewards = () => {
    const protocol = liquidStakingProtocols[liquidStakingProtocol]
    const effectiveAPY = protocol.apy
    const dailyRate = effectiveAPY / 365 / 100
    const rewards = liquidStakeAmount * dailyRate * stakingPeriod
    return rewards.toFixed(4)
  }

  // Calculate total value
  const calculateTotalValue = () => {
    if (stakingType === 'native') {
      return (stakeAmount + parseFloat(calculateNativeRewards())).toFixed(4)
    } else {
      return (liquidStakeAmount + parseFloat(calculateLiquidRewards())).toFixed(4)
    }
  }

  // Calculate effective APY
  const calculateEffectiveAPY = () => {
    if (stakingType === 'native') {
      return (baseAPY * (1 - validatorCommission / 100)).toFixed(2)
    } else {
      return liquidStakingProtocols[liquidStakingProtocol].apy.toFixed(2)
    }
  }

  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={8}
      stageTitle="Staking & Validators"
      stageDescription="Learn about Solana's Proof of Stake, validator operations, staking mechanisms, and liquid staking protocols"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="25 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🔒 Staking & Validators on Solana</h2>
        <p className="text-gray-300 mb-4">
          Solana uses Proof of Stake (PoS) to secure the network. Validators process transactions and produce blocks,
          while stakers delegate their SOL to earn rewards. The network has one of the highest staking participation rates
          in the industry.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">1,800+</div>
            <div className="text-sm text-gray-400">Active Validators</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">~6.5%</div>
            <div className="text-sm text-gray-400">Staking APY</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">70%+</div>
            <div className="text-sm text-gray-400">SOL Staked</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">2-3 days</div>
            <div className="text-sm text-gray-400">Unstaking Period</div>
          </div>
        </div>
      </Card>

      {/* How Staking Works */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚙️ How Solana Staking Works</h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">1️⃣</span>
              <h4 className="font-bold text-white">Choose a Validator</h4>
            </div>
            <p className="text-sm text-gray-300 ml-9">
              Select a validator based on commission, uptime, and stake size. Diversifying across validators
              improves decentralization.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">2️⃣</span>
              <h4 className="font-bold text-white">Delegate Your SOL</h4>
            </div>
            <p className="text-sm text-gray-300 ml-9">
              Create a stake account and delegate SOL to the chosen validator. Your tokens remain in your custody
              but are locked for the staking period.
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">3️⃣</span>
              <h4 className="font-bold text-white">Activation Period</h4>
            </div>
            <p className="text-sm text-gray-300 ml-9">
              Your stake becomes active at the start of the next epoch (~2 days). During this time, your SOL
              doesn't earn rewards yet.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-yellow-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">4️⃣</span>
              <h4 className="font-bold text-white">Earn Rewards</h4>
            </div>
            <p className="text-sm text-gray-300 ml-9">
              Once active, you earn rewards every epoch (~2 days). Rewards are auto-compounded into your stake
              account, increasing your future rewards.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">5️⃣</span>
              <h4 className="font-bold text-white">Unstaking</h4>
            </div>
            <p className="text-sm text-gray-300 ml-9">
              To withdraw, deactivate your stake. After the current epoch ends (~2-3 days), you can withdraw
              your SOL plus accumulated rewards.
            </p>
          </div>
        </div>
      </Card>

      {/* Interactive Staking Calculator */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🧮 Interactive Staking Calculator</h3>

        <Tabs value={stakingType} onValueChange={setStakingType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="native">Native Staking</TabsTrigger>
            <TabsTrigger value="liquid">Liquid Staking</TabsTrigger>
          </TabsList>

          {/* Native Staking Calculator */}
          <TabsContent value="native" className="space-y-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
              <h4 className="font-bold text-white mb-4">🔒 Native Staking Calculator</h4>

              <div className="space-y-4">
                {/* Stake Amount */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Stake Amount: {stakeAmount} SOL
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10000"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 SOL</span>
                    <span>10,000 SOL</span>
                  </div>
                </div>

                {/* Staking Period */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Staking Period: {stakingPeriod} days
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="1825"
                    value={stakingPeriod}
                    onChange={(e) => setStakingPeriod(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 day</span>
                    <span>5 years</span>
                  </div>
                </div>

                {/* Validator Selection */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Select Validator</label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {Object.entries(validators).map(([key, validator]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedValidator(key)
                          setValidatorCommission(validator.commission)
                        }}
                        className={`p-3 rounded border text-left ${
                          selectedValidator === key
                            ? 'bg-purple-500/20 border-purple-500/50'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span>{validator.icon}</span>
                            <span className="font-semibold text-white text-sm">{validator.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {validator.commission}% fee
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400">
                          Uptime: {validator.uptime}% • {validator.reliability}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-black/20 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Effective APY</span>
                    <span className="text-2xl font-bold text-green-400">
                      {calculateEffectiveAPY()}%
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Initial Stake</span>
                    <span className="text-white">{stakeAmount} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Validator Commission</span>
                    <span className="text-white">{validatorCommission}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Staking Period</span>
                    <span className="text-white">{stakingPeriod} days ({(stakingPeriod / 365).toFixed(2)} years)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Rewards</span>
                    <span className="text-green-400 font-bold">{calculateNativeRewards()} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Final Value</span>
                    <span className="text-green-400 font-bold text-xl">
                      {calculateTotalValue()} SOL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI</span>
                    <span className="text-green-400">
                      +{((parseFloat(calculateNativeRewards()) / stakeAmount) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Native Staking Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-bold text-green-400 mb-2">✅ Advantages</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Full control of your SOL</li>
                  <li>• Choose your own validator</li>
                  <li>• Direct network participation</li>
                  <li>• No protocol risk</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">⚠️ Disadvantages</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• 2-3 day unstaking period</li>
                  <li>• SOL is locked and illiquid</li>
                  <li>• Can't use in DeFi while staked</li>
                  <li>• Manual validator selection</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Liquid Staking Calculator */}
          <TabsContent value="liquid" className="space-y-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6">
              <h4 className="font-bold text-white mb-4">💧 Liquid Staking Calculator</h4>

              <div className="space-y-4">
                {/* Protocol Selection */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Select Protocol</label>
                  <div className="space-y-2">
                    {Object.entries(liquidStakingProtocols).map(([key, protocol]) => (
                      <button
                        key={key}
                        onClick={() => setLiquidStakingProtocol(key)}
                        className={`w-full p-4 rounded border text-left ${
                          liquidStakingProtocol === key
                            ? 'bg-blue-500/20 border-blue-500/50'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{protocol.icon}</span>
                            <div>
                              <div className="font-semibold text-white">{protocol.name}</div>
                              <div className="text-xs text-gray-400">Receive {protocol.token}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">{protocol.apy}% APY</div>
                            <div className="text-xs text-gray-400">TVL: {protocol.tvl}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {protocol.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stake Amount */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Stake Amount: {liquidStakeAmount} SOL
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1000"
                    step="0.1"
                    value={liquidStakeAmount}
                    onChange={(e) => setLiquidStakeAmount(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0.1 SOL</span>
                    <span>1,000 SOL</span>
                  </div>
                </div>

                {/* Staking Period */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Holding Period: {stakingPeriod} days
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="1825"
                    value={stakingPeriod}
                    onChange={(e) => setStakingPeriod(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 day</span>
                    <span>5 years</span>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-black/20 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Protocol APY</span>
                    <span className="text-2xl font-bold text-green-400">
                      {liquidStakingProtocols[liquidStakingProtocol].apy}%
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">You Deposit</span>
                    <span className="text-white">{liquidStakeAmount} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">You Receive</span>
                    <span className="text-white">
                      {liquidStakeAmount} {liquidStakingProtocols[liquidStakingProtocol].token}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Holding Period</span>
                    <span className="text-white">{stakingPeriod} days ({(stakingPeriod / 365).toFixed(2)} years)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Rewards</span>
                    <span className="text-green-400 font-bold">{calculateLiquidRewards()} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Final {liquidStakingProtocols[liquidStakingProtocol].token} Value</span>
                    <span className="text-green-400 font-bold text-xl">
                      {calculateTotalValue()} SOL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI</span>
                    <span className="text-green-400">
                      +{((parseFloat(calculateLiquidRewards()) / liquidStakeAmount) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Liquid Staking Benefits */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-bold text-green-400 mb-2">✅ Advantages</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Instant liquidity - no lock-up</li>
                  <li>• Use LST in DeFi protocols</li>
                  <li>• Auto-compounding rewards</li>
                  <li>• Diversified across validators</li>
                  <li>• Often higher APY</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">⚠️ Risks</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Smart contract risk</li>
                  <li>• De-peg risk (LST vs SOL)</li>
                  <li>• Protocol commission fees</li>
                  <li>• Centralization concerns</li>
                  <li>• Instant unstake fees</li>
                </ul>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-bold text-purple-400 mb-3">💡 Liquid Staking Use Cases</h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded p-3">
                  <div className="font-semibold text-white mb-1">🔄 Trade on DEXs</div>
                  <div className="text-sm text-gray-400">Swap mSOL/JitoSOL/stSOL on Jupiter or Orca while earning staking rewards</div>
                </div>
                <div className="bg-black/20 rounded p-3">
                  <div className="font-semibold text-white mb-1">💰 Lend on Solend</div>
                  <div className="text-sm text-gray-400">Supply LSTs as collateral to borrow other assets - double yield strategy</div>
                </div>
                <div className="bg-black/20 rounded p-3">
                  <div className="font-semibold text-white mb-1">🌊 Provide Liquidity</div>
                  <div className="text-sm text-gray-400">Add LSTs to liquidity pools on Raydium/Orca for trading fees + farming rewards</div>
                </div>
                <div className="bg-black/20 rounded p-3">
                  <div className="font-semibold text-white mb-1">🎯 Loop Strategies</div>
                  <div className="text-sm text-gray-400">Borrow against LST collateral to buy more SOL and stake - leverage your position</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Validator Requirements */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🖥️ Running a Validator</h3>
        <p className="text-sm text-gray-300 mb-4">
          Want to become a validator? Here are the requirements and considerations for running your own Solana validator node.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-3">💻 Hardware Requirements</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong>CPU:</strong> 12+ cores @ 2.8GHz (AMD Threadripper recommended)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong>RAM:</strong> 256GB+ (512GB recommended)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong>Disk:</strong> 2TB+ NVMe SSD (high-speed required)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span><strong>Network:</strong> 1 Gbps+ bandwidth with low latency</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-3">💰 Financial Requirements</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">▸</span>
                <span><strong>Vote Account:</strong> ~1.5 SOL for rent-exempt balance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">▸</span>
                <span><strong>Identity Account:</strong> 0.5 SOL minimum</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">▸</span>
                <span><strong>Transaction Fees:</strong> ~1-2 SOL/day for voting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">▸</span>
                <span><strong>Operating Costs:</strong> $500-2000/month (hardware + hosting)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="font-bold text-yellow-400 mb-2">⚡ Key Considerations</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <strong>Uptime is critical:</strong> Poor performance leads to fewer rewards and stake delegation</li>
            <li>• <strong>Technical expertise required:</strong> Linux administration, networking, monitoring</li>
            <li>• <strong>No slashing (currently):</strong> Unlike Ethereum, Solana doesn't slash stake for downtime</li>
            <li>• <strong>Commission rates:</strong> Validators earn 5-10% commission on delegators' rewards</li>
            <li>• <strong>Break-even stake:</strong> Need ~50,000 SOL delegated to cover costs at 7% commission</li>
          </ul>
        </div>
      </Card>

      {/* Validator Selection Criteria */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 How to Choose a Validator</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-bold text-white mb-2">Performance Metrics</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• <strong>Uptime:</strong> 99%+ preferred</li>
              <li>• <strong>Skip rate:</strong> Lower is better</li>
              <li>• <strong>Vote success:</strong> High % critical</li>
              <li>• <strong>Commission:</strong> 5-10% typical</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-bold text-white mb-2">Decentralization</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Avoid over-staked validators</li>
              <li>• Support smaller validators</li>
              <li>• Geographic diversity</li>
              <li>• Infrastructure diversity</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">🤝</div>
            <h4 className="font-bold text-white mb-2">Trust Factors</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Community reputation</li>
              <li>• Operational history</li>
              <li>• Transparency & comms</li>
              <li>• Additional services</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Key Learnings */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>High participation:</strong> 70%+ of SOL is staked, demonstrating strong network security</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Native staking:</strong> Direct delegation to validators with 2-3 day lock-up, ~6.5% APY</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Liquid staking:</strong> Receive tradeable tokens (mSOL, JitoSOL) while earning rewards</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>No slashing:</strong> Unlike Ethereum, Solana doesn't penalize stake for downtime (currently)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Validator diversity:</strong> 1,800+ validators ensure decentralization and network resilience</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>DeFi composability:</strong> Liquid staking tokens unlock yield stacking strategies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 mt-1">!</span>
            <span><strong>Choose wisely:</strong> Validator performance directly impacts your staking rewards</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
