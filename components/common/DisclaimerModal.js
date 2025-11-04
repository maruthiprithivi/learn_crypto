'use client'

import { useState, useEffect } from 'react'
import Modal from './Modal'
import Button from './Button'
import { useAppStore } from '@/lib/store'

export default function DisclaimerModal() {
  const { hasAcceptedDisclaimer, acceptDisclaimer } = useAppStore()
  const [canAccept, setCanAccept] = useState(false)

  useEffect(() => {
    // Auto-enable accept button after 3 seconds
    const timer = setTimeout(() => setCanAccept(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleAccept = () => {
    acceptDisclaimer()
  }

  return (
    <Modal
      isOpen={!hasAcceptedDisclaimer}
      onClose={() => {}}
      title=""
      size="md"
      closeOnOverlay={false}
      showCloseButton={false}
      footer={
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleAccept}
            variant="primary"
            size="lg"
            disabled={!canAccept}
            className="w-full"
          >
            {canAccept ? 'I Understand - Start Learning' : 'Please Read (3s)'}
          </Button>
          <p className="text-xs text-center text-gray-500">
            By clicking above, you acknowledge this is for educational purposes only
          </p>
        </div>
      }
    >
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎓</div>

        <h2 className="text-3xl font-bold text-white">
          Welcome to CryptoLearn
        </h2>

        <p className="text-xl text-gray-300">
          Interactive Crypto Education Platform
        </p>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-left">
          <h3 className="text-lg font-bold text-yellow-400 mb-3 text-center">Quick Disclaimer</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>✓ This is for <strong>education only</strong> - not financial advice</li>
            <li>✓ Practice with <strong>simulations</strong> before risking real money</li>
            <li>✓ Crypto is <strong>extremely risky</strong> - never invest more than you can lose</li>
            <li>✓ You're <strong>responsible</strong> for your own investment decisions</li>
          </ul>
        </div>

        <div className="text-gray-400 text-sm">
          <p>
            Want full details? Read our{' '}
            <a href="/legal/disclaimer" className="text-purple-400 hover:text-purple-300 underline">
              complete disclaimer
            </a>
          </p>
        </div>
      </div>
    </Modal>
  )
}
