export const rippleFragmentShader = `
  uniform float uTime;
  uniform float uRadius;
  uniform float uIntensity;
  uniform float uLifeTime;
  uniform vec3 uColor;
  
  varying vec2 vUv;
  varying float vDistance;
  
  void main() {
    // 中心からの距離に基づくアルファ値
    float distanceAlpha = 1.0 - smoothstep(0.0, uRadius, vDistance);
    
    // 時間経過によるフェードアウト
    float timeAlpha = 1.0 - (uLifeTime / 3.0); // 3秒でフェードアウト
    
    // 波紋のリング効果
    float ring = smoothstep(uRadius * 0.8, uRadius, vDistance) * 
                 (1.0 - smoothstep(uRadius, uRadius * 1.2, vDistance));
    
    // パルスアニメーション
    float pulse = sin(uTime * 10.0 - vDistance * 0.5) * 0.5 + 0.5;
    
    // 最終的な透明度
    float alpha = distanceAlpha * timeAlpha * uIntensity * (0.3 + ring * 0.7);
    alpha *= 0.6; // 全体的な透明度調整
    
    // グロー効果
    vec3 color = uColor;
    color += vec3(pulse * 0.2);
    
    // エッジグロー
    if (ring > 0.1) {
      color *= 1.5;
    }
    
    gl_FragColor = vec4(color, alpha);
  }
`