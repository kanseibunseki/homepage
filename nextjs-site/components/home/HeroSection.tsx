'use client'

import { useEffect, useState } from 'react'
import EmotionParticleSystemFiber from '../three/EmotionParticleSystemFiber'
import CursorRipple from '../effects/CursorRipple'
import ScrollDebugger from '../debug/ScrollDebugger'
import styles from './HeroSection.module.css'
import type { EmotionData } from '@/types'

const HeroSection = () => {
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [documentHeight, setDocumentHeight] = useState('100vh')
  const [emotionData, setEmotionData] = useState<EmotionData>({
    joy: 85,
    surprise: 72,
    excitement: 90,
    creativity: 78,
    empathy: 65
  })
  
  useEffect(() => {
    setMounted(true)
    
    // ドキュメント高さの計算
    const updateDocumentHeight = () => {
      const docHeight = document.documentElement.scrollHeight
      setDocumentHeight(`${docHeight}px`)
    }
    updateDocumentHeight()
    
    // 感情データのリアルタイム変動シミュレーション
    const interval = setInterval(() => {
      setEmotionData(prev => ({
        joy: Math.max(60, Math.min(95, prev.joy + (Math.random() - 0.5) * 5)),
        surprise: Math.max(60, Math.min(95, prev.surprise + (Math.random() - 0.5) * 5)),
        excitement: Math.max(60, Math.min(95, prev.excitement + (Math.random() - 0.5) * 5)),
        creativity: Math.max(60, Math.min(95, prev.creativity + (Math.random() - 0.5) * 5)),
        empathy: Math.max(60, Math.min(95, prev.empathy + (Math.random() - 0.5) * 5))
      }))
    }, 500)
    
    // スクロール位置の監視
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
    }
    
    // リサイズ時にドキュメント高さを再計算
    const handleResize = () => {
      updateDocumentHeight()
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    // MutationObserverでコンテンツの変更を監視
    const observer = new MutationObserver(() => {
      updateDocumentHeight()
    })
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
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
            </div>
            
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
            
            {/* 現在のムード表示 */}
            <div className={styles.moodIndicator}>
              <div className={styles.moodPulse} />
              <span className={styles.moodText}>Current Mood:</span>
              <span className={styles.moodValue}>Innovative</span>
            </div>
          </div>
          
          {/* 右側：感情分析ビジュアルとボタン */}
          <div className={styles.rightContent}>
            {/* 感情分析レーダー */}
            <div className={styles.emotionRadar}>
              <div className={styles.radarContainer}>
                {/* スキャンライン */}
                <div className={styles.scanLine} />
                
                {/* 円形グリッド */}
                <svg className={styles.radarSvg} viewBox="0 0 300 300">
                  {/* 背景の円 */}
                  <circle cx="150" cy="150" r="140" className={styles.radarCircle} />
                  <circle cx="150" cy="150" r="105" className={styles.radarCircle} />
                  <circle cx="150" cy="150" r="70" className={styles.radarCircle} />
                  <circle cx="150" cy="150" r="35" className={styles.radarCircle} />
                  
                  {/* 五角形のライン */}
                  <line x1="150" y1="10" x2="150" y2="290" className={styles.radarAxis} />
                  <line x1="10" y1="150" x2="290" y2="150" className={styles.radarAxis} />
                  <line x1="50" y1="50" x2="250" y2="250" className={styles.radarAxis} />
                  <line x1="250" y1="50" x2="50" y2="250" className={styles.radarAxis} />
                  
                  {/* データポリゴン */}
                  <polygon
                    points={`
                      ${150 + emotionData.joy * 1.4 * Math.cos(-Math.PI/2)},${150 + emotionData.joy * 1.4 * Math.sin(-Math.PI/2)}
                      ${150 + emotionData.surprise * 1.4 * Math.cos(-Math.PI/2 + 2*Math.PI/5)},${150 + emotionData.surprise * 1.4 * Math.sin(-Math.PI/2 + 2*Math.PI/5)}
                      ${150 + emotionData.excitement * 1.4 * Math.cos(-Math.PI/2 + 4*Math.PI/5)},${150 + emotionData.excitement * 1.4 * Math.sin(-Math.PI/2 + 4*Math.PI/5)}
                      ${150 + emotionData.creativity * 1.4 * Math.cos(-Math.PI/2 + 6*Math.PI/5)},${150 + emotionData.creativity * 1.4 * Math.sin(-Math.PI/2 + 6*Math.PI/5)}
                      ${150 + emotionData.empathy * 1.4 * Math.cos(-Math.PI/2 + 8*Math.PI/5)},${150 + emotionData.empathy * 1.4 * Math.sin(-Math.PI/2 + 8*Math.PI/5)}
                    `}
                    className={styles.radarData}
                  />
                </svg>
                
                {/* 感情アイコン（円周上に配置） */}
                <div className={styles.radarIcons}>
                  <div className={styles.radarIcon} style={{ top: '0', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img src="/wordpress-img/logo/lol.png" alt="" />
                    <span className={styles.radarValue}>{Math.round(emotionData.joy)}</span>
                  </div>
                  <div className={styles.radarIcon} style={{ top: '30%', right: '5%', transform: 'translate(50%, -50%)' }}>
                    <img src="/wordpress-img/logo/exclamation.png" alt="" />
                    <span className={styles.radarValue}>{Math.round(emotionData.surprise)}</span>
                  </div>
                  <div className={styles.radarIcon} style={{ bottom: '20%', right: '15%', transform: 'translate(50%, 50%)' }}>
                    <img src="/wordpress-img/logo/fire.png" alt="" />
                    <span className={styles.radarValue}>{Math.round(emotionData.excitement)}</span>
                  </div>
                  <div className={styles.radarIcon} style={{ bottom: '20%', left: '15%', transform: 'translate(-50%, 50%)' }}>
                    <img src="/wordpress-img/logo/denkyu.png" alt="" />
                    <span className={styles.radarValue}>{Math.round(emotionData.creativity)}</span>
                  </div>
                  <div className={styles.radarIcon} style={{ top: '30%', left: '5%', transform: 'translate(-50%, -50%)' }}>
                    <img src="/wordpress-img/logo/heart.png" alt="" />
                    <span className={styles.radarValue}>{Math.round(emotionData.empathy)}</span>
                  </div>
                </div>
                
                {/* 中央のパルス */}
                <div className={styles.radarCenter}>
                  <div className={styles.radarPulse} />
                </div>
              </div>
            </div>
            
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
    </section>
  )
}

export default HeroSection