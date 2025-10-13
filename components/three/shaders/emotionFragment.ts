export const emotionFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uAtlasGrid;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  varying vec2 vUv;
  varying float vIconIndex;
  varying float vOpacity;
  varying float vScale;
  
  void main() {
    // アトラスから適切なテクスチャ座標を計算
    float gridSize = uAtlasGrid.x;
    float col = mod(vIconIndex, gridSize);
    float row = floor(vIconIndex / gridSize);
    
    // UV座標を計算（Y座標を反転）
    vec2 atlasUv = vec2(
      (col + gl_PointCoord.x) / gridSize,
      (row + (1.0 - gl_PointCoord.y)) / gridSize
    );
    
    // テクスチャサンプリング
    vec4 texColor = texture2D(uTexture, atlasUv);
    
    // アイコンがない部分は透明に
    if (texColor.a < 0.01) {
      discard;
    }
    
    // グロー効果
    float glow = sin(uTime * 2.0 + vIconIndex * 0.5) * 0.3 + 0.7;
    
    // カラーグラデーション
    vec3 gradientColor = mix(uColor1, uColor2, sin(uTime + vIconIndex) * 0.5 + 0.5);
    
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