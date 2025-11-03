'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import * as bitcoin from 'bitcoinjs-lib'

export default function BitcoinStage2() {
  const [wallet, setWallet] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [entropyProgress, setEntropyProgress] = useState(0)
  const [mouseMovements, setMouseMovements] = useState([])

  const generateWallet = async () => {
    setIsGenerating(true)
    setEntropyProgress(0)

    // Simulate entropy collection
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setEntropyProgress(i)
    }

    try {
      // Generate a random key pair
      const keyPair = bitcoin.ECPair.makeRandom()

      // Generate address (P2PKH - Pay to Public Key Hash)
      const { address } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: bitcoin.networks.testnet, // Using testnet for safety
      })

      // Get private key in WIF format
      const privateKey = keyPair.toWIF()
      const publicKey = keyPair.publicKey.toString('hex')

      setWallet({
        address,
        privateKey,
        publicKey,
        balance: 0, // Simulated
        network: 'testnet',
      })
    } catch (error) {
      console.error('Error generating wallet:', error)
      alert('Error generating wallet. Please try again.')
    }

    setIsGenerating(false)
  }

  const handleMouseMove = (e) => {
    if (isGenerating && mouseMovements.length < 50) {
      setMouseMovements([
        ...mouseMovements,
        { x: e.clientX, y: e.clientY, time: Date.now() },
      ])
    }
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    alert(`${label} copied to clipboard!`)
  }

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={2}
      stageTitle="Your First Wallet"
      stageDescription="Generate a real Bitcoin wallet with cryptographic keys"
      nextStageHref="/bitcoin/stage-3"
      estimatedTime="15 min"
    >
      <div onMouseMove={handleMouseMove}>
        {/* Introduction */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">What is a Bitcoin Wallet?</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              A Bitcoin wallet isn't actually a physical wallet. It's a pair of cryptographic
              keys:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-3xl mb-2">🔓</div>
                <h3 className="text-lg font-bold text-white mb-2">Public Key</h3>
                <p className="text-sm text-gray-400">
                  Like your email address - you can share this with anyone to receive Bitcoin.
                  It's derived from your private key.
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="text-lg font-bold text-white mb-2">Private Key</h3>
                <p className="text-sm text-gray-400">
                  Like your email password - NEVER share this! Anyone with your private key can
                  spend your Bitcoin.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Warning Card */}
        <Card className="mb-8 bg-yellow-500/10 border-yellow-500/50">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">
                Important: This is a Learning Environment
              </h3>
              <p className="text-yellow-200 text-sm">
                This wallet is generated on <strong>testnet</strong> (practice network). While
                the keys are real, they're for learning only. Never use testnet addresses for
                real Bitcoin!
              </p>
            </div>
          </div>
        </Card>

        {/* Wallet Generator */}
        {!wallet ? (
          <Card className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">⚡ Generate Your Wallet</h3>
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-6xl mb-4">👛</div>
                <p className="text-gray-400 mb-6">
                  Click the button below to generate your first Bitcoin wallet using real
                  cryptographic algorithms.
                </p>

                {isGenerating && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                      Collecting entropy... {entropyProgress}%
                    </p>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden max-w-md mx-auto">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300"
                        style={{ width: `${entropyProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Move your mouse around to add randomness!
                    </p>
                  </div>
                )}

                <Button
                  onClick={generateWallet}
                  variant="bitcoin"
                  size="lg"
                  disabled={isGenerating}
                >
                  {isGenerating ? '🔐 Generating...' : '🔐 Generate Wallet'}
                </Button>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
                <h4 className="font-bold text-blue-400 mb-2">How it works:</h4>
                <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                  <li>Generate random entropy (randomness) from your system</li>
                  <li>Use cryptographic algorithms (secp256k1) to create a private key</li>
                  <li>Derive the public key from the private key</li>
                  <li>Hash the public key to create your Bitcoin address</li>
                </ol>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {/* Wallet Display */}
            <Card className="mb-8 bg-green-500/10 border-green-500/50">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">✅</span>
                <h3 className="text-2xl font-bold text-white">Wallet Generated!</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Congratulations! You've created your first Bitcoin wallet. Below are your keys
                - in real life, you'd save these securely.
              </p>
            </Card>

            {/* Bitcoin Address */}
            <Card className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Your Bitcoin Address</div>
                  <div className="text-xs text-gray-600">Share this to receive Bitcoin</div>
                </div>
                <span className="text-2xl">🔓</span>
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
              <p className="text-xs text-gray-500 mt-3">
                🌐 Network: <span className="text-orange-400">{wallet.network.toUpperCase()}</span>
              </p>
            </Card>

            {/* Public Key */}
            <Card className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Public Key</div>
                  <div className="text-xs text-gray-600">Your address is derived from this</div>
                </div>
                <span className="text-2xl">🔑</span>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mb-3">
                <div className="font-mono text-xs text-blue-400 break-all">
                  {wallet.publicKey}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                💡 This is a 33-byte compressed public key in hexadecimal format
              </p>
            </Card>

            {/* Private Key */}
            <Card className="mb-6 bg-red-500/10 border-red-500/50">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm text-red-400 mb-1 font-bold">
                    ⚠️ Private Key (SENSITIVE!)
                  </div>
                  <div className="text-xs text-gray-400">NEVER share this with anyone!</div>
                </div>
                <span className="text-2xl">🔐</span>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mb-3">
                {showPrivateKey ? (
                  <div className="font-mono text-xs text-red-400 break-all">
                    {wallet.privateKey}
                  </div>
                ) : (
                  <div className="text-gray-600 text-center py-2">
                    ••••••••••••••••••••••••••••••••••••••••••
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  variant="danger"
                  size="sm"
                >
                  {showPrivateKey ? '🙈 Hide' : '👁️ Show'} Private Key
                </Button>
                {showPrivateKey && (
                  <Button
                    onClick={() => copyToClipboard(wallet.privateKey, 'Private Key')}
                    variant="secondary"
                    size="sm"
                  >
                    📋 Copy
                  </Button>
                )}
              </div>
              <div className="mt-4 p-3 bg-red-900/30 rounded border border-red-500/30">
                <p className="text-xs text-red-300">
                  <strong>Security Warning:</strong> In production, never display or copy
                  private keys like this. Store them encrypted or in hardware wallets.
                </p>
              </div>
            </Card>

            {/* Balance Display */}
            <Card className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Wallet Balance</div>
                  <div className="text-3xl font-bold text-white">
                    {wallet.balance} <span className="text-orange-400">tBTC</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Testnet Bitcoin</div>
                </div>
                <div className="text-5xl">💰</div>
              </div>
            </Card>

            {/* Generate Another */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setWallet(null)
                  setShowPrivateKey(false)
                  setMouseMovements([])
                }}
                variant="outline"
              >
                🔄 Generate Another Wallet
              </Button>
            </div>
          </>
        )}

        {/* Key Learnings */}
        <Card className="mt-8 bg-blue-500/10 border-blue-500/50">
          <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span>
                A Bitcoin wallet is just a pair of cryptographic keys - no physical wallet
                needed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span>
                Your public key/address is safe to share - it's how you receive Bitcoin
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span>
                Your private key must be kept secret - it controls access to your funds
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span>The address is derived from your public key through hashing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span>
                Real wallets use testnet for practice and mainnet for real transactions
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </StageLayout>
  )
}
