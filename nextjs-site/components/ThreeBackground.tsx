'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const particleMaterialRef = useRef<THREE.PointsMaterial | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number>()

  const PARTICLE_COUNT = 20000

  useEffect(() => {
    if (!canvasRef.current) return

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
    camera.position.z = 25
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    rendererRef.current = renderer

    // Create heart shape
    function createHeartShape() {
      const shape = new THREE.Shape()
      shape.moveTo(2.5, 2.5)
      shape.bezierCurveTo(2.5, 2.5, 2, 0, 0, 0)
      shape.bezierCurveTo(-3, 0, -3, 3.5, -3, 3.5)
      shape.bezierCurveTo(-3, 5.5, -1.5, 7.7, 2.5, 9.5)
      shape.bezierCurveTo(6, 7.7, 8, 5.5, 8, 3.5)
      shape.bezierCurveTo(8, 3.5, 8, 0, 5, 0)
      shape.bezierCurveTo(3.5, 0, 2.5, 2.5, 2.5, 2.5)
      
      const extrudeSettings = {
        depth: 2,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1
      }
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      geometry.scale(1.5, 1.5, 1.5)
      geometry.center()
      return geometry
    }

    // Create speech bubble shape
    function createSpeechBubbleShape() {
      const shape = new THREE.Shape()
      const w = 15, h = 10, r = 2
      shape.moveTo(r, 0)
      shape.lineTo(w - r, 0)
      shape.quadraticCurveTo(w, 0, w, r)
      shape.lineTo(w, h - r)
      shape.quadraticCurveTo(w, h, w - r, h)
      shape.lineTo(w / 2 + 5, h)
      shape.lineTo(w / 2, h + 5)
      shape.lineTo(w / 2 - 5, h)
      shape.lineTo(r, h)
      shape.quadraticCurveTo(0, h, 0, h - r)
      shape.lineTo(0, r)
      shape.quadraticCurveTo(0, 0, r, 0)
      
      const extrudeSettings = {
        depth: 2,
        bevelEnabled: true,
        bevelSegments: 1,
        steps: 1,
        bevelSize: 0.5,
        bevelThickness: 0.5
      }
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      geometry.center()
      return geometry
    }

    // Create brain shape
    function createBrainShape() {
      const leftHalf = new THREE.SphereGeometry(6, 16, 16, 0, Math.PI)
      leftHalf.translate(-3, 0, 0)
      const rightHalf = new THREE.SphereGeometry(6, 16, 16, 0, Math.PI)
      rightHalf.rotateY(Math.PI)
      rightHalf.translate(3, 0, 0)
      const mergedGeometry = BufferGeometryUtils.mergeGeometries([leftHalf, rightHalf])
      mergedGeometry.scale(1.2, 1, 1.2)
      mergedGeometry.center()
      return mergedGeometry
    }

    // Create lightbulb shape
    function createLightbulbShape() {
      const bulb = new THREE.SphereGeometry(6, 32, 32)
      bulb.translate(0, 3, 0)
      const base = new THREE.CylinderGeometry(2, 2, 4, 16)
      base.translate(0, -4, 0)
      const mergedGeometry = BufferGeometryUtils.mergeGeometries([bulb, base])
      mergedGeometry.scale(1.1, 1.1, 1.1)
      mergedGeometry.center()
      return mergedGeometry
    }

    // Create exclamation shape
    function createExclamationShape() {
      const bar = new THREE.BoxGeometry(2.5, 9, 2.5)
      bar.translate(0, 3.5, 0)
      const dot = new THREE.SphereGeometry(1.5, 32, 32)
      dot.translate(0, -6, 0)
      const mergedGeometry = BufferGeometryUtils.mergeGeometries([bar, dot])
      mergedGeometry.scale(1.2, 1.2, 1.2)
      mergedGeometry.center()
      return mergedGeometry
    }

    // Create particles
    const heartGeometry = createHeartShape()
    const sampler = new MeshSurfaceSampler(new THREE.Mesh(heartGeometry))
    sampler.build()

    const particlesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const tempPosition = new THREE.Vector3()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sampler.sample(tempPosition)
      positions.set([tempPosition.x, tempPosition.y, tempPosition.z], i * 3)
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff8a8a,
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    })
    particleMaterialRef.current = particleMaterial

    const particles = new THREE.Points(particlesGeometry, particleMaterial)
    particlesRef.current = particles
    scene.add(particles)

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // Window resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!cameraRef.current || !rendererRef.current || !sceneRef.current || !particlesRef.current) return

      // Camera follows mouse (inverse direction)
      cameraRef.current.position.x += (-mouseRef.current.x * 5 - cameraRef.current.position.x) * 0.05
      cameraRef.current.position.y += (-mouseRef.current.y * 5 - cameraRef.current.position.y) * 0.05
      cameraRef.current.lookAt(sceneRef.current.position)

      // Rotate particles
      if (window.scrollY < 100) {
        particlesRef.current.rotation.y += 0.0008
        const time = Date.now() * 0.005
        particlesRef.current.scale.setScalar(Math.sin(time) * 0.05 + 1)
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    // Start animation
    animate()

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (particlesGeometry) {
        particlesGeometry.dispose()
      }
      if (particleMaterial) {
        particleMaterial.dispose()
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