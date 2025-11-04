'use client'

import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import { useAppStore } from '@/lib/store'

export default function DisclaimerModal() {
  const { hasAcceptedDisclaimer, acceptDisclaimer } = useAppStore()
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToBottom(true)
    }
  }

  const handleAccept = () => {
    acceptDisclaimer()
  }

  return (
    <Modal
      isOpen={!hasAcceptedDisclaimer}
      onClose={() => {}}
      title="⚠️ IMPORTANT DISCLAIMER"
      size="lg"
      closeOnOverlay={false}
      showCloseButton={false}
      onScroll={handleScroll}
      footer={
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            onClick={handleAccept}
            variant="primary"
            size="lg"
            disabled={!hasScrolledToBottom}
            className="w-full sm:w-auto"
          >
            {hasScrolledToBottom ? 'I Understand & Accept' : 'Please Scroll to Continue'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 text-gray-300">
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400 font-semibold text-lg">
            This platform is for EDUCATIONAL PURPOSES ONLY.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">What This Platform Is:</h3>
          <ul className="space-y-2 list-none">
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>An interactive educational platform to learn cryptocurrency concepts</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>A safe environment to practice with simulated wallets and transactions</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>A tool to understand blockchain technology and crypto markets</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>A resource for learning how to analyze and evaluate crypto projects</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">What This Platform Is NOT:</h3>
          <ul className="space-y-2 list-none">
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span><strong>Financial advice</strong> or investment recommendations</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span><strong>Investment guidance</strong> on what to buy or sell</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span><strong>A guarantee</strong> of profit or success in trading</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✗</span>
              <span><strong>Professional financial counsel</strong> - always consult licensed advisors</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 space-y-3">
          <h3 className="text-xl font-bold text-yellow-400">Critical Warnings:</h3>
          <ul className="space-y-2 text-sm">
            <li>🔸 <strong>High Risk:</strong> Cryptocurrency investments are extremely volatile and risky</li>
            <li>🔸 <strong>Your Responsibility:</strong> All investment decisions are yours alone</li>
            <li>🔸 <strong>Can Lose Everything:</strong> Never invest more than you can afford to lose completely</li>
            <li>🔸 <strong>Do Your Research:</strong> Always conduct thorough independent research (DYOR)</li>
            <li>🔸 <strong>No Guarantees:</strong> Past performance does not indicate future results</li>
            <li>🔸 <strong>Scams Exist:</strong> The crypto space has many scams and fraudulent projects</li>
            <li>🔸 <strong>Regulatory Risk:</strong> Regulations vary by country and can change</li>
            <li>🔸 <strong>Technical Risk:</strong> Smart contracts can have bugs; exchanges can be hacked</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
          <h3 className="text-lg font-bold text-blue-400 mb-2">Analysis Tools Disclaimer:</h3>
          <p className="text-sm">
            When you use our real blockchain analysis tools (contract scanners, rug pull detectors, etc.):
          </p>
          <ul className="space-y-1 text-sm mt-2">
            <li>• Tools show common red flags but cannot guarantee safety</li>
            <li>• Passing all checks does NOT mean a project is safe</li>
            <li>• Scammers constantly evolve their tactics</li>
            <li>• Always use multiple verification methods</li>
            <li>• Trust your instincts - if something seems too good to be true, it probably is</li>
          </ul>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-bold text-white mb-2">By Accepting, You Acknowledge:</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ You understand this is educational content only</li>
            <li>✓ You will not consider any information as financial advice</li>
            <li>✓ You accept full responsibility for your investment decisions</li>
            <li>✓ You understand the risks involved in cryptocurrency</li>
            <li>✓ You will conduct your own research before any investment</li>
            <li>✓ You may lose all money you invest in cryptocurrency</li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">
            For more details, see our{' '}
            <a href="/legal/terms" className="text-purple-400 hover:text-purple-300 underline">
              Terms of Use
            </a>
            {' '}and{' '}
            <a href="/legal/disclaimer" className="text-purple-400 hover:text-purple-300 underline">
              Full Disclaimer
            </a>
          </p>
        </div>

        {!hasScrolledToBottom && (
          <div className="text-center py-4 text-yellow-400 animate-pulse">
            ↓ Please scroll down to continue ↓
          </div>
        )}
      </div>
    </Modal>
  )
}
