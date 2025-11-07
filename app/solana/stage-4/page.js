'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SolanaStage4() {
  const [txInstructions, setTxInstructions] = useState([])
  const [selectedInstruction, setSelectedInstruction] = useState('transfer')
  const [priorityFee, setPriorityFee] = useState(0)
  const [computeUnits, setComputeUnits] = useState(200000)

  const instructionTypes = {
    transfer: {
      name: 'Transfer SOL',
      icon: '💸',
      program: 'System Program',
      accounts: ['From (signer)', 'To'],
      data: 'Amount in lamports',
      computeUnits: 300
    },
    createAccount: {
      name: 'Create Account',
      icon: '🏗️',
      program: 'System Program',
      accounts: ['Payer (signer)', 'New Account (signer)'],
      data: 'Lamports, Space, Owner',
      computeUnits: 12000
    },
    tokenTransfer: {
      name: 'Transfer Token',
      icon: '🪙',
      program: 'Token Program',
      accounts: ['Source', 'Destination', 'Authority (signer)'],
      data: 'Amount',
      computeUnits: 4000
    },
    swap: {
      name: 'Swap Tokens',
      icon: '🔄',
      program: 'AMM Program',
      accounts: ['User', 'Pool', 'Token A', 'Token B', 'Authority'],
      data: 'Amount In, Min Amount Out',
      computeUnits: 80000
    }
  }

  const addInstruction = () => {
    const instruction = instructionTypes[selectedInstruction]
    setTxInstructions([
      ...txInstructions,
      {
        id: Date.now(),
        ...instruction,
        timestamp: new Date().toLocaleTimeString()
      }
    ])
  }

  const removeInstruction = (id) => {
    setTxInstructions(txInstructions.filter(ix => ix.id !== id))
  }

  const calculateTotalFee = () => {
    const baseFee = 5000 // lamports
    const totalComputeUnits = txInstructions.reduce((sum, ix) => sum + ix.computeUnits, 0)
    const computeFee = Math.ceil(totalComputeUnits * priorityFee / 1000000)
    return baseFee + computeFee
  }

  const transactionLifecycle = [
    {
      stage: 'Build',
      icon: '🔨',
      description: 'Create transaction with instructions',
      details: [
        'Add instructions to transaction',
        'Specify accounts for each instruction',
        'Set recent blockhash',
        'Add compute budget if needed'
      ]
    },
    {
      stage: 'Sign',
      icon: '✍️',
      description: 'All required signers sign the transaction',
      details: [
        'Fee payer signs first',
        'Other signers provide signatures',
        'Each signature is 64 bytes',
        'Max 12 signatures per transaction'
      ]
    },
    {
      stage: 'Send',
      icon: '📤',
      description: 'Broadcast to RPC node',
      details: [
        'Send to RPC endpoint',
        'Node validates signatures',
        'Checks recent blockhash',
        'Forwards to leader'
      ]
    },
    {
      stage: 'Process',
      icon: '⚙️',
      description: 'Leader executes instructions',
      details: [
        'Instructions run in order',
        'State changes applied',
        'Compute units consumed',
        'Fees collected'
      ]
    },
    {
      stage: 'Confirm',
      icon: '✅',
      description: 'Transaction finalized in block',
      details: [
        'Block produced (~400ms)',
        'Confirmed status',
        'Finalized after 31+ blocks',
        'Signature stored for 2 days'
      ]
    }
  ]

  return (
    <StageLayout
      trackName="Solana Track"
      trackHref="/solana"
      trackColor="solana"
      stageNumber={4}
      stageTitle="Transactions & Instructions"
      stageDescription="Learn how Solana transactions work"
      nextStageHref="/solana/stage-5"
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">📝</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Solana Transactions</h2>
            <p className="text-gray-400">How instructions become state changes</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Transactions on Solana are atomic bundles of instructions. Each instruction is a call to a program
          with specified accounts and data. If any instruction fails, the entire transaction reverts.
        </p>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">🚀 Key Features</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• <strong>Atomic:</strong> All instructions succeed or all fail</li>
            <li>• <strong>Fast:</strong> ~400ms block time, sub-second confirmation</li>
            <li>• <strong>Parallel:</strong> Non-conflicting transactions run simultaneously</li>
            <li>• <strong>Cheap:</strong> ~$0.00025 per transaction (5000 lamports)</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📦 Transaction Structure</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-3">Components</h4>
            <div className="space-y-3">
              <div className="bg-purple-500/10 border-l-4 border-purple-500 p-3 rounded">
                <div className="font-bold text-white text-sm mb-1">1. Signatures</div>
                <div className="text-xs text-gray-400">
                  Ed25519 signatures from all required signers (max 12)
                </div>
              </div>
              <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded">
                <div className="font-bold text-white text-sm mb-1">2. Message</div>
                <div className="text-xs text-gray-400">
                  Contains header, accounts, recent blockhash, and instructions
                </div>
              </div>
              <div className="bg-green-500/10 border-l-4 border-green-500 p-3 rounded">
                <div className="font-bold text-white text-sm mb-1">3. Recent Blockhash</div>
                <div className="text-xs text-gray-400">
                  Must be from last 150 blocks (~60 seconds)
                </div>
              </div>
              <div className="bg-orange-500/10 border-l-4 border-orange-500 p-3 rounded">
                <div className="font-bold text-white text-sm mb-1">4. Instructions</div>
                <div className="text-xs text-gray-400">
                  Array of program calls with accounts and data
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-3">Size Limits</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-950 rounded">
                <span className="text-sm text-gray-400">Max Transaction Size</span>
                <Badge variant="secondary">1232 bytes</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-950 rounded">
                <span className="text-sm text-gray-400">Max Signatures</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-950 rounded">
                <span className="text-sm text-gray-400">Max Compute Units</span>
                <Badge variant="secondary">1.4M</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-950 rounded">
                <span className="text-sm text-gray-400">Blockhash Validity</span>
                <Badge variant="secondary">~60 sec</Badge>
              </div>
            </div>

            <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
              <div className="text-xs text-yellow-400 mb-1">⚠️ Important</div>
              <div className="text-xs text-gray-300">
                Transactions expire if not processed within blockhash validity period
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔧 Interactive Transaction Builder</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-white mb-3">Add Instructions</h4>
            <div className="space-y-3">
              <select
                value={selectedInstruction}
                onChange={(e) => setSelectedInstruction(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none"
              >
                {Object.entries(instructionTypes).map(([key, ix]) => (
                  <option key={key} value={key}>
                    {ix.icon} {ix.name} ({ix.computeUnits} CU)
                  </option>
                ))}
              </select>
              <button
                onClick={addInstruction}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all"
              >
                Add Instruction
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Priority Fee (Optional)</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-2">
                  Micro-lamports per Compute Unit: {priorityFee}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priorityFee}
                  onChange={(e) => setPriorityFee(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="bg-gray-900 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">Additional Priority Fee</div>
                <div className="text-lg font-bold text-white">
                  {(priorityFee * txInstructions.reduce((sum, ix) => sum + ix.computeUnits, 0) / 1000000).toFixed(0)} lamports
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-white mb-3">Transaction Preview</h4>
          {txInstructions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No instructions added yet. Add instructions above to build your transaction.
            </div>
          ) : (
            <div className="space-y-2">
              {txInstructions.map((ix, idx) => (
                <div key={ix.id} className="bg-gray-950 rounded p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="h-6 w-6 p-0 flex items-center justify-center">
                      {idx + 1}
                    </Badge>
                    <span className="text-2xl">{ix.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{ix.name}</div>
                      <div className="text-xs text-gray-400">
                        {ix.program} • {ix.computeUnits} CU
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeInstruction(ix.id)}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {txInstructions.length > 0 && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <div className="text-xs text-gray-400">Instructions</div>
                <div className="text-xl font-bold text-white">{txInstructions.length}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Total Compute Units</div>
                <div className="text-xl font-bold text-white">
                  {txInstructions.reduce((sum, ix) => sum + ix.computeUnits, 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Total Fee</div>
                <div className="text-xl font-bold text-green-400">
                  {calculateTotalFee().toLocaleString()} lamports
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">USD Cost</div>
                <div className="text-xl font-bold text-green-400">
                  ${(calculateTotalFee() / 1e9 * 100).toFixed(5)}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔄 Transaction Lifecycle</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {transactionLifecycle.map((stage, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-4">
              <div className="text-4xl mb-2 text-center">{stage.icon}</div>
              <h5 className="font-bold text-white mb-2 text-center">{stage.stage}</h5>
              <p className="text-xs text-gray-400 mb-3 text-center">{stage.description}</p>
              <ul className="space-y-1">
                {stage.details.map((detail, i) => (
                  <li key={i} className="text-xs text-gray-300">• {detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚡ Transaction Fees & Prioritization</h3>
        <Tabs defaultValue="base">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="base">Base Fee</TabsTrigger>
            <TabsTrigger value="priority">Priority Fees</TabsTrigger>
            <TabsTrigger value="compute">Compute Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="base" className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-bold text-blue-400 mb-3">Base Transaction Fee</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded p-4">
                  <div className="text-3xl font-bold text-white mb-2">5,000</div>
                  <div className="text-sm text-gray-400">Lamports per signature</div>
                  <div className="text-xs text-gray-500 mt-2">
                    ~$0.00025 at $50/SOL
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-2">
                    The base fee is charged per signature in the transaction.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• 1 signature = 5,000 lamports</li>
                    <li>• 2 signatures = 10,000 lamports</li>
                    <li>• Fee payer always pays</li>
                    <li>• Burns 50% of fees collected</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-bold text-purple-400 mb-3">Priority Fees (Optional)</h4>
              <p className="text-sm text-gray-300 mb-4">
                Add priority fees to get faster processing during network congestion.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-gray-900 rounded p-3 text-center">
                  <div className="text-sm text-gray-400 mb-1">Low Priority</div>
                  <div className="text-lg font-bold text-white">0 - 10K</div>
                  <div className="text-xs text-gray-500">micro-lamports/CU</div>
                </div>
                <div className="bg-gray-900 rounded p-3 text-center">
                  <div className="text-sm text-gray-400 mb-1">Medium Priority</div>
                  <div className="text-lg font-bold text-orange-400">10K - 50K</div>
                  <div className="text-xs text-gray-500">micro-lamports/CU</div>
                </div>
                <div className="bg-gray-900 rounded p-3 text-center">
                  <div className="text-sm text-gray-400 mb-1">High Priority</div>
                  <div className="text-lg font-bold text-red-400">50K+</div>
                  <div className="text-xs text-gray-500">micro-lamports/CU</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compute" className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-bold text-green-400 mb-3">Compute Budget</h4>
              <p className="text-sm text-gray-300 mb-4">
                Set compute unit limits to optimize costs and prevent expensive failures.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-900 rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Default Compute Units</span>
                    <Badge variant="secondary">200,000 CU</Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    Applied if no compute budget instruction is provided
                  </div>
                </div>
                <div className="bg-gray-900 rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Max Compute Units</span>
                    <Badge variant="secondary">1,400,000 CU</Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    Maximum allowed per transaction
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-xs text-yellow-400 mb-1">💡 Pro Tip</div>
                  <div className="text-xs text-gray-300">
                    Set compute units to actual usage to avoid overpaying priority fees
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🆕 Versioned Transactions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-3">Legacy Transactions</h4>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-red-400">✗</span>
                <span>Limited to 1232 bytes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-red-400">✗</span>
                <span>Can't use address lookup tables</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-green-400">✓</span>
                <span>Simpler structure</span>
              </div>
            </div>
            <Badge variant="secondary">Default until v0</Badge>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-3">Version 0 (v0) Transactions</h4>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-green-400">✓</span>
                <span>Support address lookup tables</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-green-400">✓</span>
                <span>More accounts per transaction</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-green-400">✓</span>
                <span>Better for complex DeFi</span>
              </div>
            </div>
            <Badge variant="success">Recommended</Badge>
          </div>
        </div>

        <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <h5 className="font-bold text-purple-400 mb-2">Address Lookup Tables (ALTs)</h5>
          <p className="text-sm text-gray-300">
            ALTs allow you to reference accounts by index instead of full address, saving space
            and enabling transactions with 100+ accounts.
          </p>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚠️ Common Issues</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2">Blockhash Expired</h4>
            <p className="text-sm text-gray-300 mb-2">
              Transaction not processed within ~60 seconds
            </p>
            <div className="text-xs text-gray-400">
              Solution: Get fresh blockhash and retry
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-bold text-orange-400 mb-2">Insufficient Funds</h4>
            <p className="text-sm text-gray-300 mb-2">
              Account doesn't have enough SOL for fees
            </p>
            <div className="text-xs text-gray-400">
              Solution: Fund account before transaction
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-bold text-yellow-400 mb-2">Compute Budget Exceeded</h4>
            <p className="text-sm text-gray-300 mb-2">
              Transaction used more compute than limit
            </p>
            <div className="text-xs text-gray-400">
              Solution: Increase compute budget instruction
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-purple-400 mb-2">Account Not Found</h4>
            <p className="text-sm text-gray-300 mb-2">
              Referenced account doesn't exist
            </p>
            <div className="text-xs text-gray-400">
              Solution: Create account first or check address
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-purple-500/10 border-purple-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Transactions are atomic bundles of instructions that all succeed or all fail</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Base fee is 5,000 lamports per signature (~$0.00025), incredibly cheap</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Priority fees are optional but help during congestion</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Recent blockhash must be from last 150 blocks (~60 seconds)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Versioned transactions (v0) enable address lookup tables for complex transactions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Set appropriate compute budgets to optimize costs and prevent failures</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
