import { ParticleEmitter, game, input, video } from "melonjs";
import { useState } from "react";
import { createExampleComponent } from "../utils";
import { ControlPanel } from "./ControlPanel";

// Particle settings interface for our control panel
export interface ParticleSettings {
	totalParticles: number;
	tint: string;
	angle: number;
	angleVariation: number;
	minLife: number;
	maxLife: number;
	speed: number;
	speedVariation: number;
	gravity: number;
	wind: number;
	minStartScale: number;
	maxStartScale: number;
	minEndScale: number;
	maxEndScale: number;
	textureAdditive: boolean;
}

export const ExampleParticleSystem = () => {
	const [settings, setSettings] = useState<ParticleSettings>({
		totalParticles: 300,
		tint: "#ff6600",
		angle: Math.PI / 2,
		angleVariation: Math.PI * 2,
		minLife: 1000,
		maxLife: 3000,
		speed: 3,
		speedVariation: 2,
		gravity: 0.5,
		wind: 0,
		minStartScale: 0.5,
		maxStartScale: 1.5,
		minEndScale: 0,
		maxEndScale: 0,
		textureAdditive: true,
	});

	const resetEmitter = () => {
		const existingEmitters = game.world.getChildByName("explosion-emitter");
		if (existingEmitters && existingEmitters.length > 0) {
			game.world.removeChild(existingEmitters[0]);
		}
	};

	const createExplosion = (x: number, y: number) => {
		resetEmitter();

		// Create a particle emitter at the clicked position
		const emitter = new ParticleEmitter(x, y, {
			width: 32,
			height: 32,
			image: undefined,
			textureSize: 8,
			totalParticles: settings.totalParticles,
			tint: settings.tint,
			angle: settings.angle,
			angleVariation: settings.angleVariation,
			minLife: settings.minLife,
			maxLife: settings.maxLife,
			speed: settings.speed,
			speedVariation: settings.speedVariation,
			gravity: settings.gravity,
			wind: settings.wind,
			minStartScale: settings.minStartScale,
			maxStartScale: settings.maxStartScale,
			minEndScale: settings.minEndScale,
			maxEndScale: settings.maxEndScale,
			minRotation: 0,
			maxRotation: Math.PI * 2,
			followTrajectory: false,
			textureAdditive: settings.textureAdditive,
			blendMode: "normal",
			onlyInViewport: true,
			floating: false,
			maxParticles: 10,
			frequency: 100,
			duration: Number.POSITIVE_INFINITY,
			framesToSkip: 0,
		});

		emitter.name = "explosion-emitter";

		// Add the emitter to the game world
		game.world.addChild(emitter);

		// Launch all particles in an explosion
		emitter.burstParticles(settings.totalParticles);
	};

	const gameComponent = createExampleComponent(() => {
		// Initialize the video
		video.init(1218, 562, { parent: "screen", scale: "auto" });

		// Set a dark background color
		game.world.backgroundColor.parseCSS("#101020");

		// Add pointer event listener for mouse clicks/taps
		const canvas = video.renderer.getCanvas() as HTMLCanvasElement;
		input.registerPointerEvent("pointerdown", canvas, (e: PointerEvent) => {
			const pos = video.renderer.screenToWorld(e.clientX, e.clientY);
			createExplosion(pos.x, pos.y);
		});

		// Create initial explosion in center
		setTimeout(() => {
			createExplosion(video.renderer.width / 2, video.renderer.height / 2);
		}, 500);
	});

	return (
		<>
			{gameComponent()}
			<ControlPanel
				settings={settings}
				onSettingsChange={setSettings}
				onReset={resetEmitter}
				onTriggerExplosion={createExplosion}
			/>
		</>
	);
};
