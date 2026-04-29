import { Player } from "@remotion/player";
import { Fragment, useEffect, useState } from "react";
import logoImage from "./assets/adabet-logo.svg";
import heroImage from "./assets/hero.svg";
import {
	CRYPTO_TICKERS,
	formatTickerChange,
	formatTickerPrice,
} from "./cryptoPrices";
import { QuantStrategyAnimation } from "./QuantStrategyAnimation";
import { useCryptoPrices } from "./useCryptoPrices";

const ArrowIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
		<path
			d="M5 12h14M12 5l7 7-7 7"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const CalendarIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
		<rect
			x="3"
			y="4"
			width="18"
			height="17"
			rx="3"
			stroke="currentColor"
			strokeWidth="2"
		/>
		<path
			d="M8 2v4M16 2v4M3 10h18"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

const CloseIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
		<path
			d="M6 6l12 12M18 6L6 18"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

const SignalIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
		<path
			d="M4 17l5-5 4 4 7-9"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16 7h4v4"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const RoutingIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
		<path
			d="M6 5h3a4 4 0 014 4v6a4 4 0 004 4h1"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<path
			d="M6 19h2a4 4 0 004-4V9a4 4 0 014-4h2"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<path
			d="M4 5h2M18 5h2M4 19h2M18 19h2"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

const AnalyticsIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
		<path
			d="M4 19V5M4 19h16"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<path
			d="M8 15v-4M12 15V8M16 15v-7"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

const ShieldIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
		<path
			d="M12 21s7-3.5 7-9V5l-7-3-7 3v7c0 5.5 7 9 7 9z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M9 12l2 2 4-5"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const featureCards = [
	{
		title: "Signal intelligence",
		body: "Blend exchange microstructure, volatility regimes, and live order-book movement into model-ready trading signals.",
		icon: <SignalIcon />,
	},
	{
		title: "Smart order routing",
		body: "Route orders across venues with latency-aware execution, slippage controls, and cross-exchange spread capture.",
		icon: <RoutingIcon />,
	},
	{
		title: "Live portfolio analytics",
		body: "Monitor exposure, P&L, fills, and strategy health from one operating view with fast market refreshes.",
		icon: <AnalyticsIcon />,
	},
	{
		title: "Risk controls",
		body: "Set position limits, circuit breakers, and pre-trade validation so automated strategies stay inside mandate.",
		icon: <ShieldIcon />,
	},
];

const MARKET_TABLE_SYMBOLS = ["BTC", "ETH", "SOL"];

const MARKET_SPREADS: Record<string, string> = {
	BTC: "34 bps",
	ETH: "21 bps",
	SOL: "46 bps",
};

function App() {
	const [showDemo, setShowDemo] = useState(false);
	const [metricTick, setMetricTick] = useState(0);

	const { prices, loading, error } = useCryptoPrices();
	const btcTicker = prices.BTC;
	const btcPrice = btcTicker?.price ?? 77710;
	const btcChange24h = btcTicker?.change24h ?? 1.4;
	const tickerItems = CRYPTO_TICKERS.map(({ symbol, pair }) => {
		const ticker = prices[symbol];

		return {
			symbol: pair,
			price: ticker ? formatTickerPrice(ticker.price) : "Loading",
			change: ticker
				? formatTickerChange(ticker.change24h)
				: error
					? "Offline"
					: "Syncing",
			isDown: ticker ? ticker.change24h < 0 : false,
		};
	});
	const marketRows = CRYPTO_TICKERS.filter(({ symbol }) =>
		MARKET_TABLE_SYMBOLS.includes(symbol),
	).map(({ symbol, pair }) => {
		const ticker = prices[symbol];

		return {
			symbol,
			pair,
			price: ticker
				? formatTickerPrice(ticker.price)
				: loading
					? "Loading"
					: "--",
			change: ticker
				? formatTickerChange(ticker.change24h)
				: error
					? "Offline"
					: "Syncing",
			spread: MARKET_SPREADS[symbol],
			isDown: ticker ? ticker.change24h < 0 : false,
			isLoading: !ticker && loading,
		};
	});
	const positivePnl =
		12 +
		Math.abs(btcChange24h) * 0.58 +
		(metricTick % 28) * 0.19 +
		Math.abs(Math.sin((btcPrice + metricTick * 11) / 240)) * 0.42;
	const openOrders = 248 + metricTick * 3 + Math.floor(btcPrice % 17);
	const slippage = Math.max(
		0.03,
		0.11 -
			Math.min(Math.abs(btcChange24h), 9) * 0.006 +
			(metricTick % 6) * 0.002,
	);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setMetricTick((currentTick) => currentTick + 1);
		}, 900);

		// Set autoPlay to true when page is fully loaded
		const timer = window.setTimeout(() => {
			setIsPageLoaded(true);
		}, 3000);

		return () => {
			window.clearInterval(interval);
			window.clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<header className="site-header">
				<a className="brand" href="/" aria-label="AdaBet homepage">
					<img src={logoImage} alt="" />
				</a>
				<nav aria-label="Primary navigation">
					<ul className="nav-links">
						<li>
							<a href="#platform">Platform</a>
						</li>
						<li>
							<a href="#features">Features</a>
						</li>
						<li>
							<a href="#markets">Markets</a>
						</li>
					</ul>
				</nav>
				<button className="header-action" onClick={() => setShowDemo(true)}>
					Request demo
				</button>
			</header>

			<main>
				<section className="hero" aria-labelledby="hero-title">
					<div className="hero-shell">
						<div className="hero-copy">
							<p className="eyebrow">Crypto execution infrastructure</p>
							<h1 id="hero-title">
								Algorithmic trading built for fast markets
							</h1>
							<p className="hero-subtitle">
								AdaBet gives crypto trading teams a cleaner command layer for
								signal processing, order routing, and live risk monitoring
								across major venues.
							</p>
							<div className="hero-actions">
								<button
									className="btn btn-primary"
									onClick={() => setShowDemo(true)}
								>
									Start free trial
									<ArrowIcon />
								</button>
								<button
									className="btn btn-secondary"
									onClick={() => setShowDemo(true)}
								>
									<CalendarIcon />
									Schedule demo
								</button>
							</div>
							<dl className="stats" aria-label="AdaBet platform metrics">
								<div className="stat-item">
									<dt>Volume processed</dt>
									<dd>$6.2B+</dd>
								</div>
								<div className="stat-item">
									<dt>Average execution</dt>
									<dd>12ms</dd>
								</div>
								<div className="stat-item">
									<dt>Platform uptime</dt>
									<dd>99.99%</dd>
								</div>
							</dl>
						</div>

						<div
							className="hero-visual"
							aria-label="AdaBet trading console preview"
						>
							<img className="hero-orbit" src={heroImage} alt="" />
							<div className="console-panel">
								<div className="console-header">
									<div>
										<span>Strategy health</span>
										<strong>BTC X strategy</strong>
									</div>
									<span className="live-pill">Live</span>
								</div>
								<div className="strategy-animation-card">
									<Player
										component={QuantStrategyAnimation}
										durationInFrames={180}
										fps={30}
										compositionWidth={792}
										compositionHeight={460}
										inputProps={{ btcPrice, btcChange24h }}
										loop
										autoPlay={true}
										playbackRate={1}
										// controls={true}
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
								<div className="console-grid">
									<div>
										<span>Net P&L</span>
										<strong>+{positivePnl.toFixed(1)}%</strong>
									</div>
									<div>
										<span>Orders</span>
										<strong>{openOrders}</strong>
									</div>
									<div>
										<span>Slippage</span>
										<strong>{slippage.toFixed(2)}%</strong>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="platform" className="section platform-section">
					<div className="section-copy">
						<p className="eyebrow">Operating layer</p>
						<h2>One workspace for signals, execution, and risk</h2>
						<p>
							Replace scattered venue screens with a focused trading surface
							that keeps strategy teams aligned on market state and execution
							quality.
						</p>
					</div>
					<div className="workflow-grid">
						<article className="workflow-step">
							<span>01</span>
							<h3>Ingest</h3>
							<p>
								Normalize exchange data, order-book events, and portfolio state.
							</p>
						</article>
						<article className="workflow-step">
							<span>02</span>
							<h3>Decide</h3>
							<p>
								Rank opportunities with model signals and configurable risk
								checks.
							</p>
						</article>
						<article className="workflow-step">
							<span>03</span>
							<h3>Execute</h3>
							<p>
								Deploy strategies with venue-aware routing and live guardrails.
							</p>
						</article>
					</div>
				</section>

				<section id="features" className="section features-section">
					<div className="section-copy centered">
						<p className="eyebrow">Capabilities</p>
						<h2>Built for disciplined automated trading</h2>
						<p>
							The homepage now leads with the workflows serious trading teams
							evaluate first: signals, execution, analytics, and risk.
						</p>
					</div>
					<div className="features-grid">
						{featureCards.map((feature) => (
							<article className="feature-card" key={feature.title}>
								<div className="feature-icon">{feature.icon}</div>
								<h3>{feature.title}</h3>
								<p>{feature.body}</p>
							</article>
						))}
					</div>
				</section>

				<section id="markets" className="section markets-section">
					<div className="market-panel">
						<div className="market-copy">
							<p className="eyebrow">Market coverage</p>
							<h2>Live across major crypto venues</h2>
							<p>
								Track spreads, liquidity, and pair-level execution quality from
								the same surface used to run strategies.
							</p>
						</div>
						<div
							className="venue-table"
							role="table"
							aria-label="Market spread preview"
						>
							<div className="venue-row venue-head" role="row">
								<span role="columnheader">Pair</span>
								<span role="columnheader">Price</span>
								<span role="columnheader">24h</span>
								<span role="columnheader">Spread</span>
							</div>
							{marketRows.map((market) => (
								<div className="venue-row" role="row" key={market.symbol}>
									<span role="cell">{market.pair}</span>
									<span className={market.isLoading ? "muted" : ""} role="cell">
										{market.isLoading || market.price === "--"
											? market.price
											: `$${market.price}`}
									</span>
									<span
										className={market.isDown ? "negative" : "positive"}
										role="cell"
									>
										{market.change}
									</span>
									<span role="cell">{market.spread}</span>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>

			<div className="ticker" aria-label="Live crypto prices">
				<div className="ticker-track">
					{[...Array(2)].map((_, i) => (
						<Fragment key={i}>
							{tickerItems.map((ticker) => (
								<TickerItem
									key={`${i}-${ticker.symbol}`}
									symbol={ticker.symbol}
									price={ticker.price}
									change={ticker.change}
									isDown={ticker.isDown}
									isLoading={loading && ticker.price === "Loading"}
								/>
							))}
						</Fragment>
					))}
				</div>
			</div>

			<footer className="footer">
				<div className="footer-content">
					<a className="footer-brand" href="/" aria-label="AdaBet homepage">
						<img src={logoImage} alt="" />
						<span>Algorithmic trading platform</span>
					</a>
					<ul className="footer-links">
						<li>
							<a href="#platform">Platform</a>
						</li>
						<li>
							<a href="#features">Features</a>
						</li>
						<li>
							<a href="#markets">Markets</a>
						</li>
						<li>
							<a href="mailto:hello@adabet.cc">Contact</a>
						</li>
					</ul>
				</div>
			</footer>

			{showDemo && (
				<div className="modal-backdrop" role="presentation">
					<section
						className="modal-card"
						role="dialog"
						aria-modal="true"
						aria-labelledby="demo-title"
					>
						<button
							className="modal-close"
							onClick={() => setShowDemo(false)}
							aria-label="Close demo request"
						>
							<CloseIcon />
						</button>
						<p className="eyebrow">Demo access</p>
						<h2 id="demo-title">See AdaBet on live market workflows</h2>
						<p>
							Share your trading venue mix and strategy needs with the AdaBet
							team. We will tailor the walkthrough around execution quality,
							risk controls, and portfolio monitoring.
						</p>
						<div className="modal-actions">
							<a className="btn btn-primary" href="mailto:hello@adabet.cc">
								Request demo
								<ArrowIcon />
							</a>
							<button
								className="btn btn-secondary"
								onClick={() => setShowDemo(false)}
							>
								Cancel
							</button>
						</div>
					</section>
				</div>
			)}
		</>
	);
}

function TickerItem({
	symbol,
	price,
	change,
	isDown,
	isLoading,
}: {
	symbol: string;
	price: string;
	change: string;
	isDown: boolean;
	isLoading: boolean;
}) {
	return (
		<div className="ticker-item">
			<span className="ticker-symbol">{symbol}</span>
			<span className="ticker-price">{isLoading ? price : `$${price}`}</span>
			<span className={`ticker-change ${isDown ? "down" : ""}`}>{change}</span>
		</div>
	);
}

export default App;
