export interface EmotionIcon {
  id: string
  path: string
  weight: number
  color?: string
}

export interface ParticleConfig {
  count: number
  size: number
  connectionDistance: number
  speed: number
  mouseInfluence: number
  bounceSpeed: number
  bounds: {
    width: number
    height: number
    depth: number
  }
}

export interface AtlasConfig {
  gridSize: number
  textureSize: number
}

export interface ConnectionConfig {
  maxDistance: number
  maxLines: number
  opacity: number
  color: string
}

export const EMOTION_CONFIG = {
  particles: {
    count: 80,
    size: 50,
    connectionDistance: 150,
    speed: 0.3,
    mouseInfluence: 50,
    bounceSpeed: 0.5,
    bounds: {
      width: 600,
      height: 400,
      depth: 200
    }
  } as ParticleConfig,
  
  emotions: [
    { id: 'heart', path: '/wordpress-img/logo/heart.png', weight: 1, color: '#ff69b4' },
    { id: 'kirakira', path: '/wordpress-img/logo/kirakira.png', weight: 0.9, color: '#ffd700' },
    { id: 'onpu', path: '/wordpress-img/logo/onpu.png', weight: 0.8, color: '#00ced1' },
    { id: 'denkyu', path: '/wordpress-img/logo/denkyu.png', weight: 0.9, color: '#ffff00' },
    { id: 'fire', path: '/wordpress-img/logo/fire.png', weight: 0.7, color: '#ff4500' },
    { id: 'good', path: '/wordpress-img/logo/good.png', weight: 1, color: '#00ff00' },
    { id: 'lol', path: '/wordpress-img/logo/lol.png', weight: 0.8, color: '#ff1493' },
    { id: 'heartarrow', path: '/wordpress-img/logo/heartarrow.png', weight: 0.7, color: '#ff69b4' },
    { id: 'exclamation', path: '/wordpress-img/logo/exclamation.png', weight: 0.6, color: '#ffa500' },
    { id: 'oh', path: '/wordpress-img/logo/oh.png', weight: 0.6, color: '#9370db' },
    { id: 'kirakirasmall', path: '/wordpress-img/logo/kirakirasmall.png', weight: 0.7, color: '#ffd700' },
    { id: 'www', path: '/wordpress-img/logo/www.png', weight: 0.5, color: '#00bfff' },
    { id: 'age', path: '/wordpress-img/logo/age.png', weight: 0.5, color: '#ff69b4' },
    { id: 'ase', path: '/wordpress-img/logo/ase.png', weight: 0.4, color: '#87ceeb' },
    { id: 'tereru', path: '/wordpress-img/logo/tereru.png', weight: 0.6, color: '#ffb6c1' },
    { id: 'zzz', path: '/wordpress-img/logo/zzz.png', weight: 0.3, color: '#4169e1' }
  ] as EmotionIcon[],
  
  atlas: {
    gridSize: 4, // 4x4 grid = 16 emotions
    textureSize: 512
  } as AtlasConfig,
  
  connections: {
    maxDistance: 150,
    maxLines: 400,
    opacity: 0.3,
    color: '#00ffcc'
  } as ConnectionConfig,
  
  colors: {
    primary: 0x00ffcc,
    secondary: 0x8a2be2,
    accent: 0xff00ff,
    connection: 0x00ffcc
  },
  
  animation: {
    rotationSpeed: 0.0005,
    floatAmplitude: 5,
    floatFrequency: 0.01,
    glowSpeed: 2,
    glowIntensity: 0.2
  }
}