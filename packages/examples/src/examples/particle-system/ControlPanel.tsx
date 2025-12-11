import { video } from "melonjs";
import type { ParticleSettings } from "./ExampleParticleSystem";

interface ControlPanelProps {
	settings: ParticleSettings;
	onSettingsChange: (settings: ParticleSettings) => void;
	onReset: () => void;
	onTriggerExplosion: (x: number, y: number) => void;
}

export const ControlPanel = ({
	settings,
	onSettingsChange,
	onReset,
	onTriggerExplosion,
}: ControlPanelProps) => {
	const handleChange = (key: keyof ParticleSettings, value: any) => {
		onSettingsChange({
			...settings,
			[key]: value,
		});
	};

	const handleTriggerExplosion = () => {
		onTriggerExplosion(video.renderer.width / 2, video.renderer.height / 2);
	};

	return (
		<div style={panelStyle}>
			<h2 style={headerStyle}>粒子系统控制面板</h2>

			<div style={sectionStyle}>
				<h3 style={sectionHeaderStyle}>基础设置</h3>

				<div style={controlRowStyle}>
					<label style={labelStyle}>粒子总数:</label>
					<input
						type="range"
						min="10"
						max="1500"
						value={settings.totalParticles}
						onChange={(e) =>
							handleChange("totalParticles", Number.parseInt(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.totalParticles}</span>
				</div>

				<div style={controlRowStyle}>
					<label style={labelStyle}>粒子颜色:</label>
					<input
						type="color"
						value={settings.tint}
						onChange={(e) => handleChange("tint", e.target.value)}
						style={colorInputStyle}
					/>
				</div>

				<div style={controlRowStyle}>
					<label style={labelStyle}>叠加模式:</label>
					<input
						type="checkbox"
						checked={settings.textureAdditive}
						onChange={(e) => handleChange("textureAdditive", e.target.checked)}
					/>
				</div>
			</div>

			<div style={sectionStyle}>
				<h3 style={sectionHeaderStyle}>运动设置</h3>

				<div style={controlRowStyle}>
					<label style={labelStyle}>初始速度:</label>
					<input
						type="range"
						min="0"
						max="10"
						step="0.1"
						value={settings.speed}
						onChange={(e) =>
							handleChange("speed", Number.parseFloat(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.speed.toFixed(1)}</span>
				</div>

				<div style={controlRowStyle}>
					<label style={labelStyle}>速度变化:</label>
					<input
						type="range"
						min="0"
						max="5"
						step="0.1"
						value={settings.speedVariation}
						onChange={(e) =>
							handleChange("speedVariation", Number.parseFloat(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.speedVariation.toFixed(1)}</span>
				</div>

				<div style={controlRowStyle}>
					<label style={labelStyle}>重力:</label>
					<input
						type="range"
						min="0"
						max="2"
						step="0.1"
						value={settings.gravity}
						onChange={(e) =>
							handleChange("gravity", Number.parseFloat(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.gravity.toFixed(1)}</span>
				</div>

				<div style={controlRowStyle}>
					<label style={labelStyle}>风力:</label>
					<input
						type="range"
						min="-2"
						max="2"
						step="0.1"
						value={settings.wind}
						onChange={(e) =>
							handleChange("wind", Number.parseFloat(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.wind.toFixed(1)}</span>
				</div>
			</div>

			<div style={sectionStyle}>
				<h3 style={sectionHeaderStyle}>生命周期</h3>

				<div style={controlRowStyle}>
					<label style={labelStyle}>最小生命周期 (ms):</label>
					<input
						type="range"
						min="500"
						max="5000"
						value={settings.minLife}
						onChange={(e) =>
							handleChange("minLife", Number.parseInt(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.minLife}</span>
				</div>

				<div style={controlRowStyle}>
					<label style={labelStyle}>最大生命周期 (ms):</label>
					<input
						type="range"
						min="1000"
						max="10000"
						value={settings.maxLife}
						onChange={(e) =>
							handleChange("maxLife", Number.parseInt(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.maxLife}</span>
				</div>
			</div>

			<div style={sectionStyle}>
				<h3 style={sectionHeaderStyle}>缩放设置</h3>

				<div style={controlRowStyle}>
					<label style={labelStyle}>初始最小缩放:</label>
					<input
						type="range"
						min="0.1"
						max="3"
						step="0.1"
						value={settings.minStartScale}
						onChange={(e) =>
							handleChange("minStartScale", Number.parseFloat(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.minStartScale.toFixed(1)}</span>
				</div>

				<div style={controlRowStyle}>
					<label style={labelStyle}>初始最大缩放:</label>
					<input
						type="range"
						min="0.5"
						max="5"
						step="0.1"
						value={settings.maxStartScale}
						onChange={(e) =>
							handleChange("maxStartScale", Number.parseFloat(e.target.value))
						}
						style={sliderStyle}
					/>
					<span style={valueStyle}>{settings.maxStartScale.toFixed(1)}</span>
				</div>
			</div>

			<div style={buttonContainerStyle}>
				<button onClick={handleTriggerExplosion} style={buttonStyle}>
					触发爆炸效果
				</button>
				<button onClick={onReset} style={buttonStyle}>
					重置发射器
				</button>
			</div>

			<div style={infoStyle}>
				<p>💡 点击画布任意位置可创建自定义爆炸效果</p>
			</div>
		</div>
	);
};

const panelStyle: React.CSSProperties = {
	position: "fixed",
	top: 0,
	right: 0,
	width: "320px",
	backgroundColor: "rgba(20, 20, 30, 0.95)",
	color: "#fff",
	padding: "16px",
	fontFamily: "Arial, sans-serif",
	maxHeight: "100vh",
	overflowY: "auto",
	borderLeft: "2px solid #444",
	zIndex: 1000,
};

const headerStyle: React.CSSProperties = {
	marginTop: 0,
	marginBottom: "16px",
	color: "#ff6600",
	fontSize: "18px",
};

const sectionStyle: React.CSSProperties = {
	marginBottom: "20px",
	paddingBottom: "16px",
	borderBottom: "1px solid #333",
};

const sectionHeaderStyle: React.CSSProperties = {
	fontSize: "14px",
	marginBottom: "12px",
	color: "#aaa",
};

const controlRowStyle: React.CSSProperties = {
	marginBottom: "12px",
	display: "flex",
	alignItems: "center",
	gap: "8px",
};

const labelStyle: React.CSSProperties = {
	fontSize: "12px",
	width: "120px",
	display: "inline-block",
};

const sliderStyle: React.CSSProperties = {
	flex: 1,
};

const colorInputStyle: React.CSSProperties = {
	width: "40px",
	height: "24px",
	border: "none",
	cursor: "pointer",
};

const valueStyle: React.CSSProperties = {
	fontSize: "12px",
	width: "40px",
	textAlign: "right",
	color: "#ff6600",
};

const buttonContainerStyle: React.CSSProperties = {
	display: "flex",
	gap: "8px",
	marginBottom: "16px",
};

const buttonStyle: React.CSSProperties = {
	flex: 1,
	padding: "10px",
	backgroundColor: "#ff6600",
	color: "#fff",
	border: "none",
	borderRadius: "4px",
	cursor: "pointer",
	fontSize: "14px",
};

const infoStyle: React.CSSProperties = {
	fontSize: "12px",
	color: "#888",
	marginTop: "8px",
};
