'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function BitcoinStage8() {
  const [walletType, setWalletType] = useState('2-of-3')
  const [signatures, setSignatures] = useState([])
  const [transaction, setTransaction] = useState(null)

  const participants = [
    { id: 1, name: 'Alice', icon: '👩', signed: false },
    { id: 2, name: 'Bob', icon: '👨', signed: false },
    { id: 3, name: 'Charlie', icon: '🧑', signed: false },
  ]

  const multisigTypes = [
    {
      type: '1-of-2',
      required: 1,
      total: 2,
      useCase: 'Shared wallet with backup',
      example: 'You and your spouse - either can spend',
    },
    {
      type: '2-of-2',
      required: 2,
      total: 2,
      useCase: 'Joint approval required',
      example: 'Business partners - both must agree',
    },
    {
      type: '2-of-3',
      required: 2,
      total: 3,
      useCase: 'Most common setup',
      example: 'You, hardware wallet, trusted friend',
    },
    {
      type: '3-of-5',
      required: 3,
      total: 5,
      useCase: 'Corporate treasury',
      example: 'Board members - majority vote needed',
    },
  ]

  const createTransaction = () => {
    setTransaction({
      id: 'tx_' + Math.random().toString(36).slice(2, 8),
      amount: 1.5,
      to: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      status: 'pending',
    })
    setSignatures([])
  }

  const signTransaction = (participantId) => {
    if (signatures.includes(participantId)) {
      setSignatures(signatures.filter((id) => id !== participantId))
    } else {
      setSignatures([...signatures, participantId])
    }
  }

  const broadcastTransaction = () => {
    setTransaction({ ...transaction, status: 'confirmed' })
  }

  const getCurrentType = () => multisigTypes.find((t) => t.type === walletType)
  const requiredSigs = getCurrentType().required
  const canBroadcast = signatures.length >= requiredSigs

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={8}
      stageTitle="Multi-signature Wallets"
      stageDescription="Create wallets that require multiple signatures"
      nextStageHref="/bitcoin/stage-9"
      estimatedTime="20 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">What are Multi-sig Wallets?</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            Instead of one person controlling a wallet, <strong>multi-signature (multisig)</strong>{' '}
            wallets require multiple people to approve transactions.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
            <p className="text-sm">
              <strong>Think of it like a safe deposit box:</strong> It requires 2 keys (yours and
              the bank's) to open. Neither person alone can access it!
            </p>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔐 Multisig Types</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {multisigTypes.map((ms) => (
            <button
              key={ms.type}
              onClick={() => {
                setWalletType(ms.type)
                setTransaction(null)
                setSignatures([])
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                walletType === ms.type
                  ? 'border-orange-500 bg-orange-500/20'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="text-2xl font-bold text-white mb-2">{ms.type}</div>
              <div className="text-sm text-gray-400 mb-2">{ms.useCase}</div>
              <div className="text-xs text-gray-500">{ms.example}</div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {walletType} Wallet Demo
            </h3>
            <p className="text-gray-400 text-sm">
              Requires {requiredSigs} out of {getCurrentType().total} signatures
            </p>
          </div>
          {!transaction && (
            <Button onClick={createTransaction} variant="bitcoin">
              Create Transaction
            </Button>
          )}
        </div>

        {transaction && transaction.status === 'pending' && (
          <>
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-500 mb-1">Transaction Details</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">ID:</span>
                  <span className="text-white ml-2 font-mono">{transaction.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white ml-2">{transaction.amount} BTC</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">Signatures</h4>
                <span className="text-sm text-gray-400">
                  {signatures.length}/{requiredSigs} required
                </span>
              </div>
              <div className="bg-gray-700 rounded-full h-4 mb-4">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    canBroadcast ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${(signatures.length / requiredSigs) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {participants.slice(0, getCurrentType().total).map((p) => {
                  const hasSigned = signatures.includes(p.id)
                  return (
                    <button
                      key={p.id}
                      onClick={() => signTransaction(p.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        hasSigned
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-4xl mb-2">{p.icon}</div>
                      <div className="text-sm font-bold text-white mb-1">{p.name}</div>
                      {hasSigned ? (
                        <div className="text-xs text-green-400">✓ Signed</div>
                      ) : (
                        <div className="text-xs text-gray-500">Click to sign</div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {canBroadcast ? (
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-bold text-white">Ready to Broadcast!</div>
                    <div className="text-sm text-gray-400">
                      Collected {signatures.length} of {requiredSigs} required signatures
                    </div>
                  </div>
                </div>
                <Button onClick={broadcastTransaction} variant="success" className="w-full">
                  Broadcast Transaction
                </Button>
              </div>
            ) : (
              <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <div className="font-bold text-white">Waiting for Signatures</div>
                    <div className="text-sm text-gray-400">
                      Need {requiredSigs - signatures.length} more signature(s)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {transaction && transaction.status === 'confirmed' && (
          <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h4 className="text-2xl font-bold text-white mb-2">Transaction Confirmed!</h4>
            <p className="text-gray-400 mb-4">
              All required signatures collected and broadcasted to network
            </p>
            <Button
              onClick={() => {
                setTransaction(null)
                setSignatures([])
              }}
              variant="secondary"
            >
              Create Another Transaction
            </Button>
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💼 Real-World Use Cases</h3>
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏢</span>
              <div>
                <h4 className="font-bold text-white mb-1">Corporate Treasury</h4>
                <p className="text-sm text-gray-400">
                  Companies use 3-of-5 or 4-of-7 wallets so multiple executives must approve large
                  payments
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <div>
                <h4 className="font-bold text-white mb-1">Inheritance Planning</h4>
                <p className="text-sm text-gray-400">
                  2-of-3 wallet: You, your spouse, and a lawyer. If something happens to you,
                  family can still access funds
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔐</span>
              <div>
                <h4 className="font-bold text-white mb-1">Enhanced Security</h4>
                <p className="text-sm text-gray-400">
                  2-of-3: Phone wallet, hardware wallet, paper backup. If phone is stolen, funds
                  are still safe
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <h4 className="font-bold text-white mb-1">Escrow Services</h4>
                <p className="text-sm text-gray-400">
                  2-of-3: Buyer, seller, trusted escrow. Escrow only signs if both parties agree
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Multisig wallets require multiple signatures to approve transactions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Most common setup is 2-of-3 (2 signatures required out of 3 total)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Provides redundancy - losing one key doesn't mean losing all funds</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Increases security - attacker needs multiple keys to steal funds</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Used by businesses, families, and individuals for large holdings</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
