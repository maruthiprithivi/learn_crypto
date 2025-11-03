'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function BitcoinStage5() {
  const [utxos, setUtxos] = useState([
    { id: 1, amount: 0.5, from: 'Alice', selected: false },
    { id: 2, amount: 0.3, from: 'Bob', selected: false },
    { id: 3, amount: 0.8, from: 'Charlie', selected: false },
    { id: 4, amount: 0.1, from: 'David', selected: false },
  ])
  const [sendAmount, setSendAmount] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [transactionResult, setTransactionResult] = useState(null)

  const toggleUtxo = (id) => {
    setUtxos(utxos.map((utxo) => (utxo.id === id ? { ...utxo, selected: !utxo.selected } : utxo)))
    setTransactionResult(null)
  }

  const getSelectedTotal = () => {
    return utxos.filter((u) => u.selected).reduce((sum, u) => sum + u.amount, 0)
  }

  const getTotalBalance = () => {
    return utxos.reduce((sum, u) => sum + u.amount, 0)
  }

  const createTransaction = () => {
    const amount = parseFloat(sendAmount)
    const selectedTotal = getSelectedTotal()
    const fee = 0.0001

    if (!recipientName || !amount || amount <= 0) {
      alert('Please enter recipient and amount')
      return
    }

    if (selectedTotal < amount + fee) {
      alert(
        `Insufficient UTXOs selected. Need ${(amount + fee).toFixed(4)} BTC, selected ${selectedTotal.toFixed(4)} BTC`
      )
      return
    }

    const change = selectedTotal - amount - fee

    setTransactionResult({
      inputs: utxos.filter((u) => u.selected),
      outputs: [
        { to: recipientName, amount: amount, type: 'payment' },
        ...(change > 0 ? [{ to: 'You (change)', amount: change, type: 'change' }] : []),
      ],
      fee: fee,
      selectedTotal: selectedTotal,
    })
  }

  const confirmTransaction = () => {
    // Remove spent UTXOs
    const newUtxos = utxos.filter((u) => !u.selected)

    // Add change as new UTXO if exists
    const change = getSelectedTotal() - parseFloat(sendAmount) - 0.0001
    if (change > 0) {
      newUtxos.push({
        id: Math.max(...utxos.map((u) => u.id)) + 1,
        amount: change,
        from: 'Change from previous tx',
        selected: false,
      })
    }

    setUtxos(newUtxos)
    setTransactionResult(null)
    setSendAmount('')
    setRecipientName('')
  }

  const receivePayment = () => {
    const amount = parseFloat(prompt('Enter amount to receive (BTC):') || '0')
    if (amount > 0) {
      setUtxos([
        ...utxos,
        {
          id: Math.max(...utxos.map((u) => u.id)) + 1,
          amount: amount,
          from: 'New Payment',
          selected: false,
        },
      ])
    }
  }

  return (
    <StageLayout
      trackName="Bitcoin Track"
      trackHref="/bitcoin"
      trackColor="bitcoin"
      stageNumber={5}
      stageTitle="Understanding UTXOs"
      stageDescription="Learn how Bitcoin tracks coins differently than bank accounts"
      nextStageHref="/bitcoin/stage-6"
      estimatedTime="18 min"
    >
      {/* Introduction */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          UTXO: Unspent Transaction Output
        </h2>
        <div className="space-y-4 text-gray-300">
          <p>
            Bitcoin doesn't use an account balance like your bank. Instead, it uses{' '}
            <strong>UTXOs</strong> - think of them as individual coins or bills in your wallet.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="text-lg font-bold text-white mb-2">Bank Account Model</h3>
              <div className="text-sm space-y-2">
                <p>✗ One balance number</p>
                <p>✗ Balance increases/decreases</p>
                <p className="text-gray-500">Example: Balance = $1,000</p>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
              <div className="text-3xl mb-2">🪙</div>
              <h3 className="text-lg font-bold text-white mb-2">Bitcoin UTXO Model</h3>
              <div className="text-sm space-y-2">
                <p>✓ Multiple "coins"</p>
                <p>✓ Coins are spent entirely</p>
                <p className="text-gray-500">Example: 0.5 BTC + 0.3 BTC + 0.2 BTC</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
            <p className="text-sm">
              <strong>Real World Analogy:</strong> Imagine paying for a $3 coffee with a $5 bill.
              You can't tear the bill in half - you must give the whole $5 and receive $2 change.
              UTXOs work the same way!
            </p>
          </div>
        </div>
      </Card>

      {/* Balance Display */}
      <Card className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">Total Balance</div>
            <div className="text-4xl font-bold text-white">
              {getTotalBalance().toFixed(4)} <span className="text-orange-400">BTC</span>
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Across {utxos.length} UTXO{utxos.length !== 1 ? 's' : ''}
            </div>
          </div>
          <div>
            <Button onClick={receivePayment} variant="success" size="sm">
              + Receive Payment
            </Button>
          </div>
        </div>
      </Card>

      {/* UTXO Visualization */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🪙 Your UTXOs (Individual Coins)</h3>
        <p className="text-sm text-gray-400 mb-4">
          Click on coins to select them for spending. Each UTXO must be spent entirely.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {utxos.map((utxo) => (
            <button
              key={utxo.id}
              onClick={() => toggleUtxo(utxo.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                utxo.selected
                  ? 'border-orange-500 bg-orange-500/20 scale-105'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🪙</span>
                {utxo.selected && <span className="text-green-400">✓ Selected</span>}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {utxo.amount.toFixed(4)} BTC
              </div>
              <div className="text-xs text-gray-400">From: {utxo.from}</div>
              <div className="text-xs text-gray-500 mt-1">UTXO #{utxo.id}</div>
            </button>
          ))}
        </div>

        {getSelectedTotal() > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">Selected UTXOs Total:</span>
              <span className="text-2xl font-bold text-orange-400">
                {getSelectedTotal().toFixed(4)} BTC
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Transaction Builder */}
      {!transactionResult ? (
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">💸 Create Transaction</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g., Alice"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount to Send (BTC)</label>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                placeholder="0.0000"
                step="0.0001"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {sendAmount && (
              <div className="bg-gray-900 rounded-lg p-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Selected UTXOs:</span>
                    <span className="text-white">{getSelectedTotal().toFixed(4)} BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Send Amount:</span>
                    <span className="text-white">-{parseFloat(sendAmount).toFixed(4)} BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network Fee:</span>
                    <span className="text-orange-400">-0.0001 BTC</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                    <span className="text-white">Change (back to you):</span>
                    <span className="text-green-400">
                      {Math.max(0, getSelectedTotal() - parseFloat(sendAmount || 0) - 0.0001).toFixed(4)} BTC
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={createTransaction}
              variant="bitcoin"
              disabled={!recipientName || !sendAmount || getSelectedTotal() === 0}
              className="w-full"
            >
              Create Transaction
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="mb-8 bg-green-500/10 border-green-500/50">
          <h3 className="text-2xl font-bold text-white mb-4">📋 Transaction Preview</h3>

          {/* Inputs */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-400 mb-3">INPUTS (UTXOs to spend):</h4>
            <div className="space-y-2">
              {transactionResult.inputs.map((input) => (
                <div key={input.id} className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🪙</span>
                      <div>
                        <div className="text-sm text-white">UTXO #{input.id}</div>
                        <div className="text-xs text-gray-400">From {input.from}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-red-400">
                      -{input.amount.toFixed(4)} BTC
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right text-sm text-gray-400">
                Total Input: {transactionResult.selectedTotal.toFixed(4)} BTC
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-400 mb-3">OUTPUTS (Where coins go):</h4>
            <div className="space-y-2">
              {transactionResult.outputs.map((output, idx) => (
                <div
                  key={idx}
                  className={`${
                    output.type === 'change'
                      ? 'bg-blue-500/10 border-blue-500/50'
                      : 'bg-green-500/10 border-green-500/50'
                  } border rounded-lg p-3`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{output.type === 'change' ? '↩️' : '💰'}</span>
                      <div>
                        <div className="text-sm text-white">To: {output.to}</div>
                        <div className="text-xs text-gray-400">
                          {output.type === 'change' ? '(Change UTXO)' : '(Payment)'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        output.type === 'change' ? 'text-blue-400' : 'text-green-400'
                      }`}
                    >
                      +{output.amount.toFixed(4)} BTC
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Miner Fee:</span>
                  <span className="text-orange-400">-{transactionResult.fee.toFixed(4)} BTC</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setTransactionResult(null)} variant="secondary" className="flex-1">
              Cancel
            </Button>
            <Button onClick={confirmTransaction} variant="bitcoin" className="flex-1">
              Confirm & Broadcast
            </Button>
          </div>
        </Card>
      )}

      {/* Key Learnings */}
      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Bitcoin uses UTXOs (unspent outputs) instead of account balances</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Each UTXO must be spent entirely - you can't spend part of it</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              Change is returned to you as a new UTXO (like getting change from a $5 bill)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Transactions consume UTXOs as inputs and create new UTXOs as outputs</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              Your "balance" is actually the sum of all your unspent UTXOs
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>
              This model provides better privacy and makes transactions more traceable
            </span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}
