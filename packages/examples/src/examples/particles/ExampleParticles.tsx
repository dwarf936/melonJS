import { Text, game, video, ParticleEmitter, ParticleEmitterSettings, input } from "melonjs";
import { useEffect, useRef, useState, useCallback } from "react";

// 控制面板样式
const controlPanelStyle = {
  position: 'absolute' as const,
  top: '10px',
  left: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: '15px',
  borderRadius: '8px',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  zIndex: 1000
};

const controlGroupStyle = {
  marginBottom: '12px',
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: '4px'
};

const labelStyle = {
  fontWeight: 'bold'
};

const inputStyle = {
  padding: '4px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#333',
  color: 'white'
};

const buttonStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
  marginRight: '8px',
  marginTop: '8px'
};

interface ParticleControls {
  totalParticles: number;
  minSpeed: number;
  maxSpeed: number;
  minLife: number;
  maxLife: number;
  gravityX: number;
  gravityY: number;
  startColor: string;
  endColor: string;
}

const ExampleParticles = () => {
  const [controls, setControls] = useState<ParticleControls>({
    totalParticles: 200,
    minSpeed: 100,
    maxSpeed: 500,
    minLife: 1000,
    maxLife: 3000,
    gravityX: 0,
    gravityY: 0,
    startColor: "#ff6600",
    endColor: "#ff0000"
  });
  const controlsRef = useRef(controls);
  const emitterRef = useRef<ParticleEmitter | null>(null);
  
  // Update ref when controls change to avoid unnecessary state updates in effects
  useEffect(() => {
    controlsRef.current = controls;
  }, [controls]);

  useEffect(() => {
    if (!game.isInitialized) {
      // Initialize the video
      video.init(1218, 562, { parent: "screen", scale: "auto" });
      
      // Set a dark background color
      game.world.backgroundColor.parseCSS("#101020");

      // Add title text
      game.world.addChild(
        new Text(609, 40, {
          font: "Arial",
          size: 32,
          fillStyle: "#FFFFFF",
          textBaseline: "middle",
          textAlign: "center",
          text: "Particle System Demo - Explosion Effect"
        })
      );
      
      // Add instructions
      game.world.addChild(
        new Text(609, 520, {
          font: "Arial",
          size: 18,
          fillStyle: "#FFFFFF",
          textBaseline: "middle",
          textAlign: "center",
          text: "Click the button below to trigger explosion effect"
        })
      );
    }
  }, []);

  useEffect(() => {
    if (game.isInitialized && !emitterRef.current) {
      const ParticleEmitterSettings = {
        totalParticles: controls.totalParticles,
        pos: { x: 609, y: 281 },
        minLife: controls.minLife,
        maxLife: controls.maxLife,
        minSpeed: controls.minSpeed,
        maxSpeed: controls.maxSpeed,
        startColor: controls.startColor,
        endColor: controls.endColor,
        gravity: { x: controls.gravityX, y: controls.gravityY },
        angle: 0,
        angleVariation: 360,
        size: 16,
        sizeVariation: 8,
        maxParticles: controls.totalParticles,
        duration: 0,
        frequency: 0,
        blending: "additive",
        autoSort: false,
        cullOnlyViewport: true
      } as const;

      const emitter = new ParticleEmitter(ParticleEmitterSettings);
      emitterRef.current = emitter;
      game.world.addChild(emitter);
    }
  }, []);

  useEffect(() => {
    if (emitterRef.current && game.isInitialized) {
      const emitter = emitterRef.current;
      emitter.totalParticles = controls.totalParticles;
      emitter.minLife = controls.minLife;
      emitter.maxLife = controls.maxLife;
      emitter.minSpeed = controls.minSpeed;
      emitter.maxSpeed = controls.maxSpeed;
      if (emitter.startColor) {
        emitter.startColor.parseCSS(controls.startColor);
      }
      if (emitter.endColor) {
        emitter.endColor.parseCSS(controls.endColor);
      }
      emitter.gravity.set(controls.gravityX, controls.gravityY);
    }
  }, [controls]);

  // Handle input changes
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setControls(prev => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value)
    }));
  }, []);

  // Memoized handlers
  const handleExplosionClick = useCallback(() => {
    if (emitterRef.current) {
      emitterRef.current.pos.set(609, 281);
      emitterRef.current.burstParticles(controls.totalParticles);
    }
  }, [controls.totalParticles]);

  return (
    <>
      <div style={controlPanelStyle}>
        <h3 style={{ margin: "0 0 15px 0", paddingBottom: "8px", borderBottom: "1px solid #444" }}>Particle System Controls</h3>
        
        <div style={controlGroupStyle}>
          <label style={labelStyle}>Total Particles: {controls.totalParticles}</label>
          <input type="range" min="100" max="2000" value={controls.totalParticles} onChange={handleInputChange} name="totalParticles" style={inputStyle} />
        </div>

        <div style={controlGroupStyle}>
          <label style={labelStyle}>Min Speed: {controls.minSpeed}</label>
          <input type="range" min="0" max="500" value={controls.minSpeed} onChange={handleInputChange} name="minSpeed" style={inputStyle} />
        </div>

        <div style={controlGroupStyle}>
          <label style={labelStyle}>Max Speed: {controls.maxSpeed}</label>
          <input type="range" min="50" max="1000" value={controls.maxSpeed} onChange={handleInputChange} name="maxSpeed" style={inputStyle} />
        </div>

        <div style={controlGroupStyle}>
          <label style={labelStyle}>Min Life: {controls.minLife}ms</label>
          <input type="range" min="500" max="3000" value={controls.minLife} onChange={handleInputChange} name="minLife" style={inputStyle} />
        </div>

        <div style={controlGroupStyle}>
          <label style={labelStyle}>Max Life: {controls.maxLife}ms</label>
          <input type="range" min="1000" max="5000" value={controls.maxLife} onChange={handleInputChange} name="maxLife" style={inputStyle} />
        </div>

        <div style={controlGroupStyle}>
          <label style={labelStyle}>Gravity X: {controls.gravityX}</label>
          <input type="range" min="-500" max="500" value={controls.gravityX} onChange={handleInputChange} name="gravityX" style={inputStyle} />
        </div>

        <div style={controlGroupStyle}>
          <label style={labelStyle}>Gravity Y: {controls.gravityY}</label>
          <input type="range" min="-500" max="500" value={controls.gravityY} onChange={handleInputChange} name="gravityY" style={inputStyle} />
        </div>

        <div style={controlGroupStyle}>
          <label style={labelStyle}>Start Color:</label>
          <input type="color" value={controls.startColor} onChange={handleInputChange} name="startColor" style={{ ...inputStyle, height: "30px" }} />
        </div>

        <div style={controlGroupStyle}>
          <label style={labelStyle}>End Color:</label>
          <input type="color" value={controls.endColor} onChange={handleInputChange} name="endColor" style={{ ...inputStyle, height: "30px" }} />
        </div>

        <button onClick={handleExplosionClick} style={buttonStyle}>
          Trigger Explosion
        </button>
      </div>
    </>
  );
};

export { ExampleParticles };