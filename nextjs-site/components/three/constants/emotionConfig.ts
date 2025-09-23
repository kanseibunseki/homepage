export interface EmotionIcon {
  id: string
  path: string
  weight: number
}

export interface ParticleConfig {
  count: number
  size: number
  connectionDistance: number
  speed: number
}

export interface AtlasConfig {
  gridSize: number
  textureSize: number
}

export const EMOTION_CONFIG = {
  particles: {
    count: 80,
    size: 50,
    connectionDistance: 150,
    speed: 0.3,
    mouseInfluence: 50,
    bounceSpeed: 0.5
  } as ParticleConfig,
  
  emotions: [
    { id: 'heart', path: '/wordpress-img/logo/heart.png', weight: 1 },
    { id: 'kirakira', path: '/wordpress-img/logo/kirakira.png', weight: 0.9 },
    { id: 'onpu', path: '/wordpress-img/logo/onpu.png', weight: 0.8 },
    { id: 'denkyu', path: '/wordpress-img/logo/denkyu.png', weight: 0.9 },
    { id: 'fire', path: '/wordpress-img/logo/fire.png', weight: 0.7 },
    { id: 'good', path: '/wordpress-img/logo/good.png', weight: 1 },
    { id: 'lol', path: '/wordpress-img/logo/lol.png', weight: 0.8 },
    { id: 'heartarrow', path: '/wordpress-img/logo/heartarrow.png', weight: 0.7 },
    { id: 'exclamation', path: '/wordpress-img/logo/exclamation.png', weight: 0.6 },
    { id: 'oh', path: '/wordpress-img/logo/oh.png', weight: 0.6 },
    { id: 'kirakirasmall', path: '/wordpress-img/logo/kirakirasmall.png', weight: 0.7 },
    { id: 'www', path: '/wordpress-img/logo/www.png', weight: 0.5 },
    { id: 'age', path: '/wordpress-img/logo/age.png', weight: 0.5 },
    { id: 'ase', path: '/wordpress-img/logo/ase.png', weight: 0.4 },
    { id: 'tereru', path: '/wordpress-img/logo/tereru.png', weight: 0.6 },
    { id: 'zzz', path: '/wordpress-img/logo/zzz.png', weight: 0.3 }
  ] as EmotionIcon[],
  
  atlas: {
    gridSize: 4, // 4x4 grid = 16 emotions
    textureSize: 512
  } as AtlasConfig,
  
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