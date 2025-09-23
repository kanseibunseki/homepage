import * as THREE from 'three'
import { rippleVertexShader } from '../shaders/rippleVertex'
import { rippleFragmentShader } from '../shaders/rippleFragment'
import { EMOTION_CONFIG } from '../constants/emotionConfig'

export interface Ripple {
  mesh: THREE.Mesh
  position: THREE.Vector3
  radius: number
  intensity: number
  lifeTime: number
  type: 'cursor' | 'click'
  isActive: boolean
}

export class RippleManager {
  private ripplePool: Ripple[] = []
  private activeRipples: Ripple[] = []
  private cursorRipple: Ripple | null = null
  private scene: THREE.Scene
  private maxRipples = 10
  private cursorTrail: THREE.Vector3[] = []
  private maxTrailLength = 5
  
  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.initializePool()
  }
  
  private initializePool(): void {
    for (let i = 0; i < this.maxRipples; i++) {
      const ripple = this.createRipple()
      ripple.mesh.visible = false
      this.ripplePool.push(ripple)
      this.scene.add(ripple.mesh)
    }
    
    // カーソル用の特別な波紋
    this.cursorRipple = this.createRipple()
    this.cursorRipple.type = 'cursor'
    this.scene.add(this.cursorRipple.mesh)
  }
  
  private createRipple(): Ripple {
    const geometry = new THREE.PlaneGeometry(200, 200, 64, 64)
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRadius: { value: 50 },
        uIntensity: { value: 1 },
        uLifeTime: { value: 0 },
        uColor: { value: new THREE.Color(EMOTION_CONFIG.colors.primary) }
      },
      vertexShader: rippleVertexShader,
      fragmentShader: rippleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    
    const mesh = new THREE.Mesh(geometry, material)
    
    return {
      mesh,
      position: new THREE.Vector3(),
      radius: 50,
      intensity: 1,
      lifeTime: 0,
      type: 'click',
      isActive: false
    }
  }
  
  updateCursorPosition(mouseX: number, mouseY: number, camera: THREE.Camera): void {
    if (!this.cursorRipple) return
    
    // マウス座標を3D空間に変換
    const vector = new THREE.Vector3(mouseX, mouseY, 0.5)
    vector.unproject(camera)
    
    const dir = vector.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z
    const pos = camera.position.clone().add(dir.multiplyScalar(distance))
    
    // カーソル波紋の位置を更新
    this.cursorRipple.mesh.position.copy(pos)
    this.cursorRipple.mesh.position.z = -50 // 少し手前に配置
    
    // カーソルの軌跡を記録
    this.cursorTrail.push(pos.clone())
    if (this.cursorTrail.length > this.maxTrailLength) {
      this.cursorTrail.shift()
    }
    
    // カーソル波紋のパラメータ設定
    const material = this.cursorRipple.mesh.material as THREE.ShaderMaterial
    material.uniforms.uRadius.value = 30
    material.uniforms.uIntensity.value = 0.5
    material.uniforms.uColor.value = new THREE.Color(0x00ffcc)
  }
  
  createClickRipple(mouseX: number, mouseY: number, camera: THREE.Camera): void {
    // 使用可能な波紋を取得
    const ripple = this.ripplePool.find(r => !r.isActive)
    if (!ripple) return
    
    // マウス座標を3D空間に変換
    const vector = new THREE.Vector3(mouseX, mouseY, 0.5)
    vector.unproject(camera)
    
    const dir = vector.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z
    const pos = camera.position.clone().add(dir.multiplyScalar(distance))
    
    // 波紋を設定
    ripple.mesh.position.copy(pos)
    ripple.mesh.position.z = -50
    ripple.position.copy(pos)
    ripple.radius = 150
    ripple.intensity = 1
    ripple.lifeTime = 0
    ripple.type = 'click'
    ripple.isActive = true
    ripple.mesh.visible = true
    
    // マテリアルパラメータ設定
    const material = ripple.mesh.material as THREE.ShaderMaterial
    material.uniforms.uRadius.value = ripple.radius
    material.uniforms.uIntensity.value = ripple.intensity
    material.uniforms.uLifeTime.value = 0
    material.uniforms.uColor.value = new THREE.Color(0x8a2be2)
    
    this.activeRipples.push(ripple)
  }
  
  update(deltaTime: number, elapsedTime: number): THREE.Vector3[] {
    const ripplePositions: THREE.Vector3[] = []
    
    // カーソル波紋の更新
    if (this.cursorRipple) {
      const material = this.cursorRipple.mesh.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = elapsedTime
      
      // パルスアニメーション
      const pulse = Math.sin(elapsedTime * 5) * 0.2 + 0.8
      material.uniforms.uIntensity.value = 0.5 * pulse
      
      ripplePositions.push(this.cursorRipple.mesh.position)
    }
    
    // アクティブな波紋の更新
    for (let i = this.activeRipples.length - 1; i >= 0; i--) {
      const ripple = this.activeRipples[i]
      ripple.lifeTime += deltaTime
      
      const material = ripple.mesh.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uLifeTime.value = ripple.lifeTime
      
      // 波紋の拡大
      ripple.radius += deltaTime * 50
      material.uniforms.uRadius.value = ripple.radius
      
      // 強度の減衰
      ripple.intensity = Math.max(0, 1 - ripple.lifeTime / 3)
      material.uniforms.uIntensity.value = ripple.intensity
      
      // 3秒後に非アクティブ化
      if (ripple.lifeTime > 3) {
        ripple.isActive = false
        ripple.mesh.visible = false
        this.activeRipples.splice(i, 1)
      } else {
        ripplePositions.push(ripple.position)
      }
    }
    
    // カーソルの軌跡も含める
    ripplePositions.push(...this.cursorTrail)
    
    return ripplePositions
  }
  
  getRippleInfluence(particlePosition: THREE.Vector3): { force: THREE.Vector3, intensity: number } {
    let totalForce = new THREE.Vector3()
    let maxIntensity = 0
    
    // すべての波紋からの影響を計算
    const allRipples = [...this.activeRipples]
    if (this.cursorRipple) {
      allRipples.push(this.cursorRipple)
    }
    
    for (const ripple of allRipples) {
      const distance = particlePosition.distanceTo(ripple.mesh.position)
      
      if (distance < ripple.radius) {
        // 波紋の中心から外側への力
        const direction = new THREE.Vector3()
          .subVectors(particlePosition, ripple.mesh.position)
          .normalize()
        
        // 距離に応じた力の強さ
        const strength = (1 - distance / ripple.radius) * ripple.intensity
        
        // 波の効果（上下動）
        const waveHeight = Math.sin(distance * 0.1 - ripple.lifeTime * 5) * strength * 10
        
        const force = direction.multiplyScalar(strength * 20)
        force.z += waveHeight
        
        totalForce.add(force)
        maxIntensity = Math.max(maxIntensity, strength)
      }
    }
    
    return { force: totalForce, intensity: maxIntensity }
  }
  
  dispose(): void {
    // すべての波紋を破棄
    for (const ripple of this.ripplePool) {
      ripple.mesh.geometry.dispose()
      ;(ripple.mesh.material as THREE.Material).dispose()
      this.scene.remove(ripple.mesh)
    }
    
    if (this.cursorRipple) {
      this.cursorRipple.mesh.geometry.dispose()
      ;(this.cursorRipple.mesh.material as THREE.Material).dispose()
      this.scene.remove(this.cursorRipple.mesh)
    }
    
    this.ripplePool = []
    this.activeRipples = []
    this.cursorTrail = []
  }
}