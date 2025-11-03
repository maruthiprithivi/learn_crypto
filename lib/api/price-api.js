// Free price API using CoinGecko (no API key required)

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export async function getCryptoPrices() {
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true`
    )

    if (!response.ok) throw new Error('Failed to fetch prices')

    const data = await response.json()

    return {
      bitcoin: {
        price: data.bitcoin?.usd || 0,
        change24h: data.bitcoin?.usd_24h_change || 0,
      },
      ethereum: {
        price: data.ethereum?.usd || 0,
        change24h: data.ethereum?.usd_24h_change || 0,
      },
      solana: {
        price: data.solana?.usd || 0,
        change24h: data.solana?.usd_24h_change || 0,
      },
    }
  } catch (error) {
    console.error('Price API Error:', error)
    // Return default values if API fails
    return {
      bitcoin: { price: 45000, change24h: 0 },
      ethereum: { price: 2500, change24h: 0 },
      solana: { price: 100, change24h: 0 },
    }
  }
}

export async function getCryptoMarketData(coinId) {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
    )

    if (!response.ok) throw new Error('Failed to fetch market data')

    const data = await response.json()

    return {
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      price: data.market_data?.current_price?.usd || 0,
      marketCap: data.market_data?.market_cap?.usd || 0,
      volume24h: data.market_data?.total_volume?.usd || 0,
      change24h: data.market_data?.price_change_percentage_24h || 0,
      high24h: data.market_data?.high_24h?.usd || 0,
      low24h: data.market_data?.low_24h?.usd || 0,
      circulatingSupply: data.market_data?.circulating_supply || 0,
      totalSupply: data.market_data?.total_supply || 0,
    }
  } catch (error) {
    console.error('Market Data API Error:', error)
    throw new Error('Failed to fetch market data')
  }
}
