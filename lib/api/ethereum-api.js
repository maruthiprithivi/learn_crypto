// Free Ethereum API using Etherscan (free tier, no API key needed for basic calls)

const ETHERSCAN_API = 'https://api.etherscan.io/api'

export async function getEthereumAddress(address) {
  try {
    // Get balance
    const balanceResponse = await fetch(
      `${ETHERSCAN_API}?module=account&action=balance&address=${address}&tag=latest`
    )
    const balanceData = await balanceResponse.json()

    if (balanceData.status !== '1') {
      throw new Error('Invalid address or API error')
    }

    // Get recent transactions (limited to 10 for free tier)
    const txResponse = await fetch(
      `${ETHERSCAN_API}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`
    )
    const txData = await txResponse.json()

    return {
      address: address,
      balance: (parseInt(balanceData.result) / 1e18).toFixed(6), // Wei to ETH
      transactions: txData.result?.slice(0, 10).map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: (parseInt(tx.value) / 1e18).toFixed(6),
        timestamp: new Date(tx.timeStamp * 1000).toLocaleString(),
        status: tx.isError === '0' ? 'Success' : 'Failed',
      })) || [],
    }
  } catch (error) {
    console.error('Ethereum API Error:', error)
    throw new Error('Failed to fetch Ethereum address data')
  }
}

export async function getEthereumTransaction(txHash) {
  try {
    const response = await fetch(
      `${ETHERSCAN_API}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}`
    )
    const data = await response.json()

    if (!data.result) {
      throw new Error('Transaction not found')
    }

    const tx = data.result

    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: (parseInt(tx.value, 16) / 1e18).toFixed(6),
      gas: parseInt(tx.gas, 16),
      gasPrice: (parseInt(tx.gasPrice, 16) / 1e9).toFixed(2), // Wei to Gwei
      blockNumber: parseInt(tx.blockNumber, 16),
    }
  } catch (error) {
    console.error('Ethereum TX API Error:', error)
    throw new Error('Failed to fetch transaction data')
  }
}

export async function getERC20TokenInfo(contractAddress) {
  try {
    // This is a simplified version - for production, you'd want to use web3 to call contract methods
    const response = await fetch(
      `${ETHERSCAN_API}?module=token&action=tokeninfo&contractaddress=${contractAddress}`
    )
    const data = await response.json()

    if (data.status !== '1') {
      throw new Error('Invalid contract address')
    }

    return {
      name: data.result?.[0]?.tokenName || 'Unknown',
      symbol: data.result?.[0]?.symbol || 'Unknown',
      totalSupply: data.result?.[0]?.totalSupply || '0',
      decimals: data.result?.[0]?.decimals || '18',
    }
  } catch (error) {
    console.error('Token API Error:', error)
    throw new Error('Failed to fetch token data')
  }
}

export async function getGasPrice() {
  try {
    const response = await fetch(
      `${ETHERSCAN_API}?module=gastracker&action=gasoracle`
    )
    const data = await response.json()

    if (data.status === '1') {
      return {
        low: parseInt(data.result.SafeGasPrice),
        average: parseInt(data.result.ProposeGasPrice),
        high: parseInt(data.result.FastGasPrice),
      }
    }

    return { low: 10, average: 30, high: 50 }
  } catch (error) {
    console.error('Gas Price API Error:', error)
    return { low: 10, average: 30, high: 50 }
  }
}
