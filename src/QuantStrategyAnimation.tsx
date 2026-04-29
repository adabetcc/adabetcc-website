import {
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

interface QuantStrategyAnimationProps {
	btcPrice: number;
	btcChange24h: number;
}

const points = Array.from({ length: 18 }, (_, index) => index);
const orders = Array.from({ length: 9 }, (_, index) => index);

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

function buildPath(price: number, change: number, frame: number) {
	const baseline = 226 - clamp(change, -8, 8) * 7;

	return points
		.map((point, index) => {
			const x = 28 + point * 43;
			const wave = Math.sin((frame + point * 13 + price / 93) / 12) * 21;
			const trend = index * -2.2;
			const y = clamp(baseline + wave + trend, 52, 262);

			return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
		})
		.join(" ");
}

export function QuantStrategyAnimation({
	btcPrice,
	btcChange24h,
}: QuantStrategyAnimationProps) {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const intro = spring({
		frame,
		fps,
		config: {
			damping: 18,
			mass: 0.8,
			stiffness: 110,
		},
	});
	const sweep = interpolate(frame % (fps * 3), [0, fps * 3], [-18, 118], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const pulse = interpolate(frame % fps, [0, fps * 0.5, fps], [0.35, 1, 0.35], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const pricePath = buildPath(btcPrice, btcChange24h, frame);
	const quote = btcPrice.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	const signalStrength = clamp(62 + Math.abs(btcChange24h) * 4.5 + pulse * 8, 58, 96);

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				borderRadius: 8,
				background:
					"linear-gradient(135deg, rgba(7,12,9,0.96), rgba(13,28,19,0.96))",
				border: "1px solid rgba(0,255,136,0.16)",
				opacity: Math.max(intro, 0.95),
				transform: `scale(${Math.max(intro, 0.95) * 0.04 + 0.96})`,
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
					backgroundSize: "72px 52px",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: 18,
					left: 18,
					right: 18,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					fontFamily: "SF Mono, Roboto Mono, ui-monospace, monospace",
				}}
			>
				<div>
					<div style={{ color: "#819187", fontSize: 14, fontWeight: 800 }}>
						BTC REALTIME
					</div>
					<div style={{ color: "#F6FFF9", fontSize: 25, fontWeight: 900 }}>
						${quote}
					</div>
				</div>
				<div
					style={{
						padding: "8px 10px",
						color: "#061008",
						background: "#00FF88",
						borderRadius: 999,
						fontSize: 13,
						fontWeight: 900,
					}}
				>
					BUY BIAS
				</div>
			</div>

			<svg
				viewBox="0 0 792 320"
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					width: "100%",
					height: "77%",
				}}
			>
				<defs>
					<linearGradient id="tradeLine" x1="28" y1="0" x2="760" y2="0">
						<stop stopColor="#3DDBD9" />
						<stop offset="0.48" stopColor="#00FF88" />
						<stop offset="1" stopColor="#B6FF6A" />
					</linearGradient>
					<linearGradient id="tradeFill" x1="0" y1="0" x2="0" y2="1">
						<stop stopColor="#00FF88" stopOpacity="0.24" />
						<stop offset="1" stopColor="#00FF88" stopOpacity="0" />
					</linearGradient>
				</defs>
				<path
					d={`${pricePath} L 759 320 L 28 320 Z`}
					fill="url(#tradeFill)"
					opacity={0.8}
				/>
				<path
					d={pricePath}
					fill="none"
					stroke="url(#tradeLine)"
					strokeWidth="6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<line
					x1={(sweep / 100) * 792}
					y1="28"
					x2={(sweep / 100) * 792}
					y2="296"
					stroke="#3DDBD9"
					strokeWidth="2"
					opacity="0.65"
				/>
			</svg>

			<div
				style={{
					position: "absolute",
					left: 18,
					right: 18,
					bottom: 16,
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					gap: 10,
				}}
			>
				{orders.map((order) => {
					const local = (frame + order * 8) % 72;
					const opacity = interpolate(local, [0, 18, 72], [0, 1, 0.18], {
						extrapolateLeft: "clamp",
						extrapolateRight: "clamp",
					});
					const side = order % 3 === 0 ? "ARB" : order % 2 === 0 ? "MAKER" : "HEDGE";

					return (
						<div
							key={order}
							style={{
								minHeight: 29,
								padding: "6px 8px",
								color: order % 2 === 0 ? "#00FF88" : "#3DDBD9",
								background: "rgba(255,255,255,0.045)",
								border: "1px solid rgba(255,255,255,0.075)",
								borderRadius: 7,
								fontFamily: "SF Mono, Roboto Mono, ui-monospace, monospace",
								fontSize: 11,
								fontWeight: 800,
								opacity,
							}}
						>
							{side} #{Math.floor(8300 + frame * 1.7 + order * 13)}
						</div>
					);
				})}
			</div>

			<div
				style={{
					position: "absolute",
					top: 86,
					right: 18,
					width: 142,
					padding: 12,
					background: "rgba(0,0,0,0.24)",
					border: "1px solid rgba(0,255,136,0.15)",
					borderRadius: 8,
					fontFamily: "SF Mono, Roboto Mono, ui-monospace, monospace",
				}}
			>
				<div style={{ color: "#819187", fontSize: 11, fontWeight: 800 }}>
					SIGNAL
				</div>
				<div style={{ color: "#00FF88", fontSize: 24, fontWeight: 900 }}>
					{signalStrength.toFixed(0)}%
				</div>
			</div>
		</div>
	);
}
