'use client'

import dynamic from 'next/dynamic'
import { features } from '@/config/features'
import R3FErrorBoundary from './three/R3FErrorBoundary'
import ThreeBackground from './ThreeBackground'

// R3F版をdynamic importでSSR無効化
const ThreeBackgroundFiber = dynamic(
  () => import('./ThreeBackgroundFiber'),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        pointerEvents: 'none' 
      }} />
    )
  }
)

/**
 * ThreeBackgroundのラッパーコンポーネント
 * フィーチャーフラグに基づいて、vanilla Three.jsまたはR3F版を使用
 */
export default function ThreeBackgroundWrapper() {
  // 開発環境でのログ出力
  if (process.env.NODE_ENV === 'development') {
    console.log('ThreeBackground using:', features.useR3F ? 'React Three Fiber' : 'Vanilla Three.js')
  }

  // R3F版を使用する場合
  if (features.useR3F) {
    return (
      <R3FErrorBoundary fallback={<ThreeBackground />}>
        <ThreeBackgroundFiber />
      </R3FErrorBoundary>
    )
  }

  // 既存のvanilla Three.js版を使用
  return <ThreeBackground />
}