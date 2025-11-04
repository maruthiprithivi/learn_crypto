'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { getERC20TokenInfo } from '@/lib/api/ethereum-api'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EthereumExplorer from '@/components/interactive/EthereumExplorer'

export default function EthereumStage4() {
  const [selectedToken, setSelectedToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedFunction, setSelectedFunction] = useState(null)

  const popularTokens = [
    { name: 'USDC', symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', description: 'USD Coin - Stablecoin' },
    { name: 'Chainlink', symbol: 'LINK', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', description: 'Oracle network token' },
    { name: 'Uniswap', symbol: 'UNI', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', description: 'DEX governance token' },
  ]

  const erc20Functions = [
    { name: 'totalSupply()', type: 'read', description: 'Returns the total token supply' },
    { name: 'balanceOf(address)', type: 'read', description: 'Returns the balance of an address' },
    { name: 'transfer(address, amount)', type: 'write', description: 'Transfers tokens to an address' },
    { name: 'approve(address, amount)', type: 'write', description: 'Approves an address to spend tokens' },
    { name: 'transferFrom(from, to, amount)', type: 'write', description: 'Transfers tokens on behalf of another address' },
    { name: 'allowance(owner, spender)', type: 'read', description: 'Returns approved spending amount' },
  ]

  const loadTokenInfo = async (token) => {
    setLoading(true)
    setError(null)
    setSelectedToken(null)

    try {
      const data = await getERC20TokenInfo(token.address)
      setSelectedToken({ ...token, ...data })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={4}
      stageTitle="Understanding ERC-20 Tokens"
      stageDescription="Learn about Ethereum's token standard"
      nextStageHref="/ethereum/stage-5"
      estimatedTime="20 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🪙</span>
          <div>
            <h2 className="text-2xl font-bold text-white">What are ERC-20 Tokens?</h2>
            <p className="text-gray-400">The standard for fungible tokens on Ethereum</p>
          </div>
        </div>
        <div className="space-y-4 text-gray-300">
          <p>
            ERC-20 is a technical standard for tokens on Ethereum. Think of it as a rulebook that all tokens must follow
            to work properly with wallets, exchanges, and other smart contracts.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm">
              <span className="font-bold text-blue-400">Fun Fact:</span> "ERC" stands for "Ethereum Request for Comments"
              and "20" is the proposal number. It was proposed in 2015 by Fabian Vogelsteller!
            </p>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔍 Explore Real ERC-20 Tokens</h3>
        <p className="text-gray-400 mb-4">Click on a token to see its live information from the blockchain:</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {popularTokens.map((token) => (
            <button
              key={token.address}
              onClick={() => loadTokenInfo(token)}
              className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-blue-500 rounded-lg p-4 transition-all text-left"
            >
              <div className="text-xl font-bold text-white mb-1">{token.symbol}</div>
              <div className="text-sm text-gray-400 mb-2">{token.name}</div>
              <div className="text-xs text-gray-500">{token.description}</div>
            </button>
          ))}
        </div>

        {loading && (
          <div className="bg-gray-900 rounded-lg p-8">
            <LoadingSpinner size="lg" text="Fetching token data from blockchain..." />
          </div>
        )}

        {error && (
          <Card className="bg-red-500/10 border-red-500/50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <div>
                <h4 className="font-bold text-white">Error</h4>
                <p className="text-sm text-gray-400">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {selectedToken && !loading && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 animate-fade-in">
            <h4 className="text-lg font-bold text-white mb-4">Token Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Token Name</div>
                <div className="text-xl font-bold text-white">{selectedToken.name}</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Symbol</div>
                <div className="text-xl font-bold text-blue-400">{selectedToken.symbol}</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Decimals</div>
                <div className="text-lg font-bold text-white">{selectedToken.decimals}</div>
                <div className="text-xs text-gray-500 mt-1">Smallest unit divisibility</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Total Supply</div>
                <div className="text-lg font-bold text-white">
                  {parseInt(selectedToken.totalSupply).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-900 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Contract Address</div>
              <div className="font-mono text-xs text-green-400 break-all">{selectedToken.address}</div>
            </div>
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📋 Standard ERC-20 Functions</h3>
        <p className="text-gray-400 mb-4">
          Every ERC-20 token must implement these 6 standard functions. Click to learn what each does:
        </p>
        <div className="space-y-2">
          {erc20Functions.map((func, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFunction(selectedFunction === idx ? null : idx)}
              className={`w-full text-left bg-gray-800 border-2 rounded-lg p-4 transition-all ${
                selectedFunction === idx ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    func.type === 'read' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {func.type === 'read' ? 'READ' : 'WRITE'}
                  </span>
                  <code className="text-blue-400 font-mono">{func.name}</code>
                </div>
                <span className="text-gray-500">{selectedFunction === idx ? '▼' : '▶'}</span>
              </div>
              {selectedFunction === idx && (
                <div className="mt-3 pt-3 border-t border-gray-700 text-gray-300 animate-fade-in">
                  {func.description}
                  {func.type === 'write' && (
                    <div className="mt-2 text-xs text-orange-400">⚠️ Requires gas fee to execute</div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔄 How Token Transfers Work</h3>
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-xl">👤</div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">Alice's Wallet</div>
                <div className="text-lg font-bold text-white">100 USDC</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3 pl-6">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-green-500"></div>
              <span className="text-xs text-gray-400">transfer(Bob, 50)</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-green-500"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-xl">👤</div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">Bob's Wallet</div>
                <div className="text-lg font-bold text-white">50 USDC</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-blue-400">Important:</span> The token contract keeps track of everyone's balances.
              When Alice sends Bob 50 USDC, the contract subtracts 50 from Alice's balance and adds 50 to Bob's balance.
              No actual tokens "move" - it's all accounting in the smart contract!
            </p>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🔎</span>
          <div>
            <h3 className="text-xl font-bold text-white">Explore More Tokens & Addresses</h3>
            <p className="text-sm text-gray-400">Look up any Ethereum address or ERC-20 token contract on the blockchain</p>
          </div>
        </div>
        <EthereumExplorer />
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>ERC-20 is a standard that makes all tokens compatible with Ethereum wallets and dApps</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Every ERC-20 token has 6 mandatory functions: totalSupply, balanceOf, transfer, approve, transferFrom, allowance</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Tokens are tracked by smart contracts - balances are stored in the contract, not in your wallet</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>You explored real tokens like USDC, LINK, and UNI on the Ethereum blockchain</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>You can explore any Ethereum address or token contract using the blockchain explorer above</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
