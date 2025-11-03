'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { ethers } from 'ethers'

export default function EthereumStage2() {
  const [wallet, setWallet] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [showMnemonic, setShowMnemonic] = useState(false)

  const generateWallet = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
      const randomWallet = ethers.Wallet.createRandom()

      setWallet({
        address: randomWallet.address,
        privateKey: randomWallet.privateKey,
        mnemonic: randomWallet.mnemonic.phrase,
        publicKey: randomWallet.publicKey,
        balance: '0.0',
      })
    } catch (error) {
      console.error('Error generating wallet:', error)
      alert('Error generating wallet')
    }

    setIsGenerating(false)
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    alert(`${label} copied!`)
  }

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={2}
      stageTitle="Create Your Ethereum Wallet"
      stageDescription="Generate a real Ethereum wallet with cryptographic keys"
      nextStageHref="/ethereum/stage-3"
      estimatedTime="15 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Ethereum Wallets</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            Ethereum wallets work similarly to Bitcoin, but with some key differences:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">📍 Address Format</h3>
              <p className="text-sm">Starts with 0x, 42 characters long</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">0x742d35Cc6634C0532...</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">🔑 Seed Phrase</h3>
              <p className="text-sm">12-24 words to recover wallet</p>
              <p className="text-xs text-gray-500 mt-1">Can generate infinite addresses</p>
            </div>
          </div>
        </div>
      </Card>

      {!wallet ? (
        <Card className="mb-8 text-center py-12">
          <div className="text-6xl mb-4">Ξ</div>
          <h3 className="text-2xl font-bold text-white mb-4">Generate Ethereum Wallet</h3>
          <p className="text-gray-400 mb-6">
            Create a real Ethereum wallet with actual cryptographic keys
          </p>
          <Button onClick={generateWallet} variant="ethereum" size="lg" disabled={isGenerating}>
            {isGenerating ? '🔐 Generating...' : '🔐 Generate Wallet'}
          </Button>
        </Card>
      ) : (
        <>
          <Card className="mb-8 bg-green-500/10 border-green-500/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">✅</span>
              <h3 className="text-2xl font-bold text-white">Wallet Generated!</h3>
            </div>
          </Card>

          <Card className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-sm text-gray-500 mb-1">Ethereum Address</div>
                <div className="text-xs text-gray-600">Your public address</div>
              </div>
              <span className="text-2xl">Ξ</span>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 mb-3">
              <div className="font-mono text-sm text-green-400 break-all">
                {wallet.address}
              </div>
            </div>
            <Button
              onClick={() => copyToClipboard(wallet.address, 'Address')}
              variant="secondary"
              size="sm"
            >
              📋 Copy Address
            </Button>
          </Card>

          <Card className="mb-6 bg-yellow-500/10 border-yellow-500/50">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-sm text-yellow-400 mb-1 font-bold">🔑 Recovery Phrase (Mnemonic)</div>
                <div className="text-xs text-gray-400">12 words to recover your wallet</div>
              </div>
              <span className="text-2xl">📝</span>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 mb-3">
              {showMnemonic ? (
                <div className="grid grid-cols-3 gap-2">
                  {wallet.mnemonic.split(' ').map((word, idx) => (
                    <div key={idx} className="bg-gray-800 rounded px-3 py-2 text-center">
                      <div className="text-xs text-gray-500">{idx + 1}</div>
                      <div className="text-white font-medium">{word}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-600">
                  ••••••• ••••••• ••••••• •••••••
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowMnemonic(!showMnemonic)}
                variant="secondary"
                size="sm"
              >
                {showMnemonic ? '🙈 Hide' : '👁️ Show'} Phrase
              </Button>
              {showMnemonic && (
                <Button
                  onClick={() => copyToClipboard(wallet.mnemonic, 'Mnemonic')}
                  variant="secondary"
                  size="sm"
                >
                  📋 Copy
                </Button>
              )}
            </div>
            <div className="mt-4 p-3 bg-yellow-900/30 rounded border border-yellow-500/30">
              <p className="text-xs text-yellow-300">
                ⚠️ <strong>Critical:</strong> Write this phrase on paper and store it safely.
                Anyone with this phrase can access your funds!
              </p>
            </div>
          </Card>

          <Card className="mb-6 bg-red-500/10 border-red-500/50">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-sm text-red-400 mb-1 font-bold">🔐 Private Key</div>
                <div className="text-xs text-gray-400">NEVER share this!</div>
              </div>
              <span className="text-2xl">🔒</span>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 mb-3">
              {showPrivateKey ? (
                <div className="font-mono text-xs text-red-400 break-all">
                  {wallet.privateKey}
                </div>
              ) : (
                <div className="text-center py-2 text-gray-600">
                  ••••••••••••••••••••••••••••••••••••••••••
                </div>
              )}
            </div>
            <Button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              variant="danger"
              size="sm"
            >
              {showPrivateKey ? '🙈 Hide' : '👁️ Show'} Private Key
            </Button>
          </Card>

          <Card className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Balance</div>
                <div className="text-3xl font-bold text-white">
                  {wallet.balance} <span className="text-blue-400">ETH</span>
                </div>
              </div>
              <div className="text-5xl">💎</div>
            </div>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => {
                setWallet(null)
                setShowPrivateKey(false)
                setShowMnemonic(false)
              }}
              variant="outline"
            >
              🔄 Generate Another Wallet
            </Button>
          </div>
        </>
      )}

      <Card className="mt-8 bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Ethereum addresses start with 0x and are 42 characters</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Seed phrases (12-24 words) can recover your entire wallet</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>One seed phrase can generate multiple addresses</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Never share your private key or seed phrase</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Store recovery phrases offline (paper or metal)</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
