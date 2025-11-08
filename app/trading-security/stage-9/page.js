'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'

export default function Stage9() {
  const [selectedScam, setSelectedScam] = useState('phishing')

  const scamTypes = {
    phishing: {
      name: 'Phishing Attacks',
      icon: '🎣',
      danger: 'EXTREME',
      description: 'Fake websites, emails, or messages designed to steal your credentials',
      examples: [
        'Email claiming your account needs "urgent verification"',
        'Fake exchange website with similar URL (blnance.com vs binance.com)',
        'DM offering "support" and asking for seed phrase',
        'Fake wallet extension in browser store',
        'QR code redirecting to fake website'
      ],
      redFlags: [
        'Urgent language ("act now or lose access")',
        'Slight misspellings in URL or email',
        'Asking for seed phrase or private keys',
        'Too-good-to-be-true offers',
        'Unsolicited contact from "support"'
      ],
      protection: [
        'ALWAYS manually type URLs, never click links',
        'Verify anti-phishing codes in emails',
        'Bookmark legitimate websites',
        'Double-check URLs before entering credentials',
        'Never share seed phrase with ANYONE'
      ],
      color: 'red'
    },
    rugPull: {
      name: 'Rug Pulls',
      icon: '🏃',
      danger: 'EXTREME',
      description: 'Developers drain all liquidity from a project, leaving investors with worthless tokens',
      examples: [
        'Squid Game Token - $3.3M stolen, trading disabled',
        'Meerkat Finance - $31M drained hours after launch',
        'AnubisDAO - $60M stolen on day one',
        'Thodex - CEO fled with $2B in user funds',
        'SaveTheKids - influencer pump & dump scam'
      ],
      redFlags: [
        'Anonymous team or fake team profiles',
        'No locked liquidity or vesting schedules',
        'Excessive token allocation to team',
        'Unaudited smart contracts',
        'Unrealistic promises (100x guaranteed)'
      ],
      protection: [
        'Research team identity and history',
        'Check if liquidity is locked (RugDoc, TokenSniffer)',
        'Verify smart contract is audited',
        'Look for ownership renouncement',
        'Start with small amounts in new projects'
      ],
      color: 'red'
    },
    fakeTokens: {
      name: 'Fake Tokens & Impersonators',
      icon: '🎭',
      danger: 'HIGH',
      description: 'Scam tokens pretending to be legitimate projects',
      examples: [
        'Fake USDT/USDC tokens on wrong chains',
        'Copycat tokens with similar names',
        'Fake celebrity/company tokens',
        'Duplicate token symbols',
        'Honeypot tokens (can buy but not sell)'
      ],
      redFlags: [
        'Token address doesn\'t match official website',
        'Low holder count or fake volume',
        'No verified social media presence',
        'Can\'t sell after buying (honeypot)',
        'Too many decimal places or weird total supply'
      ],
      protection: [
        'ALWAYS verify token contract address',
        'Check official project website/Twitter',
        'Use verified listings (CoinMarketCap, CoinGecko)',
        'Test with small amount before large purchase',
        'Verify contract on block explorer'
      ],
      color: 'orange'
    },
    pumpDump: {
      name: 'Pump and Dump Schemes',
      icon: '📈',
      danger: 'HIGH',
      description: 'Coordinated price manipulation where early buyers dump on latecomers',
      examples: [
        'Telegram pump groups charging for "signals"',
        'Influencer-coordinated pumps',
        'Low-cap coin manipulation',
        'Fake news to create hype',
        'Bot-driven volume spikes'
      ],
      redFlags: [
        'Sudden unexplained price spike',
        'Heavy promotion in social media/Telegram',
        '"Buy now before it moons" pressure',
        'Unknown coin suddenly trending',
        'Promises of guaranteed profits'
      ],
      protection: [
        'Avoid "pump signal" groups',
        'Don\'t FOMO into sudden price spikes',
        'Research before buying hyped coins',
        'Be suspicious of coordinated shilling',
        'If it sounds too good to be true, it is'
      ],
      color: 'orange'
    },
    fakeAirdrops: {
      name: 'Fake Airdrops & Giveaways',
      icon: '🎁',
      danger: 'HIGH',
      description: 'Scams disguised as free token distributions',
      examples: [
        '"Send 1 ETH, get 10 ETH back"',
        'Fake celebrity giveaways on Twitter/YouTube',
        'Airdrop requiring wallet connection to malicious site',
        'QR code "airdrop" draining wallets',
        'Fake token claiming to be from real project'
      ],
      redFlags: [
        'Asking you to send crypto first',
        'Requires connecting wallet to claim',
        'Impersonating celebrities/exchanges',
        'Urgent time pressure',
        'Too generous to be real'
      ],
      protection: [
        'NEVER send crypto to "get more back"',
        'Legitimate airdrops don\'t ask for seed phrases',
        'Verify giveaways on official channels',
        'Be wary of wallet connection requests',
        'If you didn\'t enter, you didn\'t win'
      ],
      color: 'yellow'
    },
    impersonation: {
      name: 'Impersonation Scams',
      icon: '👥',
      danger: 'HIGH',
      description: 'Scammers pretending to be support staff, influencers, or team members',
      examples: [
        'Fake customer support DMs on Discord/Telegram',
        'Verified-looking Twitter accounts (subtle differences)',
        'Fake tech support calls',
        'Impersonating exchange staff',
        'Cloned Telegram/Discord channels'
      ],
      redFlags: [
        'Unsolicited DMs offering help',
        'Asking for seed phrase or private keys',
        'Slight username variations',
        'Pressuring for quick action',
        'Offering to "validate" or "sync" wallet'
      ],
      protection: [
        'Never respond to unsolicited DMs',
        'Verify accounts have official badges',
        'Real support never DMs you first',
        'Check username exactly matches official',
        'Report and block impersonators'
      ],
      color: 'yellow'
    },
    ponzi: {
      name: 'Ponzi Schemes & Fake DeFi',
      icon: '💸',
      danger: 'EXTREME',
      description: 'Unsustainable systems paying old investors with new investor money',
      examples: [
        'Bitconnect - $2.5B Ponzi collapse',
        'OneCoin - $4B+ Ponzi scheme',
        'Fake staking platforms with "guaranteed" returns',
        'Cloud mining scams',
        'Multi-level marketing crypto schemes'
      ],
      redFlags: [
        'Guaranteed high returns (20%+ monthly)',
        'Referral/recruitment bonuses',
        'Complex or secretive "strategy"',
        'Difficulty withdrawing funds',
        'No clear source of profits'
      ],
      protection: [
        'If it guarantees returns, it\'s a scam',
        'Sustainable DeFi yields are <20% APY',
        'Research platform thoroughly',
        'Check for audits and TVL history',
        'Start small and test withdrawals'
      ],
      color: 'red'
    },
    malware: {
      name: 'Malware & Clipboard Hijacking',
      icon: '🦠',
      danger: 'EXTREME',
      description: 'Malicious software designed to steal crypto',
      examples: [
        'Fake wallet apps stealing seed phrases',
        'Clipboard hijackers changing wallet addresses',
        'PDF/Excel files with embedded malware',
        'Trojanized trading bots',
        'Browser extensions stealing credentials'
      ],
      redFlags: [
        'Unofficial app stores or websites',
        'Excessive permissions requested',
        'Address changes when pasting',
        'Unexpected pop-ups or behavior',
        'Free "premium" software'
      ],
      protection: [
        'Download only from official sources',
        'Verify address after pasting ALWAYS',
        'Use hardware wallet for large amounts',
        'Keep antivirus updated',
        'Don\'t download suspicious files'
      ],
      color: 'red'
    }
  }

  const selectedScamData = scamTypes[selectedScam]

  const getDangerColor = (danger) => {
    if (danger === 'EXTREME') return 'bg-red-500'
    if (danger === 'HIGH') return 'bg-orange-500'
    return 'bg-yellow-500'
  }

  return (
    <StageLayout
      stage={9}
      track="trading-security"
      title="Common Scams & Red Flags"
      description="Learn to identify and avoid the most common crypto scams"
      estimatedTime="30 min"
    >
      {/* Introduction */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          🚨 Crypto Scams: Know Your Enemy
        </h2>
        <p className="text-gray-300 mb-4">
          Billions of dollars are stolen through crypto scams every year. The irreversible nature of blockchain
          makes crypto a target-rich environment for scammers. Learn to recognize these scams BEFORE you become
          a victim.
        </p>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            <strong>⚠️ Critical Rule:</strong> In crypto, you can't rely on banks, governments, or customer
            service to save you. Once scammed, your crypto is gone forever. Prevention is your ONLY defense.
            When in doubt, don't send, don't connect, don't share. Better safe than sorry.
          </p>
        </div>
      </Card>

      {/* Scam Type Selector */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Major Scam Types
        </h3>
        <p className="text-gray-300 mb-6">
          Click on each scam type to learn how it works, real examples, red flags to watch for, and how to
          protect yourself.
        </p>

        {/* Scam Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(scamTypes).map(([key, scam]) => (
            <button
              key={key}
              onClick={() => setSelectedScam(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedScam === key
                  ? `border-${scam.color}-500 bg-${scam.color}-500/20`
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <div className="text-3xl mb-2">{scam.icon}</div>
              <div className="font-semibold text-xs text-center leading-tight">{scam.name}</div>
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    scam.danger === 'EXTREME' ? 'border-red-500 text-red-400' :
                    scam.danger === 'HIGH' ? 'border-orange-500 text-orange-400' :
                    'border-yellow-500 text-yellow-400'
                  }`}
                >
                  {scam.danger}
                </Badge>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Scam Details */}
        <div className={`bg-gradient-to-br from-${selectedScamData.color}-500/10 to-${selectedScamData.color}-500/5 border border-${selectedScamData.color}-500/20 rounded-lg p-6`}>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">{selectedScamData.icon}</span>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-white mb-2">{selectedScamData.name}</h4>
              <p className="text-gray-300 text-sm">{selectedScamData.description}</p>
            </div>
            <Badge
              variant="outline"
              className={`text-lg px-4 py-2 ${
                selectedScamData.danger === 'EXTREME' ? 'border-red-500 text-red-400' :
                selectedScamData.danger === 'HIGH' ? 'border-orange-500 text-orange-400' :
                'border-yellow-500 text-yellow-400'
              }`}
            >
              {selectedScamData.danger}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Real Examples */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h5 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <span>⚠️</span> Real Examples
              </h5>
              <ul className="space-y-2">
                {selectedScamData.examples.map((example, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                <span>🚩</span> Red Flags
              </h5>
              <ul className="space-y-2">
                {selectedScamData.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Protection Steps */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-5">
            <h5 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <span>🛡️</span> How to Protect Yourself
            </h5>
            <ul className="space-y-2">
              {selectedScamData.protection.map((step, idx) => (
                <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-green-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Universal Red Flags */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🚩</span>
          Universal Red Flags (Works for ALL Scams)
        </h3>
        <p className="text-gray-300 mb-6">
          These warning signs apply across all scam types. If you see even ONE of these, proceed with extreme
          caution or walk away entirely.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
              <span>🚨</span> Too Good To Be True
            </h4>
            <p className="text-sm text-gray-300">
              Guaranteed returns, risk-free profits, "100x guaranteed", or anything that sounds impossibly good.
              If it sounds too good to be true, it absolutely is. No exceptions.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
              <span>⏰</span> Artificial Urgency
            </h4>
            <p className="text-sm text-gray-300">
              "Limited time", "act now or lose out", countdown timers, or pressure to decide immediately.
              Scammers use urgency to prevent you from thinking clearly. Legitimate opportunities wait.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <span>👤</span> Anonymous Team
            </h4>
            <p className="text-sm text-gray-300">
              No identifiable team members, fake LinkedIn profiles, stock photos, or complete anonymity for
              projects asking for money. Real teams stake their reputation.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
              <span>🔑</span> Asking for Seed Phrase/Keys
            </h4>
            <p className="text-sm text-gray-300">
              ANY request for seed phrase, private keys, or to "validate/sync" your wallet is 100% a scam.
              There is ZERO legitimate reason anyone would ever need these. No exceptions. Ever.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <span>📱</span> Unsolicited Contact
            </h4>
            <p className="text-sm text-gray-300">
              Random DMs offering help, investment opportunities, or claiming you won something. Real support
              never initiates contact. Real prizes don't require payment to claim.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
              <span>💰</span> Send Money to Get Money
            </h4>
            <p className="text-sm text-gray-300">
              "Send 1 ETH to get 10 ETH", "pay fee to unlock funds", or any scheme requiring you to send crypto
              first to receive more. Classic scam, always a scam, forever a scam.
            </p>
          </div>
        </div>
      </Card>

      {/* If You Get Scammed */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🆘</span>
          What To Do If You Get Scammed
        </h3>
        <p className="text-gray-300 mb-6">
          First, accept the hard truth: in most cases, your crypto is gone forever. But here's what you should
          do immediately to prevent further damage:
        </p>

        <div className="space-y-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <span>1️⃣</span> Stop All Activity Immediately
            </h4>
            <p className="text-sm text-gray-300 mb-2">
              Don't send more crypto, don't click more links, don't engage with the scammer further. Cut off
              all contact immediately. Many scammers will try "recovery scams" after the initial scam.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <span>2️⃣</span> Secure Your Remaining Assets
            </h4>
            <p className="text-sm text-gray-300 mb-2">
              If you shared credentials or connected wallet: Create NEW wallets with NEW seed phrases. Transfer
              remaining assets there immediately. Change passwords on all exchange accounts. Enable/reset 2FA.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <span>3️⃣</span> Report the Scam
            </h4>
            <p className="text-sm text-gray-300 mb-2">
              Report to: FBI IC3 (ic3.gov), FTC (reportfraud.ftc.gov), local police, the platform where it
              happened, and crypto scam databases. Won't get money back, but helps others.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <span>4️⃣</span> Learn and Move On
            </h4>
            <p className="text-sm text-gray-300 mb-2">
              Analyze what happened and why you fell for it. Don't beat yourself up - scammers are professionals.
              Use it as expensive education. Share your story to help others avoid the same fate.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="font-semibold text-red-400 mb-2">⚠️ Beware Recovery Scams!</h5>
            <p className="text-sm text-gray-300">
              After getting scammed, you may be contacted by "recovery services" promising to get your crypto
              back for a fee. This is ALWAYS another scam. Real recovery is nearly impossible. Don't get
              scammed twice.
            </p>
          </div>
        </div>
      </Card>

      {/* Golden Rules */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">👑</span>
          10 Commandments of Scam Prevention
        </h3>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            'NEVER share your seed phrase with anyone, ever',
            'If it\'s too good to be true, it\'s a scam',
            'Real support never DMs you first',
            'Verify everything before sending crypto',
            'No one legitimate will ask for your private keys',
            'Take time to research - urgency is a red flag',
            'Double-check URLs and contract addresses',
            'Start small when trying new platforms',
            'If unsure, DON\'T do it',
            'Your paranoia will save your money'
          ].map((rule, idx) => (
            <div key={idx} className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-purple-400">{idx + 1}</span>
                <p className="text-sm text-gray-300 flex-1">{rule}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Takeaways */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Key Takeaways
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-2">Trust No One</h4>
            <p className="text-sm text-gray-300">
              In crypto, trust is your enemy. Verify everything yourself. Don't trust DMs, emails, social
              media posts, or even verified accounts. Always go directly to official sources.
            </p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-2">Slow Down</h4>
            <p className="text-sm text-gray-300">
              Scammers use urgency to bypass your logic. Take your time. Sleep on it. Research. Ask others.
              Legitimate opportunities will still be there tomorrow. Scams need you to act NOW.
            </p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2">Verify Contract Addresses</h4>
            <p className="text-sm text-gray-300">
              Before buying any token, verify the contract address matches the official website. Fake tokens
              are everywhere. One wrong address = total loss. Check, double-check, triple-check.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Seed Phrase = Sacred</h4>
            <p className="text-sm text-gray-300">
              Your seed phrase is the keys to your crypto kingdom. NEVER type it into websites, share it in
              DMs, or tell it to anyone. Not support, not developers, not God himself. Never.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-red-400">Final Warning:</strong> Scammers are getting more sophisticated
            every day. AI-generated voices, deepfakes, professional websites - the old "obvious scam" signs
            are disappearing. Your only defense is paranoia, verification, and the willingness to walk away
            from anything suspicious. Better to miss a real opportunity than to fall for a scam.
          </p>
        </div>
      </Card>
    </StageLayout>
  )
}
