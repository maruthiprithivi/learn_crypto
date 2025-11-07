'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Stage10() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'solana'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 10 < maxStage ? 10 + 1 : null

  const [selectedCategory, setSelectedCategory] = useState('defi')

  // Ecosystem Projects by Category
  const ecosystemProjects = {
    defi: {
      name: 'DeFi',
      icon: '💰',
      color: 'purple',
      projects: [
        { name: 'Jupiter', desc: 'Leading DEX aggregator', users: '2M+', tvl: '$1.2B', category: 'DEX' },
        { name: 'Raydium', desc: 'AMM with concentrated liquidity', users: '500K+', tvl: '$250M', category: 'DEX' },
        { name: 'Marinade', desc: 'Liquid staking protocol', users: '100K+', tvl: '$350M', category: 'Staking' },
        { name: 'Solend', desc: 'Lending & borrowing', users: '50K+', tvl: '$80M', category: 'Lending' },
        { name: 'Drift', desc: 'Perpetuals exchange', users: '80K+', tvl: '$120M', category: 'Derivatives' },
      ]
    },
    nft: {
      name: 'NFTs & Gaming',
      icon: '🎨',
      color: 'pink',
      projects: [
        { name: 'Magic Eden', desc: 'Top NFT marketplace', users: '1.5M+', volume: '$3B+', category: 'Marketplace' },
        { name: 'Tensor', desc: 'Pro NFT trading platform', users: '200K+', volume: '$2B+', category: 'Marketplace' },
        { name: 'Star Atlas', desc: 'AAA space MMO game', users: '100K+', funding: '$100M+', category: 'Game' },
        { name: 'Genopets', desc: 'Move-to-earn NFT game', users: '50K+', funding: '$12M', category: 'Game' },
        { name: 'Metaplex', desc: 'NFT infrastructure', users: 'All', minted: '50M+ NFTs', category: 'Infrastructure' },
      ]
    },
    payments: {
      name: 'Payments & Infrastructure',
      icon: '💳',
      color: 'green',
      projects: [
        { name: 'Solana Pay', desc: 'Payment protocol', users: '10K+ merchants', fee: '$0.00025', category: 'Payments' },
        { name: 'Phantom', desc: 'Leading Solana wallet', users: '6M+', type: 'Multi-chain', category: 'Wallet' },
        { name: 'Backpack', desc: 'Next-gen wallet with xNFTs', users: '500K+', type: 'Executable NFTs', category: 'Wallet' },
        { name: 'Helius', desc: 'RPC & infrastructure', users: '5K+ devs', features: 'Webhooks, Geyser', category: 'RPC' },
        { name: 'GenesysGo', desc: 'Shadow Drive storage', users: '1K+ devs', storage: 'Decentralized', category: 'Storage' },
      ]
    },
    social: {
      name: 'Social & Consumer',
      icon: '🌐',
      color: 'blue',
      projects: [
        { name: 'Dialect', desc: 'Web3 messaging protocol', users: '100K+', messages: '10M+', category: 'Communication' },
        { name: 'Solarplex', desc: 'Social platform', users: '50K+', type: 'On-chain social', category: 'Social' },
        { name: 'Teleport', desc: 'On-chain ridesharing', users: '10K+', location: 'Miami pilot', category: 'Transportation' },
        { name: 'Sphere', desc: 'Payments for creators', users: '5K+', type: 'Subscriptions', category: 'Creator Economy' },
        { name: 'BONK', desc: 'Community memecoin', holders: '1M+', mcap: '$500M+', category: 'Memecoin' },
      ]
    }
  }

  // Recent Innovations
  const innovations = [
    {
      name: 'Firedancer',
      icon: '🔥',
      description: 'New validator client by Jump Crypto',
      impact: 'Targeting 1M+ TPS with improved stability',
      status: 'Testnet Q2 2024',
      color: 'red'
    },
    {
      name: 'Token-2022',
      icon: '🪙',
      description: 'Next-gen token program with extensions',
      impact: 'Transfer fees, interest bearing, confidential transfers',
      status: 'Live on Mainnet',
      color: 'yellow'
    },
    {
      name: 'State Compression',
      icon: '📦',
      description: 'Compressed NFTs using Merkle trees',
      impact: 'Mint 1M NFTs for ~$110 (vs $120K)',
      status: 'Live on Mainnet',
      color: 'green'
    },
    {
      name: 'Saga Phone',
      icon: '📱',
      description: 'Web3-native Android smartphone',
      impact: 'Integrated wallet, dApp store, 20K sold',
      status: 'Shipping',
      color: 'purple'
    },
    {
      name: 'Actions & Blinks',
      icon: '⚡',
      description: 'Execute transactions from anywhere',
      impact: 'Bring blockchain to social media & web',
      status: 'Beta',
      color: 'blue'
    },
    {
      name: 'ZK Compression',
      icon: '🔐',
      description: 'Zero-knowledge state compression',
      impact: '1000x cheaper state storage',
      status: 'In Development',
      color: 'cyan'
    }
  ]

  // Challenges & Solutions
  const challenges = [
    {
      challenge: 'Network Outages',
      description: 'Several outages in 2022 due to spam and bot activity',
      solution: 'Stake-weighted QoS, QUIC implementation, Firedancer client diversity',
      status: 'Significantly Improved',
      color: 'red'
    },
    {
      challenge: 'MEV Concerns',
      description: 'Potential for front-running and value extraction',
      solution: 'Jito MEV auction mechanism, working on fair ordering',
      status: 'Ongoing Research',
      color: 'yellow'
    },
    {
      challenge: 'Validator Centralization',
      description: '~30% of stake concentrated in top validators',
      solution: 'Stake delegation incentives, geographic distribution efforts',
      status: 'Active Mitigation',
      color: 'orange'
    },
    {
      challenge: 'Developer Experience',
      description: 'Rust learning curve, complex account model',
      solution: 'Anchor framework adoption, better documentation, SDKs',
      status: 'Continuously Improving',
      color: 'green'
    }
  ]

  // Roadmap Items
  const roadmapItems = [
    {
      quarter: 'Q1 2024',
      completed: true,
      items: [
        'Token-2022 mainnet launch',
        'State compression improvements',
        'Actions & Blinks beta'
      ]
    },
    {
      quarter: 'Q2 2024',
      completed: true,
      items: [
        'Firedancer testnet launch',
        'Saga Phone V2 announcement',
        'Mobile-first dApp expansion'
      ]
    },
    {
      quarter: 'Q3-Q4 2024',
      completed: false,
      items: [
        'Firedancer mainnet deployment',
        'ZK compression rollout',
        'Network optimization',
        'Ecosystem growth initiatives'
      ]
    },
    {
      quarter: '2025+',
      completed: false,
      items: [
        '1M+ TPS with Firedancer',
        'Global payments adoption',
        'Consumer app mass adoption',
        'Institutional DeFi integration'
      ]
    }
  ]

  // Use Cases by Sector
  const useCases = [
    {
      sector: 'Finance',
      icon: '🏦',
      examples: [
        { name: 'DeFi Trading', desc: 'High-frequency trading with sub-second settlement' },
        { name: 'Payments', desc: 'USDC transfers for $0.00025 vs wire transfer fees' },
        { name: 'Remittances', desc: 'Cross-border payments in seconds, not days' },
      ]
    },
    {
      sector: 'Gaming',
      icon: '🎮',
      examples: [
        { name: 'In-game Assets', desc: 'True ownership of items as NFTs' },
        { name: 'Play-to-Earn', desc: 'Earn rewards through gameplay' },
        { name: 'Competitive Gaming', desc: 'Prize pool distribution in real-time' },
      ]
    },
    {
      sector: 'Social Media',
      icon: '📱',
      examples: [
        { name: 'Creator Monetization', desc: 'Direct payments without platform fees' },
        { name: 'Social Tokens', desc: 'Community-owned platforms' },
        { name: 'Decentralized Identity', desc: 'Portable identity across platforms' },
      ]
    },
    {
      sector: 'Supply Chain',
      icon: '📦',
      examples: [
        { name: 'Product Tracking', desc: 'Immutable record of product journey' },
        { name: 'Authenticity', desc: 'Verify genuine products via NFTs' },
        { name: 'Inventory Management', desc: 'Real-time, transparent inventory' },
      ]
    }
  ]

  // Stats & Metrics
  const metrics = [
    { label: 'Transactions per Second', value: '65,000+', trend: 'Aiming for 1M+' },
    { label: 'Average TX Fee', value: '$0.00025', trend: 'Lowest among L1s' },
    { label: 'Block Time', value: '400ms', trend: 'Fastest finality' },
    { label: 'Active Validators', value: '1,800+', trend: 'Growing' },
    { label: 'Total Value Locked', value: '$4B+', trend: 'Recovering' },
    { label: 'NFTs Minted', value: '50M+', trend: 'Accelerating' },
    { label: 'Active Wallets', value: '5M+', trend: 'Growing' },
    { label: 'Developer Count', value: '5,000+', trend: 'Expanding' },
  ]

  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={10}
      stageTitle="Ecosystem & Future"
      stageDescription="Explore Solana's thriving ecosystem, recent innovations, challenges, and exciting future ahead"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="25 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🌟 Solana Ecosystem & Future</h2>
        <p className="text-gray-300 mb-4">
          Solana has built one of the most vibrant ecosystems in crypto, with thousands of projects
          spanning DeFi, NFTs, gaming, payments, and consumer applications. Despite challenges,
          the network continues to innovate and grow, with major upgrades on the horizon.
        </p>
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
          <h3 className="font-bold text-white mb-2">🎯 In This Final Stage</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Explore major projects across the ecosystem</li>
            <li>• Learn about cutting-edge innovations</li>
            <li>• Understand challenges and solutions</li>
            <li>• Discover real-world use cases</li>
            <li>• Look ahead to Solana's future</li>
          </ul>
        </div>
      </Card>

      {/* Network Metrics */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📊 Network Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">{metric.value}</div>
              <div className="text-xs text-gray-400 mb-2">{metric.label}</div>
              <Badge variant="outline" className="text-xs">{metric.trend}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Ecosystem Projects */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🏗️ Ecosystem Projects</h3>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {Object.entries(ecosystemProjects).map(([key, category]) => (
              <TabsTrigger key={key} value={key}>
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(ecosystemProjects).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {category.projects.map((project, idx) => (
                  <div key={idx} className={`bg-gradient-to-br from-${category.color}-500/10 to-${category.color}-600/10 border border-${category.color}-500/30 rounded-lg p-4`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-white">{project.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1">{project.category}</Badge>
                      </div>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {Object.entries(project).filter(([k]) => !['name', 'desc', 'category'].includes(k)).map(([k, v]) => (
                        <Badge key={k} variant="secondary" className="capitalize">
                          {k}: {v}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Recent Innovations */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🚀 Recent Innovations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {innovations.map((innovation, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${innovation.color}-500/10 to-${innovation.color}-600/10 border border-${innovation.color}-500/30 rounded-lg p-4`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{innovation.icon}</span>
                  <div>
                    <h4 className="font-bold text-white">{innovation.name}</h4>
                    <Badge className={`bg-${innovation.color}-500/20 text-${innovation.color}-400 border-${innovation.color}-500/30 text-xs mt-1`}>
                      {innovation.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-2">{innovation.description}</p>
              <div className="bg-black/20 rounded p-2">
                <div className="text-xs text-gray-500 mb-1">Impact:</div>
                <div className="text-sm text-white">{innovation.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Challenges & Solutions */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚠️ Challenges & Solutions</h3>
        <p className="text-sm text-gray-400 mb-4">
          Like any ambitious blockchain, Solana has faced challenges. Here's how the ecosystem is addressing them.
        </p>
        <div className="space-y-4">
          {challenges.map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-r from-${item.color}-500/10 to-gray-500/10 border border-${item.color}-500/30 rounded-lg p-4`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">{item.challenge}</h4>
                <Badge className={`bg-${item.color}-500/20 text-${item.color}-400 border-${item.color}-500/30`}>
                  {item.status}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-red-400 mb-1 font-semibold">Challenge:</div>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
                <div>
                  <div className="text-xs text-green-400 mb-1 font-semibold">Solution:</div>
                  <p className="text-sm text-gray-300">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Roadmap */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🗺️ Development Roadmap</h3>
        <div className="space-y-4">
          {roadmapItems.map((period, idx) => (
            <div key={idx} className={`border rounded-lg p-4 ${
              period.completed
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-blue-500/10 border-blue-500/30'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{period.quarter}</h4>
                <Badge className={period.completed ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}>
                  {period.completed ? '✅ Completed' : '🔄 In Progress / Planned'}
                </Badge>
              </div>
              <ul className="space-y-2">
                {period.items.map((item, iidx) => (
                  <li key={iidx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className={period.completed ? 'text-green-400' : 'text-blue-400'}>
                      {period.completed ? '✓' : '•'}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Use Cases */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💼 Real-World Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {useCases.map((useCase, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{useCase.icon}</span>
                <h4 className="font-bold text-white">{useCase.sector}</h4>
              </div>
              <div className="space-y-3">
                {useCase.examples.map((example, eidx) => (
                  <div key={eidx} className="bg-black/20 rounded p-3">
                    <div className="font-semibold text-white mb-1 text-sm">{example.name}</div>
                    <div className="text-xs text-gray-400">{example.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Why Solana? */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Why Build on Solana?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
              <h4 className="font-semibold text-green-400 mb-2">✅ Strengths</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <strong>Speed:</strong> 400ms blocks, near-instant finality</li>
                <li>• <strong>Cost:</strong> $0.00025 per transaction</li>
                <li>• <strong>Composability:</strong> All in one L1, no bridges</li>
                <li>• <strong>Developer Experience:</strong> Anchor framework, great tooling</li>
                <li>• <strong>Growing Ecosystem:</strong> Strong community and funding</li>
                <li>• <strong>Mobile-First:</strong> Saga phone and mobile dApp focus</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
              <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Considerations</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <strong>Network Stability:</strong> Improving but has had outages</li>
                <li>• <strong>Centralization Concerns:</strong> Validator distribution</li>
                <li>• <strong>Learning Curve:</strong> Rust and account model complexity</li>
                <li>• <strong>Competition:</strong> Many L1s and L2s competing</li>
                <li>• <strong>Regulatory Uncertainty:</strong> Like all crypto</li>
                <li>• <strong>Market Recovery:</strong> TVL recovering from 2022 lows</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Getting Involved */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🤝 Get Involved</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">👨‍💻</div>
            <h4 className="font-bold text-white mb-2">For Developers</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Learn Rust and Anchor</li>
              <li>• Join hackathons</li>
              <li>• Apply for grants</li>
              <li>• Contribute to open source</li>
              <li>• Join Discord communities</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-bold text-white mb-2">For Users</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Get a Phantom wallet</li>
              <li>• Explore dApps on DappRadar</li>
              <li>• Try Solana Pay merchants</li>
              <li>• Join community Discord</li>
              <li>• Follow ecosystem news</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-bold text-white mb-2">Learn More</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Solana Docs</li>
              <li>• Solana Cookbook</li>
              <li>• Anchor Book</li>
              <li>• Buildspace courses</li>
              <li>• YouTube tutorials</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* The Future */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔮 The Future of Solana</h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">🎯 2024-2025 Vision</h4>
            <p className="text-gray-300 mb-3">
              With Firedancer, Solana aims to become the world's most performant blockchain, capable of handling
              1 million transactions per second while maintaining low costs. This positions Solana to be the backbone
              for global-scale consumer applications.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-black/20 rounded p-3">
                <div className="font-bold text-purple-400 mb-1">Performance</div>
                <div className="text-sm text-gray-300">1M+ TPS with Firedancer</div>
              </div>
              <div className="bg-black/20 rounded p-3">
                <div className="font-bold text-blue-400 mb-1">Adoption</div>
                <div className="text-sm text-gray-300">100M+ users via mobile & payments</div>
              </div>
              <div className="bg-black/20 rounded p-3">
                <div className="font-bold text-green-400 mb-1">Innovation</div>
                <div className="text-sm text-gray-300">ZK tech, consumer apps, DePIN</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">🌍 Key Focus Areas</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <div className="font-semibold text-green-400 mb-1 text-sm">Mobile-First Applications</div>
                <div className="text-xs text-gray-300">Saga phone ecosystem and mobile-optimized dApps</div>
              </div>
              <div>
                <div className="font-semibold text-green-400 mb-1 text-sm">Global Payments</div>
                <div className="text-xs text-gray-300">Solana Pay adoption for merchants worldwide</div>
              </div>
              <div>
                <div className="font-semibold text-green-400 mb-1 text-sm">Consumer Social Apps</div>
                <div className="text-xs text-gray-300">Web3 social platforms with mass appeal</div>
              </div>
              <div>
                <div className="font-semibold text-green-400 mb-1 text-sm">DePIN Networks</div>
                <div className="text-xs text-gray-300">Decentralized physical infrastructure (storage, compute, wireless)</div>
              </div>
              <div>
                <div className="font-semibold text-green-400 mb-1 text-sm">Gaming & Metaverse</div>
                <div className="text-xs text-gray-300">AAA games with true asset ownership</div>
              </div>
              <div>
                <div className="font-semibold text-green-400 mb-1 text-sm">Institutional DeFi</div>
                <div className="text-xs text-gray-300">Regulated financial products on-chain</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Conclusion */}
      <Card className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-purple-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Congratulations!</h3>
        <p className="text-gray-300 mb-4">
          You've completed the <strong>Solana Track</strong>! You now understand:
        </p>
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Solana's unique architecture and consensus</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>The account model and how programs work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Transaction structure and compute budgets</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>SPL tokens and NFT standards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>DeFi protocols and liquid staking</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Staking mechanisms and validator operations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Development tools and frameworks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>The broader ecosystem and major projects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Recent innovations and future roadmap</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Real-world use cases and opportunities</span>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 rounded-lg p-4">
          <p className="text-white font-semibold mb-2">🚀 What's Next?</p>
          <p className="text-sm text-gray-300">
            Continue your learning journey with the <strong>Trading & Security Track</strong> to master
            cryptocurrency trading strategies, technical analysis, security best practices, and risk management!
          </p>
        </div>
      </Card>
    </StageLayout>
  )
}
