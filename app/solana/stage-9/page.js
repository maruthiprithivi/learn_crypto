'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Stage9() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'solana'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 9 < maxStage ? 9 + 1 : null

  const [selectedTool, setSelectedTool] = useState('cli')
  const [selectedFramework, setSelectedFramework] = useState('anchor')

  // Development Tools
  const tools = {
    cli: {
      name: 'Solana CLI',
      category: 'Core Tool',
      description: 'Official command-line tool for interacting with Solana clusters',
      icon: '💻',
      features: ['Wallet management', 'Program deployment', 'Account queries', 'Transaction signing'],
      usage: 'Essential for all Solana developers',
      installation: 'sh -c "$(curl -sSfL https://release.solana.com/stable/install)"'
    },
    anchor: {
      name: 'Anchor Framework',
      category: 'Framework',
      description: 'Rust framework that makes Solana development easier and safer',
      icon: '⚓',
      features: ['IDL generation', 'Client libraries', 'Testing utilities', 'Security checks'],
      usage: 'Most popular framework for smart contracts',
      installation: 'cargo install --git https://github.com/coral-xyz/anchor avm --locked'
    },
    web3js: {
      name: '@solana/web3.js',
      category: 'SDK',
      description: 'JavaScript SDK for building Solana dApps',
      icon: '🟨',
      features: ['Transaction building', 'RPC calls', 'Keypair management', 'Program interaction'],
      usage: 'Frontend and backend JavaScript/TypeScript development',
      installation: 'npm install @solana/web3.js'
    },
    walletAdapter: {
      name: 'Wallet Adapter',
      category: 'UI Library',
      description: 'React hooks and components for wallet integration',
      icon: '👛',
      features: ['Multi-wallet support', 'React hooks', 'UI components', 'Auto-connect'],
      usage: 'Connecting dApps to user wallets',
      installation: 'npm install @solana/wallet-adapter-react'
    },
    metaplex: {
      name: 'Metaplex SDK',
      category: 'NFT Tool',
      description: 'Complete toolkit for NFT operations on Solana',
      icon: '🎨',
      features: ['NFT minting', 'Metadata standards', 'Candy Machine', 'Auctions'],
      usage: 'Building NFT applications and marketplaces',
      installation: 'npm install @metaplex-foundation/js'
    },
    spl: {
      name: 'SPL Token CLI',
      category: 'Token Tool',
      description: 'Command-line tool for creating and managing SPL tokens',
      icon: '🪙',
      features: ['Create tokens', 'Mint/burn', 'Token accounts', 'Multisig'],
      usage: 'Token creation and management',
      installation: 'cargo install spl-token-cli'
    }
  }

  // Code Examples
  const codeExamples = {
    cli: {
      title: 'Solana CLI Basics',
      examples: [
        {
          name: 'Check Cluster',
          code: `# Check current cluster configuration
solana config get

# Set cluster to devnet
solana config set --url devnet

# Check your balance
solana balance`
        },
        {
          name: 'Create Wallet',
          code: `# Generate a new keypair
solana-keygen new --outfile ~/my-wallet.json

# Set as default wallet
solana config set --keypair ~/my-wallet.json

# Get public key
solana-keygen pubkey ~/my-wallet.json`
        },
        {
          name: 'Airdrop & Transfer',
          code: `# Request airdrop (devnet only)
solana airdrop 2

# Transfer SOL
solana transfer <RECIPIENT_ADDRESS> 0.5 --from ~/my-wallet.json

# Check transaction
solana confirm <SIGNATURE>`
        }
      ]
    },
    anchor: {
      title: 'Anchor Framework',
      examples: [
        {
          name: 'Initialize Project',
          code: `# Create new Anchor project
anchor init my_program

# Build the program
anchor build

# Run tests
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet`
        },
        {
          name: 'Program Structure',
          code: `use anchor_lang::prelude::*;

declare_id!("Your Program ID");

#[program]
pub mod my_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.my_account;
        account.data = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MyAccount {
    pub data: u64,
}`
        },
        {
          name: 'Client Code',
          code: `import * as anchor from "@coral-xyz/anchor";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.MyProgram;

// Call initialize instruction
await program.methods
  .initialize()
  .accounts({
    myAccount: myAccountKeypair.publicKey,
    user: provider.wallet.publicKey,
    systemProgram: anchor.web3.SystemProgram.programId,
  })
  .signers([myAccountKeypair])
  .rpc();`
        }
      ]
    },
    web3js: {
      title: '@solana/web3.js SDK',
      examples: [
        {
          name: 'Connect & Get Balance',
          code: `import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Connect to devnet
const connection = new Connection('https://api.devnet.solana.com');

// Get balance
const publicKey = new PublicKey('Your Public Key');
const balance = await connection.getBalance(publicKey);
console.log(\`Balance: \${balance / LAMPORTS_PER_SOL} SOL\`);`
        },
        {
          name: 'Send Transaction',
          code: `import {
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair
} from '@solana/web3.js';

// Create transaction
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: 0.5 * LAMPORTS_PER_SOL,
  })
);

// Sign and send
const signature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [sender] // signers
);
console.log('Transaction signature:', signature);`
        },
        {
          name: 'Call Program',
          code: `import { TransactionInstruction } from '@solana/web3.js';

// Create instruction
const instruction = new TransactionInstruction({
  keys: [
    { pubkey: accountPubkey, isSigner: false, isWritable: true },
    { pubkey: userPubkey, isSigner: true, isWritable: false },
  ],
  programId: programId,
  data: Buffer.from([0, 1, 2, 3]), // instruction data
});

// Add to transaction and send
const transaction = new Transaction().add(instruction);
await sendAndConfirmTransaction(connection, transaction, [user]);`
        }
      ]
    },
    walletAdapter: {
      title: 'Wallet Adapter',
      examples: [
        {
          name: 'Setup Provider',
          code: `import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = 'https://api.devnet.solana.com';
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Your app */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}`
        },
        {
          name: 'Use Wallet',
          code: `import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function MyComponent() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleTransaction = async () => {
    if (!publicKey) return;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipient,
        lamports: 0.1 * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    console.log('Sent:', signature);
  };

  return <WalletMultiButton />;
}`
        }
      ]
    }
  }

  // Testing & Deployment
  const testingTools = [
    {
      name: 'Solana Test Validator',
      description: 'Local blockchain for testing',
      icon: '🧪',
      usage: 'solana-test-validator',
      features: ['Fast local testing', 'Instant finality', 'No rate limits', 'Account loading']
    },
    {
      name: 'Bankrun',
      description: 'Fast, lightweight test environment',
      icon: '🏃',
      usage: 'npm install solana-bankrun',
      features: ['100x faster tests', 'No network calls', 'Instant execution', 'Easy mocking']
    },
    {
      name: 'Solana Program Test',
      description: 'Native Rust testing framework',
      icon: '🦀',
      usage: 'use solana_program_test::*;',
      features: ['Rust integration', 'Unit testing', 'BPF testing', 'State verification']
    }
  ]

  // Explorers & Monitoring
  const explorers = [
    {
      name: 'Solana Explorer',
      url: 'explorer.solana.com',
      description: 'Official blockchain explorer',
      icon: '🔍',
      features: ['Transaction lookup', 'Account inspection', 'Program verification', 'Token info']
    },
    {
      name: 'Solscan',
      url: 'solscan.io',
      description: 'Advanced analytics and explorer',
      icon: '📊',
      features: ['Portfolio tracking', 'Token analytics', 'NFT gallery', 'API access']
    },
    {
      name: 'Solana Beach',
      url: 'solanabeach.io',
      description: 'Network statistics and validator info',
      icon: '🏖️',
      features: ['Validator stats', 'Epoch info', 'Network health', 'Historical data']
    },
    {
      name: 'Step Finance',
      url: 'step.finance',
      description: 'Portfolio manager and analytics',
      icon: '📈',
      features: ['Multi-wallet view', 'DeFi positions', 'P&L tracking', 'Transaction history']
    }
  ]

  // RPC Providers
  const rpcProviders = [
    {
      name: 'Quicknode',
      tier: 'Premium',
      features: ['99.9% uptime', 'Global nodes', 'Dedicated endpoints', 'Analytics'],
      pricing: 'From $9/month',
      icon: '⚡'
    },
    {
      name: 'Helius',
      tier: 'Premium',
      features: ['Geyser support', 'Webhook alerts', 'High throughput', 'Enhanced APIs'],
      pricing: 'From $19/month',
      icon: '☀️'
    },
    {
      name: 'Triton',
      tier: 'Premium',
      features: ['Geyser streaming', 'Historical data', 'Archive nodes', 'Low latency'],
      pricing: 'From $49/month',
      icon: '🔱'
    },
    {
      name: 'Public RPC',
      tier: 'Free',
      features: ['Rate limited', 'Shared infrastructure', 'Basic features', 'Community support'],
      pricing: 'Free',
      icon: '🌐'
    }
  ]

  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={9}
      stageTitle="Development Tools"
      stageDescription="Explore the essential tools, frameworks, and SDKs for building on Solana"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="25 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🛠️ Solana Development Tools</h2>
        <p className="text-gray-300 mb-4">
          Solana has a rich ecosystem of development tools, frameworks, and libraries that make building
          decentralized applications faster and more secure. From CLI tools to full-featured frameworks,
          there's a tool for every stage of development.
        </p>
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
          <h3 className="font-bold text-white mb-2">🎯 What You'll Learn</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Core development tools (CLI, Anchor, Web3.js)</li>
            <li>• Testing frameworks and local validators</li>
            <li>• Wallet integration with Wallet Adapter</li>
            <li>• Explorers, RPC providers, and monitoring tools</li>
            <li>• Code examples and best practices</li>
          </ul>
        </div>
      </Card>

      {/* Core Tools */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔧 Core Development Tools</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(tools).map(([key, tool]) => (
            <button
              key={key}
              onClick={() => setSelectedTool(key)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedTool === key
                  ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50'
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{tool.icon}</span>
                  <div>
                    <h4 className="font-bold text-white">{tool.name}</h4>
                    <Badge variant="outline" className="text-xs mt-1">{tool.category}</Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3">{tool.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {tool.features.map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="text-xs font-mono bg-black/30 rounded p-2 text-green-400 overflow-x-auto">
                {tool.installation}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Code Examples */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💻 Code Examples</h3>

        <Tabs value={selectedTool} onValueChange={setSelectedTool} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="anchor">Anchor</TabsTrigger>
            <TabsTrigger value="web3js">Web3.js</TabsTrigger>
            <TabsTrigger value="walletAdapter">Wallet</TabsTrigger>
          </TabsList>

          {Object.entries(codeExamples).map(([key, section]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <h4 className="text-lg font-bold text-white mb-4">{section.title}</h4>
              {section.examples.map((example, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-800/80 px-4 py-2 border-b border-gray-700">
                    <h5 className="font-semibold text-white text-sm">{example.name}</h5>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="text-gray-300 font-mono">{example.code}</code>
                  </pre>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Testing & Deployment */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🧪 Testing & Development Environment</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {testingTools.map((tool, idx) => (
            <div key={idx} className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="text-3xl mb-2">{tool.icon}</div>
              <h4 className="font-bold text-white mb-2">{tool.name}</h4>
              <p className="text-sm text-gray-400 mb-3">{tool.description}</p>
              <div className="text-xs font-mono bg-black/30 rounded p-2 text-green-400 mb-3">
                {tool.usage}
              </div>
              <div className="space-y-1">
                {tool.features.map((feature, fidx) => (
                  <div key={fidx} className="text-xs text-gray-300">
                    • {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="font-bold text-yellow-400 mb-2">💡 Development Workflow</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-purple-400">1.</span>
              <span><strong>Local Development:</strong> Use solana-test-validator for rapid testing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">2.</span>
              <span><strong>Devnet Testing:</strong> Deploy to devnet for integration testing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">3.</span>
              <span><strong>Mainnet Beta:</strong> Deploy to production after thorough testing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">4.</span>
              <span><strong>Monitoring:</strong> Use explorers and RPC providers to monitor performance</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Explorers & Monitoring */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🔍 Explorers & Monitoring</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {explorers.map((explorer, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{explorer.icon}</span>
                  <div>
                    <h4 className="font-bold text-white">{explorer.name}</h4>
                    <a
                      href={`https://${explorer.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline"
                    >
                      {explorer.url}
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3">{explorer.description}</p>
              <div className="flex flex-wrap gap-2">
                {explorer.features.map((feature, fidx) => (
                  <Badge key={fidx} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* RPC Providers */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🌐 RPC Providers</h3>
        <p className="text-sm text-gray-400 mb-4">
          RPC (Remote Procedure Call) providers give your application access to the Solana blockchain.
          Choose between free public endpoints or premium providers for production applications.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {rpcProviders.map((provider, idx) => (
            <div key={idx} className={`rounded-lg border p-4 ${
              provider.tier === 'Premium'
                ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30'
                : 'bg-gradient-to-br from-gray-500/10 to-gray-600/10 border-gray-500/30'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <h4 className="font-bold text-white">{provider.name}</h4>
                    <Badge className={
                      provider.tier === 'Premium'
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }>
                      {provider.tier}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">{provider.pricing}</div>
                </div>
              </div>
              <div className="space-y-1 mt-3">
                {provider.features.map((feature, fidx) => (
                  <div key={fidx} className="text-xs text-gray-300">
                    • {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-bold text-blue-400 mb-2">🎯 Choosing an RPC Provider</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• <strong>Development:</strong> Public RPC or solana-test-validator</li>
            <li>• <strong>Testing:</strong> Devnet public RPC is sufficient</li>
            <li>• <strong>Production:</strong> Premium provider for reliability and performance</li>
            <li>• <strong>High Volume:</strong> Dedicated endpoints with higher rate limits</li>
          </ul>
        </div>
      </Card>

      {/* Additional Tools */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎨 Specialized Tools</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-bold text-white mb-2">Metaplex</h4>
            <p className="text-sm text-gray-400 mb-3">Complete NFT infrastructure</p>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• Token Metadata Standard</li>
              <li>• Candy Machine v3</li>
              <li>• Auction House</li>
              <li>• Compressed NFTs</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">🪙</div>
            <h4 className="font-bold text-white mb-2">SPL Token</h4>
            <p className="text-sm text-gray-400 mb-3">Token program toolkit</p>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• Token creation</li>
              <li>• Mint authorities</li>
              <li>• Token-2022 extensions</li>
              <li>• Associated token accounts</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl mb-2">🔐</div>
            <h4 className="font-bold text-white mb-2">Squads</h4>
            <p className="text-sm text-gray-400 mb-3">Multisig wallet & program management</p>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• Multi-signature wallets</li>
              <li>• Program upgrades</li>
              <li>• Treasury management</li>
              <li>• On-chain governance</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Development Best Practices */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">✅ Development Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
              <h4 className="font-semibold text-green-400 mb-1">Security</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Use Anchor's built-in security checks</li>
                <li>• Validate all account inputs</li>
                <li>• Use PDAs for program-controlled accounts</li>
                <li>• Audit before mainnet deployment</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
              <h4 className="font-semibold text-blue-400 mb-1">Performance</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Minimize compute units usage</li>
                <li>• Batch transactions when possible</li>
                <li>• Use versioned transactions (v0)</li>
                <li>• Optimize account sizes</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
              <h4 className="font-semibold text-purple-400 mb-1">Testing</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Write comprehensive unit tests</li>
                <li>• Test on local validator first</li>
                <li>• Integration test on devnet</li>
                <li>• Load test before mainnet</li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
              <h4 className="font-semibold text-yellow-400 mb-1">Monitoring</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Monitor transaction success rates</li>
                <li>• Track compute unit usage</li>
                <li>• Set up error alerting</li>
                <li>• Use analytics dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Getting Started */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🚀 Quick Start Guide</h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">1. Install Prerequisites</h4>
            <pre className="text-sm font-mono bg-black/30 rounded p-3 text-green-400 overflow-x-auto">
{`# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor avm --locked
avm install latest
avm use latest`}
            </pre>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">2. Create Your First Program</h4>
            <pre className="text-sm font-mono bg-black/30 rounded p-3 text-green-400 overflow-x-auto">
{`# Initialize new project
anchor init my_first_program
cd my_first_program

# Build the program
anchor build

# Run tests
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet`}
            </pre>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">3. Build a Frontend</h4>
            <pre className="text-sm font-mono bg-black/30 rounded p-3 text-green-400 overflow-x-auto">
{`# Create React app
npx create-react-app my-dapp
cd my-dapp

# Install dependencies
npm install @solana/web3.js @solana/wallet-adapter-react \\
  @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets

# Start development
npm start`}
            </pre>
          </div>
        </div>
      </Card>

      {/* Key Learnings */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Anchor framework:</strong> The go-to framework for Solana development with built-in security and tooling</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Solana CLI:</strong> Essential command-line tool for wallet management, deployments, and blockchain interaction</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Web3.js SDK:</strong> JavaScript library for building dApp frontends and backends</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Wallet Adapter:</strong> Standard way to integrate multiple wallets in React applications</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Local testing:</strong> solana-test-validator provides instant, free testing environment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>RPC providers:</strong> Premium providers offer better reliability and performance for production</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Specialized tools:</strong> Metaplex for NFTs, SPL for tokens, Squads for multisig</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
