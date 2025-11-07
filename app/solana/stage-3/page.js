'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SolanaStage3() {
  const [selectedAccount, setSelectedAccount] = useState('wallet')
  const [pdaInput, setPdaInput] = useState('user_vault')
  const [pdaResult, setPdaResult] = useState('')

  const accountTypes = {
    wallet: {
      name: 'Wallet Account',
      icon: '👛',
      color: 'from-purple-500 to-pink-500',
      description: 'Regular user account that holds SOL',
      owner: 'System Program (11111...)',
      executable: false,
      properties: [
        { label: 'Holds', value: 'SOL balance' },
        { label: 'Owner', value: 'System Program' },
        { label: 'Executable', value: 'No' },
        { label: 'Key Pair', value: 'Has private key' }
      ],
      example: {
        address: '7EqQdEUJxU...',
        lamports: 5000000000,
        owner: '11111111111...',
        data: 'empty',
        executable: false
      }
    },
    program: {
      name: 'Program Account',
      icon: '⚙️',
      color: 'from-blue-500 to-cyan-500',
      description: 'Smart contract deployed on Solana',
      owner: 'BPF Loader (BPFLoader...)',
      executable: true,
      properties: [
        { label: 'Holds', value: 'Executable code' },
        { label: 'Owner', value: 'BPF Loader' },
        { label: 'Executable', value: 'Yes' },
        { label: 'Key Pair', value: 'None needed' }
      ],
      example: {
        address: 'TokenkegQfeZ...',
        lamports: 1141440,
        owner: 'BPFLoaderUpgradeab1e...',
        data: 'program bytecode',
        executable: true
      }
    },
    data: {
      name: 'Data Account',
      icon: '📦',
      color: 'from-green-500 to-emerald-500',
      description: 'Stores program state and user data',
      owner: 'Your Program',
      executable: false,
      properties: [
        { label: 'Holds', value: 'Program state/data' },
        { label: 'Owner', value: 'Specific program' },
        { label: 'Executable', value: 'No' },
        { label: 'Key Pair', value: 'May have private key' }
      ],
      example: {
        address: 'D5wSx8Y2zv...',
        lamports: 2000000,
        owner: 'YourProgram...',
        data: 'struct MyData { ... }',
        executable: false
      }
    },
    pda: {
      name: 'PDA (Program Derived Address)',
      icon: '🔑',
      color: 'from-orange-500 to-red-500',
      description: 'Deterministic address derived from program and seeds',
      owner: 'Deriving Program',
      executable: false,
      properties: [
        { label: 'Holds', value: 'Program-controlled data' },
        { label: 'Owner', value: 'Creating program' },
        { label: 'Executable', value: 'No' },
        { label: 'Key Pair', value: 'No private key!' }
      ],
      example: {
        address: 'findProgramAddress(...)',
        lamports: 2000000,
        owner: 'YourProgram...',
        data: 'vault data',
        executable: false
      }
    }
  }

  const generatePDA = () => {
    // Simulate PDA generation
    const hash = Math.random().toString(16).substr(2, 32)
    setPdaResult(`PDA: ${hash}...\nBump: 255`)
  }

  const account = accountTypes[selectedAccount]

  const accountLifecycle = [
    {
      stage: 'Creation',
      icon: '🏗️',
      description: 'Account is created and allocated space',
      details: ['Payer funds the account', 'Space allocated for data', 'Rent must be paid', 'Owner is assigned']
    },
    {
      stage: 'Active',
      icon: '✅',
      description: 'Account is rent-exempt and functioning',
      details: ['Holds 2+ years of rent', 'Can be read/written', 'Owned by a program', 'State changes tracked']
    },
    {
      stage: 'Modification',
      icon: '✏️',
      description: 'Only owner program can modify data',
      details: ['Owner writes to data', 'Lamports can be added', 'Size can grow if funded', 'Access controlled']
    },
    {
      stage: 'Closure',
      icon: '🗑️',
      description: 'Account is closed and lamports reclaimed',
      details: ['Data is zeroed out', 'Lamports returned', 'Space deallocated', 'Address can be reused']
    }
  ]

  return (
    <StageLayout
      trackName="Solana Track"
      trackHref="/solana"
      trackColor="solana"
      stageNumber={3}
      stageTitle="Accounts & Programs"
      stageDescription="Understanding Solana's account model and smart contracts"
      nextStageHref="/solana/stage-4"
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">📂</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Solana Account Model</h2>
            <p className="text-gray-400">Everything is an account on Solana</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Unlike Ethereum where contracts have their own storage, Solana separates code (programs) from data (accounts).
          This architecture enables parallel transaction processing and better performance.
        </p>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">🔑 Key Differences from Ethereum</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• <strong>Separation:</strong> Code (programs) and data (accounts) are separate</li>
            <li>• <strong>Stateless:</strong> Programs don't store state - accounts do</li>
            <li>• <strong>Parallel:</strong> Multiple programs can run simultaneously</li>
            <li>• <strong>Rent:</strong> Accounts must pay rent or be rent-exempt</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Types of Accounts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(accountTypes).map(([key, acc]) => (
            <button
              key={key}
              onClick={() => setSelectedAccount(key)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedAccount === key
                  ? `bg-gradient-to-br ${acc.color} border-white/50`
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-4xl mb-2">{acc.icon}</div>
              <div className="text-sm font-bold text-white">{acc.name}</div>
            </button>
          ))}
        </div>

        {account && (
          <div className="space-y-6">
            <div className={`bg-gradient-to-r ${account.color} p-6 rounded-xl`}>
              <div className="flex items-start gap-4">
                <span className="text-5xl">{account.icon}</span>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white mb-2">{account.name}</h4>
                  <p className="text-white/90 mb-4">{account.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {account.properties.map((prop, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-2">
                        <div className="text-xs text-white/70">{prop.label}</div>
                        <div className="text-sm font-bold text-white">{prop.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h5 className="font-bold text-white mb-3">Example Account Structure</h5>
              <div className="bg-gray-950 rounded p-4 font-mono text-sm">
                <div className="mb-2">
                  <span className="text-gray-400">address:</span>
                  <span className="text-purple-400"> {account.example.address}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-400">lamports:</span>
                  <span className="text-green-400"> {account.example.lamports}</span>
                  <span className="text-gray-500"> ({(account.example.lamports / 1e9).toFixed(2)} SOL)</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-400">owner:</span>
                  <span className="text-blue-400"> {account.example.owner}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-400">data:</span>
                  <span className="text-cyan-400"> {account.example.data}</span>
                </div>
                <div>
                  <span className="text-gray-400">executable:</span>
                  <span className={account.example.executable ? 'text-green-400' : 'text-red-400'}>
                    {' '}{account.example.executable.toString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔑 Program Derived Addresses (PDAs)</h3>
        <p className="text-gray-300 mb-4">
          PDAs are special accounts with no private key, controlled entirely by a program.
          They're deterministically derived from a program ID and seeds.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-bold text-orange-400 mb-3">Why PDAs?</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong>Security:</strong> No private key to steal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong>Deterministic:</strong> Same seeds = same address</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong>Program-controlled:</strong> Only program can sign</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong>Scalable:</strong> Create many accounts per user</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold text-blue-400 mb-3">Common Use Cases</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong>User Vaults:</strong> Per-user storage accounts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong>Token Accounts:</strong> SPL token holdings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong>State Accounts:</strong> Program configuration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong>Escrow:</strong> Temporary token custody</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <h5 className="font-bold text-white mb-3">🧪 PDA Generator</h5>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Seed String</label>
              <input
                type="text"
                value={pdaInput}
                onChange={(e) => setPdaInput(e.target.value)}
                className="w-full px-4 py-2 bg-gray-950 border border-gray-700 rounded text-white focus:border-purple-500 focus:outline-none"
                placeholder="Enter seed (e.g., user_vault)"
              />
            </div>
            <button
              onClick={generatePDA}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all"
            >
              Generate PDA
            </button>
            {pdaResult && (
              <div className="bg-gray-950 rounded p-4">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{pdaResult}</pre>
                <div className="text-xs text-gray-400 mt-2">
                  Generated from: program_id + seed + bump
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💰 Rent & Account Lifecycle</h3>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-yellow-400 mb-2">⚠️ Rent System</h4>
          <p className="text-sm text-gray-300 mb-2">
            Accounts must pay rent to stay alive on Solana. However, accounts with 2+ years of rent are "rent-exempt"
            and never get deleted.
          </p>
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="bg-gray-900 rounded p-3">
              <div className="text-xs text-gray-400">Minimum Rent (1KB)</div>
              <div className="text-lg font-bold text-white">~0.00089 SOL</div>
            </div>
            <div className="bg-gray-900 rounded p-3">
              <div className="text-xs text-gray-400">Best Practice</div>
              <div className="text-lg font-bold text-green-400">Always rent-exempt</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {accountLifecycle.map((stage, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-4">
              <div className="text-4xl mb-2">{stage.icon}</div>
              <h5 className="font-bold text-white mb-2">{stage.stage}</h5>
              <p className="text-xs text-gray-400 mb-3">{stage.description}</p>
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
        <h3 className="text-xl font-bold text-white mb-4">⚙️ Programs (Smart Contracts)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-white mb-3">Key Characteristics</h4>
            <div className="space-y-3">
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">📝</span>
                  <span className="font-bold text-white text-sm">Stateless</span>
                </div>
                <p className="text-xs text-gray-400">Programs don't store data - they process instructions</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🔄</span>
                  <span className="font-bold text-white text-sm">Reusable</span>
                </div>
                <p className="text-xs text-gray-400">One program can serve many users and accounts</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">⚡</span>
                  <span className="font-bold text-white text-sm">Parallel</span>
                </div>
                <p className="text-xs text-gray-400">Can run simultaneously without conflicts</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Popular Programs</h4>
            <div className="space-y-2">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <div className="font-bold text-white text-sm mb-1">System Program</div>
                <div className="text-xs text-gray-400">Creates accounts, transfers SOL</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="font-bold text-white text-sm mb-1">SPL Token Program</div>
                <div className="text-xs text-gray-400">Manages fungible and non-fungible tokens</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="font-bold text-white text-sm mb-1">Associated Token Account</div>
                <div className="text-xs text-gray-400">Deterministic token account creation</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔄 Cross-Program Invocation (CPI)</h3>
        <p className="text-gray-300 mb-4">
          Programs can call other programs, enabling composability like DeFi "money legos".
        </p>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 text-center">
              <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4">
                <div className="text-2xl mb-1">📱</div>
                <div className="text-sm font-bold text-white">Your DApp</div>
              </div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1 text-center">
              <div className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4">
                <div className="text-2xl mb-1">⚙️</div>
                <div className="text-sm font-bold text-white">Your Program</div>
              </div>
            </div>
            <div className="text-2xl">→</div>
            <div className="flex-1 text-center">
              <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4">
                <div className="text-2xl mb-1">🪙</div>
                <div className="text-sm font-bold text-white">SPL Token</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Your program can invoke SPL Token to transfer tokens on behalf of users
          </p>
        </div>
      </Card>

      <Card className="bg-purple-500/10 border-purple-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Everything on Solana is an account - wallets, programs, and data all use the same model</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Programs (smart contracts) are stateless and separate from data accounts</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>PDAs are program-controlled accounts with no private key - perfect for vaults and escrow</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Accounts must be rent-exempt (2+ years rent) to avoid deletion</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Only the owner program can modify an account's data</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">✓</span>
            <span>Programs can call other programs via CPI for composability</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
