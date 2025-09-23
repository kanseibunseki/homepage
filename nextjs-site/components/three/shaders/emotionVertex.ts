export const emotionVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  
  attribute float iconIndex;
  attribute vec3 velocity;
  attribute float scale;
  attribute float randomOffset;
  
  varying vec2 vUv;
  varying float vIconIndex;
  varying float vOpacity;
  varying float vScale;
  
  void main() {
    vIconIndex = iconIndex;
    vUv = uv;
    
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
    float floatY = sin(uTime + randomOffset * 6.28) * 5.0;
    float floatX = cos(uTime * 0.7 + randomOffset * 6.28) * 3.0;
    pos.x += floatX;
    pos.y += floatY;
    
    // 回転アニメーション（個別の速度）
    float rotation = uTime * (0.5 + randomOffset * 0.5);
    mat2 rot = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation));
    pos.xy = rot * pos.xy;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // 距離に応じたサイズ調整
    float distanceScale = 300.0 / length(mvPosition.xyz);
    vScale = scale * (0.8 + randomOffset * 0.4);
    gl_PointSize = vScale * distanceScale;
    
    // 距離に応じた透明度
    vOpacity = smoothstep(500.0, 100.0, length(mvPosition.xyz));
    vOpacity *= 0.7 + sin(uTime * 2.0 + randomOffset * 6.28) * 0.3;
  }
`