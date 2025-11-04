'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function EthereumStage5() {
  const [tokenConfig, setTokenConfig] = useState({
    name: '',
    symbol: '',
    decimals: 18,
    initialSupply: 1000000,
  })
  const [createdToken, setCreatedToken] = useState(null)
  const [showCode, setShowCode] = useState(false)

  const handleCreate = () => {
    if (!tokenConfig.name || !tokenConfig.symbol) {
      alert('Please fill in token name and symbol')
      return
    }
    setCreatedToken({
      ...tokenConfig,
      address: '0x' + Math.random().toString(16).substr(2, 40),
      owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      createdAt: new Date().toLocaleString(),
    })
  }

  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${tokenConfig.name.replace(/\s/g, '') || 'MyToken'} {
    string public name = "${tokenConfig.name}";
    string public symbol = "${tokenConfig.symbol}";
    uint8 public decimals = ${tokenConfig.decimals};
    uint256 public totalSupply = ${tokenConfig.initialSupply} * 10**decimals;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Insufficient allowance");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}`

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={5}
      stageTitle="Create Your Own ERC-20 Token"
      stageDescription="Build and deploy a custom token"
      nextStageHref="/ethereum/stage-6"
      estimatedTime="25 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🏭</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Token Creation Studio</h2>
            <p className="text-gray-400">Design your own ERC-20 token (simulated)</p>
          </div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <span className="font-bold text-orange-400">Note:</span> This is a simulation to help you understand token creation.
            To deploy a real token, you'd need to write a smart contract in Solidity, test it thoroughly, and deploy it
            to Ethereum (which costs real money in gas fees).
          </p>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">⚙️ Configure Your Token</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Token Name</label>
            <input
              type="text"
              value={tokenConfig.name}
              onChange={(e) => setTokenConfig({ ...tokenConfig, name: e.target.value })}
              placeholder="My Awesome Token"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Full name of your token (e.g., "Ethereum", "Chainlink")</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Token Symbol</label>
            <input
              type="text"
              value={tokenConfig.symbol}
              onChange={(e) => setTokenConfig({ ...tokenConfig, symbol: e.target.value.toUpperCase() })}
              placeholder="MAT"
              maxLength={5}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white uppercase focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Short ticker symbol (e.g., "ETH", "LINK") - usually 3-5 characters</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Decimals</label>
              <select
                value={tokenConfig.decimals}
                onChange={(e) => setTokenConfig({ ...tokenConfig, decimals: parseInt(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value={6}>6 (like USDC)</option>
                <option value={8}>8 (like some BTC tokens)</option>
                <option value={18}>18 (like ETH - most common)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">How divisible is your token?</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Initial Supply</label>
              <input
                type="number"
                value={tokenConfig.initialSupply}
                onChange={(e) => setTokenConfig({ ...tokenConfig, initialSupply: parseInt(e.target.value) || 0 })}
                placeholder="1000000"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Total tokens to create initially</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Preview</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>• Creating <span className="font-bold text-blue-400">{tokenConfig.initialSupply.toLocaleString()}</span> {tokenConfig.symbol || 'tokens'}</p>
              <p>• Each token divisible to <span className="font-bold text-blue-400">{tokenConfig.decimals}</span> decimal places</p>
              <p>• Smallest unit: <span className="font-bold text-blue-400">0.{Array(tokenConfig.decimals).join('0')}1</span> {tokenConfig.symbol || 'tokens'}</p>
            </div>
          </div>

          <Button onClick={handleCreate} variant="ethereum" className="w-full">
            🚀 Create Token (Simulated)
          </Button>
        </div>
      </Card>

      {createdToken && (
        <Card className="mb-8 bg-green-500/10 border-green-500/50 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎉</span>
            <div>
              <h3 className="text-xl font-bold text-white">Token Created Successfully!</h3>
              <p className="text-sm text-gray-400">Your simulated token has been deployed</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Token Name</div>
                <div className="text-xl font-bold text-white">{createdToken.name}</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Symbol</div>
                <div className="text-xl font-bold text-blue-400">{createdToken.symbol}</div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Contract Address (Simulated)</div>
              <div className="font-mono text-sm text-green-400 break-all">{createdToken.address}</div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Decimals</div>
                <div className="text-lg font-bold text-white">{createdToken.decimals}</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Total Supply</div>
                <div className="text-lg font-bold text-white">{createdToken.initialSupply.toLocaleString()}</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Created At</div>
                <div className="text-sm font-bold text-white">{createdToken.createdAt}</div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Owner Address</div>
              <div className="font-mono text-sm text-blue-400 break-all">{createdToken.owner}</div>
              <div className="text-xs text-gray-500 mt-2">All {createdToken.initialSupply.toLocaleString()} tokens are in this wallet</div>
            </div>
          </div>
        </Card>
      )}

      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">📝 Smart Contract Code</h3>
          <Button onClick={() => setShowCode(!showCode)} variant="secondary" size="sm">
            {showCode ? 'Hide Code' : 'Show Code'}
          </Button>
        </div>
        {showCode && (
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto animate-fade-in">
            <pre className="text-xs text-green-400 font-mono">
              <code>{contractCode}</code>
            </pre>
          </div>
        )}
        <div className="mt-4 space-y-3">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2 text-sm">💡 What's happening in the code?</h4>
            <ul className="text-xs text-gray-300 space-y-2">
              <li>• <span className="text-blue-400">constructor()</span> - Runs once when deployed, gives all tokens to the creator</li>
              <li>• <span className="text-blue-400">mapping</span> - Like a database that stores everyone's balances</li>
              <li>• <span className="text-blue-400">events</span> - Logs that tell everyone when tokens are transferred</li>
              <li>• <span className="text-blue-400">require()</span> - Safety checks to prevent invalid transactions</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💰 Real Token Deployment Costs</h3>
        <div className="space-y-3">
          <p className="text-gray-300">If you wanted to deploy this token to the real Ethereum network:</p>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Gas Required</div>
                <div className="text-xl font-bold text-orange-400">~1,200,000</div>
                <div className="text-xs text-gray-500">gas units</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">At 30 Gwei</div>
                <div className="text-xl font-bold text-white">~0.036 ETH</div>
                <div className="text-xs text-gray-500">≈ $90 USD</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">At 100 Gwei</div>
                <div className="text-xl font-bold text-red-400">~0.12 ETH</div>
                <div className="text-xs text-gray-500">≈ $300 USD</div>
              </div>
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-orange-400">Important:</span> Gas prices vary constantly! Deploy during low-traffic
              times to save money. Also, test your contract on testnets first (free) before deploying to mainnet.
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Creating an ERC-20 token requires writing a Solidity smart contract with standard functions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Token configuration includes name, symbol, decimals, and initial supply</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Deploying a token costs gas - prices vary based on network congestion</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always test on testnets (Sepolia, Goerli) before deploying to mainnet</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>The creator receives all initial tokens - you can then distribute them as needed</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
