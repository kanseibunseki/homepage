'use client'

import { useEffect, useState } from 'react'
import EmotionParticleSystem from '../three/EmotionParticleSystem'
import styles from './HeroSection.module.css'

const HeroSection = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <section className={`modern-hero-section ${styles.heroSection}`}>
      {mounted && <EmotionParticleSystem />}
      
      {/* データストリーム背景 */}
      <div className={styles.dataStream}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={styles.streamLine} 
            style={{ 
              left: `${i * 5}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
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
          {/* データビジュアライゼーション装飾 */}
          <div className={styles.dataViz}>
            <div className={styles.orbit}>
              <div className={styles.orbitDot} />
              <div className={styles.orbitDot} />
              <div className={styles.orbitDot} />
            </div>
          </div>
          
          {/* 感情分析ビジュアライザー */}
          <div className={styles.emotionAnalyzer}>
            <div className={styles.analyzerRing}>
              <div className={styles.analyzerIcon} data-emotion="joy">
                <img src="/wordpress-img/logo/lol.png" alt="" />
              </div>
              <div className={styles.analyzerIcon} data-emotion="love">
                <img src="/wordpress-img/logo/heartarrow.png" alt="" />
              </div>
              <div className={styles.analyzerIcon} data-emotion="surprise">
                <img src="/wordpress-img/logo/exclamation.png" alt="" />
              </div>
              <div className={styles.analyzerIcon} data-emotion="think">
                <img src="/wordpress-img/logo/oh.png" alt="" />
              </div>
            </div>
            <div className={styles.analyzerText}>Analyzing Emotions...</div>
          </div>
          
          <h1 className={styles.title}>
            <span className={styles.titleJa}>感性分析</span>
            <span className={styles.titleEn}>EMOTIONAL INTELLIGENCE</span>
          </h1>
          
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot} />
            <span className={styles.dividerLine} />
          </div>
          
          <p className={styles.subtitle}>
            データに命を吹き込み、感情を可視化する
            <br />
            <span className={styles.subtext}>
              Transforming Data into Emotional Insights
            </span>
          </p>
          
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <img src="/wordpress-img/logo/good.png" alt="" />
              </div>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>精度</span>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <img src="/wordpress-img/logo/kirakirasmall.png" alt="" />
              </div>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>プロジェクト</span>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <img src="/wordpress-img/logo/heart.png" alt="" />
              </div>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>サポート</span>
            </div>
          </div>
          
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>
              <span className={styles.buttonText}>分析を開始</span>
              <span className={styles.buttonIcon}>→</span>
            </button>
            <button className={styles.secondaryButton}>
              <span className={styles.buttonText}>詳細を見る</span>
            </button>
          </div>
          
          {/* 現在のムード表示 */}
          <div className={styles.moodIndicator}>
            <div className={styles.moodPulse} />
            <span className={styles.moodText}>Current Mood:</span>
            <span className={styles.moodValue}>Innovative</span>
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
          <img src="/wordpress-img/logo/heart.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon2}`}>
          <img src="/wordpress-img/logo/kirakira.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon3}`}>
          <img src="/wordpress-img/logo/onpu.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon4}`}>
          <img src="/wordpress-img/logo/denkyu.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon5}`}>
          <img src="/wordpress-img/logo/fire.png" alt="" />
        </div>
        <div className={`${styles.emotionIcon} ${styles.emotionIcon6}`}>
          <img src="/wordpress-img/logo/good.png" alt="" />
        </div>
      </div>
      
      {/* ナビゲーション */}
      <nav className={styles.navigation}>
        <div className={styles.navItem}>About</div>
        <div className={styles.navItem}>Services</div>
        <div className={styles.navItem}>Technology</div>
        <div className={styles.navItem}>Contact</div>
      </nav>
    </section>
  )
}

export default HeroSection