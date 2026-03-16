import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uColorBase;
  uniform vec3 uColorHighlight;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float distToMouse = distance(uv, uPointer);

    vec2 distortedUv = uv + snoise(uv * 3.0 + uTime * 0.1) * 0.1;
    distortedUv += snoise(uv * 5.0 - uTime * 0.05) * 0.05;

    float mouseInfluence = smoothstep(0.5, 0.0, distToMouse);
    distortedUv += (uv - uPointer) * mouseInfluence * 0.2;

    float n = snoise(distortedUv * 4.0 + uTime * 0.2);
    vec3 finalColor = mix(uColorBase, uColorHighlight, n * 0.5 + 0.5 + (mouseInfluence * 0.5));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

class FluidDistortionMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uColorBase: { value: new THREE.Color('#070707') },
        uColorHighlight: { value: new THREE.Color('#1a1a1a') },
      },
      vertexShader,
      fragmentShader,
    });
  }

  get uTime() {
    return this.uniforms.uTime.value as number;
  }

  set uTime(value: number) {
    this.uniforms.uTime.value = value;
  }

  get uPointer() {
    return this.uniforms.uPointer.value as THREE.Vector2;
  }

  get uColorBase() {
    return this.uniforms.uColorBase.value as THREE.Color;
  }

  set uColorBase(value: THREE.Color) {
    this.uniforms.uColorBase.value = value;
  }

  get uColorHighlight() {
    return this.uniforms.uColorHighlight.value as THREE.Color;
  }

  set uColorHighlight(value: THREE.Color) {
    this.uniforms.uColorHighlight.value = value;
  }
}

extend({ FluidDistortionMaterial });

export { FluidDistortionMaterial };
