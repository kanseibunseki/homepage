import * as THREE from 'three'
import { EMOTION_CONFIG } from '../constants/emotionConfig'

export class ConnectionManager {
  private geometry: THREE.BufferGeometry
  private material: THREE.LineBasicMaterial
  public lines: THREE.LineSegments
  private maxConnections: number
  
  constructor() {
    const particleCount = EMOTION_CONFIG.particles.count
    // 最大接続数を計算（各パーティクルが最大5個と接続）
    this.maxConnections = particleCount * 5
    
    this.geometry = new THREE.BufferGeometry()
    this.initGeometry()
    this.material = this.createMaterial()
    this.lines = new THREE.LineSegments(this.geometry, this.material)
  }
  
  private initGeometry(): void {
    // 各接続線は2つの頂点を持つ
    const positions = new Float32Array(this.maxConnections * 6)
    const colors = new Float32Array(this.maxConnections * 6)
    
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    // 初期状態では描画しない
    this.geometry.setDrawRange(0, 0)
  }
  
  private createMaterial(): THREE.LineBasicMaterial {
    return new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.3,
      linewidth: 1
    })
  }
  
  updateConnections(particlePositions: Float32Array): void {
    const linePositions = this.lines.geometry.attributes.position.array as Float32Array
    const lineColors = this.lines.geometry.attributes.color.array as Float32Array
    
    let lineIndex = 0
    const particleCount = EMOTION_CONFIG.particles.count
    const maxDistance = EMOTION_CONFIG.particles.connectionDistance
    
    // すべてのパーティクルペアをチェック
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        // 最大接続数に達したら終了
        if (lineIndex >= this.maxConnections) break
        
        const x1 = particlePositions[i * 3]
        const y1 = particlePositions[i * 3 + 1]
        const z1 = particlePositions[i * 3 + 2]
        
        const x2 = particlePositions[j * 3]
        const y2 = particlePositions[j * 3 + 1]
        const z2 = particlePositions[j * 3 + 2]
        
        // 距離計算
        const distance = Math.sqrt(
          (x2 - x1) ** 2 +
          (y2 - y1) ** 2 +
          (z2 - z1) ** 2
        )
        
        // 距離が閾値以内なら接続線を作成
        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance)
          
          // 線の始点
          linePositions[lineIndex * 6] = x1
          linePositions[lineIndex * 6 + 1] = y1
          linePositions[lineIndex * 6 + 2] = z1
          
          // 線の終点
          linePositions[lineIndex * 6 + 3] = x2
          linePositions[lineIndex * 6 + 4] = y2
          linePositions[lineIndex * 6 + 5] = z2
          
          // グラデーションカラー
          const color1 = new THREE.Color(EMOTION_CONFIG.colors.primary)
          const color2 = new THREE.Color(EMOTION_CONFIG.colors.secondary)
          
          // 始点の色
          lineColors[lineIndex * 6] = color1.r * opacity
          lineColors[lineIndex * 6 + 1] = color1.g * opacity
          lineColors[lineIndex * 6 + 2] = color1.b * opacity
          
          // 終点の色
          lineColors[lineIndex * 6 + 3] = color2.r * opacity
          lineColors[lineIndex * 6 + 4] = color2.g * opacity
          lineColors[lineIndex * 6 + 5] = color2.b * opacity
          
          lineIndex++
        }
      }
    }
    
    // 描画範囲を更新
    this.geometry.setDrawRange(0, lineIndex * 2)
    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.color.needsUpdate = true
  }
  
  updateOpacity(value: number): void {
    this.material.opacity = value
  }
  
  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}