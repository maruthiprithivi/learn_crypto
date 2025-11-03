# 🎓 CryptoLearn - Interactive Crypto Education Platform

An interactive, hands-on platform for learning cryptocurrency fundamentals through real blockchain interactions and simulations.

## 🌟 Features

### **Four Learning Tracks:**

1. **🟠 Bitcoin Track** (10 Stages)
   - Blockchain fundamentals with interactive visualization
   - Real wallet generation using bitcoinjs-lib
   - UTXO model and transaction building
   - Lightning Network concepts
   - Security best practices

2. **🔷 Ethereum Track** (12 Stages)
   - Smart contracts introduction
   - ERC-20 token creation
   - NFTs and token standards
   - DeFi basics
   - Gas optimization

3. **🟣 Solana Track** (10 Stages)
   - High-speed blockchain concepts
   - SPL token standard
   - Solana programs
   - Token extensions
   - Performance demonstrations

4. **🛡️ Trading & Security Track** (12 Stages)
   - Trading fundamentals
   - Whale watching and tracking
   - Rug pull detection
   - Smart contract audits
   - Staking safety
   - Risk management
   - On-chain analysis

### **Key Capabilities:**

- ✅ **Simulated Learning Environment** - Practice safely with testnet
- ✅ **Real Blockchain Analysis** - Analyze actual addresses, contracts, and transactions
- ✅ **Interactive Visualizations** - See how blockchain works in real-time
- ✅ **Code Transparency** - View underlying code for each concept
- ✅ **Progress Tracking** - Save your learning journey
- ✅ **Achievement System** - Earn badges as you learn
- ✅ **Comprehensive Disclaimers** - Clear educational boundaries

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Access the Platform

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (no TypeScript)
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand with persistence
- **Blockchain Libraries:**
  - `bitcoinjs-lib` - Bitcoin operations
  - `ethers.js` - Ethereum interactions
  - `@solana/web3.js` - Solana integration
- **HTTP Client:** Axios
- **Free APIs:**
  - blockchain.info - Bitcoin data
  - mempool.space - Bitcoin fees
  - Etherscan API - Ethereum data
  - Solana Public RPC - Solana data
  - CoinGecko - Price tracking

## 📂 Project Structure

```
learn_crypto/
├── app/                          # Next.js app router pages
│   ├── bitcoin/                  # Bitcoin track stages
│   ├── ethereum/                 # Ethereum track stages
│   ├── solana/                   # Solana track stages
│   ├── trading-security/         # Trading & security track
│   ├── legal/                    # Legal pages (disclaimer, terms)
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Landing page
│   └── globals.css               # Global styles
├── components/
│   ├── common/                   # Reusable components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Modal.js
│   │   ├── DisclaimerModal.js
│   │   └── StageLayout.js
│   ├── interactive/              # Interactive learning components
│   ├── tracks/                   # Track-specific components
│   └── visualizations/           # Charts and animations
├── lib/
│   ├── api/                      # Blockchain API integrations
│   ├── simulators/               # Wallet and transaction simulators
│   ├── risk-scoring/             # Rug pull detection, analysis tools
│   ├── utils/                    # Utility functions
│   └── store.js                  # Zustand state management
├── public/                       # Static assets
└── next.config.js                # Next.js configuration
```

## 🎯 Learning Philosophy

### **Hybrid Approach: Simulation + Real Data**

1. **Learning Stages** - Safe simulated environments for practicing concepts
2. **Analysis Tools** - Real blockchain data for hands-on experience
3. **Progressive Disclosure** - Start simple, add complexity gradually

### **Safety First**

- All wallet generation uses testnet by default
- Comprehensive disclaimers throughout
- Clear warnings before real data analysis
- Educational purpose emphasized everywhere

## 🔒 Legal & Safety

This platform is for **educational purposes only**:

- ❌ Not financial advice
- ❌ Not investment recommendations
- ✅ Learn concepts safely
- ✅ Practice with simulated environments
- ✅ Analyze real data for learning

See `/legal/disclaimer` for full legal information.

## 🎨 Design Principles

- **Dark Theme** - Modern crypto aesthetic
- **Interactive First** - Learn by doing, not reading
- **Visual Feedback** - Animations and real-time updates
- **Mobile Responsive** - Works on all devices
- **Accessible** - WCAG compliant

## 🌐 Real Blockchain API Integration

All APIs are **100% FREE** with no API keys required!

### **Bitcoin APIs**
- **blockchain.info** - Address lookups, transaction history
- **mempool.space** - Real-time fee recommendations
- Analyze any Bitcoin address (e.g., Satoshi's genesis address)
- View real transaction details with inputs/outputs
- Live mempool statistics

### **Ethereum APIs**
- **Etherscan** - Address balances and transaction history
- Analyze any Ethereum address (e.g., Vitalik.eth)
- Check ERC-20 token contracts
- Live gas price tracking (low/average/high)
- Token information (name, symbol, supply)

### **Solana APIs**
- **Public RPC** - Direct blockchain access
- Check SOL balances and transaction signatures
- SPL token information
- Transaction details with fees and status

### **Price Tracking**
- **CoinGecko** - Live prices for BTC, ETH, SOL
- Updates every 60 seconds
- 24-hour price changes
- Beautiful price widget on landing page

### **Interactive Explorers**
- BitcoinExplorer component - Search addresses/transactions
- EthereumExplorer component - Analyze addresses/tokens
- Real-time data fetching with loading states
- Error handling and example addresses

## 📊 Current Progress

### ✅ Completed
- Project setup and configuration
- Landing page with track selection and live prices
- Disclaimer system
- State management with Zustand
- Common component library (Button, Card, Modal, Toast, LoadingSpinner)
- Real blockchain API integrations (Bitcoin, Ethereum, Solana)
- Bitcoin Track foundation
- Stage 1: Blockchain Basics (Interactive blockchain visualization)
- Stage 2: Wallet Generator (Real cryptographic key generation)

### 🚧 In Progress
- Bitcoin Track stages 3-10
- Ethereum Track (12 stages)
- Solana Track (10 stages)
- Trading & Security Track (12 stages)
- Real blockchain API integrations
- Achievement system

## 🤝 Contributing

This is an educational platform. Contributions welcome for:
- New learning stages
- Improved visualizations
- Better explanations
- Bug fixes
- Translation support

## ⚠️ Disclaimer

**EDUCATIONAL PLATFORM ONLY**

This platform provides educational content about cryptocurrency. It is NOT:
- Financial advice
- Investment recommendations
- Professional guidance

All investment decisions are your responsibility. Cryptocurrency is highly risky. Never invest more than you can afford to lose.

## 📝 License

ISC License - See LICENSE file for details

## 🔗 Resources

- [Bitcoin Developer Documentation](https://developer.bitcoin.org/)
- [Ethereum Documentation](https://ethereum.org/developers)
- [Solana Documentation](https://docs.solana.com/)
- [CoinGecko API](https://www.coingecko.com/api/documentation)

---

**Built with ❤️ for crypto education**

Learn responsibly. Trade safely. Stay secure. 🛡️
