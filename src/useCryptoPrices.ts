import { useEffect, useState } from 'react'

import {
  BINANCE_TICKER_STREAM_URL,
  type BinanceCombinedTickerMessage,
  type CryptoPrice,
  parseBinanceTicker,
} from './cryptoPrices'

export type CryptoPrices = Record<string, CryptoPrice>

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrices>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let reconnectTimer: number | undefined
    let isActive = true
    let socket: WebSocket | undefined

    const connect = () => {
      socket = new WebSocket(BINANCE_TICKER_STREAM_URL)

      socket.addEventListener('open', () => {
        if (!isActive) {
          return
        }

        setError(null)
      })

      socket.addEventListener('message', (event: MessageEvent<string>) => {
        if (!isActive) {
          return
        }

        try {
          const message = JSON.parse(event.data) as BinanceCombinedTickerMessage
          const ticker = parseBinanceTicker(message.data)

          setPrices((currentPrices) => ({
            ...currentPrices,
            [ticker.symbol]: ticker,
          }))
          setLoading(false)
          setError(null)
        } catch {
          setError('Unable to parse Binance price update')
        }
      })

      socket.addEventListener('error', () => {
        if (!isActive) {
          return
        }

        setError('Unable to connect to Binance price stream')
        setLoading(false)
      })

      socket.addEventListener('close', () => {
        if (!isActive) {
          return
        }

        reconnectTimer = window.setTimeout(connect, 5_000)
      })
    }

    connect()

    return () => {
      isActive = false
      window.clearTimeout(reconnectTimer)
      socket?.close()
    }
  }, [])

  return { prices, loading, error }
}
