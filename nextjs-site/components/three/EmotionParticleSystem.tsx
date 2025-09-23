'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EMOTION_CONFIG } from './constants/emotionConfig'
import { TextureAtlasGenerator } from './utils/textureAtlasGenerator'
import { ParticleManager } from './utils/particleManager'
import { ConnectionManager } from './utils/connectionManager'

export default function EmotionParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particleManagerRef = useRef<ParticleManager | null>(null)
  const connectionManagerRef = useRef<ConnectionManager | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number>()
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (!canvasRef.current) return

    // アニメーションループを先に定義
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return
      if (!particleManagerRef.current || !connectionManagerRef.current) return
      if (!isInitializedRef.current) return

      const deltaTime = clockRef.current.getDelta()
      const elapsedTime = clockRef.current.getElapsedTime()

      // マウス座標をThree.jsの座標系に変換
      const mouse = new THREE.Vector2(mouseRef.current.x, mouseRef.current.y)

      // パーティクル更新
      particleManagerRef.current.update(deltaTime, mouse)

      // 接続線更新
      const positions = particleManagerRef.current.getPositions()
      connectionManagerRef.current.updateConnections(positions)

      // シーン全体を微妙に回転（横回転のみ）
      sceneRef.current.rotation.y += EMOTION_CONFIG.animation.rotationSpeed

      // カメラは固定位置に
      cameraRef.current.lookAt(sceneRef.current.position)

      // レンダリング
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    const initScene = async () => {
      // Scene setup
      const scene = new THREE.Scene()
      sceneRef.current = scene

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 300
      cameraRef.current = camera

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      rendererRef.current = renderer

      // テクスチャアトラス生成
      const atlasGenerator = new TextureAtlasGenerator()
      const { texture } = await atlasGenerator.generate(
        EMOTION_CONFIG.emotions,
        EMOTION_CONFIG.atlas
      )

      // パーティクルマネージャー初期化
      const particleManager = new ParticleManager(texture)
      particleManagerRef.current = particleManager
      scene.add(particleManager.particles)

      // 接続線マネージャー初期化
      const connectionManager = new ConnectionManager()
      connectionManagerRef.current = connectionManager
      scene.add(connectionManager.lines)

      // 初期化完了フラグを立てる
      isInitializedRef.current = true

      // アニメーション開始（初期化完了後）
      animate()
      
      // クリーンアップ時にアトラスジェネレーターを破棄
      return () => {
        atlasGenerator.dispose()
      }
    }

    // マウス移動ハンドラー（即座に登録）
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // 初期化実行（エラーハンドリング付き）
    const cleanup = initScene().catch(err => {
      console.error('Scene initialization failed:', err)
      isInitializedRef.current = false
      // エラー時はアニメーションを開始しない（重複実行を防ぐ）
    })

    // ウィンドウリサイズハンドラー
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    // イベントリスナー登録（windowに統一）
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // クリーンアップ
    return () => {
      isInitializedRef.current = false
      cleanup.then(cleanupFunc => cleanupFunc?.()).catch(err => {
        console.error('Cleanup error:', err)
      })
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      // Three.jsオブジェクトのクリーンアップ
      if (particleManagerRef.current) {
        particleManagerRef.current.dispose()
      }
      if (connectionManagerRef.current) {
        connectionManagerRef.current.dispose()
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      
      // シーンのクリーンアップ
      if (sceneRef.current) {
        sceneRef.current.traverse((child) => {
          if ((child as THREE.Mesh).geometry) {
            (child as THREE.Mesh).geometry.dispose()
          }
          if ((child as THREE.Mesh).material) {
            const material = (child as THREE.Mesh).material
            if (Array.isArray(material)) {
              material.forEach(m => m.dispose())
            } else {
              material.dispose()
            }
          }
        })
        sceneRef.current.clear()
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}