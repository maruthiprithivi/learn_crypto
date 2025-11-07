'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SolanaStage5() {
  const [tokenName, setTokenName] = useState('My Token')
  const [tokenSymbol, setTokenSymbol] = useState('MTK')
  const [tokenDecimals, setTokenDecimals] = useState(9)
  const [totalSupply, setTotalSupply] = useState(1000000)
  const [mintAuthority, setMintAuthority] = useState('Your Wallet')
  const [freezeAuthority, setFreezeAuthority] = useState('None')

  const [selectedExtension, setSelectedExtension] = useState('transferFee')

  const tokenExtensions = {
    transferFee: {
      name: 'Transfer Fee',
      icon: '💰',
      description: 'Charge a fee on every token transfer',
      useCase: 'Revenue sharing, tax tokens',
      params: ['Fee basis points', 'Max fee', 'Fee collector account']
    },
    interestBearing: {
      name: 'Interest Bearing',
      icon: '📈',
      description: 'Token balance increases over time based on interest rate',
      useCase: 'Staking rewards, yield tokens',
      params: ['Interest rate', 'Rate authority']
    },
    permanentDelegate: {
      name: 'Permanent Delegate',
      icon: '👑',
      description: 'Designated account can always transfer tokens',
      useCase: 'Regulatory compliance, recovery',
      params: ['Delegate address']
    },
    transferHook: {
      name: 'Transfer Hook',
      icon: '🪝',
      description: 'Execute custom program logic on transfers',
      useCase: 'Complex business logic, automations',
      params: ['Program ID', 'Hook accounts']
    },
    nonTransferable: {
      name: 'Non-Transferable',
      icon: '🔒',
      description: 'Tokens cannot be transferred (soulbound)',
      useCase: 'Credentials, certifications, achievements',
      params: []
    },
    metadata: {
      name: 'Metadata Pointer',
      icon: '📝',
      description: 'Point to on-chain metadata',
      useCase: 'Token information, images, attributes',
      params: ['Metadata account', 'Update authority']
    }
  }

  const accountTypes = [
    {
      type: 'Mint Account',
      icon: '🏭',
      purpose: 'Defines the token',
      stores: ['Supply', 'Decimals', 'Mint authority', 'Freeze authority'],
      size: '~82 bytes',
      color: 'purple'
    },
    {
      type: 'Token Account',
      icon: '💼',
      purpose: 'Holds tokens for owner',
      stores: ['Balance', 'Owner', 'Mint', 'Delegate', 'State'],
      size: '~165 bytes',
      color: 'blue'
    },
    {
      type: 'Associated Token Account',
      icon: '🔗',
      purpose: 'Deterministic token account',
      stores: ['Same as Token Account', 'Derived from owner + mint'],
      size: '~165 bytes',
      color: 'green'
    }
  ]

  const extension = tokenExtensions[selectedExtension]

  return (
    <StageLayout
      trackName="Solana Track"
      trackHref="/solana"
      trackColor="solana"
      stageNumber={5}
      stageTitle="SPL Tokens"
      stageDescription="Solana's token standard for fungible tokens"
      nextStageHref="/solana/stage-6"
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🪙</span>
          <div>
            <h2 className="text-2xl font-bold text-white">SPL Token Program</h2>
            <p className="text-gray-400">Creating fungible tokens on Solana</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          SPL (Solana Program Library) Token is the standard for fungible and non-fungible tokens on Solana.
          Unlike Ethereum's multiple standards (ERC-20, ERC-721), SPL handles both in one unified program.
        </p>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">🔑 Key Advantages</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• <strong>Single Standard:</strong> One program for all token types</li>
            <li>• <strong>Efficient:</strong> Accounts are lightweight and cheap</li>
            <li>• <strong>Extensible:</strong> Token-2022 adds powerful extensions</li>
            <li>• <strong>Fast:</strong> Benefit from Solana's speed</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📦 SPL Token Architecture</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {accountTypes.map((account, idx) => (
            <div key={idx} className={`bg-${account.color}-500/10 border border-${account.color}-500/30 rounded-lg p-4`}>
              <div className="text-4xl mb-2">{account.icon}</div>
              <h4 className="font-bold text-white mb-2">{account.type}</h4>
              <p className="text-sm text-gray-400 mb-3">{account.purpose}</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-bold">Stores:</div>
                {account.stores.map((item, i) => (
                  <div key={i} className="text-xs text-gray-300">• {item}</div>
                ))}
                <div className="mt-3 pt-2 border-t border-gray-700">
                  <Badge variant="secondary" className="text-xs">{account.size}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h5 className="font-bold text-blue-400 mb-2">Flow: Mint → Token Account → Transfer</h5>
          <div className="flex items-center justify-between text-sm text-gray-300 flex-wrap gap-2">
            <div className="flex-1 text-center">
              <div className="bg-purple-500/20 rounded p-3 mb-2">
                <div className="font-bold">1. Create Mint</div>
                <div className="text-xs text-gray-400">Defines the token</div>
              </div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1 text-center">
              <div className="bg-blue-500/20 rounded p-3 mb-2">
                <div className="font-bold">2. Create Token Account</div>
                <div className="text-xs text-gray-400">To hold tokens</div>
              </div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1 text-center">
              <div className="bg-green-500/20 rounded p-3 mb-2">
                <div className="font-bold">3. Mint Tokens</div>
                <div className="text-xs text-gray-400">Create supply</div>
              </div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1 text-center">
              <div className="bg-orange-500/20 rounded p-3 mb-2">
                <div className="font-bold">4. Transfer</div>
                <div className="text-xs text-gray-400">Send to others</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎨 Token Creation Simulator</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Symbol</label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                maxLength={10}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Decimals: {tokenDecimals}
              </label>
              <input
                type="range"
                min="0"
                max="9"
                value={tokenDecimals}
                onChange={(e) => setTokenDecimals(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">
                Most tokens use 9 decimals on Solana
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Initial Supply: {totalSupply.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="1000000000"
                step="1000"
                value={totalSupply}
                onChange={(e) => setTotalSupply(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Mint Authority</label>
                <select
                  value={mintAuthority}
                  onChange={(e) => setMintAuthority(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none text-sm"
                >
                  <option>Your Wallet</option>
                  <option>Multi-sig</option>
                  <option>None (Fixed Supply)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Freeze Authority</label>
                <select
                  value={freezeAuthority}
                  onChange={(e) => setFreezeAuthority(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none text-sm"
                >
                  <option>None</option>
                  <option>Your Wallet</option>
                  <option>Multi-sig</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl p-6">
            <h4 className="font-bold text-white mb-4 text-center">Token Preview</h4>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-5xl mb-2">🪙</div>
                <div className="text-2xl font-bold text-white">{tokenName}</div>
                <Badge variant="secondary" className="mt-2">{tokenSymbol}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900/50 rounded p-3 text-center">
                  <div className="text-xs text-gray-400">Total Supply</div>
                  <div className="text-lg font-bold text-white">
                    {(totalSupply / Math.pow(10, tokenDecimals)).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">{tokenSymbol}</div>
                </div>
                <div className="bg-gray-900/50 rounded p-3 text-center">
                  <div className="text-xs text-gray-400">Decimals</div>
                  <div className="text-lg font-bold text-white">{tokenDecimals}</div>
                </div>
                <div className="bg-gray-900/50 rounded p-3 text-center">
                  <div className="text-xs text-gray-400">Mint Authority</div>
                  <div className="text-xs font-bold text-white">{mintAuthority}</div>
                </div>
                <div className="bg-gray-900/50 rounded p-3 text-center">
                  <div className="text-xs text-gray-400">Freeze Authority</div>
                  <div className="text-xs font-bold text-white">{freezeAuthority}</div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">Creation Cost</div>
                <div className="text-lg font-bold text-green-400">~0.002 SOL</div>
                <div className="text-xs text-gray-500">For mint + rent</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🚀 Token-2022 Extensions</h3>
        <p className="text-gray-300 mb-4">
          Token-2022 is the new SPL Token program with powerful extensions that add functionality
          without requiring new token standards.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {Object.entries(tokenExtensions).map(([key, ext]) => (
            <button
              key={key}
              onClick={() => setSelectedExtension(key)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedExtension === key
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-white/50'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-3xl mb-2">{ext.icon}</div>
              <div className="text-sm font-bold text-white">{ext.name}</div>
            </button>
          ))}
        </div>

        {extension && (
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{extension.icon}</span>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-1">{extension.name}</h4>
                <p className="text-gray-300 text-sm mb-2">{extension.description}</p>
                <Badge variant="secondary">{extension.useCase}</Badge>
              </div>
            </div>

            {extension.params.length > 0 && (
              <div className="bg-gray-900 rounded p-3">
                <div className="text-sm font-bold text-white mb-2">Configuration Parameters:</div>
                <div className="space-y-1">
                  {extension.params.map((param, idx) => (
                    <div key={idx} className="text-xs text-gray-300">• {param}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔄 Common Operations</h3>
        <Tabs defaultValue="mint">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mint">Mint</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
            <TabsTrigger value="burn">Burn</TabsTrigger>
            <TabsTrigger value="freeze">Freeze</TabsTrigger>
          </TabsList>

          <TabsContent value="mint" className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-bold text-green-400 mb-3">Minting Tokens</h4>
              <p className="text-sm text-gray-300 mb-4">
                Create new tokens and add them to a token account. Requires mint authority.
              </p>
              <div className="bg-gray-900 rounded p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Requires:</span>
                    <span className="text-white">Mint authority signature</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accounts:</span>
                    <span className="text-white">Mint, Destination, Authority</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-green-400">~$0.00025</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-950 rounded p-3">
                <pre className="text-xs text-green-400 font-mono">
{`await mintTo(
  connection,
  payer,
  mint,
  destination,
  authority,
  amount
)`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-bold text-blue-400 mb-3">Transferring Tokens</h4>
              <p className="text-sm text-gray-300 mb-4">
                Send tokens from one account to another. Requires owner or delegate signature.
              </p>
              <div className="bg-gray-900 rounded p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Requires:</span>
                    <span className="text-white">Source owner signature</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accounts:</span>
                    <span className="text-white">Source, Destination, Authority</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-green-400">~$0.00025</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-950 rounded p-3">
                <pre className="text-xs text-blue-400 font-mono">
{`await transfer(
  connection,
  payer,
  source,
  destination,
  owner,
  amount
)`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="burn" className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-bold text-orange-400 mb-3">Burning Tokens</h4>
              <p className="text-sm text-gray-300 mb-4">
                Permanently destroy tokens by removing them from circulation.
              </p>
              <div className="bg-gray-900 rounded p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Requires:</span>
                    <span className="text-white">Account owner signature</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accounts:</span>
                    <span className="text-white">Account, Mint, Owner</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Effect:</span>
                    <span className="text-orange-400">Reduces supply</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-950 rounded p-3">
                <pre className="text-xs text-orange-400 font-mono">
{`await burn(
  connection,
  payer,
  account,
  mint,
  owner,
  amount
)`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="freeze" className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-bold text-purple-400 mb-3">Freezing Accounts</h4>
              <p className="text-sm text-gray-300 mb-4">
                Prevent an account from transferring tokens. Requires freeze authority.
              </p>
              <div className="bg-gray-900 rounded p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Requires:</span>
                    <span className="text-white">Freeze authority signature</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accounts:</span>
                    <span className="text-white">Account, Mint, Authority</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Use Case:</span>
                    <span className="text-purple-400">Compliance, security</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 mb-3">
                <div className="text-xs text-yellow-400">
                  ⚠️ Use freeze authority carefully - it's a centralized control mechanism
                </div>
              </div>
              <div className="bg-gray-950 rounded p-3">
                <pre className="text-xs text-purple-400 font-mono">
{`await freezeAccount(
  connection,
  payer,
  account,
  mint,
  freezeAuthority
)`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🏆 Popular SPL Tokens</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">💵</div>
              <Badge variant="success">$150B+</Badge>
            </div>
            <h4 className="font-bold text-white mb-1">USDC</h4>
            <p className="text-xs text-gray-400 mb-2">USD Coin stablecoin</p>
            <div className="text-xs text-gray-500">
              Most liquid stablecoin on Solana
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">💎</div>
              <Badge variant="secondary">$5B+</Badge>
            </div>
            <h4 className="font-bold text-white mb-1">BONK</h4>
            <p className="text-xs text-gray-400 mb-2">Community memecoin</p>
            <div className="text-xs text-gray-500">
              First Solana dog coin with massive distribution
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">🌊</div>
              <Badge variant="secondary">$1B+</Badge>
            </div>
            <h4 className="font-bold text-white mb-1">JUP</h4>
            <p className="text-xs text-gray-400 mb-2">Jupiter Exchange token</p>
            <div className="text-xs text-gray-500">
              Governance token for leading DEX aggregator
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
              <span>✅</span>
              <span>Do's</span>
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Use 9 decimals (Solana standard)</li>
              <li>• Use Associated Token Accounts when possible</li>
              <li>• Consider Token-2022 for new tokens</li>
              <li>• Set appropriate authorities</li>
              <li>• Add metadata for better UX</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
              <span>❌</span>
              <span>Don'ts</span>
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Don't lose mint authority (if you need it)</li>
              <li>• Don't use freeze authority unless necessary</li>
              <li>• Avoid creating multiple token accounts per user</li>
              <li>• Don't forget to fund rent for accounts</li>
              <li>• Avoid hardcoding token addresses</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="bg-purple-500/10 border-purple-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>SPL Token is Solana's unified standard for all token types</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Mint accounts define tokens, Token accounts hold balances</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Associated Token Accounts provide deterministic addresses</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Token-2022 adds powerful extensions like transfer fees and hooks</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Creating tokens is cheap (~0.002 SOL) and fast</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Authorities (mint, freeze) provide flexible but centralized control</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
