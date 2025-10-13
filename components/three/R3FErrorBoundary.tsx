'use client'

import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * React Three Fiber用エラーバウンダリー
 * R3Fコンポーネントでエラーが発生した場合、既存のvanilla実装にフォールバック
 */
class R3FErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('R3F Error Boundary caught:', error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('R3F Error Details:', {
      error,
      componentStack: errorInfo.componentStack,
      digest: errorInfo.digest
    })
  }

  render() {
    if (this.state.hasError) {
      // エラー時は既存のvanilla Three.js実装を使用
      console.warn('R3F rendering failed. Falling back to vanilla Three.js implementation.')
      
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }
      
      // フォールバックが提供されていない場合は空の表示
      return (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none' 
        }}>
          {/* 3D rendering failed - using fallback */}
        </div>
      )
    }

    return this.props.children
  }
}

export default R3FErrorBoundary