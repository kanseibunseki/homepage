'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import * as THREE from 'three'
import { EMOTION_CONFIG } from './constants/emotionConfig'
import { TextureAtlasGenerator } from './utils/textureAtlasGenerator'
import { features } from '@/config/features'

/**
 * 感情パーティクルコンポーネント
 */
function EmotionParticles({ texture }: { texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const velocitiesRef = useRef<Float32Array>(null!)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { size, camera } = useThree()

  // パーティクルの初期設定
  const particleCount = EMOTION_CONFIG.particles.count
  
  // 重み付きランダム選択
  const selectRandomIcon = () => {
    const emotions = EMOTION_CONFIG.emotions
    const totalWeight = emotions.reduce((sum, e) => sum + e.weight, 0)
    let random = Math.random() * totalWeight
    
    for (let i = 0; i < emotions.length && i < 16; i++) {
      random -= emotions[i].weight
      if (random <= 0) {
        return i
      }
    }
    return 0
  }

  const [positions, uvOffsets, scales, rotations, colors, randomOffsets, iconIndices] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const uvOffsets = new Float32Array(particleCount * 2)
    const scales = new Float32Array(particleCount)
    const rotations = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)
    const randomOffsets = new Float32Array(particleCount)
    const iconIndices = new Float32Array(particleCount)

    const emotions = EMOTION_CONFIG.emotions
    const bounds = EMOTION_CONFIG.particles.bounds

    for (let i = 0; i < particleCount; i++) {
      // ランダムな位置
      positions[i * 3] = (Math.random() - 0.5) * bounds.width
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.height
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.depth

      // ランダムな速度
      velocities[i * 3] = (Math.random() - 0.5) * EMOTION_CONFIG.particles.speed
      velocities[i * 3 + 1] = (Math.random() - 0.5) * EMOTION_CONFIG.particles.speed
      velocities[i * 3 + 2] = (Math.random() - 0.5) * EMOTION_CONFIG.particles.speed

      // 重み付きランダムな感情を選択
      const emotionIndex = selectRandomIcon()
      iconIndices[i] = emotionIndex
      const gridX = emotionIndex % EMOTION_CONFIG.atlas.gridSize
      const gridY = Math.floor(emotionIndex / EMOTION_CONFIG.atlas.gridSize)
      
      uvOffsets[i * 2] = gridX / EMOTION_CONFIG.atlas.gridSize
      uvOffsets[i * 2 + 1] = gridY / EMOTION_CONFIG.atlas.gridSize

      // スケール
      scales[i] = 0.8 + Math.random() * 0.4
      rotations[i] = Math.random() * Math.PI * 2
      randomOffsets[i] = Math.random()

      // カラー（白色に設定、グラデーションはシェーダーで処理）
      colors[i * 3] = 1.0
      colors[i * 3 + 1] = 1.0
      colors[i * 3 + 2] = 1.0
    }

    velocitiesRef.current = velocities
    return [positions, uvOffsets, scales, rotations, colors, randomOffsets, iconIndices]
  }, [particleCount])

  // 接続線の初期設定
  const linePositions = useMemo(() => {
    return new Float32Array(particleCount * particleCount * 6)
  }, [particleCount])

  const lineColors = useMemo(() => {
    return new Float32Array(particleCount * particleCount * 6)
  }, [particleCount])

  // マウス位置の更新
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // アニメーションループ
  useFrame((state, delta) => {
    if (!meshRef.current || !linesRef.current) return

    const positionsAttr = meshRef.current.geometry.attributes.position
    const positions = positionsAttr.array as Float32Array
    const velocities = velocitiesRef.current
    const bounds = EMOTION_CONFIG.particles.bounds
    
    // シェーダーのuniform更新
    if (shaderMaterial.uniforms.time) {
      shaderMaterial.uniforms.time.value += delta
    }
    if (shaderMaterial.uniforms.uMouse) {
      shaderMaterial.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
    }

    // パーティクルの位置更新
    for (let i = 0; i < particleCount; i++) {
      // 位置更新
      positions[i * 3] += velocities[i * 3] * EMOTION_CONFIG.particles.speed
      positions[i * 3 + 1] += velocities[i * 3 + 1] * EMOTION_CONFIG.particles.speed
      positions[i * 3 + 2] += velocities[i * 3 + 2] * EMOTION_CONFIG.particles.speed

      // 境界チェック（バウンス） - vanilla版と同じ固定値
      if (Math.abs(positions[i * 3]) > 300) {
        velocities[i * 3] *= -EMOTION_CONFIG.particles.bounceSpeed
        positions[i * 3] = Math.sign(positions[i * 3]) * 300
      }
      if (Math.abs(positions[i * 3 + 1]) > 200) {
        velocities[i * 3 + 1] *= -EMOTION_CONFIG.particles.bounceSpeed
        positions[i * 3 + 1] = Math.sign(positions[i * 3 + 1]) * 200
      }
      if (Math.abs(positions[i * 3 + 2]) > 100) {
        velocities[i * 3 + 2] *= -EMOTION_CONFIG.particles.bounceSpeed
        positions[i * 3 + 2] = Math.sign(positions[i * 3 + 2]) * 100
      }
      
      // 速度減衰
      velocities[i * 3] *= 0.999
      velocities[i * 3 + 1] *= 0.999
      velocities[i * 3 + 2] *= 0.999
    }

    positionsAttr.needsUpdate = true

    // 接続線の更新
    const linePositionsAttr = linesRef.current.geometry.attributes.position
    const lineColorsAttr = linesRef.current.geometry.attributes.color
    const linePositions = linePositionsAttr.array as Float32Array
    const lineColors = lineColorsAttr.array as Float32Array
    
    let lineIndex = 0
    const maxDistance = EMOTION_CONFIG.connections.maxDistance

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        if (lineIndex >= EMOTION_CONFIG.connections.maxLines) break

        const x1 = positions[i * 3]
        const y1 = positions[i * 3 + 1]
        const z1 = positions[i * 3 + 2]
        
        const x2 = positions[j * 3]
        const y2 = positions[j * 3 + 1]
        const z2 = positions[j * 3 + 2]
        
        const distance = Math.sqrt(
          (x2 - x1) ** 2 + 
          (y2 - y1) ** 2 + 
          (z2 - z1) ** 2
        )
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * EMOTION_CONFIG.connections.opacity
          
          // Line start point
          linePositions[lineIndex * 6] = x1
          linePositions[lineIndex * 6 + 1] = y1
          linePositions[lineIndex * 6 + 2] = z1
          
          // Line end point
          linePositions[lineIndex * 6 + 3] = x2
          linePositions[lineIndex * 6 + 4] = y2
          linePositions[lineIndex * 6 + 5] = z2
          
          // Line colors with gradient
          const color = new THREE.Color(EMOTION_CONFIG.connections.color)
          lineColors[lineIndex * 6] = color.r * opacity
          lineColors[lineIndex * 6 + 1] = color.g * opacity
          lineColors[lineIndex * 6 + 2] = color.b * opacity
          
          lineColors[lineIndex * 6 + 3] = color.r * opacity * 0.5
          lineColors[lineIndex * 6 + 4] = color.g * opacity * 0.5
          lineColors[lineIndex * 6 + 5] = color.b * opacity * 0.5
          
          lineIndex++
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, lineIndex * 2)
    linePositionsAttr.needsUpdate = true
    lineColorsAttr.needsUpdate = true
  })

  // シェーダーマテリアル
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        atlasSize: { value: EMOTION_CONFIG.atlas.gridSize },
        time: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: EMOTION_CONFIG.particles.mouseInfluence },
        uColor1: { value: new THREE.Color(EMOTION_CONFIG.colors.primary) },
        uColor2: { value: new THREE.Color(EMOTION_CONFIG.colors.secondary) }
      },
      vertexShader: `
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
      `,
      fragmentShader: `
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
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  }, [texture])

  return (
    <group rotation={[0, 0, 0]}>
      {/* パーティクル */}
      <points ref={meshRef} material={shaderMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-uvOffset"
            count={particleCount}
            array={uvOffsets}
            itemSize={2}
          />
          <bufferAttribute
            attach="attributes-scale"
            count={particleCount}
            array={scales}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-rotation"
            count={particleCount}
            array={rotations}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-randomOffset"
            count={particleCount}
            array={randomOffsets}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-iconIndex"
            count={particleCount}
            array={iconIndices}
            itemSize={1}
          />
        </bufferGeometry>
      </points>

      {/* 接続線 */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount * particleCount * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount * particleCount * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          blending={THREE.AdditiveBlending}
          transparent
          opacity={EMOTION_CONFIG.connections.opacity}
        />
      </lineSegments>
    </group>
  )
}

/**
 * シーンコンポーネント
 */
function Scene() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  // テクスチャアトラスの生成
  useEffect(() => {
    const atlasGenerator = new TextureAtlasGenerator()
    
    atlasGenerator.generate(
      EMOTION_CONFIG.emotions,
      EMOTION_CONFIG.atlas
    ).then(({ texture }) => {
      setTexture(texture)
    }).catch((error) => {
      console.error('Failed to generate texture atlas:', error)
    })

    return () => {
      atlasGenerator.dispose()
    }
  }, [])

  // グループの回転
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += EMOTION_CONFIG.animation.rotationSpeed
    }
  })

  if (!texture) {
    return null // テクスチャ読み込み中
  }

  return (
    <group ref={groupRef}>
      <EmotionParticles texture={texture} />
    </group>
  )
}

/**
 * メインコンポーネント（React Three Fiber版）
 */
export default function EmotionParticleSystemFiber() {
  return (
    <Canvas
      camera={{ 
        position: [0, 0, 300], 
        fov: 75,
        near: 0.1,
        far: 1000
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      {/* 開発時のみStats表示 */}
      {features.showStats && <Stats />}
      
      {/* シーン */}
      <Scene />
    </Canvas>
  )
}