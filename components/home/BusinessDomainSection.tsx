'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './BusinessDomainSection.module.css'

interface ServiceCard {
  id: string
  symbol: string
  title: string
  subtitle: string
  description: string
}

const BusinessDomainSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('consulting')

  const services: ServiceCard[] = [
    {
      id: 'consulting',
      symbol: '',  // 3Dキューブで置き換え
      title: 'コンサルティング',
      subtitle: '感性をビジネスの力に',
      description: '「KANSEI Agents」が暴き出すインサイトを、ビジネスの血肉へ。経験豊富なコンサルタントが、データと感性を繋ぎ、持続可能な成長戦略を共に描きます。'
    },
    {
      id: 'n1-interview',
      symbol: '',  // 3Dキューブで置き換え
      title: 'N1インタビューサービス',
      subtitle: '一人ひとりの声に、深く向き合う',
      description: '顧客一人ひとりの声に徹底的に向き合い、表層的なデータでは見えない真の感性とニーズを引き出します。質的なインサイトから、ビジネスの核心的課題を発見します。'
    }
  ]

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
    <section ref={sectionRef} className={styles.businessDomainSection}>
      {/* 背景エフェクト */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gradientLayer1} />
        <div className={styles.gradientLayer2} />
        <div className={styles.gridPattern}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="businessGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(138, 43, 226, 0.05)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#businessGrid)" />
          </svg>
        </div>
      </div>

      <div className={styles.container}>
        {/* ヘッダーセクション */}
        <div className={`${styles.header} ${isVisible ? styles.headerVisible : ''}`}>
          <h2 className={styles.mainTitle}>
            toB向けサービス
          </h2>
          <p className={styles.subtitle}>
            B2B Services
          </p>
          <div className={styles.titleDecoration}>
            <span className={styles.decorLine} />
            <span className={styles.decorDot} />
            <span className={styles.decorLine} />
          </div>
        </div>

        {/* イントロテキスト */}
        <div className={`${styles.introText} ${isVisible ? styles.introVisible : ''}`}>
          <p>
            私たちは単に技術を売るのではない。<br />
            感性という新たな経営資源を実装し、<br />
            貴社のビジネスを次の次元へと導くための羅針盤を提供します。
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className={`${styles.tabNavigation} ${isVisible ? styles.tabVisible : ''}`}>
          {services.map((service) => (
            <button
              key={service.id}
              className={`${styles.tabButton} ${activeTab === service.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(service.id)}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* サービスカード表示（選択されたタブのみ） */}
        <div className={`${styles.serviceDisplay} ${isVisible ? styles.displayVisible : ''}`}>
          {services
            .filter((service) => service.id === activeTab)
            .map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.cardInner}>
                  <div className={styles.cardSymbol}>
                    <div className={styles.cube}>
                      <div className={styles.cubeFace + ' ' + styles.cubeFront}></div>
                      <div className={styles.cubeFace + ' ' + styles.cubeBack}></div>
                      <div className={styles.cubeFace + ' ' + styles.cubeRight}></div>
                      <div className={styles.cubeFace + ' ' + styles.cubeLeft}></div>
                      <div className={styles.cubeFace + ' ' + styles.cubeTop}></div>
                      <div className={styles.cubeFace + ' ' + styles.cubeBottom}></div>
                    </div>
                  </div>
                  <h3 className={styles.cardTitle}>
                    {service.title}
                  </h3>
                  <p className={styles.cardSubtitle}>
                    {service.subtitle}
                  </p>
                  <div className={styles.cardDivider} />
                  <p className={styles.cardDescription}>
                    {service.description}
                  </p>
                  <div className={styles.cardGlow} />
                  <div className={styles.cardBorder} />
                </div>
              </div>
            ))}
        </div>

        {/* フローティングパーティクル */}
        <div className={styles.floatingParticles}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className={styles.particle}
              style={{ 
                animationDelay: `${i * 1.5}s`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BusinessDomainSection