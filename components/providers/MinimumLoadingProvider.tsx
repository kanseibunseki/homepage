'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from '@/app/loading.module.css'

export default function MinimumLoadingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isVisible, setIsVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // ページ遷移時にローディング表示
    setIsVisible(true)

    // 最低2秒間はローディング画面を表示してからフェードアウト
    const minLoadingTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => {
      clearTimeout(minLoadingTimer)
    }
  }, [pathname])

  return (
    <>
      {/* ローディング画面（常にDOMに存在、CSSで表示/非表示切り替え） */}
      <div className={`${styles.loadingScreen} ${!isVisible ? styles.hidden : ''}`}>
        {/* 3Dパーティクル背景エフェクト */}
        <div className={styles.particleLoader}>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
        </div>

        {/* 会社ロゴ */}
        <img
          src="/img/top/logo.png"
          alt="Loading..."
          className={styles.logo}
        />

        {/* ドットアニメーション */}
        <div className={styles.loadingAnimation}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>

        {/* プログレスバー */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>

        {/* ローディングテキスト */}
        <p className={styles.loadingText}>感性を分析中...</p>
      </div>

      {/* メインコンテンツ */}
      <div className={isVisible ? styles.contentHidden : styles.contentVisible}>
        {children}
      </div>
    </>
  )
}
