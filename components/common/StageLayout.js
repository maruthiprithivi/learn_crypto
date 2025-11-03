'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from './Button'
import Card from './Card'
import { useAppStore } from '@/lib/store'

export default function StageLayout({
  trackName,
  trackHref,
  trackColor,
  stageNumber,
  stageTitle,
  stageDescription,
  children,
  nextStageHref,
  estimatedTime,
  onComplete,
}) {
  const [showCode, setShowCode] = useState(false)
  const { updateProgress } = useAppStore()

  const handleComplete = () => {
    // Update progress in store
    const trackKey = trackName.toLowerCase()
    updateProgress(trackKey, stageNumber)

    // Call custom completion handler if provided
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link href={trackHref} className="text-purple-400 hover:text-purple-300">
            {trackName}
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">Stage {stageNumber}</span>
        </div>

        {/* Stage Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">Stage {stageNumber}</span>
            {estimatedTime && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-sm text-gray-500">⏱️ {estimatedTime}</span>
              </>
            )}
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">{stageTitle}</h1>
          {stageDescription && (
            <p className="text-gray-400 text-lg">{stageDescription}</p>
          )}
        </div>

        {/* Main Content */}
        <div className="mb-8">{children}</div>

        {/* Code Viewer Toggle */}
        <Card className="mb-8">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">👨‍💻</span>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">View the Code</h3>
                <p className="text-sm text-gray-400">
                  {showCode ? 'Hide' : 'See'} how this works under the hood
                </p>
              </div>
            </div>
            <span className="text-2xl text-gray-400">
              {showCode ? '▲' : '▼'}
            </span>
          </button>

          {showCode && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>
                    {`// This is a simulated environment for learning
// In production, you would use libraries like:
// - bitcoinjs-lib for Bitcoin
// - ethers.js for Ethereum
// - @solana/web3.js for Solana

// Example: Generate a Bitcoin wallet
const bitcoin = require('bitcoinjs-lib');
const { ECPairFactory } = require('ecpair');
const ecc = require('tiny-secp256k1');

const ECPair = ECPairFactory(ecc);
const keyPair = ECPair.makeRandom();

const { address } = bitcoin.payments.p2pkh({
  pubkey: keyPair.publicKey,
  network: bitcoin.networks.testnet
});

console.log('Address:', address);
console.log('Private Key:', keyPair.toWIF());`}
                  </code>
                </pre>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                💡 This code is for educational purposes. Always use secure, audited libraries
                in production and never expose private keys.
              </p>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href={trackHref}>
            <Button variant="secondary">← Back to {trackName}</Button>
          </Link>

          {nextStageHref && (
            <Link href={nextStageHref}>
              <Button variant={trackColor} onClick={handleComplete}>
                Complete & Continue →
              </Button>
            </Link>
          )}

          {!nextStageHref && (
            <Button variant={trackColor} onClick={handleComplete}>
              Complete Stage ✓
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
