import Link from 'next/link'

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
        <Link href="/" className="text-purple-400 hover:text-purple-300 mb-6 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Legal Disclaimer</h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Educational Purpose</h2>
            <p>
              CryptoLearn is an educational platform designed to teach users about cryptocurrency,
              blockchain technology, and digital asset trading. All content, tools, and information
              provided on this platform are for educational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Not Financial Advice</h2>
            <p className="mb-4">
              <strong>IMPORTANT:</strong> Nothing on this platform constitutes financial advice,
              investment advice, trading advice, or any other sort of advice. You should not treat
              any of the platform's content as such.
            </p>
            <p>
              CryptoLearn does not recommend that any cryptocurrency should be bought, sold, or held
              by you. Do conduct your own due diligence and consult your financial advisor before
              making any investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Risk Warning</h2>
            <p className="mb-4">
              Trading and investing in cryptocurrencies involves substantial risk of loss and is not
              suitable for every investor. The valuation of cryptocurrencies may fluctuate, and, as
              a result, you may lose more than your original investment.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Past performance is not indicative of future results</li>
              <li>Cryptocurrency markets are highly volatile</li>
              <li>You may lose all of your invested capital</li>
              <li>Only invest what you can afford to lose completely</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Analysis Tools Disclaimer</h2>
            <p className="mb-4">
              Our platform provides various analysis tools including contract scanners, rug pull
              detectors, and wallet analyzers. These tools are educational and informational only:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Tools cannot guarantee the safety or legitimacy of any project</li>
              <li>Passing all safety checks does not mean a project is risk-free</li>
              <li>Always conduct comprehensive independent research</li>
              <li>Scammers constantly develop new tactics to evade detection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Responsibility</h2>
            <p>
              By using this platform, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>You are solely responsible for your own investment decisions</li>
              <li>You will conduct thorough research before any investment</li>
              <li>You understand the risks involved in cryptocurrency trading</li>
              <li>You will not hold CryptoLearn liable for any losses</li>
              <li>You will comply with all applicable laws in your jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">No Warranty</h2>
            <p>
              The platform and all information is provided "as is" without any warranties, express
              or implied. We make no guarantees about the accuracy, completeness, or timeliness of
              the information provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, CryptoLearn shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly, or any loss of data,
              use, goodwill, or other intangible losses resulting from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Regulatory Compliance</h2>
            <p>
              Cryptocurrency regulations vary by country and jurisdiction. It is your responsibility
              to ensure compliance with all applicable laws and regulations in your location.
            </p>
          </section>

          <section className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Final Warning</h2>
            <p className="text-yellow-200">
              <strong>Cryptocurrency trading carries a high level of risk and may not be suitable
              for all investors. Before deciding to trade cryptocurrency, you should carefully
              consider your investment objectives, level of experience, and risk appetite. The
              possibility exists that you could sustain a loss of some or all of your initial
              investment. Therefore, you should not invest money that you cannot afford to lose.</strong>
            </p>
          </section>

          <section className="text-sm text-gray-500 pt-6 border-t border-gray-700">
            <p>Last updated: November 2024</p>
            <p className="mt-2">
              If you have any questions about this disclaimer, please contact us through GitHub issues.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
