'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function EthereumStage1() {
  const [contract, setContract] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [executionLog, setExecutionLog] = useState([])

  const simpleContracts = [
    {
      id: 'greeting',
      name: 'Greeting Contract',
      description: 'Stores and retrieves a greeting message',
      code: `contract Greeting {
  string public message;

  constructor() {
    message = "Hello, World!";
  }

  function setGreeting(string _msg) {
    message = _msg;
  }

  function getGreeting() returns (string) {
    return message;
  }
}`,
      state: { message: 'Hello, World!' },
    },
    {
      id: 'counter',
      name: 'Counter Contract',
      description: 'Increment and decrement a number',
      code: `contract Counter {
  uint256 public count;

  constructor() {
    count = 0;
  }

  function increment() {
    count = count + 1;
  }

  function decrement() {
    require(count > 0, "Cannot go below 0");
    count = count - 1;
  }
}`,
      state: { count: 0 },
    },
  ]

  const deployContract = (contractId) => {
    const selectedContract = simpleContracts.find((c) => c.id === contractId)
    setContract({ ...selectedContract })
    setExecutionLog([{ action: 'Deployed', detail: `${selectedContract.name} deployed to blockchain` }])
  }

  const executeFunction = (functionName) => {
    if (!contract) return

    const newState = { ...contract.state }
    let logEntry = {}

    if (contract.id === 'greeting') {
      if (functionName === 'setGreeting') {
        if (!userInput) return alert('Enter a greeting message')
        newState.message = userInput
        logEntry = { action: 'setGreeting()', detail: `Updated message to "${userInput}"` }
        setUserInput('')
      } else if (functionName === 'getGreeting') {
        logEntry = { action: 'getGreeting()', detail: `Returned: "${newState.message}"` }
      }
    } else if (contract.id === 'counter') {
      if (functionName === 'increment') {
        newState.count += 1
        logEntry = { action: 'increment()', detail: `Count increased to ${newState.count}` }
      } else if (functionName === 'decrement') {
        if (newState.count === 0) {
          logEntry = { action: 'decrement()', detail: 'ERROR: Cannot go below 0', error: true }
        } else {
          newState.count -= 1
          logEntry = { action: 'decrement()', detail: `Count decreased to ${newState.count}` }
        }
      }
    }

    setContract({ ...contract, state: newState })
    setExecutionLog([logEntry, ...executionLog])
  }

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={1}
      stageTitle="Smart Contracts Introduction"
      stageDescription="Learn what smart contracts are and how they power Ethereum"
      nextStageHref="/ethereum/stage-2"
      estimatedTime="12 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">What are Smart Contracts?</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            A <strong>smart contract</strong> is like a vending machine: you put money in, press a
            button, and get your snack automatically. No human needed!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <div className="text-3xl mb-2">📄</div>
              <h3 className="text-lg font-bold text-white mb-2">Traditional Contract</h3>
              <ul className="text-sm space-y-2">
                <li>✗ Requires lawyers</li>
                <li>✗ Can be misinterpreted</li>
                <li>✗ Slow enforcement</li>
                <li>✗ Expensive</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
              <div className="text-3xl mb-2">📜</div>
              <h3 className="text-lg font-bold text-white mb-2">Smart Contract</h3>
              <ul className="text-sm space-y-2">
                <li>✓ Self-executing code</li>
                <li>✓ No ambiguity</li>
                <li>✓ Instant execution</li>
                <li>✓ Low cost</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎮 Try Smart Contracts</h3>
        <p className="text-gray-400 mb-4">
          Select a contract to deploy and interact with it
        </p>

        {!contract ? (
          <div className="grid md:grid-cols-2 gap-4">
            {simpleContracts.map((c) => (
              <button
                key={c.id}
                onClick={() => deployContract(c.id)}
                className="p-4 rounded-lg border-2 border-gray-700 bg-gray-800 hover:border-blue-500 transition-all text-left"
              >
                <h4 className="font-bold text-white mb-2">{c.name}</h4>
                <p className="text-sm text-gray-400 mb-3">{c.description}</p>
                <Button variant="ethereum" size="sm">
                  Deploy Contract
                </Button>
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{contract.name}</h4>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  ✓ Deployed
                </span>
              </div>
              <pre className="text-xs text-gray-400 overflow-x-auto">
                <code>{contract.code}</code>
              </pre>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-white mb-3">Contract State</h4>
              <div className="space-y-2">
                {Object.entries(contract.state).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center bg-gray-900 rounded px-3 py-2">
                    <span className="text-gray-400 text-sm">{key}:</span>
                    <span className="text-white font-mono">
                      {typeof value === 'string' ? `"${value}"` : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="font-bold text-white">Execute Functions</h4>
              {contract.id === 'greeting' && (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Enter new greeting"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                    <Button onClick={() => executeFunction('setGreeting')} variant="ethereum">
                      setGreeting()
                    </Button>
                  </div>
                  <Button onClick={() => executeFunction('getGreeting')} variant="secondary" className="w-full">
                    getGreeting()
                  </Button>
                </>
              )}
              {contract.id === 'counter' && (
                <div className="flex gap-3">
                  <Button onClick={() => executeFunction('increment')} variant="success" className="flex-1">
                    + increment()
                  </Button>
                  <Button onClick={() => executeFunction('decrement')} variant="danger" className="flex-1">
                    - decrement()
                  </Button>
                </div>
              )}
            </div>

            {executionLog.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-bold text-white mb-3">Execution Log</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {executionLog.map((log, idx) => (
                    <div
                      key={idx}
                      className={`text-sm p-2 rounded ${
                        log.error ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      <span className="font-mono">{log.action}</span>
                      <span className="text-gray-400 ml-2">→ {log.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center mt-4">
              <Button onClick={() => setContract(null)} variant="secondary" size="sm">
                Deploy Different Contract
              </Button>
            </div>
          </>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🌍 Real-World Examples</h3>
        <div className="space-y-3">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <h4 className="font-bold text-white mb-1">DeFi (Decentralized Finance)</h4>
                <p className="text-sm text-gray-400">
                  Uniswap, Aave, Compound - all powered by smart contracts for lending, borrowing, and trading
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <h4 className="font-bold text-white mb-1">NFT Marketplaces</h4>
                <p className="text-sm text-gray-400">
                  OpenSea, Rarible use contracts to transfer ownership of digital art
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎮</span>
              <div>
                <h4 className="font-bold text-white mb-1">Gaming</h4>
                <p className="text-sm text-gray-400">
                  Axie Infinity, Decentraland - in-game items stored on blockchain
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
            <span>Smart contracts are self-executing programs on the blockchain</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>They automatically enforce agreements without intermediaries</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Once deployed, contracts are immutable (can't be changed)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Contracts have state (storage) and functions to modify it</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Ethereum is the most popular platform for smart contracts</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
