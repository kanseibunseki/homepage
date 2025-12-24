import { EMOTION_CONFIG } from '../constants/emotionConfig'

export const vertexShader = `
  uniform float atlasSize;
  uniform float time;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  
  attribute vec2 uvOffset;
  attribute float scale;
  attribute float rotation;
  attribute vec3 color;
  attribute float randomOffset;
  attribute float iconIndex;
  
  varying vec2 vUvOffset;
  varying vec3 vColor;
  varying float vAtlasSize;
  varying float vOpacity;
  varying float vIconIndex;
  
  void main() {
    vUvOffset = uvOffset;
    vColor = color;
    vAtlasSize = atlasSize;
    vIconIndex = iconIndex;
    
    vec3 pos = position;
    
    // マウスインタラクション
    vec2 mousePos = uMouse * 300.0;
    float mouseDistance = distance(pos.xy, mousePos);
    float mouseInfluence = smoothstep(uMouseInfluence * 2.0, 0.0, mouseDistance);
    
    // マウスから離れる動き
    if (mouseDistance < uMouseInfluence * 2.0) {
      vec2 direction = normalize(pos.xy - mousePos);
      pos.xy += direction * mouseInfluence * 30.0;
    }
    
    // 浮遊アニメーション
    float floatY = sin(time + randomOffset * 6.28) * 5.0;
    float floatX = cos(time * 0.7 + randomOffset * 6.28) * 3.0;
    pos.x += floatX;
    pos.y += floatY;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    float distanceScale = 300.0 / length(mvPosition.xyz);
    gl_PointSize = scale * ${EMOTION_CONFIG.particles.size}.0 * distanceScale;
    
    // 距離に応じた透明度
    vOpacity = smoothstep(500.0, 100.0, length(mvPosition.xyz));
    vOpacity *= 0.7 + sin(time * 2.0 + randomOffset * 6.28) * 0.3;
  }
`

export const fragmentShader = `
  uniform sampler2D map;
  uniform float time;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  varying vec2 vUvOffset;
  varying vec3 vColor;
  varying float vAtlasSize;
  varying float vOpacity;
  varying float vIconIndex;
  
  void main() {
    // Y座標を反転
    vec2 uv = vUvOffset + vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y) / vAtlasSize;
    vec4 texColor = texture2D(map, uv);
    
    if (texColor.a < 0.01) discard;
    
    // グロー効果
    float glow = sin(time * 2.0 + vIconIndex * 0.5) * 0.3 + 0.7;
    
    // カラーグラデーション
    vec3 gradientColor = mix(uColor1, uColor2, sin(time + vIconIndex) * 0.5 + 0.5);
    
    // 元の色と混合
    vec3 finalColor = texColor.rgb;
    
    // 白い部分にグラデーションカラーを適用
    float brightness = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
    if (brightness > 0.8) {
      finalColor = mix(finalColor, gradientColor, 0.5);
    }
    
    // グロー効果を適用
    finalColor *= glow + 0.5;
    
    // エッジフェード（円形にフェードアウト）
    float dist = distance(gl_PointCoord, vec2(0.5));
    float edgeFade = 1.0 - smoothstep(0.4, 0.5, dist);
    
    // 最終的な透明度
    float finalAlpha = texColor.a * vOpacity * edgeFade;
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`
