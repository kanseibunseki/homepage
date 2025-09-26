'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './VisionSection.module.css'

interface Particle {
  id: number
  left: number
  top: number
  delay: number
  duration: number
}

const VisionSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // クライアントサイドでのみパーティクルを生成
    setMounted(true)
    const newParticles: Particle[] = []
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10
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

    // パララックススクロール効果
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.visionSection}>
      {/* 背景のパーティクル効果 */}
      <div className={styles.particleBackground}>
        {mounted && particles.map((particle) => (
          <div 
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* 光のグリッドパターン */}
      <div className={styles.gridPattern}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(138, 43, 226, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* メインコンテンツ */}
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.contentVisible : ''}`}>
          {/* タイトル部分 */}
          <div className={styles.titleWrapper}>
            <h1 className={styles.mainTitle}>OUR VISION</h1>
            <h2 className={styles.subTitle}>感性が価値になる社会へ</h2>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </div>

          {/* 3つのブロックをコンテナで囲む */}
          <div className={styles.blocksContainer}>
            {/* ブロック1: テクノロジーと感性 */}
            <div className={styles.block1}>
              <div className={styles.paragraph}>
                <div className={styles.paragraphInner}>
                  <span className={styles.paragraphIcon}>
                    <img src="/wordpress-img/logo/kirakirasmall.png" alt="" />
                  </span>
                  <p>
                    私たちが目指すのは、テクノロジーが人の心を置き去りにする未来ではありません。
                    <br /><br />
                    むしろ、テクノロジーによって、これまで可視化できなかった一人ひとりの「感性」が尊重され、
                    新しい価値を生み出す社会です。
                  </p>
                </div>
              </div>
            </div>

            {/* ブロック2: データと心 */}
            <div className={styles.block2}>
              <div className={styles.paragraph}>
                <div className={styles.paragraphInner}>
                  <span className={styles.paragraphIcon}>
                    <img src="/wordpress-img/logo/heart.png" alt="" />
                  </span>
                  <p>
                    SNSの投稿、商品のレビュー、日々の会話。
                    <br />
                    その言葉の奥に眠る、測定できないはずの「心」。
                    <br /><br />
                    私たちはその膨大なデータを、単なる数字の羅列としてではなく、
                    人々の感情の集合体として捉えます。
                  </p>
                </div>
              </div>
            </div>

            {/* ブロック3: 左下に配置（タイトルなし） */}
            <div className={styles.block3}>
              <div className={styles.paragraphLeft}>
                <div className={styles.paragraphInnerLeft}>
                  <span className={styles.paragraphIcon}>
                    <img src="/wordpress-img/logo/denkyu.png" alt="" />
                  </span>
                  <p>
                    データと感性が交差する点に、
                    <br />
                    ビジネスの革新と、より豊かなコミュニケーションの未来が生まれる。
                    <br /><br />
                    私たちはそう信じて、AIに「ココロ」を実装していきます。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ビジュアル要素 */}
          <div className={styles.visualElements}>
            {/* 中央の光る球体 */}
            <div className={styles.centralOrb}>
              <div className={styles.orbCore}></div>
              <div className={styles.orbGlow}></div>
              <div className={styles.orbPulse}></div>
            </div>

            {/* 周回する感情アイコン */}
            <div className={styles.orbitingIcons}>
              <div className={styles.orbitIcon} style={{ animationDelay: '0s' }}>
                <img src="/wordpress-img/logo/lol.png" alt="" />
              </div>
              <div className={styles.orbitIcon} style={{ animationDelay: '2s' }}>
                <img src="/wordpress-img/logo/onpu.png" alt="" />
              </div>
              <div className={styles.orbitIcon} style={{ animationDelay: '4s' }}>
                <img src="/wordpress-img/logo/fire.png" alt="" />
              </div>
              <div className={styles.orbitIcon} style={{ animationDelay: '6s' }}>
                <img src="/wordpress-img/logo/good.png" alt="" />
              </div>
            </div>
          </div>

          {/* データストリームビジュアライゼーション */}
          <div className={styles.dataStream}>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={styles.streamLine}
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  opacity: isVisible ? 1 : 0
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 底部のグラデーション境界線 */}
      <div className={styles.bottomGradient}>
        <svg width="100%" height="100" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path 
            d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z" 
            fill="url(#visionGradient)"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="visionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8a2be2" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00ffcc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}

export default VisionSection