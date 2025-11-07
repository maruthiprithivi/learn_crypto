'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EthereumStage10() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [transactionStatus, setTransactionStatus] = useState('')
  const [signedMessage, setSignedMessage] = useState('')
  const [messageToSign, setMessageToSign] = useState('Hello, Ethereum!')
  const [chainId, setChainId] = useState(1) // 1 = Ethereum Mainnet

  const connectWallet = () => {
    // Simulate wallet connection
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40)
    setWalletAddress(mockAddress)
    setWalletConnected(true)
    setTransactionStatus('Wallet connected successfully!')
  }

  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress('')
    setTransactionStatus('')
    setSignedMessage('')
  }

  const signMessage = () => {
    if (!walletConnected) {
      setTransactionStatus('⚠️ Please connect your wallet first!')
      return
    }
    // Simulate message signing
    const signature = '0x' + Math.random().toString(16).substr(2, 130)
    setSignedMessage(signature)
    setTransactionStatus('✅ Message signed successfully!')
  }

  const sendTransaction = () => {
    if (!walletConnected) {
      setTransactionStatus('⚠️ Please connect your wallet first!')
      return
    }
    setTransactionStatus('⏳ Transaction pending...')
    setTimeout(() => {
      const txHash = '0x' + Math.random().toString(16).substr(2, 64)
      setTransactionStatus(`✅ Transaction confirmed! Hash: ${txHash.substring(0, 20)}...`)
    }, 2000)
  }

  const switchNetwork = (newChainId) => {
    if (!walletConnected) {
      setTransactionStatus('⚠️ Please connect your wallet first!')
      return
    }
    setChainId(newChainId)
    const networks = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      137: 'Polygon',
      42161: 'Arbitrum'
    }
    setTransactionStatus(`✅ Switched to ${networks[newChainId]}`)
  }

  const dappPatterns = {
    wallet: {
      name: 'Wallet Connection',
      icon: '👛',
      color: 'from-blue-500 to-cyan-500',
      description: 'The first step in any DApp interaction is connecting a Web3 wallet',
      steps: [
        'User clicks "Connect Wallet" button',
        'DApp requests wallet access (e.g., MetaMask popup)',
        'User approves connection',
        'DApp receives wallet address and can read blockchain data',
        'User remains in control - DApp cannot make transactions without approval'
      ],
      code: `// Request wallet connection
const accounts = await window.ethereum.request({
  method: 'eth_requestAccounts'
})
const address = accounts[0]
console.log('Connected:', address)`
    },
    read: {
      name: 'Reading Data',
      icon: '📖',
      color: 'from-green-500 to-emerald-500',
      description: 'DApps can read public blockchain data without requiring wallet signatures',
      steps: [
        'DApp connects to RPC provider (Infura, Alchemy, etc.)',
        'Makes read-only calls to smart contracts',
        'Fetches balances, NFTs, transaction history',
        'No gas fees required for reading',
        'Data is always up-to-date from blockchain'
      ],
      code: `// Read data from contract
const provider = new ethers.JsonRpcProvider(rpcUrl)
const contract = new ethers.Contract(address, abi, provider)
const balance = await contract.balanceOf(userAddress)
console.log('Balance:', balance.toString())`
    },
    write: {
      name: 'Writing Data',
      icon: '✍️',
      color: 'from-purple-500 to-pink-500',
      description: 'Changing blockchain state requires wallet signatures and gas fees',
      steps: [
        'User initiates transaction in DApp',
        'DApp constructs transaction data',
        'Wallet prompts user to review and sign',
        'User approves and transaction is broadcast',
        'Transaction confirmed on-chain after mining'
      ],
      code: `// Send transaction
const signer = await provider.getSigner()
const contract = new ethers.Contract(address, abi, signer)
const tx = await contract.transfer(toAddress, amount)
const receipt = await tx.wait()
console.log('Confirmed:', receipt.hash)`
    },
    events: {
      name: 'Event Listening',
      icon: '📡',
      color: 'from-orange-500 to-red-500',
      description: 'DApps can listen for blockchain events to update UI in real-time',
      steps: [
        'DApp subscribes to contract events',
        'Smart contract emits events on state changes',
        'DApp receives event notifications',
        'UI updates automatically',
        'User sees real-time activity'
      ],
      code: `// Listen for events
contract.on('Transfer', (from, to, amount) => {
  console.log(\`Transfer: \${from} -> \${to}\`)
  console.log(\`Amount: \${amount.toString()}\`)
  updateUI()
})`
    }
  }

  const [selectedPattern, setSelectedPattern] = useState('wallet')
  const pattern = dappPatterns[selectedPattern]

  const networks = [
    { id: 1, name: 'Ethereum Mainnet', color: 'blue' },
    { id: 5, name: 'Goerli Testnet', color: 'purple' },
    { id: 137, name: 'Polygon', color: 'violet' },
    { id: 42161, name: 'Arbitrum', color: 'cyan' }
  ]

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={10}
      stageTitle="DApp Interactions"
      stageDescription="Learn how decentralized applications interact with wallets"
      nextStageHref="/ethereum/stage-11"
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🌐</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Interacting with DApps</h2>
            <p className="text-gray-400">How web applications connect to Ethereum</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          DApps (Decentralized Applications) are web applications that interact with smart contracts
          on the blockchain. They use Web3 libraries and wallet connections to enable users to
          read and write blockchain data.
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">🔑 Key Concepts</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• <strong>Web3 Provider:</strong> Connection to Ethereum network (MetaMask, WalletConnect)</li>
            <li>• <strong>Read Operations:</strong> Free, no signature required</li>
            <li>• <strong>Write Operations:</strong> Require signature and gas fees</li>
            <li>• <strong>User Control:</strong> DApps can't do anything without user approval</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🧪 Interactive Wallet Simulator</h3>
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${walletConnected ? 'bg-green-400' : 'bg-gray-600'}`} />
                <span className="text-white font-medium">
                  {walletConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
                </span>
              </div>
              <Badge variant={walletConnected ? 'success' : 'secondary'}>
                {walletConnected ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>

            {walletConnected && (
              <div className="bg-gray-800 rounded p-3 mb-4">
                <div className="text-xs text-gray-400 mb-1">Your Address</div>
                <div className="text-sm font-mono text-blue-400">{walletAddress}</div>
              </div>
            )}

            <button
              onClick={walletConnected ? disconnectWallet : connectWallet}
              className={`w-full px-6 py-3 rounded-lg font-bold transition-all ${
                walletConnected
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:scale-105'
              } text-white`}
            >
              {walletConnected ? '🔌 Disconnect Wallet' : '🔗 Connect Wallet'}
            </button>
          </div>

          <Tabs defaultValue="sign">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sign">Sign Message</TabsTrigger>
              <TabsTrigger value="transaction">Send Transaction</TabsTrigger>
              <TabsTrigger value="network">Switch Network</TabsTrigger>
            </TabsList>

            <TabsContent value="sign" className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">✍️ Sign a Message</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Message signing proves you control a wallet address without spending gas.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message to Sign
                    </label>
                    <input
                      type="text"
                      value={messageToSign}
                      onChange={(e) => setMessageToSign(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      placeholder="Enter message to sign"
                    />
                  </div>

                  {signedMessage && (
                    <div className="bg-gray-900 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Signature</div>
                      <div className="text-xs font-mono text-green-400 break-all">{signedMessage}</div>
                    </div>
                  )}

                  <button
                    onClick={signMessage}
                    disabled={!walletConnected}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sign Message
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transaction" className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">💸 Send Transaction</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Transactions change blockchain state and require gas fees.
                </p>

                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">To Address</div>
                        <div className="text-sm font-mono text-gray-300">0x742d...5f0b</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Amount</div>
                        <div className="text-sm font-mono text-gray-300">0.1 ETH</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Gas Fee</div>
                        <div className="text-sm font-mono text-orange-400">~$2.50</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Total</div>
                        <div className="text-sm font-mono text-white">0.1 ETH + Gas</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={sendTransaction}
                    disabled={!walletConnected}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Transaction
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">🌍 Switch Network</h4>
                <p className="text-sm text-gray-300 mb-4">
                  DApps can request users to switch to different blockchain networks.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {networks.map(network => (
                    <button
                      key={network.id}
                      onClick={() => switchNetwork(network.id)}
                      disabled={!walletConnected}
                      className={`px-4 py-3 rounded-lg font-medium transition-all ${
                        chainId === network.id
                          ? `bg-${network.color}-500 text-white`
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {network.name}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {transactionStatus && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-300">{transactionStatus}</div>
            </div>
          )}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Common DApp Patterns</h3>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {Object.entries(dappPatterns).map(([key, ptrn]) => (
            <button
              key={key}
              onClick={() => setSelectedPattern(key)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedPattern === key
                  ? `bg-gradient-to-br ${ptrn.color} border-white/50`
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-4xl mb-2">{ptrn.icon}</div>
              <h4 className="text-sm font-bold text-white">{ptrn.name}</h4>
            </button>
          ))}
        </div>

        {pattern && (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg bg-gradient-to-r ${pattern.color}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{pattern.icon}</span>
                <div>
                  <h4 className="text-xl font-bold text-white">{pattern.name}</h4>
                  <p className="text-white/90 text-sm">{pattern.description}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">📋 How It Works</h4>
              <div className="space-y-2">
                {pattern.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Badge variant="secondary" className="mt-0.5 h-6 w-6 p-0 flex items-center justify-center text-xs">
                      {idx + 1}
                    </Badge>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">💻 Code Example</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-400 font-mono whitespace-pre-wrap">
                  {pattern.code}
                </pre>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔐 Security Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
              <span>✅</span>
              <span>Do's</span>
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Always verify the website URL before connecting</li>
              <li>• Review transaction details carefully before signing</li>
              <li>• Use hardware wallets for large amounts</li>
              <li>• Keep your seed phrase secret and offline</li>
              <li>• Disconnect from DApps when done using them</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
              <span>❌</span>
              <span>Don'ts</span>
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Never share your private key or seed phrase</li>
              <li>• Don't approve unlimited token allowances</li>
              <li>• Avoid connecting to unverified DApps</li>
              <li>• Don't sign transactions you don't understand</li>
              <li>• Never enter your seed phrase on websites</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🏆 Popular DApp Categories</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="text-3xl mb-2">💱</div>
            <h4 className="font-bold text-white mb-2">DeFi</h4>
            <p className="text-sm text-gray-300 mb-2">
              Decentralized finance protocols for trading, lending, and earning yield.
            </p>
            <div className="text-xs text-gray-400">
              Examples: Uniswap, Aave, Compound
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="text-3xl mb-2">🖼️</div>
            <h4 className="font-bold text-white mb-2">NFT Marketplaces</h4>
            <p className="text-sm text-gray-300 mb-2">
              Buy, sell, and trade non-fungible tokens and digital collectibles.
            </p>
            <div className="text-xs text-gray-400">
              Examples: OpenSea, Blur, LooksRare
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
            <div className="text-3xl mb-2">🎮</div>
            <h4 className="font-bold text-white mb-2">GameFi</h4>
            <p className="text-sm text-gray-300 mb-2">
              Blockchain-based games with play-to-earn mechanics and NFT items.
            </p>
            <div className="text-xs text-gray-400">
              Examples: Axie Infinity, Gods Unchained
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-orange-500">
            <div className="text-3xl mb-2">🌐</div>
            <h4 className="font-bold text-white mb-2">Social</h4>
            <p className="text-sm text-gray-300 mb-2">
              Decentralized social networks where users own their content and data.
            </p>
            <div className="text-xs text-gray-400">
              Examples: Lens Protocol, Farcaster
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-cyan-500">
            <div className="text-3xl mb-2">🏛️</div>
            <h4 className="font-bold text-white mb-2">DAOs</h4>
            <p className="text-sm text-gray-300 mb-2">
              Decentralized autonomous organizations for community governance.
            </p>
            <div className="text-xs text-gray-400">
              Examples: Snapshot, Tally
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-pink-500">
            <div className="text-3xl mb-2">🆔</div>
            <h4 className="font-bold text-white mb-2">Identity</h4>
            <p className="text-sm text-gray-300 mb-2">
              Decentralized identity and domain name services for Web3.
            </p>
            <div className="text-xs text-gray-400">
              Examples: ENS, Unstoppable Domains
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>DApps are web applications that interact with blockchain through Web3 providers like MetaMask</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Reading blockchain data is free, but writing requires wallet signatures and gas fees</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Users maintain full control - DApps cannot perform actions without explicit approval</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Message signing proves wallet ownership without spending gas</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always verify website URLs and transaction details before approving</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Popular DApp categories include DeFi, NFT marketplaces, GameFi, social, DAOs, and identity</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
