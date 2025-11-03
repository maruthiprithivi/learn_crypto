// Free Solana API using public RPC endpoint

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com'

async function solanaRpcCall(method, params = []) {
  try {
    const response = await fetch(SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      }),
    })

    const data = await response.json()
    if (data.error) throw new Error(data.error.message)
    return data.result
  } catch (error) {
    console.error('Solana RPC Error:', error)
    throw error
  }
}

export async function getSolanaAddress(address) {
  try {
    // Get balance
    const balance = await solanaRpcCall('getBalance', [address])

    // Get recent transactions (signatures)
    const signatures = await solanaRpcCall('getSignaturesForAddress', [
      address,
      { limit: 10 },
    ])

    return {
      address: address,
      balance: (balance.value / 1e9).toFixed(6), // Lamports to SOL
      transactions: signatures.map(sig => ({
        signature: sig.signature,
        timestamp: sig.blockTime ? new Date(sig.blockTime * 1000).toLocaleString() : 'Pending',
        status: sig.err ? 'Failed' : 'Success',
        slot: sig.slot,
      })),
    }
  } catch (error) {
    console.error('Solana Address API Error:', error)
    throw new Error('Failed to fetch Solana address data')
  }
}

export async function getSolanaTransaction(signature) {
  try {
    const tx = await solanaRpcCall('getTransaction', [
      signature,
      { encoding: 'json', maxSupportedTransactionVersion: 0 },
    ])

    if (!tx) throw new Error('Transaction not found')

    return {
      signature: signature,
      slot: tx.slot,
      blockTime: tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : 'Unknown',
      fee: (tx.meta.fee / 1e9).toFixed(6),
      status: tx.meta.err ? 'Failed' : 'Success',
      instructions: tx.transaction.message.instructions.length,
    }
  } catch (error) {
    console.error('Solana TX API Error:', error)
    throw new Error('Failed to fetch transaction data')
  }
}

export async function getSolanaTokenInfo(mintAddress) {
  try {
    const supply = await solanaRpcCall('getTokenSupply', [mintAddress])

    return {
      mintAddress: mintAddress,
      supply: supply.value.uiAmountString,
      decimals: supply.value.decimals,
    }
  } catch (error) {
    console.error('Solana Token API Error:', error)
    throw new Error('Failed to fetch token data')
  }
}
