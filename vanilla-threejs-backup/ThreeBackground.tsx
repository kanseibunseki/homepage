'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const linesRef = useRef<THREE.LineSegments | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number>()

  const PARTICLE_COUNT = 150
  const CONNECTION_DISTANCE = 150

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
    camera.position.z = 300
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

    // Create particles (data points)
    const particlesGeometry = new THREE.BufferGeometry()
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

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    })

    const particles = new THREE.Points(particlesGeometry, particleMaterial)
    particlesRef.current = particles
    scene.add(particles)

    // Create connection lines geometry
    const linesGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
    const lineColors = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
    
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.3,
      linewidth: 1
    })

    const lines = new THREE.LineSegments(linesGeometry, lineMaterial)
    linesRef.current = lines
    scene.add(lines)

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

    // Update connections between particles
    const updateConnections = () => {
      if (!particlesRef.current || !linesRef.current) return

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array
      const lineColors = linesRef.current.geometry.attributes.color.array as Float32Array
      
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
      linesRef.current.geometry.attributes.position.needsUpdate = true
      linesRef.current.geometry.attributes.color.needsUpdate = true
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!cameraRef.current || !rendererRef.current || !sceneRef.current || !particlesRef.current) return

      // Update particle positions
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array

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

      particlesRef.current.geometry.attributes.position.needsUpdate = true

      // Update connections
      updateConnections()

      // Rotate entire scene slightly
      sceneRef.current.rotation.y += 0.0005

      // Camera slight movement
      cameraRef.current.position.x = Math.sin(Date.now() * 0.0001) * 10
      cameraRef.current.position.y = Math.cos(Date.now() * 0.0001) * 10
      cameraRef.current.lookAt(sceneRef.current.position)

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
      if (linesGeometry) {
        linesGeometry.dispose()
      }
      if (lineMaterial) {
        lineMaterial.dispose()
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