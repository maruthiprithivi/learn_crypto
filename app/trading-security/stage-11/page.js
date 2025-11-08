'use client'

import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'

export default function Stage11() {
  const taxEvents = [
    { event: 'Selling crypto for fiat', taxable: 'YES', type: 'Capital Gains', notes: 'Taxed on profit/loss vs purchase price' },
    { event: 'Trading crypto for crypto', taxable: 'YES', type: 'Capital Gains', notes: 'Each swap creates taxable event' },
    { event: 'Staking/mining rewards', taxable: 'YES', type: 'Income', notes: 'Taxed at fair market value when received' },
    { event: 'Interest/lending income', taxable: 'YES', type: 'Income', notes: 'Taxed as ordinary income' },
    { event: 'Airdrops & forks', taxable: 'YES*', type: 'Income', notes: 'If you have control/access' },
    { event: 'Buying crypto with fiat', taxable: 'NO', type: '-', notes: 'Not taxable until sold' },
    { event: 'Transferring between wallets', taxable: 'NO', type: '-', notes: 'No tax if you control both wallets' },
    { event: 'Holding (not selling)', taxable: 'NO', type: '-', notes: 'Unrealized gains not taxed' },
    { event: 'Gifting crypto (<$18k)', taxable: 'NO*', type: '-', notes: 'Recipient inherits cost basis' },
    { event: 'Donating to charity', taxable: 'DEDUCT', type: 'Deduction', notes: 'May get tax deduction' }
  ]

  const recordKeepingItems = [
    { category: 'Transaction Records', items: ['Date and time of each transaction', 'Amount of crypto bought/sold', 'Value in USD at time of transaction', 'Transaction fees paid', 'Exchange or platform used'] },
    { category: 'Wallet Information', items: ['All wallet addresses you control', 'Purpose of each wallet', 'Transfer records between wallets', 'Screenshots of holdings'] },
    { category: 'Income Sources', items: ['Staking rewards with dates and values', 'Mining income records', 'Airdrop receipts', 'Interest/lending income', 'Referral bonuses'] },
    { category: 'Cost Basis', items: ['Purchase price for each crypto', 'Date acquired', 'Fees paid on acquisition', 'Adjustments from splits/forks'] }
  ]

  return (
    <StageLayout
      stage={11}
      track="trading-security"
      title="Tax & Legal Compliance"
      description="Understand crypto tax obligations and stay legal"
      estimatedTime="20 min"
    >
      <Card>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          📊 Crypto Taxes: Don't Ignore the IRS
        </h2>
        <p className="text-gray-300 mb-4">
          Crypto isn't anonymous to tax authorities. The IRS treats crypto as property, meaning capital gains
          taxes apply. Exchanges report to the IRS. Blockchain is permanent and traceable. Tax evasion carries
          serious penalties including fines and prison time.
        </p>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            <strong>⚠️ Disclaimer:</strong> This is educational information, NOT tax advice. Tax laws vary by
            country and change frequently. Consult a qualified crypto tax professional for your specific situation.
            Don't risk penalties by guessing.
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          What's Taxable? (US Tax Treatment)
        </h3>
        <p className="text-gray-300 mb-6">
          In the US, the IRS treats cryptocurrency as property. Most crypto activities create taxable events.
          Here's what triggers taxes:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Event</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold">Taxable?</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {taxEvents.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-3 px-4 text-gray-300">{item.event}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant="outline"
                      className={`
                        ${item.taxable === 'YES' || item.taxable === 'YES*' ? 'border-red-500 text-red-400' : ''}
                        ${item.taxable === 'NO' || item.taxable === 'NO*' ? 'border-green-500 text-green-400' : ''}
                        ${item.taxable === 'DEDUCT' ? 'border-blue-500 text-blue-400' : ''}
                      `}
                    >
                      {item.taxable}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{item.type}</td>
                  <td className="py-3 px-4 text-gray-300 text-xs">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-400 mb-2">Important Notes:</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400">•</span>
              <span><strong>Capital Gains:</strong> Short-term (&lt;1 year holding) taxed as ordinary income. Long-term (&gt;1 year) gets preferential rates (0%, 15%, or 20% depending on income)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400">•</span>
              <span><strong>Income:</strong> Staking, mining, and interest are taxed as ordinary income at your tax bracket rate (10-37%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400">•</span>
              <span><strong>Wash Sales:</strong> Currently do NOT apply to crypto (but may change). You can sell at loss and rebuy immediately</span>
            </li>
          </ul>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">📝</span>
          Record Keeping Requirements
        </h3>
        <p className="text-gray-300 mb-6">
          The IRS requires you to report all crypto transactions. With hundreds or thousands of trades, manual
          tracking is impossible. Here's what you need to track:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {recordKeepingItems.map((section, idx) => (
            <div key={idx} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3">{section.category}</h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-2">💡 Pro Tip: Use Crypto Tax Software</h4>
          <p className="text-sm text-gray-300 mb-3">
            Manual tracking is error-prone and time-consuming. Use specialized crypto tax software:
          </p>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• <strong>CoinTracker:</strong> Popular, supports most exchanges</li>
            <li>• <strong>Koinly:</strong> Great for DeFi and multiple countries</li>
            <li>• <strong>TaxBit:</strong> Used by institutions</li>
            <li>• <strong>ZenLedger:</strong> Good for complex portfolios</li>
          </ul>
          <p className="text-xs text-gray-400 mt-3">
            These tools connect to exchanges via API, automatically categorize transactions, and generate tax forms.
            Worth every penny to avoid errors.
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          Legal & Regulatory Compliance
        </h3>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Know Your Jurisdiction</h4>
            <p className="text-sm text-gray-300">
              Crypto regulations vary wildly by country. Some ban it entirely, others welcome it. Research your
              country's specific rules. US citizens are taxed on worldwide income, even crypto earned abroad.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">KYC/AML Requirements</h4>
            <p className="text-sm text-gray-300">
              Most major exchanges require Know Your Customer (KYC) verification. Don't try to avoid it - your
              transactions are on-chain and traceable. Exchanges report large transactions to authorities.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">FBAR & Foreign Account Reporting</h4>
            <p className="text-sm text-gray-300">
              US citizens with &gt;$10,000 in foreign exchange accounts may need to file FBAR (FinCEN Form 114).
              Penalties for non-filing are severe. Consult a tax professional if you use foreign exchanges.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-2">Securities Laws</h4>
            <p className="text-sm text-gray-300">
              Many tokens may be considered securities. Selling securities without registration is illegal.
              Launching tokens, running ICOs, or promoting unregistered securities carries legal risk.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🚨</span>
          Common Tax Mistakes to Avoid
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-red-400 mb-2">Not Reporting at All</h4>
            <p className="text-sm text-gray-300">
              "They'll never know" is false. Exchanges report to IRS. Blockchain is public. Penalties for tax
              evasion include fines up to $250,000 and 5 years prison. Not worth it.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-2">Forgetting Crypto-to-Crypto Swaps</h4>
            <p className="text-sm text-gray-300">
              Every trade creates a taxable event, not just cashing out to fiat. Trading BTC for ETH? That's
              taxable. DeFi swaps? Taxable. Each one.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2">Poor Record Keeping</h4>
            <p className="text-sm text-gray-300">
              Exchange records aren't permanent. Exchanges shut down. Gather records NOW, not at tax time.
              Export transaction history quarterly. You'll need it.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Using Wrong Cost Basis Method</h4>
            <p className="text-sm text-gray-300">
              FIFO (First In First Out) is default, but HIFO (Highest In First Out) can save taxes. Once you
              choose a method, you must stick with it. Choose wisely.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Key Takeaways
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Crypto IS Taxable</h4>
            <p className="text-sm text-gray-300">
              The IRS considers crypto property. Capital gains apply. Income from staking/mining is taxable.
              Ignoring taxes = bad idea.
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">Track Everything</h4>
            <p className="text-sm text-gray-300">
              Every transaction needs documentation. Use tax software. Export records regularly. Future you will
              thank present you.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">Get Professional Help</h4>
            <p className="text-sm text-gray-300">
              Crypto taxes are complex. A crypto-specialized CPA costs money but saves more in avoided penalties
              and optimized taxes.
            </p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-2">Stay Compliant</h4>
            <p className="text-sm text-gray-300">
              Laws change fast. Stay informed. File accurately and on time. The cost of non-compliance far exceeds
              the cost of compliance.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-red-400">Final Warning:</strong> This is educational info only, not tax advice.
            Tax laws vary by jurisdiction and change frequently. Consult a qualified tax professional familiar with
            cryptocurrency for your specific situation. Don't let tax issues ruin your crypto gains.
          </p>
        </div>
      </Card>
    </StageLayout>
  )
}
