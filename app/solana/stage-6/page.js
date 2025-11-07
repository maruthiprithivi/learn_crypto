'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SolanaStage6() {
  const [nftName, setNftName] = useState('Cool Ape #1')
  const [nftSymbol, setNftSymbol] = useState('APE')
  const [nftDescription, setNftDescription] = useState('A unique digital collectible')
  const [selectedStandard, setSelectedStandard] = useState('regular')

  const nftStandards = {
    regular: {
      name: 'Regular NFT',
      icon: '🖼️',
      cost: '~0.012 SOL',
      storage: 'On-chain metadata',
      pros: ['Full on-chain', 'Most compatible', 'Standard format'],
      cons: ['More expensive', 'Limited by account size']
    },
    compressed: {
      name: 'Compressed NFT',
      icon: '📦',
      cost: '~0.0001 SOL',
      storage: 'Merkle tree',
      pros: ['100x cheaper', 'Scalable', 'Fast minting'],
      cons: ['Newer standard', 'Different tooling']
    },
    programmable: {
      name: 'Programmable NFT',
      icon: '⚙️',
      cost: '~0.015 SOL',
      storage: 'On-chain + rules',
      pros: ['Royalty enforcement', 'Transfer rules', 'Composable'],
      cons: ['More complex', 'Higher cost']
    }
  }

  const collections = [
    {
      name: 'Mad Lads',
      items: '10,000',
      floor: '125 SOL',
      volume: '2.1M SOL',
      description: 'Popular PFP collection on Solana'
    },
    {
      name: 'DeGods',
      items: '10,000',
      floor: '95 SOL',
      volume: '1.8M SOL',
      description: 'Elite community-driven collection'
    },
    {
      name: 'Tensorians',
      items: '10,000',
      floor: '15 SOL',
      volume: '450K SOL',
      description: 'Tensor marketplace collection'
    }
  ]

  return (
    <StageLayout
      trackName="Solana Track"
      trackHref="/solana"
      trackColor="solana"
      stageNumber={6}
      stageTitle="NFTs on Solana"
      stageDescription="Creating and managing non-fungible tokens"
      nextStageHref="/solana/stage-7"
      estimatedTime="20 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🎨</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Solana NFTs</h2>
            <p className="text-gray-400">Non-fungible tokens on the fastest blockchain</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          NFTs on Solana are SPL Tokens with a supply of 1 and 0 decimals. The Metaplex standard
          adds metadata, making them rich, interactive digital assets.
        </p>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">🚀 Why Solana for NFTs?</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• <strong>Fast:</strong> Instant minting and transfers</li>
            <li>• <strong>Cheap:</strong> Fraction of a cent per transaction</li>
            <li>• <strong>Compressed NFTs:</strong> 100x cost reduction</li>
            <li>• <strong>Ecosystem:</strong> Magic Eden, Tensor, and more</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🏗️ NFT Architecture</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-4xl mb-2">🪙</div>
            <h4 className="font-bold text-white mb-2">SPL Token</h4>
            <p className="text-sm text-gray-400 mb-3">The underlying token</p>
            <div className="space-y-1 text-xs text-gray-300">
              <div>• Supply: 1</div>
              <div>• Decimals: 0</div>
              <div>• Non-divisible</div>
              <div>• Transferable</div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-4xl mb-2">📝</div>
            <h4 className="font-bold text-white mb-2">Metadata</h4>
            <p className="text-sm text-gray-400 mb-3">Metaplex standard</p>
            <div className="space-y-1 text-xs text-gray-300">
              <div>• Name & symbol</div>
              <div>• Description</div>
              <div>• Image URI</div>
              <div>• Attributes</div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-4xl mb-2">📁</div>
            <h4 className="font-bold text-white mb-2">Master Edition</h4>
            <p className="text-sm text-gray-400 mb-3">Proves uniqueness</p>
            <div className="space-y-1 text-xs text-gray-300">
              <div>• Max supply: 0</div>
              <div>• Prevents copying</div>
              <div>• Print editions</div>
              <div>• Verified unique</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h5 className="font-bold text-blue-400 mb-2">NFT Creation Flow</h5>
          <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
            <div className="flex-1 min-w-[120px] text-center">
              <div className="bg-purple-500/20 rounded p-3 mb-1">
                <div className="font-bold text-white">1. Create Mint</div>
              </div>
              <div className="text-xs text-gray-400">Supply = 1</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1 min-w-[120px] text-center">
              <div className="bg-blue-500/20 rounded p-3 mb-1">
                <div className="font-bold text-white">2. Add Metadata</div>
              </div>
              <div className="text-xs text-gray-400">Metaplex</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1 min-w-[120px] text-center">
              <div className="bg-green-500/20 rounded p-3 mb-1">
                <div className="font-bold text-white">3. Master Edition</div>
              </div>
              <div className="text-xs text-gray-400">Lock supply</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1 min-w-[120px] text-center">
              <div className="bg-orange-500/20 rounded p-3 mb-1">
                <div className="font-bold text-white">4. Mint to Wallet</div>
              </div>
              <div className="text-xs text-gray-400">Transfer</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎨 NFT Creator Simulator</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">NFT Name</label>
              <input
                type="text"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Symbol</label>
              <input
                type="text"
                value={nftSymbol}
                onChange={(e) => setNftSymbol(e.target.value.toUpperCase())}
                maxLength={10}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                value={nftDescription}
                onChange={(e) => setNftDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">NFT Standard</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(nftStandards).map(([key, std]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedStandard(key)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedStandard === key
                        ? 'bg-purple-500 border-purple-400'
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-2xl mb-1">{std.icon}</div>
                    <div className="text-xs font-bold text-white">{std.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl p-6">
            <h4 className="font-bold text-white mb-4 text-center">NFT Preview</h4>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 aspect-square flex items-center justify-center">
                <div className="text-6xl">🎨</div>
              </div>

              <div>
                <div className="text-xl font-bold text-white mb-1">{nftName}</div>
                <Badge variant="secondary">{nftSymbol}</Badge>
              </div>

              <div className="text-sm text-gray-300">{nftDescription}</div>

              <div className="border-t border-gray-700 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Standard</span>
                  <span className="text-white">{nftStandards[selectedStandard].name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Minting Cost</span>
                  <span className="text-green-400">{nftStandards[selectedStandard].cost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Supply</span>
                  <span className="text-white">1 of 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📊 NFT Standards Comparison</h3>
        <Tabs defaultValue="regular">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="regular">Regular NFT</TabsTrigger>
            <TabsTrigger value="compressed">Compressed NFT</TabsTrigger>
            <TabsTrigger value="programmable">Programmable NFT</TabsTrigger>
          </TabsList>

          <TabsContent value="regular" className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">🖼️</span>
                <div>
                  <h4 className="font-bold text-white">Regular NFT</h4>
                  <p className="text-sm text-gray-400">Traditional Metaplex NFT</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-white mb-2 text-sm">Pros</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {nftStandards.regular.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-2 text-sm">Cons</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {nftStandards.regular.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-gray-900 rounded p-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-white ml-2">{nftStandards.regular.cost}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Storage:</span>
                    <span className="text-white ml-2">{nftStandards.regular.storage}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compressed" className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">📦</span>
                <div>
                  <h4 className="font-bold text-white">Compressed NFT (cNFT)</h4>
                  <p className="text-sm text-gray-400">Merkle tree-based compression</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-white mb-2 text-sm">Pros</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {nftStandards.compressed.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-2 text-sm">Cons</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {nftStandards.compressed.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-gray-900 rounded p-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-green-400 ml-2 font-bold">{nftStandards.compressed.cost}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Storage:</span>
                    <span className="text-white ml-2">{nftStandards.compressed.storage}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <div className="text-xs text-blue-400 mb-1">💡 Perfect For</div>
                <div className="text-xs text-gray-300">
                  Large collections, gaming items, rewards, anything needing scale
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programmable" className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">⚙️</span>
                <div>
                  <h4 className="font-bold text-white">Programmable NFT (pNFT)</h4>
                  <p className="text-sm text-gray-400">NFTs with embedded rules</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-white mb-2 text-sm">Pros</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {nftStandards.programmable.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-2 text-sm">Cons</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {nftStandards.programmable.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-gray-900 rounded p-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-white ml-2">{nftStandards.programmable.cost}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Storage:</span>
                    <span className="text-white ml-2">{nftStandards.programmable.storage}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🏆 Popular Solana Collections</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {collections.map((collection, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{collection.name}</h4>
                <Badge variant="secondary">{collection.items} items</Badge>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Floor Price</span>
                  <span className="text-green-400 font-bold">{collection.floor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Volume</span>
                  <span className="text-white">{collection.volume}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">{collection.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🛒 NFT Marketplaces</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-3xl mb-2">🪄</div>
            <h4 className="font-bold text-white mb-2">Magic Eden</h4>
            <p className="text-sm text-gray-300 mb-3">
              Largest NFT marketplace on Solana with comprehensive features
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">Launchpad</Badge>
              <Badge variant="secondary">Trading</Badge>
              <Badge variant="secondary">Analytics</Badge>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="font-bold text-white mb-2">Tensor</h4>
            <p className="text-sm text-gray-300 mb-3">
              Pro trading platform with advanced tools and lower fees
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">Pro Tools</Badge>
              <Badge variant="secondary">Low Fees</Badge>
              <Badge variant="secondary">Rewards</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-purple-500/10 border-purple-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Solana NFTs are SPL Tokens with supply of 1 and Metaplex metadata</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Compressed NFTs reduce costs by 100x using Merkle trees</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Programmable NFTs enable royalty enforcement and transfer rules</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Collections group NFTs together with verified creators</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Master Edition accounts prove uniqueness and prevent copying</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Solana's speed and low costs make it ideal for NFT trading and gaming</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
