export const rippleVertexShader = `
  uniform float uTime;
  uniform float uRadius;
  uniform float uIntensity;
  
  varying vec2 vUv;
  varying float vDistance;
  
  void main() {
    vUv = uv;
    
    // 中心からの距離を計算
    vDistance = length(position.xy);
    
    // 波のアニメーション
    float wave = sin(vDistance * 0.1 - uTime * 3.0) * uIntensity;
    vec3 pos = position;
    pos.z += wave * 5.0 * (1.0 - vDistance / uRadius);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`