import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
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
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore - extended in FluidDistortionMaterial.tsx */}
      <fluidDistortionMaterial ref={materialRef} uColorBase={new THREE.Color('#070707')} uColorHighlight={new THREE.Color('#1a1a1a')} />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]} // Limitează randarea pe ecrane Retina/4K
        gl={{ 
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: false
        }}
        performance={{ min: 0.5 }}
      >
        <FluidPlane />
      </Canvas>
      <div className="absolute inset-0 bg-aerflow-dark/20" />
    </div>
  );
}
