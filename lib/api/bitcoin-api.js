// Free Bitcoin API integrations using blockchain.info and mempool.space

const BLOCKCHAIN_INFO_API = 'https://blockchain.info'
const MEMPOOL_SPACE_API = 'https://mempool.space/api'

export async function getBitcoinAddress(address) {
  try {
    const response = await fetch(`${BLOCKCHAIN_INFO_API}/rawaddr/${address}?limit=10`)
    if (!response.ok) throw new Error('Address not found')

    const data = await response.json()

    return {
      address: data.address,
      balance: data.final_balance / 100000000, // Convert satoshis to BTC
      totalReceived: data.total_received / 100000000,
      totalSent: data.total_sent / 100000000,
      txCount: data.n_tx,
      transactions: data.txs.slice(0, 10).map(tx => ({
        hash: tx.hash,
        time: tx.time,
        value: tx.result / 100000000,
        confirmations: tx.block_height ? 'Confirmed' : 'Unconfirmed',
      })),
    }
  } catch (error) {
    console.error('Bitcoin API Error:', error)
    throw new Error('Failed to fetch Bitcoin address data')
  }
}

export async function getBitcoinTransaction(txHash) {
  try {
    const response = await fetch(`${BLOCKCHAIN_INFO_API}/rawtx/${txHash}`)
    if (!response.ok) throw new Error('Transaction not found')

    const data = await response.json()

    return {
      hash: data.hash,
      time: data.time,
      blockHeight: data.block_height,
      confirmations: data.block_height ? 'Confirmed' : 'Unconfirmed',
      inputs: data.inputs.map(input => ({
        address: input.prev_out?.addr || 'Unknown',
        value: (input.prev_out?.value || 0) / 100000000,
      })),
      outputs: data.out.map(output => ({
        address: output.addr || 'Unknown',
        value: output.value / 100000000,
      })),
      fee: (data.fee || 0) / 100000000,
      size: data.size,
    }
  } catch (error) {
    console.error('Bitcoin TX API Error:', error)
    throw new Error('Failed to fetch transaction data')
  }
}

export async function getMempoolStats() {
  try {
    const response = await fetch(`${MEMPOOL_SPACE_API}/v1/fees/recommended`)
    if (!response.ok) throw new Error('Failed to fetch mempool stats')

    const data = await response.json()

    return {
      fastestFee: data.fastestFee,
      halfHourFee: data.halfHourFee,
      hourFee: data.hourFee,
      economyFee: data.economyFee || data.minimumFee,
    }
  } catch (error) {
    console.error('Mempool API Error:', error)
    return {
      fastestFee: 20,
      halfHourFee: 10,
      hourFee: 5,
      economyFee: 1,
    }
  }
}
