import * as THREE from 'three'
import { EmotionIcon, AtlasConfig } from '../constants/emotionConfig'

export interface AtlasMapping {
  [emotionId: string]: {
    x: number
    y: number
    width: number
    height: number
  }
}

export class TextureAtlasGenerator {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private atlasMapping: AtlasMapping = {}
  
  constructor() {
    this.canvas = document.createElement('canvas')
    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('Failed to get canvas context')
    this.ctx = context
  }
  
  async generate(emotions: EmotionIcon[], config: AtlasConfig): Promise<{
    texture: THREE.Texture
    mapping: AtlasMapping
  }> {
    const { gridSize, textureSize } = config
    const cellSize = textureSize / gridSize
    
    // Canvas設定
    this.canvas.width = textureSize
    this.canvas.height = textureSize
    
    // 背景を透明に
    this.ctx.clearRect(0, 0, textureSize, textureSize)
    
    // 各感情アイコンを読み込んでグリッドに配置
    const loadPromises = emotions.slice(0, gridSize * gridSize).map((emotion, index) => {
      return this.loadAndPlaceImage(emotion, index, cellSize, gridSize)
    })
    
    await Promise.all(loadPromises)
    
    // Three.js Textureとして変換
    const texture = new THREE.CanvasTexture(this.canvas)
    texture.needsUpdate = true
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBAFormat
    
    return {
      texture,
      mapping: this.atlasMapping
    }
  }
  
  private async loadAndPlaceImage(
    emotion: EmotionIcon,
    index: number,
    cellSize: number,
    gridSize: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        const col = index % gridSize
        const row = Math.floor(index / gridSize)
        const x = col * cellSize
        const y = row * cellSize
        
        // アイコンを中央に配置
        const padding = cellSize * 0.1
        const drawSize = cellSize - padding * 2
        
        this.ctx.drawImage(
          img,
          x + padding,
          y + padding,
          drawSize,
          drawSize
        )
        
        // マッピング情報を保存
        this.atlasMapping[emotion.id] = {
          x: col / gridSize,
          y: row / gridSize,
          width: 1 / gridSize,
          height: 1 / gridSize
        }
        
        resolve()
      }
      
      img.onerror = () => {
        console.warn(`Failed to load emotion icon: ${emotion.path}`)
        resolve() // エラーでも続行
      }
      
      img.src = emotion.path
    })
  }
  
  getUVForEmotion(emotionId: string): { u: number, v: number, size: number } {
    const mapping = this.atlasMapping[emotionId]
    if (!mapping) {
      // デフォルト値を返す
      return { u: 0, v: 0, size: 0.25 }
    }
    return {
      u: mapping.x,
      v: mapping.y,
      size: mapping.width
    }
  }
  
  dispose(): void {
    // メモリクリーンアップ
    this.canvas.width = 0
    this.canvas.height = 0
  }
}