import assert from 'node:assert/strict'
import test from 'node:test'

import {
  formatTickerChange,
  formatTickerPrice,
  parseBinanceTicker,
} from '../src/cryptoPrices.ts'

test('parses Binance 24hr ticker updates into display prices', () => {
  const parsed = parseBinanceTicker({
    s: 'BTCUSDT',
    c: '64235.50100000',
    P: '-2.345',
  })

  assert.deepEqual(parsed, {
    symbol: 'BTC',
    pair: 'BTC/USDT',
    price: 64235.501,
    change24h: -2.345,
  })
})

test('formats crypto ticker values for homepage display', () => {
  assert.equal(formatTickerPrice(64235.501), '64,235.50')
  assert.equal(formatTickerPrice(0.523456), '0.5235')
  assert.equal(formatTickerChange(2.3), '+2.30%')
  assert.equal(formatTickerChange(-0.456), '-0.46%')
})
