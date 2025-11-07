'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EthereumStage11() {
  const [selectedFunction, setSelectedFunction] = useState('balanceOf')
  const [callResult, setCallResult] = useState('')
  const [gasEstimate, setGasEstimate] = useState(0)
  const [inputAddress, setInputAddress] = useState('0x742d35Cc...95f0bEb')
  const [transferAmount, setTransferAmount] = useState('100')
  const [transferTo, setTransferTo] = useState('0x123...456')

  const contractFunctions = {
    balanceOf: {
      name: 'balanceOf',
      type: 'view',
      icon: '👁️',
      color: 'blue',
      description: 'View function - reads balance without changing state',
      signature: 'balanceOf(address owner) returns (uint256)',
      inputs: [{ name: 'owner', type: 'address' }],
      gasEstimate: 0,
      example: `// Read-only call (free, no gas)
const balance = await contract.balanceOf(address)
console.log('Balance:', balance.toString())`
    },
    transfer: {
      name: 'transfer',
      type: 'state-changing',
      icon: '💸',
      color: 'green',
      description: 'State-changing function - requires signature and gas',
      signature: 'transfer(address to, uint256 amount) returns (bool)',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      gasEstimate: 65000,
      example: `// State-changing transaction (requires gas)
const tx = await contract.transfer(to, amount)
const receipt = await tx.wait()
console.log('Transfer complete:', receipt.hash)`
    },
    approve: {
      name: 'approve',
      type: 'state-changing',
      icon: '✅',
      color: 'purple',
      description: 'Approve another address to spend your tokens',
      signature: 'approve(address spender, uint256 amount) returns (bool)',
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      gasEstimate: 46000,
      example: `// Approve spending
const tx = await contract.approve(spender, amount)
await tx.wait()
console.log('Approval granted')`
    },
    totalSupply: {
      name: 'totalSupply',
      type: 'view',
      icon: '📊',
      color: 'cyan',
      description: 'View the total supply of tokens',
      signature: 'totalSupply() returns (uint256)',
      inputs: [],
      gasEstimate: 0,
      example: `// Read total supply
const supply = await contract.totalSupply()
console.log('Total Supply:', supply.toString())`
    }
  }

  const callFunction = () => {
    const func = contractFunctions[selectedFunction]
    setGasEstimate(func.gasEstimate)

    if (func.type === 'view') {
      // Simulate view call result
      if (selectedFunction === 'balanceOf') {
        setCallResult(`Balance: 1,250.50 tokens`)
      } else if (selectedFunction === 'totalSupply') {
        setCallResult(`Total Supply: 1,000,000 tokens`)
      }
    } else {
      // Simulate state-changing transaction
      const txHash = '0x' + Math.random().toString(16).substr(2, 64)
      setCallResult(`Transaction sent! Hash: ${txHash.substring(0, 20)}...`)
    }
  }

  const abiTypes = [
    {
      name: 'Function Definitions',
      icon: '⚙️',
      description: 'Describes function names, inputs, outputs, and mutability',
      example: `{
  "name": "transfer",
  "type": "function",
  "inputs": [
    {"name": "to", "type": "address"},
    {"name": "amount", "type": "uint256"}
  ],
  "outputs": [{"type": "bool"}],
  "stateMutability": "nonpayable"
}`
    },
    {
      name: 'Event Definitions',
      icon: '📡',
      description: 'Describes events emitted by the contract',
      example: `{
  "name": "Transfer",
  "type": "event",
  "inputs": [
    {"indexed": true, "name": "from", "type": "address"},
    {"indexed": true, "name": "to", "type": "address"},
    {"indexed": false, "name": "value", "type": "uint256"}
  ]
}`
    },
    {
      name: 'Constructor',
      icon: '🏗️',
      description: 'Describes contract deployment parameters',
      example: `{
  "type": "constructor",
  "inputs": [
    {"name": "name", "type": "string"},
    {"name": "symbol", "type": "string"}
  ],
  "stateMutability": "nonpayable"
}`
    }
  ]

  const func = contractFunctions[selectedFunction]

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={11}
      stageTitle="Smart Contract Calls"
      stageDescription="Learn how to interact with smart contracts"
      nextStageHref="/ethereum/stage-12"
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">📞</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Calling Smart Contracts</h2>
            <p className="text-gray-400">Interact with deployed contracts on Ethereum</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Smart contracts expose functions that can be called from DApps or other contracts.
          Understanding how to encode and execute these calls is essential for blockchain development.
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">🔑 Key Concepts</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• <strong>ABI:</strong> Application Binary Interface - contract's API definition</li>
            <li>• <strong>View Functions:</strong> Read-only, no gas required</li>
            <li>• <strong>State-Changing Functions:</strong> Modify blockchain, require gas</li>
            <li>• <strong>Encoding:</strong> Convert function calls to bytecode</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📖 What is an ABI?</h3>
        <p className="text-gray-300 mb-4">
          The ABI (Application Binary Interface) is like a contract's instruction manual. It tells you:
        </p>
        <ul className="text-gray-300 space-y-2 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>What functions the contract has</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>What parameters each function accepts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>What values each function returns</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Whether functions are view-only or state-changing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>What events the contract can emit</span>
          </li>
        </ul>

        <div className="grid md:grid-cols-3 gap-4">
          {abiTypes.map((type, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{type.icon}</span>
                <h4 className="font-bold text-white text-sm">{type.name}</h4>
              </div>
              <p className="text-xs text-gray-400 mb-3">{type.description}</p>
              <div className="bg-gray-950 rounded p-2 overflow-x-auto">
                <pre className="text-[10px] text-green-400 font-mono">{type.example}</pre>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🧪 Interactive Contract Call Simulator</h3>

        <div className="mb-6">
          <h4 className="text-white font-medium mb-3">Select a Function to Call:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(contractFunctions).map(([key, fn]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedFunction(key)
                  setCallResult('')
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedFunction === key
                    ? `bg-${fn.color}-500/20 border-${fn.color}-500`
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">{fn.icon}</div>
                <div className="text-sm font-bold text-white">{fn.name}</div>
                <Badge
                  variant={fn.type === 'view' ? 'secondary' : 'warning'}
                  className="mt-2 text-xs"
                >
                  {fn.type}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {func && (
          <div className="space-y-6">
            <div className={`bg-${func.color}-500/10 border border-${func.color}-500/30 rounded-lg p-4`}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl">{func.icon}</span>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-1">{func.name}()</h4>
                  <p className="text-gray-300 text-sm mb-2">{func.description}</p>
                  <code className="text-xs text-cyan-400 font-mono bg-gray-900 px-2 py-1 rounded">
                    {func.signature}
                  </code>
                </div>
              </div>

              {func.inputs.length > 0 && (
                <div className="space-y-3 mt-4">
                  <h5 className="text-sm font-bold text-white">Function Parameters:</h5>
                  {func.inputs.map((input, idx) => (
                    <div key={idx}>
                      <label className="block text-xs text-gray-400 mb-1">
                        {input.name} ({input.type})
                      </label>
                      <input
                        type="text"
                        value={input.name === 'owner' ? inputAddress : input.name === 'amount' ? transferAmount : transferTo}
                        onChange={(e) => {
                          if (input.name === 'owner') setInputAddress(e.target.value)
                          else if (input.name === 'amount') setTransferAmount(e.target.value)
                          else setTransferTo(e.target.value)
                        }}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                        placeholder={`Enter ${input.name}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-900 rounded p-3">
                  <div className="text-xs text-gray-400 mb-1">Function Type</div>
                  <Badge variant={func.type === 'view' ? 'success' : 'warning'}>
                    {func.type === 'view' ? '👁️ View (Free)' : '✍️ State-Changing'}
                  </Badge>
                </div>
                <div className="bg-gray-900 rounded p-3">
                  <div className="text-xs text-gray-400 mb-1">Estimated Gas</div>
                  <div className="text-lg font-bold text-orange-400">
                    {func.gasEstimate === 0 ? 'FREE' : `~${func.gasEstimate.toLocaleString()}`}
                  </div>
                </div>
              </div>

              <button
                onClick={callFunction}
                className={`w-full mt-4 px-6 py-3 bg-gradient-to-r from-${func.color}-500 to-${func.color}-600 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all`}
              >
                {func.type === 'view' ? '🔍 Call Function' : '📝 Send Transaction'}
              </button>

              {callResult && (
                <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Result:</div>
                  <div className="text-sm text-green-400">{callResult}</div>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">💻 Code Example</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-400 font-mono whitespace-pre-wrap">
                  {func.example}
                </pre>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚡ View vs State-Changing Functions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">👁️</span>
              <h4 className="font-bold text-blue-400">View Functions</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><strong>Read-only</strong> - Don't modify blockchain state</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><strong>No gas required</strong> - Free to call</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><strong>Instant results</strong> - No waiting for mining</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><strong>No signature needed</strong> - Can call without wallet</span>
              </li>
            </ul>
            <div className="mt-4 bg-gray-900 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Examples:</div>
              <div className="text-xs text-blue-400 space-y-1">
                <div>• balanceOf(address)</div>
                <div>• totalSupply()</div>
                <div>• ownerOf(tokenId)</div>
                <div>• allowance(owner, spender)</div>
              </div>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">✍️</span>
              <h4 className="font-bold text-orange-400">State-Changing Functions</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span><strong>Modify state</strong> - Change blockchain data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span><strong>Gas required</strong> - Must pay transaction fees</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span><strong>Wait for mining</strong> - Takes 12-15 seconds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span><strong>Signature required</strong> - Must approve in wallet</span>
              </li>
            </ul>
            <div className="mt-4 bg-gray-900 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Examples:</div>
              <div className="text-xs text-orange-400 space-y-1">
                <div>• transfer(to, amount)</div>
                <div>• approve(spender, amount)</div>
                <div>• mint(to, tokenId)</div>
                <div>• burn(tokenId)</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔧 Transaction Lifecycle</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">1</Badge>
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">Construct Transaction</h4>
              <p className="text-sm text-gray-300">
                DApp encodes function call with parameters using ABI
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">2</Badge>
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">Estimate Gas</h4>
              <p className="text-sm text-gray-300">
                Calculate computational cost and set gas limit
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">3</Badge>
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">User Signs</h4>
              <p className="text-sm text-gray-300">
                Wallet prompts user to review and sign transaction
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">4</Badge>
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">Broadcast</h4>
              <p className="text-sm text-gray-300">
                Signed transaction sent to mempool for miners to include
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">5</Badge>
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">Mining</h4>
              <p className="text-sm text-gray-300">
                Miner includes transaction in block (~12 seconds)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="success" className="h-8 w-8 p-0 flex items-center justify-center">6</Badge>
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">Confirmation</h4>
              <p className="text-sm text-gray-300">
                Transaction confirmed, state updated, events emitted
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚠️ Common Pitfalls</h3>
        <div className="space-y-3">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2">Wrong Function Type</h4>
            <p className="text-sm text-gray-300">
              Trying to call a state-changing function as if it were view, or vice versa.
              Always check the function's stateMutability in the ABI.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-bold text-orange-400 mb-2">Insufficient Gas</h4>
            <p className="text-sm text-gray-300">
              Setting gas limit too low causes transaction to fail mid-execution.
              Always estimate gas first and add a small buffer (~10%).
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-bold text-yellow-400 mb-2">Type Mismatch</h4>
            <p className="text-sm text-gray-300">
              Passing wrong data types (e.g., string instead of address).
              ABI encoding will fail or produce unexpected results.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-purple-400 mb-2">Not Waiting for Confirmation</h4>
            <p className="text-sm text-gray-300">
              Assuming transaction succeeded immediately after sending.
              Always wait for receipt to ensure the transaction was mined.
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>ABI is the interface definition that tells you how to interact with a smart contract</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>View functions are free to call and don't change blockchain state</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>State-changing functions require gas fees and wallet signatures</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always estimate gas before sending transactions to avoid failures</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Wait for transaction confirmation before assuming success</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Understanding function types and parameter encoding is crucial for DApp development</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
