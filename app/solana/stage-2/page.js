'use client'

import { useState } from 'react'
import * as solanaWeb3 from '@solana/web3.js'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function SolanaStage2() {
  const [wallet, setWallet] = useState(null)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [showMnemonic, setShowMnemonic] = useState(false)

  const generateWallet = () => {
    // Generate a new Solana keypair
    const keypair = solanaWeb3.Keypair.generate()

    setWallet({
      publicKey: keypair.publicKey.toString(),
      secretKey: Array.from(keypair.secretKey),
      secretKeyBase58: Buffer.from(keypair.secretKey).toString('base64'),
    })
    setShowPrivateKey(false)
    setShowMnemonic(false)
  }

  return (
    <StageLayout
      trackName="Solana Track"
      trackHref="/solana"
      trackColor="solana"
      stageNumber={2}
      stageTitle="Creating a Solana Wallet"
      stageDescription="Generate your first Solana keypair"
      nextStageHref="/solana/stage-3"
      estimatedTime="20 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">◎</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Generate a Solana Wallet</h2>
            <p className="text-gray-400">Create a real Solana keypair (for learning purposes only)</p>
          </div>
        </div>
        <div className="space-y-4 text-gray-300">
          <p>
            In Solana, a wallet is simply a pair of cryptographic keys: a <span className="text-green-400 font-bold">public key</span> (your address)
            and a <span className="text-red-400 font-bold">secret key</span> (proves ownership).
          </p>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-sm">
              <span className="font-bold text-orange-400">⚠️ Security Note:</span> This wallet is generated in your browser
              for educational purposes only. Never use it for real funds! For actual use, use trusted wallet software like
              Phantom, Solflare, or the official Solana CLI.
            </p>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎲 Generate New Wallet</h3>
        <p className="text-gray-400 mb-4">
          Click the button below to generate a random Solana keypair using the @solana/web3.js library:
        </p>
        <Button onClick={generateWallet} variant="solana" className="w-full">
          🚀 Generate Random Wallet
        </Button>
      </Card>

      {wallet && (
        <Card className="mb-8 bg-green-500/10 border-green-500/50 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎉</span>
            <div>
              <h3 className="text-xl font-bold text-white">Wallet Generated Successfully!</h3>
              <p className="text-sm text-gray-400">Your Solana keypair has been created</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">Public Key (Address)</div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">✓ SAFE TO SHARE</span>
              </div>
              <div className="font-mono text-sm text-green-400 break-all bg-gray-800 rounded p-3">
                {wallet.publicKey}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This is your Solana address. Share this to receive SOL or tokens. It's like your bank account number.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">Secret Key (Private Key)</div>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">⚠️ NEVER SHARE</span>
              </div>
              {showPrivateKey ? (
                <>
                  <div className="font-mono text-xs text-red-400 break-all bg-gray-800 rounded p-3 mb-2">
                    {wallet.secretKeyBase58}
                  </div>
                  <Button onClick={() => setShowPrivateKey(false)} variant="secondary" size="sm">
                    Hide Secret Key
                  </Button>
                </>
              ) : (
                <Button onClick={() => setShowPrivateKey(true)} variant="danger" size="sm">
                  ⚠️ Show Secret Key (Warning: Keep Private!)
                </Button>
              )}
              <p className="text-xs text-gray-500 mt-3">
                Your secret key proves you own this wallet. Anyone with this key can steal your funds. NEVER share it!
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔑 Understanding Solana Keys</h3>
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🟢</span>
              <h4 className="font-bold text-green-400">Public Key (Address)</h4>
            </div>
            <p className="text-sm text-gray-300 mb-2">
              A 32-byte identifier that's safe to share publicly. In Solana, it's displayed as a Base58-encoded string.
            </p>
            <div className="bg-gray-800 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Example:</div>
              <code className="text-xs text-green-400 break-all">
                DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK
              </code>
            </div>
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              <p>✓ Share to receive payments</p>
              <p>✓ Safe to post on social media</p>
              <p>✓ Can be looked up on Solana explorers</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔴</span>
              <h4 className="font-bold text-red-400">Secret Key (Private Key)</h4>
            </div>
            <p className="text-sm text-gray-300 mb-2">
              A 64-byte array that proves ownership of the wallet. It's used to sign transactions and should be kept absolutely secret.
            </p>
            <div className="bg-gray-800 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Stored as:</div>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Byte array: [143, 89, 221, 98, ...] (64 numbers)</li>
                <li>• Base58 string: Like public key format</li>
                <li>• Or as a seed phrase (mnemonic)</li>
              </ul>
            </div>
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              <p>⚠️ NEVER share with anyone</p>
              <p>⚠️ Store securely offline</p>
              <p>⚠️ Losing it means losing access forever</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💡 Solana vs Ethereum Keys</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">Ξ</span>
              <h4 className="font-bold text-blue-400">Ethereum</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Uses Ed25519 or secp256k1 curves</li>
              <li>• Address: 0x... (hex, 42 chars)</li>
              <li>• 12-24 word seed phrase</li>
              <li>• Can derive multiple accounts</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">◎</span>
              <h4 className="font-bold text-green-400">Solana</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Uses Ed25519 curve exclusively</li>
              <li>• Address: Base58 (32-44 chars)</li>
              <li>• 12-24 word seed phrase supported</li>
              <li>• Each keypair is independent</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🛡️ Security Best Practices</h3>
        <div className="space-y-3">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">1️⃣</span>
              <div>
                <h4 className="font-bold text-white mb-1">Never Share Your Secret Key</h4>
                <p className="text-sm text-gray-400">
                  No legitimate service will ever ask for your secret key. If someone asks, it's a scam!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">2️⃣</span>
              <div>
                <h4 className="font-bold text-white mb-1">Store Backups Offline</h4>
                <p className="text-sm text-gray-400">
                  Write down your seed phrase on paper and store it securely. Never store it digitally or take photos!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">3️⃣</span>
              <div>
                <h4 className="font-bold text-white mb-1">Use Hardware Wallets for Large Amounts</h4>
                <p className="text-sm text-gray-400">
                  For significant funds, use hardware wallets like Ledger or Trezor that keep your keys offline.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">4️⃣</span>
              <div>
                <h4 className="font-bold text-white mb-1">Test with Small Amounts First</h4>
                <p className="text-sm text-gray-400">
                  When trying a new wallet, send a small test transaction first to make sure everything works correctly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔧 How the Code Works</h3>
        <div className="bg-gray-900 rounded-lg p-4">
          <pre className="text-xs text-green-400 font-mono overflow-x-auto">
{`import * as solanaWeb3 from '@solana/web3.js'

// Generate a new random keypair
const keypair = solanaWeb3.Keypair.generate()

// Get the public key as a string
const publicKey = keypair.publicKey.toString()
// Example: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK"

// Get the secret key as a byte array
const secretKey = keypair.secretKey
// This is a Uint8Array of 64 bytes`}</pre>
        </div>
        <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <span className="font-bold text-blue-400">Behind the scenes:</span> The library uses cryptographically secure
            random number generation to create your keypair. The public and secret keys are mathematically linked - you can
            derive the public key from the secret key, but not vice versa.
          </p>
        </div>
      </Card>

      <Card className="bg-green-500/10 border-green-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>A Solana wallet consists of a public key (address) and a secret key (private key)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>Public keys are safe to share - use them to receive SOL and tokens</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>Secret keys must NEVER be shared - they prove ownership and control your funds</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>Solana uses Ed25519 cryptography and Base58 encoding for addresses</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>You generated a real Solana keypair using the @solana/web3.js library!</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
