'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EthereumStage7() {
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [mintedNFTs, setMintedNFTs] = useState([])
  const [nftMetadata, setNftMetadata] = useState({
    name: '',
    description: '',
    attributes: []
  })

  const exampleNFTs = [
    {
      id: 1,
      name: 'CryptoPunk #7804',
      image: '👽',
      description: 'One of the 10,000 unique collectible characters',
      collection: 'CryptoPunks',
      owner: '0x1234...5678',
      attributes: [
        { trait_type: 'Type', value: 'Alien' },
        { trait_type: 'Accessories', value: 'Cap, Pipe, Small Shades' }
      ],
      price: '4200 ETH',
      rarity: 'Ultra Rare'
    },
    {
      id: 2,
      name: 'Bored Ape #8817',
      image: '🦧',
      description: 'A unique Bored Ape Yacht Club NFT',
      collection: 'BAYC',
      owner: '0xabcd...ef12',
      attributes: [
        { trait_type: 'Background', value: 'Blue' },
        { trait_type: 'Clothes', value: 'Leather Jacket' },
        { trait_type: 'Eyes', value: 'Sad' }
      ],
      price: '52 ETH',
      rarity: 'Rare'
    },
    {
      id: 3,
      name: 'Azuki #9605',
      image: '🎭',
      description: 'A character from the Azuki collection',
      collection: 'Azuki',
      owner: '0x9876...4321',
      attributes: [
        { trait_type: 'Type', value: 'Human' },
        { trait_type: 'Hair', value: 'Blue Bangs' },
        { trait_type: 'Clothing', value: 'Red Hoodie' }
      ],
      price: '12 ETH',
      rarity: 'Common'
    }
  ]

  const mintNFT = () => {
    if (!nftMetadata.name) {
      alert('Please enter a name for your NFT')
      return
    }

    const newNFT = {
      id: mintedNFTs.length + 1,
      tokenId: Math.floor(Math.random() * 10000),
      ...nftMetadata,
      image: ['🎨', '🖼️', '🌟', '💎', '🏆'][Math.floor(Math.random() * 5)],
      mintedAt: new Date().toLocaleString(),
      owner: '0x742d35Cc...95f0bEb (You)',
      contractAddress: '0x' + Math.random().toString(16).substr(2, 40)
    }

    setMintedNFTs([...mintedNFTs, newNFT])
    setNftMetadata({ name: '', description: '', attributes: [] })
  }

  const addAttribute = () => {
    setNftMetadata({
      ...nftMetadata,
      attributes: [...nftMetadata.attributes, { trait_type: '', value: '' }]
    })
  }

  const updateAttribute = (index, field, value) => {
    const newAttributes = [...nftMetadata.attributes]
    newAttributes[index][field] = value
    setNftMetadata({ ...nftMetadata, attributes: newAttributes })
  }

  const removeAttribute = (index) => {
    setNftMetadata({
      ...nftMetadata,
      attributes: nftMetadata.attributes.filter((_, i) => i !== index)
    })
  }

  const erc721Functions = [
    { name: 'balanceOf(owner)', description: 'Returns the number of NFTs owned by an address' },
    { name: 'ownerOf(tokenId)', description: 'Returns the owner of a specific NFT' },
    { name: 'transferFrom(from, to, tokenId)', description: 'Transfers an NFT from one address to another' },
    { name: 'approve(to, tokenId)', description: 'Approves an address to transfer a specific NFT' },
    { name: 'setApprovalForAll(operator, approved)', description: 'Approves an address to manage all your NFTs' },
    { name: 'getApproved(tokenId)', description: 'Returns the approved address for a specific NFT' },
    { name: 'isApprovedForAll(owner, operator)', description: 'Checks if an operator is approved for all NFTs' }
  ]

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={7}
      stageTitle="NFTs & ERC-721 Standard"
      stageDescription="Understand non-fungible tokens and digital ownership"
      nextStageHref="/ethereum/stage-8"
      estimatedTime="30 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🖼️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">What are NFTs?</h2>
            <p className="text-gray-400">Non-Fungible Tokens - Unique digital assets on the blockchain</p>
          </div>
        </div>
        <div className="space-y-4 text-gray-300">
          <p>
            NFTs (Non-Fungible Tokens) are unique digital items that you can truly own. Unlike ERC-20 tokens where
            every token is identical, each NFT is one-of-a-kind with its own identity and properties.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-bold text-blue-400 mb-2">Fungible (ERC-20)</h4>
              <p className="text-sm">Every token is identical. 1 USDC = 1 USDC. They're interchangeable.</p>
              <p className="text-xs text-gray-500 mt-2">Example: Money, cryptocurrencies</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-bold text-purple-400 mb-2">Non-Fungible (ERC-721)</h4>
              <p className="text-sm">Each token is unique with different properties. Can't be exchanged 1:1.</p>
              <p className="text-xs text-gray-500 mt-2">Example: Art, collectibles, real estate</p>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="explore" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="explore">Explore NFTs</TabsTrigger>
          <TabsTrigger value="mint">Mint Your Own</TabsTrigger>
          <TabsTrigger value="standard">ERC-721 Standard</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="mt-6">
          <Card>
            <h3 className="text-xl font-bold text-white mb-4">🔍 Famous NFT Collections</h3>
            <p className="text-gray-400 mb-4">Click on any NFT to see its details (simulated examples)</p>

            <div className="grid md:grid-cols-3 gap-4">
              {exampleNFTs.map((nft) => (
                <button
                  key={nft.id}
                  onClick={() => setSelectedNFT(nft)}
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-blue-500 rounded-lg p-4 transition-all text-left"
                >
                  <div className="text-6xl mb-3 text-center">{nft.image}</div>
                  <h4 className="font-bold text-white mb-1">{nft.name}</h4>
                  <Badge variant={nft.rarity === 'Ultra Rare' ? 'warning' : nft.rarity === 'Rare' ? 'ethereum' : 'secondary'} className="mb-2">
                    {nft.rarity}
                  </Badge>
                  <p className="text-sm text-gray-400 mb-2">{nft.collection}</p>
                  <p className="text-xs text-green-400 font-bold">{nft.price}</p>
                </button>
              ))}
            </div>

            {selectedNFT && (
              <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-6 animate-fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-1">{selectedNFT.name}</h4>
                    <p className="text-gray-400">{selectedNFT.collection}</p>
                  </div>
                  <div className="text-5xl">{selectedNFT.image}</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Description</div>
                    <p className="text-gray-300">{selectedNFT.description}</p>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Attributes</div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedNFT.attributes.map((attr, idx) => (
                        <div key={idx} className="bg-gray-900 rounded p-2">
                          <div className="text-xs text-gray-500">{attr.trait_type}</div>
                          <div className="text-sm text-white font-bold">{attr.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Current Owner</div>
                      <div className="font-mono text-xs text-blue-400">{selectedNFT.owner}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Floor Price</div>
                      <div className="text-lg font-bold text-green-400">{selectedNFT.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="mint" className="mt-6">
          <Card>
            <h3 className="text-xl font-bold text-white mb-4">🎨 Create Your NFT</h3>
            <p className="text-gray-400 mb-6">Design your own NFT with custom metadata (simulation)</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">NFT Name *</label>
                <input
                  type="text"
                  value={nftMetadata.name}
                  onChange={(e) => setNftMetadata({ ...nftMetadata, name: e.target.value })}
                  placeholder="My Awesome NFT"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  value={nftMetadata.description}
                  onChange={(e) => setNftMetadata({ ...nftMetadata, description: e.target.value })}
                  placeholder="Describe your NFT..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-gray-400">Attributes (Optional)</label>
                  <Button onClick={addAttribute} variant="secondary" size="sm">
                    + Add Attribute
                  </Button>
                </div>

                {nftMetadata.attributes.map((attr, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      value={attr.trait_type}
                      onChange={(e) => updateAttribute(idx, 'trait_type', e.target.value)}
                      placeholder="Trait type (e.g., Color)"
                      className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) => updateAttribute(idx, 'value', e.target.value)}
                        placeholder="Value (e.g., Blue)"
                        className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                      />
                      <button
                        onClick={() => removeAttribute(idx)}
                        className="px-3 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={mintNFT} variant="ethereum" className="w-full">
                🚀 Mint NFT (Simulated)
              </Button>
            </div>

            {mintedNFTs.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-4">Your Minted NFTs</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {mintedNFTs.map((nft) => (
                    <div key={nft.id} className="bg-gray-900 rounded-lg p-4 border border-green-500/30">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="font-bold text-white">{nft.name}</h5>
                          <p className="text-xs text-gray-500">Token ID: {nft.tokenId}</p>
                        </div>
                        <div className="text-3xl">{nft.image}</div>
                      </div>
                      {nft.description && (
                        <p className="text-sm text-gray-400 mb-2">{nft.description}</p>
                      )}
                      {nft.attributes.length > 0 && (
                        <div className="grid grid-cols-2 gap-1 mb-2">
                          {nft.attributes.map((attr, idx) => (
                            <div key={idx} className="bg-gray-800 rounded p-1 text-xs">
                              <div className="text-gray-500">{attr.trait_type}</div>
                              <div className="text-white">{attr.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-2">Minted: {nft.mintedAt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="standard" className="mt-6">
          <Card>
            <h3 className="text-xl font-bold text-white mb-4">📋 ERC-721 Standard Functions</h3>
            <p className="text-gray-400 mb-4">
              The ERC-721 standard defines how NFTs work on Ethereum. Here are the key functions:
            </p>

            <div className="space-y-2">
              {erc721Functions.map((func, idx) => (
                <div key={idx} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <code className="text-blue-400 font-mono text-sm">{func.name}</code>
                  <p className="text-gray-300 text-sm mt-2">{func.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2">💡 Key Differences from ERC-20</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Each token has a unique <span className="text-blue-400">tokenId</span></li>
                <li>• Transfer functions require specifying the exact tokenId</li>
                <li>• No decimals - NFTs are indivisible (you can't have 0.5 NFTs)</li>
                <li>• Metadata (name, image, properties) stored off-chain or on IPFS</li>
                <li>• Ownership is tracked per token, not by balance</li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🌐 NFT Metadata & Storage</h3>
        <div className="space-y-4">
          <p className="text-gray-300">
            NFT metadata (images, descriptions, properties) is usually NOT stored on the blockchain due to cost.
            Instead, it's stored off-chain with a reference on-chain.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-bold text-purple-400 mb-2">On-Chain</h4>
              <p className="text-sm text-gray-300 mb-2">Stored directly in the smart contract</p>
              <div className="text-xs text-gray-500">
                ✓ Permanent<br />
                ✓ Fully decentralized<br />
                ✗ Very expensive<br />
                ✗ Limited data size
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-bold text-blue-400 mb-2">IPFS</h4>
              <p className="text-sm text-gray-300 mb-2">InterPlanetary File System</p>
              <div className="text-xs text-gray-500">
                ✓ Decentralized<br />
                ✓ Content-addressed<br />
                ✓ Cheaper<br />
                ⚠️ Need pinning services
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-bold text-orange-400 mb-2">Centralized Server</h4>
              <p className="text-sm text-gray-300 mb-2">Traditional web hosting</p>
              <div className="text-xs text-gray-500">
                ✓ Cheapest<br />
                ✓ Easy to update<br />
                ✗ Can disappear<br />
                ✗ Centralized risk
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Real-World NFT Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-bold text-white mb-2">Digital Art</h4>
            <p className="text-sm text-gray-300">
              Artists sell unique digital artworks. Buyers get provable ownership and can resell.
            </p>
            <p className="text-xs text-blue-400 mt-2">Example: Beeple's $69M sale</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-2xl mb-2">🎮</div>
            <h4 className="font-bold text-white mb-2">Gaming Items</h4>
            <p className="text-sm text-gray-300">
              In-game items as NFTs. Players truly own and can trade items across games.
            </p>
            <p className="text-xs text-blue-400 mt-2">Example: Axie Infinity, Gods Unchained</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-2xl mb-2">🏠</div>
            <h4 className="font-bold text-white mb-2">Real Estate</h4>
            <p className="text-sm text-gray-300">
              Property deeds as NFTs for fractional ownership and easier transfers.
            </p>
            <p className="text-xs text-blue-400 mt-2">Example: Virtual land (Decentraland, Sandbox)</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-2xl mb-2">🎫</div>
            <h4 className="font-bold text-white mb-2">Tickets & Memberships</h4>
            <p className="text-sm text-gray-300">
              Event tickets or membership passes that can't be counterfeited.
            </p>
            <p className="text-xs text-blue-400 mt-2">Example: Concert tickets, exclusive clubs</p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>NFTs are unique tokens with individual identities - unlike fungible tokens</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>ERC-721 is the standard for NFTs on Ethereum with 7 required functions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>NFT metadata is usually stored off-chain (IPFS or centralized servers)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>NFTs enable digital ownership of art, collectibles, gaming items, and more</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>You explored famous NFTs and created your own simulated NFT collection!</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
