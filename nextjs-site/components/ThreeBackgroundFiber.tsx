'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import * as THREE from 'three'
import { features } from '@/config/features'

const PARTICLE_COUNT = 150
const CONNECTION_DISTANCE = 150

/**
 * パーティクルコンポーネント
 */
function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  // パーティクルの初期設定
  const [positions, velocities, colors] = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random positions
      positions[i * 3] = (Math.random() - 0.5) * 600
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200

      // Random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.5
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5

      // Gradient colors (cyan to purple)
      const t = i / PARTICLE_COUNT
      colors[i * 3] = 0 + t * 0.54 // R
      colors[i * 3 + 1] = 1 - t * 0.17 // G
      colors[i * 3 + 2] = 0.8 + t * 0.14 // B
    }

    return [positions, velocities, colors]
  }, [])

  // 接続線の初期設定
  const linePositions = useMemo(() => {
    return new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
  }, [])

  const lineColors = useMemo(() => {
    return new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
  }, [])

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
    const velocitiesAttr = meshRef.current.geometry.attributes.velocity
    const velocities = velocitiesAttr.array as Float32Array

    // パーティクルの位置更新
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] += velocities[i * 3]
      positions[i * 3 + 1] += velocities[i * 3 + 1]
      positions[i * 3 + 2] += velocities[i * 3 + 2]

      // Boundary check and bounce
      if (Math.abs(positions[i * 3]) > 300) velocities[i * 3] *= -1
      if (Math.abs(positions[i * 3 + 1]) > 200) velocities[i * 3 + 1] *= -1
      if (Math.abs(positions[i * 3 + 2]) > 100) velocities[i * 3 + 2] *= -1

      // Mouse influence
      const mouseInfluence = 50
      const dx = mouseRef.current.x * 300 - positions[i * 3]
      const dy = -mouseRef.current.y * 200 - positions[i * 3 + 1]
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < mouseInfluence * 2) {
        velocities[i * 3] -= dx * 0.00002
        velocities[i * 3 + 1] -= dy * 0.00002
      }
    }

    positionsAttr.needsUpdate = true
    velocitiesAttr.needsUpdate = true

    // 接続線の更新
    const linePositionsAttr = linesRef.current.geometry.attributes.position
    const lineColorsAttr = linesRef.current.geometry.attributes.color
    const linePositions = linePositionsAttr.array as Float32Array
    const lineColors = lineColorsAttr.array as Float32Array
    
    let lineIndex = 0

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
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
        
        if (distance < CONNECTION_DISTANCE) {
          const opacity = 1 - distance / CONNECTION_DISTANCE
          
          // Line start point
          linePositions[lineIndex * 6] = x1
          linePositions[lineIndex * 6 + 1] = y1
          linePositions[lineIndex * 6 + 2] = z1
          
          // Line end point
          linePositions[lineIndex * 6 + 3] = x2
          linePositions[lineIndex * 6 + 4] = y2
          linePositions[lineIndex * 6 + 5] = z2
          
          // Line colors
          lineColors[lineIndex * 6] = 0
          lineColors[lineIndex * 6 + 1] = opacity
          lineColors[lineIndex * 6 + 2] = opacity * 0.8
          
          lineColors[lineIndex * 6 + 3] = opacity * 0.54
          lineColors[lineIndex * 6 + 4] = opacity * 0.83
          lineColors[lineIndex * 6 + 5] = opacity * 0.94
          
          lineIndex++
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, lineIndex * 2)
    linePositionsAttr.needsUpdate = true
    lineColorsAttr.needsUpdate = true

    // シーン全体を微妙に回転
    if (meshRef.current.parent) {
      meshRef.current.parent.rotation.y += 0.0005
    }
  })

  return (
    <group>
      {/* パーティクル */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-velocity"
            count={PARTICLE_COUNT}
            array={velocities}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3}
          vertexColors
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>

      {/* 接続線 */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT * PARTICLE_COUNT * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT * PARTICLE_COUNT * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.3}
        />
      </lineSegments>
    </group>
  )
}

/**
 * カメラコントロール
 */
function CameraController() {
  useFrame((state) => {
    // カメラの微妙な動き
    state.camera.position.x = Math.sin(Date.now() * 0.0001) * 10
    state.camera.position.y = Math.cos(Date.now() * 0.0001) * 10
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

/**
 * メインコンポーネント（React Three Fiber版）
 */
export default function ThreeBackgroundFiber() {
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
      
      {/* パーティクルシステム */}
      <Particles />
      
      {/* カメラコントロール */}
      <CameraController />
    </Canvas>
  )
}