'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EthereumStage12() {
  const [selectedVuln, setSelectedVuln] = useState('reentrancy')
  const [scanResults, setScanResults] = useState([])
  const [scanning, setScanning] = useState(false)

  const vulnerabilities = {
    reentrancy: {
      name: 'Reentrancy Attack',
      icon: '🔄',
      severity: 'Critical',
      color: 'red',
      description: 'Attacker calls back into contract before first call completes',
      example: 'The DAO hack (2016) - $60M stolen',
      vulnerable: `function withdraw() public {
  uint amount = balances[msg.sender];
  // ❌ VULNERABLE: External call before state update
  (bool success,) = msg.sender.call{value: amount}("");
  balances[msg.sender] = 0;
}`,
      fixed: `function withdraw() public {
  uint amount = balances[msg.sender];
  // ✅ SECURE: Update state before external call
  balances[msg.sender] = 0;
  (bool success,) = msg.sender.call{value: amount}("");
  require(success, "Transfer failed");
}`,
      prevention: [
        'Update state variables before external calls',
        'Use ReentrancyGuard from OpenZeppelin',
        'Follow Checks-Effects-Interactions pattern',
        'Consider using pull over push for payments'
      ]
    },
    overflow: {
      name: 'Integer Overflow/Underflow',
      icon: '🔢',
      severity: 'High',
      color: 'orange',
      description: 'Arithmetic operations exceed variable limits',
      example: 'BECToken hack (2018) - $1B market cap',
      vulnerable: `function transfer(address to, uint256 amount) public {
  // ❌ VULNERABLE: No overflow check
  balances[msg.sender] -= amount;
  balances[to] += amount;
}`,
      fixed: `function transfer(address to, uint256 amount) public {
  // ✅ SECURE: Use SafeMath or Solidity 0.8+
  require(balances[msg.sender] >= amount, "Insufficient");
  balances[msg.sender] -= amount;
  balances[to] += amount;
}`,
      prevention: [
        'Use Solidity 0.8+ (built-in overflow checks)',
        'Use SafeMath library for older versions',
        'Always validate arithmetic operations',
        'Test edge cases with max/min values'
      ]
    },
    accessControl: {
      name: 'Access Control Issues',
      icon: '🔐',
      severity: 'Critical',
      color: 'red',
      description: 'Missing or improper access restrictions',
      example: 'Parity Wallet hack (2017) - $280M lost',
      vulnerable: `function setOwner(address newOwner) public {
  // ❌ VULNERABLE: Anyone can become owner
  owner = newOwner;
}`,
      fixed: `function setOwner(address newOwner) public {
  // ✅ SECURE: Only owner can transfer ownership
  require(msg.sender == owner, "Not owner");
  require(newOwner != address(0), "Invalid address");
  owner = newOwner;
}`,
      prevention: [
        'Always use access modifiers (onlyOwner)',
        'Use OpenZeppelin Ownable/AccessControl',
        'Never expose critical functions publicly',
        'Audit all state-changing functions'
      ]
    },
    frontRunning: {
      name: 'Front-Running',
      icon: '🏃',
      severity: 'Medium',
      color: 'yellow',
      description: 'Attacker sees pending transaction and submits own first',
      example: 'MEV bots on Uniswap trades',
      vulnerable: `function buyToken() public payable {
  // ❌ VULNERABLE: Anyone can see this and front-run
  uint price = getCurrentPrice();
  // Purchase at current price
}`,
      fixed: `function buyToken(uint maxPrice) public payable {
  // ✅ BETTER: Use slippage protection
  uint price = getCurrentPrice();
  require(price <= maxPrice, "Price too high");
  // Purchase with price limit
}`,
      prevention: [
        'Implement commit-reveal schemes',
        'Use submarine sends or private mempools',
        'Add slippage protection',
        'Consider batch auctions instead of continuous'
      ]
    },
    delegateCall: {
      name: 'Delegatecall Vulnerabilities',
      icon: '📞',
      severity: 'Critical',
      color: 'red',
      description: 'Improper use of delegatecall can hijack contract',
      example: 'Parity Multisig hack (2017)',
      vulnerable: `function execute(address target, bytes memory data) public {
  // ❌ VULNERABLE: Uncontrolled delegatecall
  target.delegatecall(data);
}`,
      fixed: `function execute(uint actionId, bytes memory data) public {
  // ✅ SECURE: Whitelist allowed targets
  require(msg.sender == owner, "Not owner");
  address target = allowedTargets[actionId];
  require(target != address(0), "Invalid target");
  target.delegatecall(data);
}`,
      prevention: [
        'Avoid delegatecall if possible',
        'Whitelist allowed targets',
        'Never delegatecall to user-supplied addresses',
        'Understand storage layout conflicts'
      ]
    }
  }

  const famousHacks = [
    {
      name: 'The DAO Hack',
      year: 2016,
      loss: '$60M',
      type: 'Reentrancy',
      description: 'Recursive calling drained funds before balance updated',
      impact: 'Led to Ethereum hard fork (ETH/ETC split)',
      lesson: 'Always update state before external calls'
    },
    {
      name: 'Parity Wallet Freeze',
      year: 2017,
      loss: '$280M',
      type: 'Access Control',
      description: 'Library contract accidentally killed, froze all wallets',
      impact: 'Funds permanently locked',
      lesson: 'Critical functions need proper access control'
    },
    {
      name: 'BECToken Overflow',
      year: 2018,
      loss: '$1B MC',
      type: 'Integer Overflow',
      description: 'Batch transfer function had overflow bug',
      impact: 'Created unlimited tokens',
      lesson: 'Use SafeMath or Solidity 0.8+'
    },
    {
      name: 'Poly Network Hack',
      year: 2021,
      loss: '$610M',
      type: 'Access Control',
      description: 'Cross-chain message validation flaw',
      impact: 'Largest DeFi hack (funds returned)',
      lesson: 'Bridge security is critical'
    }
  ]

  const auditChecklist = [
    {
      category: 'Access Control',
      items: [
        'All critical functions have proper modifiers',
        'Owner/admin roles are clearly defined',
        'No public functions that should be private',
        'Ownership transfer is secure'
      ]
    },
    {
      category: 'Reentrancy',
      items: [
        'State updates before external calls',
        'ReentrancyGuard on vulnerable functions',
        'No recursive call possibilities',
        'Pull over push pattern for payments'
      ]
    },
    {
      category: 'Arithmetic',
      items: [
        'Using Solidity 0.8+ or SafeMath',
        'No unchecked overflow/underflow',
        'Division by zero checks',
        'Precision loss considered'
      ]
    },
    {
      category: 'External Calls',
      items: [
        'Handle failed external calls',
        'Gas limits considered',
        'Avoid delegatecall to untrusted contracts',
        'Check return values'
      ]
    }
  ]

  const scanContract = () => {
    setScanning(true)
    setTimeout(() => {
      setScanResults([
        { type: 'critical', message: 'Reentrancy vulnerability in withdraw()' },
        { type: 'warning', message: 'Missing input validation in transfer()' },
        { type: 'info', message: 'Consider using latest Solidity version' },
        { type: 'pass', message: 'Access control properly implemented' },
        { type: 'pass', message: 'No integer overflow issues detected' }
      ])
      setScanning(false)
    }, 2000)
  }

  const vuln = vulnerabilities[selectedVuln]

  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={12}
      stageTitle="Security & Audits"
      stageDescription="Learn about smart contract security and common vulnerabilities"
      nextStageHref={null}
      estimatedTime="30 min"
    >
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🛡️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Smart Contract Security</h2>
            <p className="text-gray-400">Understanding vulnerabilities and best practices</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Smart contract security is critical - bugs can't be easily fixed and can lead to massive financial losses.
          Understanding common vulnerabilities and security patterns is essential for blockchain development.
        </p>
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">⚠️ Why Security Matters</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• <strong>Immutable:</strong> Can't easily patch bugs after deployment</li>
            <li>• <strong>Financial:</strong> Billions of dollars at risk</li>
            <li>• <strong>Public:</strong> Code and vulnerabilities are visible</li>
            <li>• <strong>Automated:</strong> Bots scan for exploits 24/7</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Common Vulnerabilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {Object.entries(vulnerabilities).map(([key, v]) => (
            <button
              key={key}
              onClick={() => setSelectedVuln(key)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedVuln === key
                  ? `bg-${v.color}-500/20 border-${v.color}-500`
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-3xl mb-2">{v.icon}</div>
              <div className="text-xs font-bold text-white mb-1">{v.name}</div>
              <Badge
                variant={v.severity === 'Critical' ? 'destructive' : v.severity === 'High' ? 'warning' : 'secondary'}
                className="text-[10px]"
              >
                {v.severity}
              </Badge>
            </button>
          ))}
        </div>

        {vuln && (
          <div className="space-y-6">
            <div className={`bg-${vuln.color}-500/10 border border-${vuln.color}-500/30 rounded-lg p-4`}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl">{vuln.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xl font-bold text-white">{vuln.name}</h4>
                    <Badge variant="destructive">{vuln.severity}</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{vuln.description}</p>
                  <div className="bg-gray-900 rounded px-3 py-2">
                    <div className="text-xs text-gray-400">Real-world Example:</div>
                    <div className="text-sm text-orange-400">{vuln.example}</div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="vulnerable">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="vulnerable">Vulnerable Code</TabsTrigger>
                <TabsTrigger value="fixed">Fixed Code</TabsTrigger>
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
              </TabsList>

              <TabsContent value="vulnerable">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h5 className="font-bold text-red-400 mb-2">❌ Vulnerable Code</h5>
                  <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-red-400 font-mono">{vuln.vulnerable}</pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fixed">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h5 className="font-bold text-green-400 mb-2">✅ Fixed Code</h5>
                  <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400 font-mono">{vuln.fixed}</pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prevention">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-bold text-blue-400 mb-3">🛡️ Prevention Techniques</h5>
                  <ul className="space-y-2">
                    {vuln.prevention.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💀 Famous Hacks & Lessons</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {famousHacks.map((hack, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white">{hack.name}</h4>
                <Badge variant="destructive">{hack.loss}</Badge>
              </div>
              <div className="text-xs text-gray-400 mb-2">{hack.year} • {hack.type}</div>
              <p className="text-sm text-gray-300 mb-2">{hack.description}</p>
              <div className="bg-red-500/10 rounded p-2 mb-2">
                <div className="text-xs text-red-400">{hack.impact}</div>
              </div>
              <div className="bg-green-500/10 rounded p-2">
                <div className="text-xs text-gray-400">Lesson:</div>
                <div className="text-xs text-green-400">{hack.lesson}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔍 Security Audit Simulator</h3>
        <div className="bg-gray-900 rounded-lg p-6">
          <p className="text-gray-300 mb-4">
            Professional auditors review smart contracts for vulnerabilities. Try our simplified scanner:
          </p>

          <button
            onClick={scanContract}
            disabled={scanning}
            className="w-full mb-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
          >
            {scanning ? '⏳ Scanning Contract...' : '🔍 Run Security Scan'}
          </button>

          {scanResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-white mb-2">Scan Results:</h4>
              {scanResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-3 border ${
                    result.type === 'critical'
                      ? 'bg-red-500/10 border-red-500/30'
                      : result.type === 'warning'
                      ? 'bg-orange-500/10 border-orange-500/30'
                      : result.type === 'info'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-green-500/10 border-green-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {result.type === 'critical'
                        ? '🚨'
                        : result.type === 'warning'
                        ? '⚠️'
                        : result.type === 'info'
                        ? 'ℹ️'
                        : '✅'}
                    </span>
                    <span className="text-sm text-gray-300">{result.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">✅ Security Audit Checklist</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {auditChecklist.map((section, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-bold text-white mb-3">{section.category}</h4>
              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <label key={i} className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🏆 Security Best Practices</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-3xl mb-2">📚</div>
            <h4 className="font-bold text-green-400 mb-2">Use Audited Libraries</h4>
            <p className="text-sm text-gray-300 mb-2">
              Use well-tested libraries like OpenZeppelin instead of writing your own.
            </p>
            <div className="text-xs text-gray-400">
              OpenZeppelin, Solmate, etc.
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-3xl mb-2">🧪</div>
            <h4 className="font-bold text-blue-400 mb-2">Comprehensive Testing</h4>
            <p className="text-sm text-gray-300 mb-2">
              Write extensive tests covering all edge cases and failure modes.
            </p>
            <div className="text-xs text-gray-400">
              Unit, integration, and fuzzing tests
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-3xl mb-2">🔍</div>
            <h4 className="font-bold text-purple-400 mb-2">Professional Audits</h4>
            <p className="text-sm text-gray-300 mb-2">
              Get contracts audited by reputable firms before mainnet deployment.
            </p>
            <div className="text-xs text-gray-400">
              Trail of Bits, ConsenSys, etc.
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="text-3xl mb-2">🐛</div>
            <h4 className="font-bold text-orange-400 mb-2">Bug Bounties</h4>
            <p className="text-sm text-gray-300 mb-2">
              Offer rewards for finding vulnerabilities before attackers do.
            </p>
            <div className="text-xs text-gray-400">
              Immunefi, HackerOne platforms
            </div>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="text-3xl mb-2">⏸️</div>
            <h4 className="font-bold text-cyan-400 mb-2">Emergency Pauses</h4>
            <p className="text-sm text-gray-300 mb-2">
              Implement pause mechanisms to stop operations if issues arise.
            </p>
            <div className="text-xs text-gray-400">
              Pausable pattern with time locks
            </div>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="font-bold text-pink-400 mb-2">Monitoring</h4>
            <p className="text-sm text-gray-300 mb-2">
              Monitor contract activity for suspicious transactions.
            </p>
            <div className="text-xs text-gray-400">
              OpenZeppelin Defender, Tenderly
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Congratulations!</h3>
        <p className="text-gray-300 mb-4">
          You've completed the Ethereum Track! You now understand:
        </p>
        <ul className="space-y-3 text-gray-300 mb-6">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Ethereum's architecture, gas system, and smart contracts</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Token standards (ERC-20, ERC-721, ERC-1155)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>DeFi protocols, AMMs, and lending platforms</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>DApp interactions and wallet connections</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Smart contract calls and ABIs</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Security vulnerabilities and audit best practices</span>
          </li>
        </ul>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-xl font-bold text-white mb-1">Ethereum Track Complete!</div>
          <div className="text-sm text-white/80">Ready to explore Solana or Trading strategies?</div>
        </div>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Smart contract bugs can lead to massive financial losses - security is paramount</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Common vulnerabilities include reentrancy, overflow, and access control issues</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Always update state before external calls to prevent reentrancy</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Use audited libraries like OpenZeppelin instead of rolling your own</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Professional audits, testing, and bug bounties are essential before mainnet</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Implement emergency pauses and monitoring for production contracts</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
