'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EthereumStage9() {
  // AMM Simulator State
  const [tokenAReserve, setTokenAReserve] = useState(1000)
  const [tokenBReserve, setTokenBReserve] = useState(2000)
  const [swapAmount, setSwapAmount] = useState(10)
  const [swapDirection, setSwapDirection] = useState('AtoB')

  // Liquidity Pool State
  const [liquidityTokenA, setLiquidityTokenA] = useState(100)
  const [liquidityTokenB, setLiquidityTokenB] = useState(200)
  const [userLPTokens, setUserLPTokens] = useState(0)

  // Lending Protocol State
  const [depositAmount, setDepositAmount] = useState(1000)
  const [borrowAmount, setBorrowAmount] = useState(0)
  const [collateral, setCollateral] = useState(0)
  const [totalDeposited, setTotalDeposited] = useState(0)

  // Calculate constant product (x * y = k)
  const constantK = tokenAReserve * tokenBReserve

  // Calculate swap output using AMM formula
  const calculateSwapOutput = () => {
    if (swapDirection === 'AtoB') {
      const newReserveA = tokenAReserve + swapAmount
      const newReserveB = constantK / newReserveA
      const output = tokenBReserve - newReserveB
      return output.toFixed(4)
    } else {
      const newReserveB = tokenBReserve + swapAmount
      const newReserveA = constantK / newReserveB
      const output = tokenAReserve - newReserveA
      return output.toFixed(4)
    }
  }

  const executeSwap = () => {
    const output = parseFloat(calculateSwapOutput())
    if (swapDirection === 'AtoB') {
      setTokenAReserve(prev => prev + swapAmount)
      setTokenBReserve(prev => prev - output)
    } else {
      setTokenBReserve(prev => prev + swapAmount)
      setTokenAReserve(prev => prev - output)
    }
  }

  const addLiquidity = () => {
    const lpTokensIssued = Math.sqrt(liquidityTokenA * liquidityTokenB)
    setUserLPTokens(prev => prev + lpTokensIssued)
    setTokenAReserve(prev => prev + liquidityTokenA)
    setTokenBReserve(prev => prev + liquidityTokenB)
  }

  const depositToLending = () => {
    setTotalDeposited(prev => prev + depositAmount)
    setCollateral(prev => prev + depositAmount)
  }

  const borrowFromProtocol = () => {
    const maxBorrow = collateral * 0.75 // 75% collateral ratio
    if (borrowAmount <= maxBorrow) {
      alert(`✅ Borrowed ${borrowAmount} tokens! Remember to repay with interest.`)
    } else {
      alert(`❌ Cannot borrow ${borrowAmount}. Max: ${maxBorrow.toFixed(2)} (75% of collateral)`)
    }
  }

  const defiProtocols = {
    dex: {
      name: 'Decentralized Exchanges (DEX)',
      icon: '🔄',
      color: 'from-blue-500 to-cyan-500',
      description: 'Trade tokens directly from your wallet without a centralized intermediary',
      examples: [
        { name: 'Uniswap', tvl: '$5.2B', description: 'Leading AMM on Ethereum' },
        { name: 'SushiSwap', tvl: '$800M', description: 'Community-driven DEX' },
        { name: 'Curve', tvl: '$3.8B', description: 'Optimized for stablecoins' }
      ],
      keyFeatures: [
        'Non-custodial trading',
        'Automated Market Makers (AMM)',
        'Liquidity pools',
        'No KYC required',
        'On-chain settlement'
      ],
      howItWorks: [
        'Users deposit tokens into liquidity pools',
        'Pools use mathematical formulas (x * y = k) to price trades',
        'Traders swap against the pool, not other users',
        'Liquidity providers earn fees from trades',
        'Prices adjust based on supply and demand'
      ]
    },
    lending: {
      name: 'Lending Protocols',
      icon: '🏦',
      color: 'from-purple-500 to-pink-500',
      description: 'Lend your crypto to earn interest or borrow against your holdings',
      examples: [
        { name: 'Aave', tvl: '$8.5B', description: 'Leading lending protocol' },
        { name: 'Compound', tvl: '$3.2B', description: 'Algorithmic money market' },
        { name: 'MakerDAO', tvl: '$6.5B', description: 'DAI stablecoin lending' }
      ],
      keyFeatures: [
        'Earn interest on deposits',
        'Borrow against collateral',
        'Algorithmic interest rates',
        'Over-collateralization',
        'Instant liquidity'
      ],
      howItWorks: [
        'Deposit crypto to earn interest',
        'Rates determined by supply and demand',
        'Use deposits as collateral to borrow',
        'Must maintain collateral ratio (e.g., 150%)',
        'Liquidation if collateral value drops too low'
      ]
    },
    yield: {
      name: 'Yield Farming',
      icon: '🌾',
      color: 'from-green-500 to-emerald-500',
      description: 'Maximize returns by providing liquidity and staking across multiple protocols',
      examples: [
        { name: 'Yearn Finance', tvl: '$400M', description: 'Automated yield optimizer' },
        { name: 'Convex', tvl: '$3.5B', description: 'Curve yield booster' },
        { name: 'Beefy', tvl: '$600M', description: 'Multi-chain yield optimizer' }
      ],
      keyFeatures: [
        'High APY potential',
        'Liquidity provider rewards',
        'Protocol token incentives',
        'Compounding strategies',
        'Higher risk/reward'
      ],
      howItWorks: [
        'Provide liquidity to earn LP tokens',
        'Stake LP tokens to earn protocol tokens',
        'Compound rewards for higher yields',
        'Move funds between protocols for best rates',
        'Balance risk vs. reward carefully'
      ]
    }
  }

  const [selectedProtocol, setSelectedProtocol] = useState('dex')
  const protocol = defiProtocols[selectedProtocol]

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={9}
      stageTitle="DeFi Basics"
      stageDescription="Explore Decentralized Finance protocols and concepts"
      nextStageHref="/ethereum/stage-10"
      estimatedTime="30 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🏛️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome to DeFi</h2>
            <p className="text-gray-400">Decentralized Finance - Banking without banks</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          DeFi (Decentralized Finance) recreates traditional financial services like trading, lending,
          and investing on blockchain networks - no middlemen, no gatekeepers, just smart contracts.
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">💡 Why DeFi Matters</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• <strong>Permissionless:</strong> Anyone with a wallet can access</li>
            <li>• <strong>Transparent:</strong> All transactions on-chain and auditable</li>
            <li>• <strong>Composable:</strong> Protocols can build on each other ("money legos")</li>
            <li>• <strong>Non-custodial:</strong> You always control your funds</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Explore DeFi Protocols</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(defiProtocols).map(([key, prot]) => (
            <button
              key={key}
              onClick={() => setSelectedProtocol(key)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedProtocol === key
                  ? `bg-gradient-to-br ${prot.color} border-white/50`
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-5xl mb-3">{prot.icon}</div>
              <h4 className="text-xl font-bold text-white mb-1">{prot.name}</h4>
              <p className="text-sm text-gray-300 line-clamp-2">{prot.description}</p>
            </button>
          ))}
        </div>
      </Card>

      {protocol && (
        <div className="space-y-8 mb-8">
          <Card>
            <div className={`flex items-center gap-3 mb-4 p-4 rounded-lg bg-gradient-to-r ${protocol.color}`}>
              <span className="text-5xl">{protocol.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{protocol.name}</h3>
                <p className="text-white/90">{protocol.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-white mb-3">🔑 Key Features</h4>
                <div className="space-y-2">
                  {protocol.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-3">⚙️ How It Works</h4>
                <div className="space-y-2">
                  {protocol.howItWorks.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <Badge variant="secondary" className="mt-0.5 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {idx + 1}
                      </Badge>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-bold text-white mb-3">🏆 Top Protocols</h4>
              <div className="grid md:grid-cols-3 gap-3">
                {protocol.examples.map((example, idx) => (
                  <div key={idx} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-white">{example.name}</h5>
                      <Badge variant="success">{example.tvl}</Badge>
                    </div>
                    <p className="text-xs text-gray-400">{example.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔬 Interactive DeFi Simulators</h3>
        <Tabs defaultValue="amm">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="amm">AMM Trading</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity Pool</TabsTrigger>
            <TabsTrigger value="lending">Lending</TabsTrigger>
          </TabsList>

          <TabsContent value="amm" className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2">🔄 Automated Market Maker (AMM)</h4>
              <p className="text-sm text-gray-300 mb-4">
                AMMs use the formula <code className="bg-gray-900 px-2 py-1 rounded text-cyan-400">x * y = k</code> to price trades.
                As you swap tokens, the reserves change, causing price impact.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Token A Reserve</div>
                  <div className="text-2xl font-bold text-blue-400">{tokenAReserve.toFixed(2)}</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Token B Reserve</div>
                  <div className="text-2xl font-bold text-cyan-400">{tokenBReserve.toFixed(2)}</div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-400 mb-1">Constant Product (k)</div>
                <div className="text-xl font-mono text-purple-400">{constantK.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-1">This value stays constant during swaps</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Swap Direction</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSwapDirection('AtoB')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        swapDirection === 'AtoB'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      A → B
                    </button>
                    <button
                      onClick={() => setSwapDirection('BtoA')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        swapDirection === 'BtoA'
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      B → A
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Input Amount: {swapAmount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">You will receive</div>
                  <div className="text-3xl font-bold text-green-400">{calculateSwapOutput()}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {swapDirection === 'AtoB' ? 'Token B' : 'Token A'}
                  </div>
                </div>

                <button
                  onClick={executeSwap}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Execute Swap
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="liquidity" className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2">💧 Provide Liquidity</h4>
              <p className="text-sm text-gray-300 mb-4">
                Add equal value of both tokens to earn LP tokens and trading fees.
                LP tokens represent your share of the pool.
              </p>

              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-400 mb-1">Your LP Tokens</div>
                <div className="text-2xl font-bold text-purple-400">{userLPTokens.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-1">Earn 0.3% of all swap fees!</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Token A Amount: {liquidityTokenA}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={liquidityTokenA}
                    onChange={(e) => setLiquidityTokenA(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Token B Amount: {liquidityTokenB}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    value={liquidityTokenB}
                    onChange={(e) => setLiquidityTokenB(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">LP Tokens You'll Receive</div>
                  <div className="text-3xl font-bold text-purple-400">
                    {Math.sqrt(liquidityTokenA * liquidityTokenB).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Based on geometric mean: √(A × B)
                  </div>
                </div>

                <button
                  onClick={addLiquidity}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Add Liquidity
                </button>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400">⚠️</span>
                    <div className="text-xs text-gray-300">
                      <strong>Impermanent Loss:</strong> If token prices diverge, you may have been better off holding.
                      Trading fees can offset this over time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lending" className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2">🏦 Lending & Borrowing</h4>
              <p className="text-sm text-gray-300 mb-4">
                Deposit crypto to earn interest, then use it as collateral to borrow other assets.
                Must maintain minimum collateral ratio to avoid liquidation.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Total Deposited</div>
                  <div className="text-2xl font-bold text-green-400">{totalDeposited.toFixed(2)} ETH</div>
                  <div className="text-xs text-green-400 mt-1">+5% APY</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Available to Borrow</div>
                  <div className="text-2xl font-bold text-blue-400">{(collateral * 0.75).toFixed(2)} USDC</div>
                  <div className="text-xs text-gray-400 mt-1">75% of collateral</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Deposit Amount: {depositAmount} ETH
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button
                  onClick={depositToLending}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Deposit & Earn Interest
                </button>

                <div className="border-t border-gray-700 pt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Borrow Amount: {borrowAmount} USDC
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={collateral * 0.75}
                    step="10"
                    value={borrowAmount}
                    onChange={(e) => setBorrowAmount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Collateral Ratio</span>
                    <Badge variant={collateral > 0 && borrowAmount / collateral <= 0.75 ? 'success' : 'destructive'}>
                      {collateral > 0 ? ((borrowAmount / collateral) * 100).toFixed(1) : 0}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        collateral > 0 && borrowAmount / collateral <= 0.75
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${collateral > 0 ? Math.min((borrowAmount / collateral) * 100, 100) : 0}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Must stay below 75% to avoid liquidation
                  </div>
                </div>

                <button
                  onClick={borrowFromProtocol}
                  disabled={collateral === 0}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Borrow Against Collateral
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚠️ DeFi Risks</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
              <span>🐛</span>
              <span>Smart Contract Risk</span>
            </h4>
            <p className="text-sm text-gray-300">
              Bugs or exploits in smart contracts can lead to loss of funds. Always use audited protocols.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-bold text-orange-400 mb-2 flex items-center gap-2">
              <span>💧</span>
              <span>Impermanent Loss</span>
            </h4>
            <p className="text-sm text-gray-300">
              Providing liquidity can result in losses if token prices diverge significantly from when you deposited.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
              <span>🔥</span>
              <span>Liquidation Risk</span>
            </h4>
            <p className="text-sm text-gray-300">
              If your collateral value drops below requirements, your position may be liquidated with penalties.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
              <span>🎭</span>
              <span>Rug Pulls</span>
            </h4>
            <p className="text-sm text-gray-300">
              Unaudited or new protocols may be scams. Always research projects before investing.
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>DeFi recreates financial services on blockchain - trading, lending, and investing without banks</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>AMMs use mathematical formulas (x * y = k) to provide liquidity and enable trading</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Liquidity providers earn trading fees but face impermanent loss risk</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Lending protocols allow earning interest on deposits and borrowing against collateral</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>DeFi offers high yields but comes with risks: smart contract bugs, liquidations, and impermanent loss</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always use audited protocols, understand the risks, and never invest more than you can afford to lose</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
