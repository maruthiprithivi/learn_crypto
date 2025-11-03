'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import * as bitcoin from 'bitcoinjs-lib'

export default function BitcoinStage3() {
  const [message, setMessage] = useState('')
  const [keyPair, setKeyPair] = useState(null)
  const [signedMessage, setSignedMessage] = useState(null)
  const [verificationResult, setVerificationResult] = useState(null)

  const generateKeyPair = () => {
    const newKeyPair = bitcoin.ECPair.makeRandom()
    setKeyPair(newKeyPair)
    setSignedMessage(null)
    setVerificationResult(null)
  }

  const signMessage = () => {
    if (!message.trim() || !keyPair) return

    try {
      const messageHash = bitcoin.crypto.sha256(Buffer.from(message))
      const signature = keyPair.sign(messageHash)

      setSignedMessage({
        message,
        signature: signature.toString('hex'),
        messageHash: messageHash.toString('hex'),
      })
    } catch (error) {
      console.error('Error signing message:', error)
    }
  }

  const verifySignature = (tamper = false) => {
    if (!signedMessage || !keyPair) return

    try {
      const messageToVerify = tamper ? signedMessage.message + ' [TAMPERED]' : signedMessage.message
      const messageHash = bitcoin.crypto.sha256(Buffer.from(messageToVerify))
      const signature = Buffer.from(signedMessage.signature, 'hex')

      const isValid = keyPair.verify(messageHash, signature)

      setVerificationResult({
        isValid,
        tampered: tamper,
      })
    } catch (error) {
      setVerificationResult({
        isValid: false,
        tampered: tamper,
      })
    }
  }

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={3}
      stageTitle="Public & Private Keys"
      stageDescription="Understand cryptographic signatures through interactive demonstrations"
      nextStageHref="/bitcoin/stage-4"
      estimatedTime="12 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">How Cryptographic Keys Work</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            Bitcoin uses <strong>asymmetric cryptography</strong> (also called public-key
            cryptography). Think of it like a magical mailbox:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
              <div className="text-4xl mb-3">🔓</div>
              <h3 className="text-lg font-bold text-white mb-2">Public Key</h3>
              <ul className="text-sm space-y-2">
                <li>✓ Share with anyone</li>
                <li>✓ Derived from private key</li>
                <li>✓ Verifies signatures you create</li>
                <li>✓ Creates your Bitcoin address</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="text-lg font-bold text-white mb-2">Private Key</h3>
              <ul className="text-sm space-y-2">
                <li>✓ Keep secret always!</li>
                <li>✓ Signs transactions</li>
                <li>✓ Proves ownership</li>
                <li>✓ Controls your Bitcoin</li>
              </ul>
            </div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/50 rounded-lg p-4 mt-4">
            <p className="text-sm">
              <strong>The Magic:</strong> You can sign a message with your private key, and
              anyone can verify it's really from you using your public key - without ever
              seeing your private key!
            </p>
          </div>
        </div>
      </Card>

      {/* Interactive Demo */}
      <Card className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">🔐 Try It Yourself</h3>

        {/* Step 1: Generate Keys */}
        {!keyPair ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔑</div>
            <p className="text-gray-400 mb-6">
              First, generate a key pair to start the demonstration
            </p>
            <Button onClick={generateKeyPair} variant="bitcoin" size="lg">
              Generate Key Pair
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Display Keys */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-green-400 mb-2">Public Key (Shareable)</div>
                <div className="font-mono text-xs text-green-400 break-all mb-2">
                  {keyPair.publicKey.toString('hex').substring(0, 60)}...
                </div>
                <div className="text-xs text-gray-500">✓ Safe to share with others</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-red-400 mb-2">Private Key (Secret!)</div>
                <div className="font-mono text-xs text-red-400">
                  ••••••••••••••••••••••••••••••••
                </div>
                <div className="text-xs text-gray-500">⚠️ Never share this!</div>
              </div>
            </div>

            {/* Step 2: Sign Message */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Step 1: Write a message to sign
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., 'I own this Bitcoin address'"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 mb-3"
              />
              <Button
                onClick={signMessage}
                variant="bitcoin"
                disabled={!message.trim()}
              >
                🖊️ Sign Message with Private Key
              </Button>
            </div>

            {/* Display Signature */}
            {signedMessage && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">✍️</span>
                  <h4 className="text-lg font-bold text-white">Message Signed!</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Original Message</div>
                    <div className="bg-gray-900 rounded px-3 py-2 text-white">
                      {signedMessage.message}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Message Hash (SHA-256)</div>
                    <div className="bg-gray-900 rounded px-3 py-2 font-mono text-xs text-blue-400 break-all">
                      {signedMessage.messageHash}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Digital Signature</div>
                    <div className="bg-gray-900 rounded px-3 py-2 font-mono text-xs text-green-400 break-all">
                      {signedMessage.signature}
                    </div>
                  </div>
                </div>

                {/* Step 3: Verify */}
                <div className="mt-4 pt-4 border-t border-green-500/30">
                  <p className="text-sm text-gray-300 mb-3">
                    Now anyone can verify this signature using your public key:
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => verifySignature(false)}
                      variant="success"
                      size="sm"
                    >
                      ✓ Verify Signature
                    </Button>
                    <Button
                      onClick={() => verifySignature(true)}
                      variant="danger"
                      size="sm"
                    >
                      🔧 Verify Tampered Message
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Result */}
            {verificationResult && (
              <Card
                className={
                  verificationResult.isValid
                    ? 'bg-green-500/10 border-green-500/50'
                    : 'bg-red-500/10 border-red-500/50'
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">
                    {verificationResult.isValid ? '✅' : '❌'}
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">
                      {verificationResult.isValid
                        ? 'Signature Valid!'
                        : 'Signature Invalid!'}
                    </h4>
                    <p className="text-sm text-gray-300">
                      {verificationResult.isValid
                        ? verificationResult.tampered
                          ? 'Wait, this shouldnt happen with tampered message!'
                          : 'The message was definitely signed by the owner of this private key.'
                        : verificationResult.tampered
                        ? 'The message was altered after signing - signature verification failed!'
                        : 'Signature verification failed.'}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Reset */}
            <div className="text-center pt-4">
              <Button
                onClick={() => {
                  setKeyPair(null)
                  setMessage('')
                  setSignedMessage(null)
                  setVerificationResult(null)
                }}
                variant="secondary"
                size="sm"
              >
                🔄 Start Over
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Real World Application */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🌍 Real World Uses</h3>
        <div className="space-y-4 text-gray-300">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💸</span>
              <div>
                <h4 className="font-bold text-white mb-1">Bitcoin Transactions</h4>
                <p className="text-sm">
                  When you send Bitcoin, you sign the transaction with your private key.
                  Miners verify the signature using your public key before including it in a
                  block.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✉️</span>
              <div>
                <h4 className="font-bold text-white mb-1">Proving Ownership</h4>
                <p className="text-sm">
                  You can prove you own a Bitcoin address by signing a message with its
                  private key. This is often required by exchanges to prove ownership.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h4 className="font-bold text-white mb-1">Secure Communication</h4>
                <p className="text-sm">
                  The same technology is used in HTTPS, email encryption (PGP), and secure
                  messaging apps like Signal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Learnings */}
      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              Private keys are secret and sign messages/transactions to prove ownership
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Public keys are derived from private keys and can be shared safely</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              Anyone can verify a signature using the public key without seeing the private key
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              If the message is tampered with, the signature verification will fail
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              This cryptographic system is the foundation of Bitcoin's security
            </span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
