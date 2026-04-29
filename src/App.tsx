import React, { useState } from "react";

// Crypto icons as inline SVGs
const BitcoinIcon = () => (
	<svg viewBox="0 0 48 48" fill="none">
		<circle cx="24" cy="24" r="23" stroke="#f7931a" strokeWidth="2" />
		<path
			d="M24 12v24m-6-6l6-18 6 6-6 18-6-6z"
			stroke="#f7931a"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

const EthereumIcon = () => (
	<svg viewBox="0 0 48 48" fill="none">
		<circle cx="24" cy="24" r="23" stroke="#627eea" strokeWidth="2" />
		<circle cx="24" cy="24" r="12" stroke="#627eea" strokeWidth="2" />
		<circle cx="24" cy="24" r="4" fill="#627eea" />
	</svg>
);

const SolanaIcon = () => (
	<svg viewBox="0 0 48 48" fill="none">
		<circle cx="24" cy="24" r="23" stroke="#9945ff" strokeWidth="2" />
		<path
			d="M24 6l12 21h-10l-2-13h-4l-2 13H12z"
			stroke="#9945ff"
			strokeWidth="2"
		/>
	</svg>
);

function App() {
	const [showDemo, setShowDemo] = useState(false);

	return (
		<>
			{/* Header */}
			<header className="header">
				<div className="logo">
					<svg width="120" height="42" viewBox="0 0 180 60" fill="none">
						<polygon points="90 0 135 22.5 90 45 45 22.5 90 0" fill="#1A1A1A" />
						<polygon
							points="90 0 135 22.5 90 45 45 22.5 90 0"
							stroke="#00FF88"
							strokeWidth="1"
						/>
						<text
							x="90"
							y="32"
							textAnchor="middle"
							fontFamily="system-ui"
							fontSize="24"
							fontWeight="700"
							fill="#FFFFFF"
						>
							AdaBet
						</text>
						<text
							x="90"
							y="52"
							textAnchor="middle"
							fontFamily="system-ui"
							fontSize="10"
							fill="#00FF88"
						>
							A ↔ B
						</text>
					</svg>
				</div>
				<nav>
					<ul className="nav-links">
						<li>
							<a href="#features">Features</a>
						</li>
						<li>
							<a href="#">Platform</a>
						</li>
						<li>
							<a href="#">Pricing</a>
						</li>
					</ul>
				</nav>
			</header>

			{/* Hero */}
			<section className="hero">
				<div className="hero-content">
					<h1>Quantum Trading, Refined</h1>
					<p className="subtitle">
						AdaBet delivers institutional-grade algorithmic trading with
						AI-driven signal processing, lightning-fast execution, and real-time
						portfolio analytics. Built for crypto, scaled for market making.
					</p>
					<div className="hero-buttons">
						<button
							className="btn btn-primary"
							onClick={() => setShowDemo(true)}
						>
							Start Free Trial
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<path
									d="M5 12h14M12 5l7 7-7 7"
									stroke="#000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<button className="btn btn-secondary">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<rect
									x="2"
									y="2"
									width="20"
									height="20"
									rx="4"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<path
									d="M2 12h20M12 2v20"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							Schedule Demo
						</button>
					</div>
				</div>

				{/* Stats */}
				<div className="stats">
					<div className="stat-item">
						<div className="stat-value">$4.2B+</div>
						<div className="stat-label">Volume Processed</div>
					</div>
					<div className="stat-item">
						<div className="stat-value">12ms</div>
						<div className="stat-label">Avg Execution</div>
					</div>
					<div className="stat-item">
						<div className="stat-value">99.99%</div>
						<div className="stat-label">Uptime</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section id="features" className="features">
				<h2>Engineered for Alpha</h2>
				<p>
					From multi-exchange arbitrage to TWAP execution — AdaBet handles it
					all with military-grade precision.
				</p>
				<div className="features-grid">
					{/* Feature 1 */}
					<div className="feature-card">
						<div className="feature-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
								<path
									d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<h3>AI Signal Processing</h3>
						<p>
							Deep learning models analyze millions of data points across
							exchanges to identify alpha opportunities before the crowd.
						</p>
					</div>

					{/* Feature 2 */}
					<div className="feature-card">
						<div className="feature-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
								<path
									d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M3 14l4-3 4 3 4-3 4 3"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<h3>Multi-Exchange Execution</h3>
						<p>
							Seamlessly execute across Binance, Coinbase, Kraken, and 50+
							exchanges with unified order routing and cross-exchange arbitrage.
						</p>
					</div>

					{/* Feature 3 */}
					<div className="feature-card">
						<div className="feature-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
								<rect
									x="2"
									y="3"
									width="20"
									height="14"
									rx="2"
									stroke="#00FF88"
									strokeWidth="2"
								/>
								<line
									x1="2"
									y1="8"
									x2="22"
									y2="8"
									stroke="#00FF88"
									strokeWidth="2"
								/>
								<line
									x1="8"
									y1="14"
									x2="16"
									y2="14"
									stroke="#00FF88"
									strokeWidth="2"
								/>
								<line
									x1="8"
									y1="18"
									x2="16"
									y2="18"
									stroke="#00FF88"
									strokeWidth="2"
								/>
							</svg>
						</div>
						<h3>Real-Time Analytics</h3>
						<p>
							Monitor P&L, execution quality, and slippage with sub-millisecond
							updates. Customize dashboards for any strategy.
						</p>
					</div>

					{/* Feature 4 */}
					<div className="feature-card">
						<div className="feature-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
								<path
									d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8 11h8M12 7v8"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<h3>Market Making Bot</h3>
						<p>
							Deploy liquidity with adaptive order placement, spread management,
							and inventory hedging across any asset class.
						</p>
					</div>

					{/* Feature 5 */}
					<div className="feature-card">
						<div className="feature-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
								<circle
									cx="12"
									cy="12"
									r="3"
									stroke="#00FF88"
									strokeWidth="2"
								/>
								<path
									d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<h3>Advanced Risk Management</h3>
						<p>
							Pre-trade validation, position limits, and circuit breakers built
							in. Never risk more than you can handle.
						</p>
					</div>

					{/* Feature 6 */}
					<div className="feature-card">
						<div className="feature-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
								<path
									d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 2v4"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 18v4"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M4.93 4.93l2.83 2.83"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M16.24 16.24l2.83 2.83"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M4.93 19.07l2.83-2.83"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M16.24 7.76l2.83-2.83"
									stroke="#00FF88"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<h3>Backtesting Engine</h3>
						<p>
							Validate your strategies on historical data across multiple
							timeframes. Simulate real market conditions with realistic fee
							modeling.
						</p>
					</div>
				</div>

				{/* Crypto Icons */}
				<div style={{ marginTop: "2rem", textAlign: "center" }}>
					<p
						style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}
					>
						Live on major exchanges
					</p>
					<div className="crypto-icons">
						<div className="crypto-icon" title="Bitcoin">
							<BitcoinIcon />
						</div>
						<div className="crypto-icon" title="Ethereum">
							<EthereumIcon />
						</div>
						<div className="crypto-icon" title="Solana">
							<SolanaIcon />
						</div>
					</div>
				</div>
			</section>

			{/* Lower Ticker */}
			<div className="ticker">
				<div className="ticker-track">
					{[...Array(2)].map((_, i) => (
						<React.Fragment key={i}>
							<TickerItem symbol="BTC/USDT" price="64235.50" change="+2.34%" />
							<TickerItem symbol="ETH/USDT" price="3456.20" change="+1.87%" />
							<TickerItem symbol="SOL/USDT" price="142.80" change="+5.12%" />
							<TickerItem symbol="XRP/USDT" price="0.5234" change="-0.45%" />
							<TickerItem symbol="ADA/USDT" price="0.4521" change="+0.89%" />
							<TickerItem symbol="DOGE/USDT" price="0.1234" change="+3.21%" />
							<TickerItem symbol="AVAX/USDT" price="35.67" change="+1.56%" />
							<TickerItem symbol="MATIC/USDT" price="0.8921" change="-1.23%" />
						</React.Fragment>
					))}
				</div>
			</div>

			{/* Footer */}
			<footer className="footer">
				<div className="footer-content">
					<div className="footer-logo">
						<svg width="80" height="32" viewBox="0 0 180 60" fill="none">
							<polygon
								points="90 0 135 22.5 90 45 45 22.5 90 0"
								fill="#1A1A1A"
							/>
							<polygon
								points="90 0 135 22.5 90 45 45 22.5 90 0"
								stroke="#00FF88"
								strokeWidth="1"
							/>
							<text
								x="90"
								y="32"
								textAnchor="middle"
								fontFamily="system-ui"
								fontSize="20"
								fontWeight="600"
								fill="#FFFFFF"
							>
								AdaBet
							</text>
						</svg>
						<span>Algorithmic Trading Platform</span>
					</div>
					<ul className="footer-links">
						<li>
							<a href="#">Documentation</a>
						</li>
						<li>
							<a href="#">API</a>
						</li>
						<li>
							<a href="#">Status</a>
						</li>
						<li>
							<a href="#">Blog</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
					</ul>
				</div>
			</footer>

			{/* Demo Modal */}
			{showDemo && (
				<div
					style={{
						position: "fixed",
						inset: 0,
						background: "rgba(0, 0, 0, 0.8)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 200,
						padding: "2rem",
					}}
				>
					<div
						style={{
							background: "#111",
							border: "1px solid #333",
							borderRadius: "12px",
							padding: "2rem",
							maxWidth: "500px",
							width: "100%",
							textAlign: "center",
						}}
					>
						<h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
							Demo Access
						</h2>
						<p style={{ color: "#999", marginBottom: "1.5rem" }}>
							Get full access to AdaBet's institutional trading tools.
						</p>
						<button
							className="btn btn-primary"
							onClick={() => setShowDemo(false)}
							style={{
								width: "100%",
								justifyContent: "center",
								margin: "0.5rem 0",
							}}
						>
							Request Demo
						</button>
						<button
							className="btn btn-secondary"
							onClick={() => setShowDemo(false)}
							style={{ width: "100%", justifyContent: "center" }}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</>
	);
}

function TickerItem({
	symbol,
	price,
	change,
}: {
	symbol: string;
	price: string;
	change: string;
}) {
	const isDown = change.startsWith("-");
	return (
		<div className="ticker-item">
			<span className="ticker-symbol">{symbol}</span>
			<span className="ticker-price">${price}</span>
			<span className={`ticker-change ${isDown ? "down" : ""}`}>{change}</span>
		</div>
	);
}

export default App;
