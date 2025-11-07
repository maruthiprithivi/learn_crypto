'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EthereumStage8() {
  const [selectedStandard, setSelectedStandard] = useState('erc20')

  const tokenStandards = {
    erc20: {
      name: 'ERC-20',
      fullName: 'Fungible Token Standard',
      icon: '🪙',
      color: 'from-blue-500 to-cyan-500',
      description: 'The original token standard for fungible (identical) tokens like cryptocurrencies',
      useCases: ['Cryptocurrencies', 'Stablecoins', 'Governance Tokens', 'Utility Tokens'],
      properties: [
        { label: 'Fungibility', value: 'Fully Fungible', desc: 'All tokens are identical and interchangeable' },
        { label: 'Divisibility', value: 'Yes (18 decimals)', desc: 'Can be divided into smaller units' },
        { label: 'Uniqueness', value: 'No', desc: 'Every token is the same' },
        { label: 'Metadata', value: 'Minimal', desc: 'Just name, symbol, and decimals' }
      ],
      functions: [
        'totalSupply()',
        'balanceOf(address)',
        'transfer(to, amount)',
        'approve(spender, amount)',
        'transferFrom(from, to, amount)',
        'allowance(owner, spender)'
      ],
      examples: [
        { name: 'USDC', description: 'USD-backed stablecoin' },
        { name: 'LINK', description: 'Chainlink oracle token' },
        { name: 'UNI', description: 'Uniswap governance token' }
      ],
      pros: [
        'Simple and well-understood',
        'Universal wallet support',
        'Low gas costs',
        'Perfect for currencies'
      ],
      cons: [
        'No unique properties per token',
        'Can\'t represent unique items',
        'No batch transfers',
        'Limited metadata'
      ]
    },
    erc721: {
      name: 'ERC-721',
      fullName: 'Non-Fungible Token Standard',
      icon: '🖼️',
      color: 'from-purple-500 to-pink-500',
      description: 'Standard for unique, non-fungible tokens (NFTs) - each token is different',
      useCases: ['Digital Art', 'Collectibles', 'Gaming Items', 'Real Estate', 'Identity'],
      properties: [
        { label: 'Fungibility', value: 'Non-Fungible', desc: 'Each token is unique' },
        { label: 'Divisibility', value: 'No', desc: 'Cannot be divided (whole tokens only)' },
        { label: 'Uniqueness', value: 'Yes (Token ID)', desc: 'Each token has unique identifier' },
        { label: 'Metadata', value: 'Rich', desc: 'Images, attributes, properties' }
      ],
      functions: [
        'balanceOf(owner)',
        'ownerOf(tokenId)',
        'transferFrom(from, to, tokenId)',
        'approve(to, tokenId)',
        'setApprovalForAll(operator, approved)',
        'getApproved(tokenId)',
        'isApprovedForAll(owner, operator)'
      ],
      examples: [
        { name: 'CryptoPunks', description: '10,000 unique characters' },
        { name: 'Bored Ape Yacht Club', description: 'Exclusive NFT collection' },
        { name: 'ENS Domains', description: 'Ethereum name service' }
      ],
      pros: [
        'Perfect for unique items',
        'Rich metadata support',
        'Proven track record',
        'Wide marketplace support'
      ],
      cons: [
        'High gas for batch operations',
        'One token type per contract',
        'Complex for gaming inventories',
        'Expensive to mint many'
      ]
    },
    erc1155: {
      name: 'ERC-1155',
      fullName: 'Multi-Token Standard',
      icon: '🎮',
      color: 'from-green-500 to-emerald-500',
      description: 'Flexible standard supporting both fungible and non-fungible tokens in one contract',
      useCases: ['Gaming Items', 'Multi-Asset Platforms', 'Event Tickets', 'DeFi Instruments'],
      properties: [
        { label: 'Fungibility', value: 'Both', desc: 'Can be fungible or non-fungible' },
        { label: 'Divisibility', value: 'Configurable', desc: 'Depends on token type' },
        { label: 'Uniqueness', value: 'Flexible', desc: 'Can have unique or identical tokens' },
        { label: 'Metadata', value: 'URI-based', desc: 'Flexible metadata system' }
      ],
      functions: [
        'balanceOf(account, id)',
        'balanceOfBatch(accounts, ids)',
        'setApprovalForAll(operator, approved)',
        'isApprovedForAll(account, operator)',
        'safeTransferFrom(from, to, id, amount, data)',
        'safeBatchTransferFrom(from, to, ids, amounts, data)'
      ],
      examples: [
        { name: 'Enjin', description: 'Gaming platform tokens' },
        { name: 'Rarible', description: 'Multi-asset marketplace' },
        { name: 'OpenSea', description: 'Supports multiple standards' }
      ],
      pros: [
        'Gas efficient batch operations',
        'Multiple token types in one contract',
        'Perfect for gaming',
        'Flexible fungibility'
      ],
      cons: [
        'More complex to understand',
        'Less marketplace support',
        'Newer standard',
        'Requires more careful design'
      ]
    }
  }

  const comparisonTable = [
    { feature: 'Primary Use', erc20: 'Currencies', erc721: 'Unique Items', erc1155: 'Gaming/Mixed' },
    { feature: 'Fungibility', erc20: 'Fungible', erc721: 'Non-Fungible', erc1155: 'Both' },
    { feature: 'Divisible', erc20: '✓', erc721: '✗', erc1155: 'Configurable' },
    { feature: 'Unique IDs', erc20: '✗', erc721: '✓', erc1155: '✓' },
    { feature: 'Batch Transfers', erc20: '✗', erc721: '✗', erc1155: '✓' },
    { feature: 'Gas Efficiency', erc20: 'High', erc721: 'Medium', erc1155: 'Very High' },
    { feature: 'Multiple Types', erc20: '✗', erc721: '✗', erc1155: '✓' },
    { feature: 'Marketplace Support', erc20: 'Universal', erc721: 'Wide', erc1155: 'Growing' },
    { feature: 'Complexity', erc20: 'Simple', erc721: 'Medium', erc1155: 'Complex' },
  ]

  const standard = tokenStandards[selectedStandard]

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={8}
      stageTitle="Token Standards Comparison"
      stageDescription="Compare ERC-20, ERC-721, and ERC-1155 standards"
      nextStageHref="/ethereum/stage-9"
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">📊</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Ethereum Token Standards</h2>
            <p className="text-gray-400">Understanding the three main token standards</p>
          </div>
        </div>
        <p className="text-gray-300">
          Ethereum has different token standards for different use cases. Understanding which one to use is crucial
          for building on Ethereum.
        </p>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Choose a Standard to Explore</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(tokenStandards).map(([key, std]) => (
            <button
              key={key}
              onClick={() => setSelectedStandard(key)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedStandard === key
                  ? `bg-gradient-to-br ${std.color} border-white/50`
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-5xl mb-3">{std.icon}</div>
              <h4 className="text-xl font-bold text-white mb-1">{std.name}</h4>
              <p className="text-sm text-gray-300">{std.fullName}</p>
            </button>
          ))}
        </div>
      </Card>

      {standard && (
        <div className="space-y-8 mb-8">
          <Card>
            <div className={`flex items-center gap-3 mb-4 p-4 rounded-lg bg-gradient-to-r ${standard.color}`}>
              <span className="text-5xl">{standard.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{standard.name}</h3>
                <p className="text-white/90">{standard.fullName}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{standard.description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-white mb-3">Key Properties</h4>
                <div className="space-y-3">
                  {standard.properties.map((prop, idx) => (
                    <div key={idx} className="bg-gray-900 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">{prop.label}</span>
                        <Badge variant="secondary">{prop.value}</Badge>
                      </div>
                      <p className="text-xs text-gray-400">{prop.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-3">Common Use Cases</h4>
                <div className="space-y-2 mb-6">
                  {standard.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      {useCase}
                    </div>
                  ))}
                </div>

                <h4 className="font-bold text-white mb-3">Popular Examples</h4>
                <div className="space-y-2">
                  {standard.examples.map((example, idx) => (
                    <div key={idx} className="bg-gray-900 rounded-lg p-2">
                      <div className="font-bold text-white text-sm">{example.name}</div>
                      <div className="text-xs text-gray-400">{example.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h4 className="text-xl font-bold text-white mb-4">Required Functions</h4>
            <div className="grid md:grid-cols-2 gap-2">
              {standard.functions.map((func, idx) => (
                <div key={idx} className="bg-gray-900 rounded p-3">
                  <code className="text-blue-400 text-sm font-mono">{func}</code>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                  <span>✓</span>
                  <span>Advantages</span>
                </h4>
                <ul className="space-y-2">
                  {standard.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                  <span>⚠</span>
                  <span>Limitations</span>
                </h4>
                <ul className="space-y-2">
                  {standard.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📋 Side-by-Side Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-3 text-gray-400 font-semibold">Feature</th>
                <th className="text-left p-3 text-blue-400 font-semibold">ERC-20</th>
                <th className="text-left p-3 text-purple-400 font-semibold">ERC-721</th>
                <th className="text-left p-3 text-green-400 font-semibold">ERC-1155</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="p-3 text-white font-medium">{row.feature}</td>
                  <td className="p-3 text-gray-300">{row.erc20}</td>
                  <td className="p-3 text-gray-300">{row.erc721}</td>
                  <td className="p-3 text-gray-300">{row.erc1155}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🤔 Which Standard Should You Use?</h3>
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <span>🪙</span>
              <span>Use ERC-20 when...</span>
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Creating a cryptocurrency or payment token</li>
              <li>• Building a governance or utility token</li>
              <li>• All tokens are identical (fungible)</li>
              <li>• You need universal wallet/exchange support</li>
            </ul>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
              <span>🖼️</span>
              <span>Use ERC-721 when...</span>
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Each item is unique (digital art, collectibles)</li>
              <li>• Creating a simple NFT collection</li>
              <li>• Need rich metadata per token</li>
              <li>• Targeting established NFT marketplaces</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
              <span>🎮</span>
              <span>Use ERC-1155 when...</span>
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Building a game with many item types</li>
              <li>• Need both fungible and non-fungible tokens</li>
              <li>• Want to optimize gas costs for batch operations</li>
              <li>• Managing a complex token economy</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Real-World Examples</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="text-3xl mb-2">💵</div>
            <h4 className="font-bold text-white mb-2">USDC (ERC-20)</h4>
            <p className="text-sm text-gray-300 mb-2">
              Stablecoin pegged 1:1 to US Dollar. Every USDC is identical and interchangeable.
            </p>
            <Badge variant="secondary" className="text-xs">$50B+ Market Cap</Badge>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="text-3xl mb-2">🐵</div>
            <h4 className="font-bold text-white mb-2">BAYC (ERC-721)</h4>
            <p className="text-sm text-gray-300 mb-2">
              10,000 unique ape NFTs. Each has different traits and rarity.
            </p>
            <Badge variant="secondary" className="text-xs">500K+ ETH Volume</Badge>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
            <div className="text-3xl mb-2">⚔️</div>
            <h4 className="font-bold text-white mb-2">Enjin (ERC-1155)</h4>
            <p className="text-sm text-gray-300 mb-2">
              Gaming platform with swords (NFTs) and gold (fungible) in one contract.
            </p>
            <Badge variant="secondary" className="text-xs">2B+ Items Created</Badge>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>ERC-20 is for fungible tokens like currencies - simple and universally supported</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>ERC-721 is for unique NFTs - each token has its own ID and metadata</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>ERC-1155 supports both fungible and non-fungible tokens in one contract - perfect for gaming</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Choose based on your use case: currencies (ERC-20), collectibles (ERC-721), or complex economies (ERC-1155)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>ERC-1155 offers better gas efficiency for batch operations but is more complex</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
