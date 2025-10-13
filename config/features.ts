/**
 * フィーチャーフラグ設定
 * 環境変数から機能の有効/無効を制御
 */
export const features = {
  // React Three Fiber使用フラグ
  useR3F: process.env.NEXT_PUBLIC_USE_R3F === 'true',
  
  // 開発時のStats表示
  showStats: process.env.NEXT_PUBLIC_SHOW_STATS === 'true' && process.env.NODE_ENV === 'development',
} as const

// 現在の設定をログ出力（開発時のみ）
if (process.env.NODE_ENV === 'development') {
  console.log('Feature flags:', features)
}