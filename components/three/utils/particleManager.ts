import * as THREE from 'three'
import { EMOTION_CONFIG } from '../constants/emotionConfig'
import { emotionVertexShader } from '../shaders/emotionVertex'
import { emotionFragmentShader } from '../shaders/emotionFragment'

export class ParticleManager {
  private geometry: THREE.BufferGeometry
  private material: THREE.ShaderMaterial
  public particles: THREE.Points
  private velocities!: Float32Array
  private time: number = 0
  
  constructor(texture: THREE.Texture) {
    this.geometry = new THREE.BufferGeometry()
    this.initGeometry()
    this.material = this.createMaterial(texture)
    this.particles = new THREE.Points(this.geometry, this.material)
  }
  
  private initGeometry(): void {
    const count = EMOTION_CONFIG.particles.count
    
    // 位置
    const positions = new Float32Array(count * 3)
    // 速度
    this.velocities = new Float32Array(count * 3)
    // アイコンインデックス
    const iconIndices = new Float32Array(count)
    // スケール
    const scales = new Float32Array(count)
    // ランダムオフセット（アニメーション用）
    const randomOffsets = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // ランダムな初期位置
      positions[i * 3] = (Math.random() - 0.5) * 600
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
      
      // ランダムな速度
      this.velocities[i * 3] = (Math.random() - 0.5) * EMOTION_CONFIG.particles.speed
      this.velocities[i * 3 + 1] = (Math.random() - 0.5) * EMOTION_CONFIG.particles.speed
      this.velocities[i * 3 + 2] = (Math.random() - 0.5) * EMOTION_CONFIG.particles.speed
      
      // ランダムなアイコン選択（重みを考慮）
      iconIndices[i] = this.selectRandomIcon()
      
      // ランダムなスケール
      scales[i] = EMOTION_CONFIG.particles.size * (0.8 + Math.random() * 0.4)
      
      // ランダムオフセット
      randomOffsets[i] = Math.random()
    }
    
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('velocity', new THREE.BufferAttribute(this.velocities, 3))
    this.geometry.setAttribute('iconIndex', new THREE.BufferAttribute(iconIndices, 1))
    this.geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))
    this.geometry.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 1))
  }
  
  private selectRandomIcon(): number {
    // 重み付きランダム選択
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
  
  private createMaterial(texture: THREE.Texture): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: EMOTION_CONFIG.particles.mouseInfluence },
        uTexture: { value: texture },
        uAtlasGrid: { value: new THREE.Vector2(
          EMOTION_CONFIG.atlas.gridSize,
          EMOTION_CONFIG.atlas.gridSize
        )},
        uColor1: { value: new THREE.Color(EMOTION_CONFIG.colors.primary) },
        uColor2: { value: new THREE.Color(EMOTION_CONFIG.colors.secondary) }
      },
      vertexShader: emotionVertexShader,
      fragmentShader: emotionFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }
  
  update(deltaTime: number, mouse: THREE.Vector2): void {
    this.time += deltaTime
    
    // シェーダーユニフォーム更新
    this.material.uniforms.uTime.value = this.time
    this.material.uniforms.uMouse.value = mouse
    
    // パーティクル位置更新
    const positions = this.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < EMOTION_CONFIG.particles.count; i++) {
      // 速度を適用
      positions[i * 3] += this.velocities[i * 3]
      positions[i * 3 + 1] += this.velocities[i * 3 + 1]
      positions[i * 3 + 2] += this.velocities[i * 3 + 2]
      
      // 境界チェック（バウンス）
      if (Math.abs(positions[i * 3]) > 300) {
        this.velocities[i * 3] *= -EMOTION_CONFIG.particles.bounceSpeed
        positions[i * 3] = Math.sign(positions[i * 3]) * 300
      }
      if (Math.abs(positions[i * 3 + 1]) > 200) {
        this.velocities[i * 3 + 1] *= -EMOTION_CONFIG.particles.bounceSpeed
        positions[i * 3 + 1] = Math.sign(positions[i * 3 + 1]) * 200
      }
      if (Math.abs(positions[i * 3 + 2]) > 100) {
        this.velocities[i * 3 + 2] *= -EMOTION_CONFIG.particles.bounceSpeed
        positions[i * 3 + 2] = Math.sign(positions[i * 3 + 2]) * 100
      }
      
      // 速度減衰
      this.velocities[i * 3] *= 0.999
      this.velocities[i * 3 + 1] *= 0.999
      this.velocities[i * 3 + 2] *= 0.999
    }
    
    this.geometry.attributes.position.needsUpdate = true
  }
  
  getPositions(): Float32Array {
    return this.geometry.attributes.position.array as Float32Array
  }
  
  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}