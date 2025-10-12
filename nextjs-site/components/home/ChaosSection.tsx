'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ChaosSection.module.css'

interface DataFlowParticle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
}

const ChaosSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<DataFlowParticle[]>([])

  useEffect(() => {
    // データフローパーティクルの生成
    const newParticles: DataFlowParticle[] = []
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10
      })
    }
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.chaosSection}>
      {/* 背景のデータフローアニメーション */}
      <div className={styles.dataFlowBackground}>
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className={styles.dataParticle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* グラデーションメッシュ背景 */}
      <div className={styles.meshGradient}>
        <div className={styles.meshLayer1} />
        <div className={styles.meshLayer2} />
        <div className={styles.meshLayer3} />
      </div>

      <div className={styles.container}>
        {/* セクションタイトル */}
        <div className={`${styles.titleWrapper} ${isVisible ? styles.titleVisible : ''}`}>
          <h2 className={styles.sectionTitle}>
            混沌から、答えを。
          </h2>
          <p className={styles.sectionSubtitle}>
            散らばった顧客の声を、ビジネスを動かす「ひらめき」に変える。
            <br />
            私たちのサービスが、データドリブンな意思決定に、人間ならではの温かみを加えます。
          </p>
        </div>

        {/* 3つのコンテンツカード */}
        <div className={`${styles.cardsGrid} ${isVisible ? styles.cardsVisible : ''}`}>
          {/* カード1: リアルタイムで、市場の"空気"を読む */}
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <img src="/wordpress-img/logo/onpu.png" alt="" />
              </div>
              <h3 className={styles.cardTitle}>
                「リアルタイムで、市場の"空気"を読む」
              </h3>
              <p className={styles.cardDescription}>
                SNSやレビューに散らばる膨大な "心の声" をリアルタイムに集約・分析。
                情報過多の時代に、ビジネスの羅針盤となるインサイトを提供します。
              </p>
              <div className={styles.cardGlow} />
            </div>
          </div>

          {/* カード2: データと感性の"翻訳家"になる */}
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <img src="/wordpress-img/logo/good.png" alt="" />
              </div>
              <h3 className={styles.cardTitle}>
                「データと感性の"翻訳家"になる」
              </h3>
              <p className={styles.cardDescription}>
                AIが導き出した発見を、経験豊富なアナリストが解釈し、
                貴社の課題に即した具体的な戦略へ。次の一手を共に考えます。
              </p>
              <div className={styles.cardGlow} />
            </div>
          </div>

          {/* カード3: 貴社だけの"感性理解エンジン"を */}
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <img src="/wordpress-img/logo/exclamation.png" alt="" />
              </div>
              <h3 className={styles.cardTitle}>
                「貴社だけの"感性理解エンジン"を」
              </h3>
              <p className={styles.cardDescription}>
                業界特有の言葉のニュアンスや、独自の顧客層が持つ価値観を学習。
                貴社のビジネスに最適化されたオーダーメイドのAIを開発します。
              </p>
              <div className={styles.cardGlow} />
            </div>
          </div>
        </div>

        {/* 中央のビジュアルエフェクト */}
        <div className={styles.centerVisual}>
          <div className={styles.dataVortex}>
            <div className={styles.vortexRing1} />
            <div className={styles.vortexRing2} />
            <div className={styles.vortexRing3} />
            <div className={styles.vortexCore}>
              <img src="/wordpress-img/logo/fire.png" alt="" />
            </div>
          </div>
        </div>

        {/* フローティングデータライン */}
        <div className={styles.floatingLines}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className={styles.dataLine}
              style={{ 
                animationDelay: `${i * 0.5}s`,
                top: `${20 + i * 15}%`,
                left: `${-10 + i * 20}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* 底部のウェーブエフェクト */}
      <div className={styles.waveContainer}>
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chaosWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8a2be2" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00ffcc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path 
            className={styles.wavePath}
            d="M0,40 Q300,10 600,40 T1200,40 L1200,100 L0,100 Z" 
            fill="url(#chaosWaveGradient)"
          />
        </svg>
      </div>
    </section>
  )
}

export default ChaosSection