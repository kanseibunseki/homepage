'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({
  children
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  // useLayoutEffectはSSRでは使えないので、クライアントサイドのみで実行
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

  useIsomorphicLayoutEffect(() => {
    // Lenisインスタンスの作成
    const lenis = new Lenis({
      duration: 1.2, // スクロールアニメーションの継続時間
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // カスタムイージング関数
      orientation: 'vertical', // 垂直スクロール
      gestureOrientation: 'vertical', // ジェスチャーも垂直
      smoothWheel: true, // ホイールスクロールをスムースに
      wheelMultiplier: 1.0, // ホイールの感度
      touchMultiplier: 2, // タッチの感度
      autoResize: true, // リサイズ時に自動調整
    })

    lenisRef.current = lenis

    // アニメーションフレームでLenisを更新
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // リサイズ時の処理
    const handleResize = () => {
      lenis.resize()
    }

    window.addEventListener('resize', handleResize)

    // クリーンアップ
    return () => {
      lenis.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // スクロール位置のリセット（ページ遷移時など）
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [])

  return <>{children}</>
}