export interface CryptoTickerConfig {
	symbol: string;
	pair: string;
	binanceSymbol: string;
}

export interface CryptoPrice {
	symbol: string;
	pair: string;
	price: number;
	change24h: number;
}

export interface BinanceTickerPayload {
	s: string;
	c: string;
	P: string;
}

export interface BinanceCombinedTickerMessage {
	stream: string;
	data: BinanceTickerPayload;
}

export const CRYPTO_TICKERS: CryptoTickerConfig[] = [
	{ symbol: "BTC", pair: "BTC/USDT", binanceSymbol: "btcusdt" },
	{ symbol: "ETH", pair: "ETH/USDT", binanceSymbol: "ethusdt" },
	{ symbol: "SOL", pair: "SOL/USDT", binanceSymbol: "solusdt" },
	{ symbol: "XRP", pair: "XRP/USDT", binanceSymbol: "xrpusdt" },
	{ symbol: "BNB", pair: "BNB/USDT", binanceSymbol: "bnbusdt" },
	{ symbol: "ADA", pair: "ADA/USDT", binanceSymbol: "adausdt" },
	{ symbol: "DOGE", pair: "DOGE/USDT", binanceSymbol: "dogeusdt" },
	{ symbol: "AVAX", pair: "AVAX/USDT", binanceSymbol: "avaxusdt" },
	{ symbol: "DOT", pair: "DOT/USDT", binanceSymbol: "dotusdt" },
];

export const BINANCE_TICKER_STREAM_URL = `wss://stream.binance.com:9443/stream?streams=${CRYPTO_TICKERS.map(
	({ binanceSymbol }) => `${binanceSymbol}@ticker`,
).join("/")}`;

export function parseBinanceTicker(payload: BinanceTickerPayload): CryptoPrice {
	const symbol = payload.s.replace(/USDT$/, "");

	return {
		symbol,
		pair: `${symbol}/USDT`,
		price: Number.parseFloat(payload.c),
		change24h: Number.parseFloat(payload.P),
	};
}

export function formatTickerPrice(price: number): string {
	return price >= 1
		? price.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		: price.toLocaleString("en-US", {
				minimumFractionDigits: 4,
				maximumFractionDigits: 4,
			});
}

export function formatTickerChange(change24h: number): string {
	const sign = change24h >= 0 ? "+" : "";

	return `${sign}${change24h.toFixed(2)}%`;
}
