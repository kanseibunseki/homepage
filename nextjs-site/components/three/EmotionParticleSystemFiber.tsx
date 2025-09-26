'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EMOTION_CONFIG } from './constants/emotionConfig'
import { TextureAtlasGenerator } from './utils/textureAtlasGenerator'
import { features } from '@/config/features'

// GSAPプラグインの登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * 感情パーティクルコンポーネント
 */
function EmotionParticles({ 
  texture, 
  onHeartFormationChange 
}: { 
  texture: THREE.Texture
  onHeartFormationChange?: (forming: boolean) => void 
}) {
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const velocitiesRef = useRef<Float32Array>(null!)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { size, camera } = useThree()

  // パーティクルの設定（ハート形成時は500個に増やす）
  const baseParticleCount = EMOTION_CONFIG.particles.count  // 80個
  const totalParticleCount = 500  // ハート形成時の総数
  const [visibleCount, setVisibleCount] = useState(baseParticleCount)
  
  // ハート形成の状態管理
  const isFormingHeart = useRef(false)
  const heartPositionsRef = useRef<Float32Array>(null!)
  const originalPositionsRef = useRef<Float32Array>(null!)
  const morphProgress = useRef(0)
  
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
    const positions = new Float32Array(totalParticleCount * 3)
    const velocities = new Float32Array(totalParticleCount * 3)
    const uvOffsets = new Float32Array(totalParticleCount * 2)
    const scales = new Float32Array(totalParticleCount)
    const rotations = new Float32Array(totalParticleCount)
    const colors = new Float32Array(totalParticleCount * 3)
    const randomOffsets = new Float32Array(totalParticleCount)
    const iconIndices = new Float32Array(totalParticleCount)

    const emotions = EMOTION_CONFIG.emotions
    const bounds = EMOTION_CONFIG.particles.bounds

    for (let i = 0; i < totalParticleCount; i++) {
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
    // 元の位置を保存
    originalPositionsRef.current = new Float32Array(positions)
    
    return [positions, uvOffsets, scales, rotations, colors, randomOffsets, iconIndices]
  }, [totalParticleCount])

  // ハート型の位置を生成
  const createHeartPositions = useCallback(() => {
    const heartPos = new Float32Array(totalParticleCount * 3)
    
    // ハートシェイプの生成（正しい向き）
    const shape = new THREE.Shape()
    shape.moveTo(2.5, -2.5)
    shape.bezierCurveTo(2.5, -2.5, 2, 0, 0, 0)
    shape.bezierCurveTo(-3, 0, -3, -3.5, -3, -3.5)
    shape.bezierCurveTo(-3, -5.5, -1.5, -7.7, 2.5, -9.5)
    shape.bezierCurveTo(6, -7.7, 8, -5.5, 8, -3.5)
    shape.bezierCurveTo(8, -3.5, 8, 0, 5, 0)
    shape.bezierCurveTo(3.5, 0, 2.5, -2.5, 2.5, -2.5)
    
    const extrudeSettings = {
      depth: 2,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1
    }
    
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.scale(2, 2, 2)
    geometry.center()
    geometry.rotateY(-Math.PI / 6)  // Y軸で回転（横から見た角度を変える）
    
    // サーフェスサンプリング
    const positionAttribute = geometry.getAttribute('position')
    const vertices = positionAttribute.array
    const vertexCount = vertices.length / 3
    
    for (let i = 0; i < totalParticleCount; i++) {
      // ランダムに頂点を選択
      const idx = Math.floor(Math.random() * vertexCount) * 3
      
      // スケールと位置調整（画面右側に表示）
      heartPos[i * 3] = vertices[idx] * 15 + 100      // X: 右側
      heartPos[i * 3 + 1] = vertices[idx + 1] * 15    // Y
      heartPos[i * 3 + 2] = vertices[idx + 2] * 15    // Z
    }
    
    return heartPos
  }, [totalParticleCount])

  // ハート位置の初期化
  useEffect(() => {
    heartPositionsRef.current = createHeartPositions()
  }, [createHeartPositions])

  // ScrollTriggerの設定
  useEffect(() => {
    if (typeof window === 'undefined' || !meshRef.current) return
    
    // VisionSectionの監視
    const checkVisionSection = () => {
      const sections = document.querySelectorAll('section')
      const visionSection = Array.from(sections).find(section => 
        section.textContent?.includes('OUR VISION')
      )
      
      if (visionSection) {
        ScrollTrigger.create({
          trigger: visionSection,
          start: "top center",
          end: "top top",
          scrub: true,  // 完全にスクロールに同期
          onUpdate: (self) => {
            // スクロール進行度（0〜1）を直接morphProgressに設定
            const progress = self.progress
            morphProgress.current = progress
            
            // ハート形成状態の管理
            if (progress > 0 && !isFormingHeart.current) {
              console.log('Starting heart formation')
              isFormingHeart.current = true
              onHeartFormationChange?.(true)
              setVisibleCount(totalParticleCount)
            } else if (progress === 0 && isFormingHeart.current) {
              console.log('Ending heart formation')
              isFormingHeart.current = false
              onHeartFormationChange?.(false)
              setVisibleCount(baseParticleCount)
            }
            
            console.log(`Heart formation progress: ${(progress * 100).toFixed(1)}%`)
          }
        })
      }
    }
    
    // DOM読み込み後に実行
    const timer = setTimeout(checkVisionSection, 1000)
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [baseParticleCount, totalParticleCount])

  // 接続線の初期設定
  const linePositions = useMemo(() => {
    return new Float32Array(totalParticleCount * totalParticleCount * 6)
  }, [totalParticleCount])

  const lineColors = useMemo(() => {
    return new Float32Array(totalParticleCount * totalParticleCount * 6)
  }, [totalParticleCount])

  // マウス位置の更新
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // パーティクル数の制御
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.setDrawRange(0, visibleCount)
    }
  }, [visibleCount])

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
    for (let i = 0; i < visibleCount; i++) {
      const progress = morphProgress.current
      
      if (progress > 0 && heartPositionsRef.current) {
        // ハート形成のモーフィング（スクロール連動）
        const targetX = heartPositionsRef.current[i * 3]
        const targetY = heartPositionsRef.current[i * 3 + 1]
        const targetZ = heartPositionsRef.current[i * 3 + 2]
        const origX = originalPositionsRef.current[i * 3]
        const origY = originalPositionsRef.current[i * 3 + 1]
        const origZ = originalPositionsRef.current[i * 3 + 2]
        
        // スクロール進行度に基づいて位置を補間
        positions[i * 3] = origX + (targetX - origX) * progress
        positions[i * 3 + 1] = origY + (targetY - origY) * progress
        positions[i * 3 + 2] = origZ + (targetZ - origZ) * progress
      } else {
        // 通常の動き（ハート形成していない時）
        positions[i * 3] += velocities[i * 3] * EMOTION_CONFIG.particles.speed
        positions[i * 3 + 1] += velocities[i * 3 + 1] * EMOTION_CONFIG.particles.speed
        positions[i * 3 + 2] += velocities[i * 3 + 2] * EMOTION_CONFIG.particles.speed

        // 境界チェック（バウンス）
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
        
        // 元の位置を更新
        originalPositionsRef.current[i * 3] = positions[i * 3]
        originalPositionsRef.current[i * 3 + 1] = positions[i * 3 + 1]
        originalPositionsRef.current[i * 3 + 2] = positions[i * 3 + 2]
      }
    }

    positionsAttr.needsUpdate = true

    // 接続線の更新
    const linePositionsAttr = linesRef.current.geometry.attributes.position
    const lineColorsAttr = linesRef.current.geometry.attributes.color
    const linePositions = linePositionsAttr.array as Float32Array
    const lineColors = lineColorsAttr.array as Float32Array
    
    let lineIndex = 0
    const maxDistance = EMOTION_CONFIG.connections.maxDistance

    for (let i = 0; i < visibleCount && i < baseParticleCount; i++) {
      for (let j = i + 1; j < visibleCount && j < baseParticleCount; j++) {
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
            count={totalParticleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-uvOffset"
            count={totalParticleCount}
            array={uvOffsets}
            itemSize={2}
          />
          <bufferAttribute
            attach="attributes-scale"
            count={totalParticleCount}
            array={scales}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-rotation"
            count={totalParticleCount}
            array={rotations}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={totalParticleCount}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-randomOffset"
            count={totalParticleCount}
            array={randomOffsets}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-iconIndex"
            count={totalParticleCount}
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
            count={totalParticleCount * totalParticleCount * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={totalParticleCount * totalParticleCount * 2}
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
  const isFormingHeart = useRef(false)

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

  // グループの回転（ハート形成中は停止）
  useFrame((state, delta) => {
    if (groupRef.current && !isFormingHeart.current) {
      groupRef.current.rotation.y += EMOTION_CONFIG.animation.rotationSpeed
    }
  })

  if (!texture) {
    return null // テクスチャ読み込み中
  }

  return (
    <group ref={groupRef}>
      <EmotionParticles 
        texture={texture} 
        onHeartFormationChange={(forming: boolean) => {
          isFormingHeart.current = forming
        }}
      />
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