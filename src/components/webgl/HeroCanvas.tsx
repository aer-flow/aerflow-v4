import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { FluidDistortionMaterial } from './FluidDistortionMaterial';

// Ensure side effect is loaded
void FluidDistortionMaterial;

function FluidPlane() {
  const materialRef = useRef<any>(null);
  const { viewport, pointer } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Normalizare pointer la 0-1 (UV space)
      materialRef.current.uPointer.set(
        (pointer.x + 1) / 2,
        (pointer.y + 1) / 2
      );
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      {/* @ts-ignore - extended in FluidDistortionMaterial.tsx */}
      <fluidDistortionMaterial ref={materialRef} uColorBase={new THREE.Color('#070707')} uColorHighlight={new THREE.Color('#1a1a1a')} />
    </mesh>
  );
}

function MobileHeroFallback() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#070707] via-[#0d0d0d] to-[#070707]" />
  );
}

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouchDevice || window.innerWidth < 768);
  }, []);

  // On mobile, skip WebGL entirely — use a CSS gradient fallback
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0">
        <MobileHeroFallback />
        <div className="absolute inset-0 bg-aerflow-dark/20" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ 
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: false,
          alpha: false,
        }}
        performance={{ min: 0.5 }}
      >
        <FluidPlane />
      </Canvas>
      <div className="absolute inset-0 bg-aerflow-dark/20" />
    </div>
  );
}
