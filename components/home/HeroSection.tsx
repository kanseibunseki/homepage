'use client'

import { useState, useEffect } from 'react'
import EmotionParticleSystemFiber from '../three/EmotionParticleSystemFiber'
import CursorRipple from '../effects/CursorRipple'
import ScrollDebugger from '../debug/ScrollDebugger'
import styles from './HeroSection.module.css'
import { useEmotionSimulation } from './hero/useEmotionSimulation'
import { useScrollProgress } from './hero/useScrollProgress'
import { EmotionRadar } from './hero/EmotionRadar'
import { EmotionAnalyzer } from './hero/EmotionAnalyzer'

const HeroSection = () => {
  const [mounted, setMounted] = useState(false)
  const { scrollProgress, documentHeight } = useScrollProgress()
  const emotionData = useEmotionSimulation()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className={`modern-hero-section ${styles.heroSection}`} style={{ minHeight: documentHeight }}>
      {/* スクロールデバッガー */}
      {mounted && <ScrollDebugger />}

      {/* スクロールプログレスバー */}
      <div className={styles.scrollProgress}>
        <div
          className={styles.scrollProgressBar}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {mounted && <EmotionParticleSystemFiber />}
      {mounted && <CursorRipple />}


      {/* 波形アニメーション */}
      <div className={styles.waveContainer}>
        <svg className={styles.wave} viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path className={styles.wavePath} d="M0,100 C150,50 300,150 450,100 C600,50 750,150 900,100 C1050,50 1200,100 1200,100 L1200,200 L0,200 Z" />
        </svg>
      </div>

      {/* グラデーションオーバーレイ */}
      <div className={styles.gradientOverlay} />

      {/* メインコンテンツ */}
      <div className={styles.contentWrapper}>
        <div className={styles.glowEffect} />

        <div className={styles.mainContent}>
          {/* 左側：テキストコンテンツ */}
          <div className={styles.leftContent}>
            {/* データビジュアライゼーション装飾 */}
            <div className={styles.dataViz}>
              <div className={styles.orbit}>
                <div className={styles.orbitDot} />
                <div className={styles.orbitDot} />
                <div className={styles.orbitDot} />
              </div>
            </div>

            {/* 感情分析ビジュアライザー */}
            <EmotionAnalyzer />

            <h1 className={styles.title}>
              <picture className={styles.titleLogo}>
                <source srcSet="/img/top/sp/logo.png" media="(max-width: 860px)" />
                <img src="/img/top/logo.png" alt="感性分析" />
              </picture>
              <span className={styles.titleEn}>EMOTIONAL INTELLIGENCE</span>
            </h1>

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerDot} />
              <span className={styles.dividerLine} />
            </div>

            <p className={styles.subtitle}>
              テクノロジーにこころを
              <br />
              <span className={styles.subtext}>
                Bringing Heart to Technology
              </span>
            </p>
          </div>

          {/* 右側：感情分析ビジュアルとボタン */}
          <div className={styles.rightContent}>
            {/* 感情分析レーダー */}
            <EmotionRadar emotionData={emotionData} />

            {/* ボタングループ */}
            <div className={styles.buttonGroup}>
              <button className={styles.primaryButton}>
                <span className={styles.buttonText}>分析を開始</span>
                <span className={styles.buttonIcon}>→</span>
              </button>
              <button className={styles.secondaryButton}>
                <span className={styles.buttonText}>詳細を見る</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* フローティングデータポイント */}
      <div className={styles.floatingData}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`${styles.dataPoint} ${styles[`dataPoint${i + 1}`]}`}
          >
            <div className={styles.dataPointCore} />
            <div className={styles.dataPointRing} />
          </div>
        ))}
      </div>

      {/* 感情アイコンフローティング */}
      <div className={styles.emotionIcons}>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon1}`}>
          <img src="/img/logo/heart.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon2}`}>
          <img src="/img/logo/kirakira.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon3}`}>
          <img src="/img/logo/onpu.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon4}`}>
          <img src="/img/logo/denkyu.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon5}`}>
          <img src="/img/logo/fire.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon6}`}>
          <img src="/img/logo/good.png" alt="" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection