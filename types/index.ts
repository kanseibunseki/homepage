/**
 * プロジェクト全体で使用する型定義
 */

// 感情データの型
export interface EmotionData {
  joy: number
  surprise: number
  excitement: number
  creativity: number
  empathy: number
}

// セクションスタイルの型
export interface SectionStyle {
  minHeight: string
  position: 'relative' | 'absolute' | 'fixed'
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
}

// ナビゲーションアイテムの型
export interface NavItem {
  href: string
  label: string
  isActive?: boolean
}

// 画像パスの型
export interface ImagePaths {
  desktop: string
  mobile?: string
  alt: string
}

// アニメーション設定の型
export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: string
  loop?: boolean
}