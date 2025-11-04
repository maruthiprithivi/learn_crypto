'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function EthereumStage6() {
  const [tokenSupply, setTokenSupply] = useState(1000000)
  const [balances, setBalances] = useState({
    'Creator': 1000000,
    'Alice': 0,
    'Bob': 0,
    'Carol': 0,
  })
  const [transferFrom, setTransferFrom] = useState('Creator')
  const [transferTo, setTransferTo] = useState('Alice')
  const [transferAmount, setTransferAmount] = useState(1000)
  const [mintAmount, setMintAmount] = useState(10000)
  const [burnAmount, setBurnAmount] = useState(5000)
  const [history, setHistory] = useState([])

  const addHistory = (action, details) => {
    setHistory([{ action, details, time: new Date().toLocaleTimeString() }, ...history.slice(0, 9)])
  }

  const handleTransfer = () => {
    if (transferFrom === transferTo) {
      alert('Cannot transfer to the same address!')
      return
    }
    if (balances[transferFrom] < transferAmount) {
      alert(`${transferFrom} has insufficient balance!`)
      return
    }
    if (transferAmount <= 0) {
      alert('Amount must be greater than 0!')
      return
    }

    setBalances({
      ...balances,
      [transferFrom]: balances[transferFrom] - transferAmount,
      [transferTo]: balances[transferTo] + transferAmount,
    })
    addHistory('Transfer', `${transferFrom} sent ${transferAmount.toLocaleString()} tokens to ${transferTo}`)
  }

  const handleMint = () => {
    if (mintAmount <= 0) {
      alert('Mint amount must be greater than 0!')
      return
    }
    setTokenSupply(tokenSupply + mintAmount)
    setBalances({ ...balances, Creator: balances.Creator + mintAmount })
    addHistory('Mint', `Created ${mintAmount.toLocaleString()} new tokens (Total supply: ${(tokenSupply + mintAmount).toLocaleString()})`)
  }

  const handleBurn = () => {
    if (burnAmount <= 0) {
      alert('Burn amount must be greater than 0!')
      return
    }
    if (balances.Creator < burnAmount) {
      alert('Creator has insufficient balance to burn!')
      return
    }
    setTokenSupply(tokenSupply - burnAmount)
    setBalances({ ...balances, Creator: balances.Creator - burnAmount })
    addHistory('Burn', `Destroyed ${burnAmount.toLocaleString()} tokens (Total supply: ${(tokenSupply - burnAmount).toLocaleString()})`)
  }

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={6}
      stageTitle="Token Operations: Mint, Burn, Transfer"
      stageDescription="Master the three core token operations"
      nextStageHref="/ethereum/stage-7"
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">⚡</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Token Operations Playground</h2>
            <p className="text-gray-400">Experiment with minting, burning, and transferring tokens</p>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Total Token Supply</div>
              <div className="text-3xl font-bold text-white">{tokenSupply.toLocaleString()}</div>
            </div>
            <div className="text-5xl">🪙</div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💰 Wallet Balances</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(balances).map(([name, balance]) => (
            <div key={name} className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">{name}</div>
                  <div className="text-2xl font-bold text-white">{balance.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">
                    {tokenSupply > 0 ? ((balance / tokenSupply) * 100).toFixed(2) : 0}% of total supply
                  </div>
                </div>
                <div className="text-3xl">
                  {name === 'Creator' ? '👑' : name === 'Alice' ? '👩' : name === 'Bob' ? '👨' : '👧'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-green-500/10 border-green-500/50">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🌱</span>
            <span>Mint (Create)</span>
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Create new tokens from thin air. Increases total supply.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Amount to Mint</label>
              <input
                type="number"
                value={mintAmount}
                onChange={(e) => setMintAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
            <Button onClick={handleMint} variant="success" className="w-full" size="sm">
              Mint Tokens
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-green-500/30">
            <p className="text-xs text-gray-400">
              <span className="font-bold text-green-400">Note:</span> Only the contract owner can mint.
              In real tokens, this might be restricted or disabled.
            </p>
          </div>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/50">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>📤</span>
            <span>Transfer</span>
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Send tokens from one wallet to another. Total supply stays the same.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <select
                value={transferFrom}
                onChange={(e) => setTransferFrom(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              >
                {Object.keys(balances).map(name => (
                  <option key={name} value={name}>{name} ({balances[name].toLocaleString()})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <select
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              >
                {Object.keys(balances).filter(n => n !== transferFrom).map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Amount</label>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
            <Button onClick={handleTransfer} variant="ethereum" className="w-full" size="sm">
              Transfer
            </Button>
          </div>
        </Card>

        <Card className="bg-red-500/10 border-red-500/50">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🔥</span>
            <span>Burn (Destroy)</span>
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Permanently destroy tokens. Decreases total supply.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Amount to Burn</label>
              <input
                type="number"
                value={burnAmount}
                onChange={(e) => setBurnAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
            <Button onClick={handleBurn} variant="danger" className="w-full" size="sm">
              Burn Tokens
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-red-500/30">
            <p className="text-xs text-gray-400">
              <span className="font-bold text-red-400">Warning:</span> Burning is permanent!
              Burned tokens can never be recovered.
            </p>
          </div>
        </Card>
      </div>

      {history.length > 0 && (
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">📜 Transaction History</h3>
          <div className="space-y-2">
            {history.map((item, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg p-3 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {item.action === 'Mint' ? '🌱' : item.action === 'Burn' ? '🔥' : '📤'}
                  </span>
                  <div>
                    <div className={`text-sm font-bold ${
                      item.action === 'Mint' ? 'text-green-400' :
                      item.action === 'Burn' ? 'text-red-400' : 'text-blue-400'
                    }`}>
                      {item.action}
                    </div>
                    <div className="text-xs text-gray-400">{item.details}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🧠 Understanding the Operations</h3>
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-2">🌱 Minting</h4>
            <p className="text-sm text-gray-300 mb-2">
              Minting creates new tokens and increases the total supply. Think of it like a government printing money.
            </p>
            <div className="bg-gray-800 rounded p-3 mt-2">
              <div className="text-xs text-gray-400 mb-1">Use Cases:</div>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Reward programs (creating tokens as rewards)</li>
                <li>• Staking rewards (minting new tokens for stakers)</li>
                <li>• Fundraising (creating tokens for investors)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-blue-400 mb-2">📤 Transferring</h4>
            <p className="text-sm text-gray-300 mb-2">
              Transferring moves tokens from one wallet to another. Total supply remains unchanged.
            </p>
            <div className="bg-gray-800 rounded p-3 mt-2">
              <div className="text-xs text-gray-400 mb-1">Use Cases:</div>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Payments (sending tokens for goods/services)</li>
                <li>• Trading (exchanging tokens on exchanges)</li>
                <li>• Gifting (sending tokens to friends)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2">🔥 Burning</h4>
            <p className="text-sm text-gray-300 mb-2">
              Burning permanently destroys tokens and decreases the total supply. It's irreversible!
            </p>
            <div className="bg-gray-800 rounded p-3 mt-2">
              <div className="text-xs text-gray-400 mb-1">Use Cases:</div>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Deflation (making remaining tokens more scarce/valuable)</li>
                <li>• Fee reduction (burning a portion of transaction fees)</li>
                <li>• Token buybacks (projects buying and burning tokens)</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Real-World Examples</h3>
        <div className="space-y-3">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔥</span>
              <h4 className="font-bold text-white">Binance Coin (BNB)</h4>
            </div>
            <p className="text-sm text-gray-300">
              Binance regularly burns BNB tokens (destroys them permanently) to reduce supply and potentially increase value.
              They've burned billions of dollars worth!
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🌱</span>
              <h4 className="font-bold text-white">Ethereum (ETH) Staking Rewards</h4>
            </div>
            <p className="text-sm text-gray-300">
              New ETH is minted to reward validators who help secure the network. The inflation rate is carefully controlled.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📤</span>
              <h4 className="font-bold text-white">USDC Transfers</h4>
            </div>
            <p className="text-sm text-gray-300">
              USDC stablecoin processes billions of dollars in transfers daily for payments, trading, and DeFi applications.
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Minting creates new tokens and increases total supply - usually restricted to the contract owner</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Transferring moves tokens between wallets without changing total supply</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Burning destroys tokens permanently and decreases total supply - cannot be undone</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Each operation serves different purposes: minting for rewards, transferring for payments, burning for deflation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>You experimented with all three operations in this interactive playground!</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
