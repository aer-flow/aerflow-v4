import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const FluidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uPointer: new THREE.Vector2(0, 0),
    uColorBase: new THREE.Color('#070707'),
    uColorHighlight: new THREE.Color('#1a1a1a'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Fizică Fluidă / Noise Viscos)
  `
    uniform float uTime;
    uniform vec2 uPointer;
    uniform vec3 uColorBase;
    uniform vec3 uColorHighlight;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float distToMouse = distance(uv, uPointer);
      
      // Deformare fluidă bazată pe timp și pointer
      vec2 distortedUv = uv + snoise(uv * 3.0 + uTime * 0.1) * 0.1;
      distortedUv += snoise(uv * 5.0 - uTime * 0.05) * 0.05;

      float mouseInfluence = smoothstep(0.5, 0.0, distToMouse);
      distortedUv += (uv - uPointer) * mouseInfluence * 0.2;

      float n = snoise(distortedUv * 4.0 + uTime * 0.2);
      
      // Amestec viscoz de culori
      vec3 finalColor = mix(uColorBase, uColorHighlight, n * 0.5 + 0.5 + (mouseInfluence * 0.5));
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ FluidDistortionMaterial });

export { FluidDistortionMaterial };
