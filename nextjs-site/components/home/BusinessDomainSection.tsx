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

  const services: ServiceCard[] = [
    {
      id: 'consulting',
      symbol: '',  // 3Dキューブで置き換え
      title: 'Consulting',
      subtitle: '感性をビジネスの力に',
      description: '「KANSEI Agents」が暴き出すインサイトを、ビジネスの血肉へ。経験豊富なコンサルタントが、データと感性を繋ぎ、持続可能な成長戦略を共に描きます。'
    },
    {
      id: 'ai-poc',
      symbol: '',  // 3Dキューブで置き換え
      title: 'AI PoC',
      subtitle: '未知の可能性への伴走者',
      description: '「こんなことはできないか？」そのアイディアを私たちに。最先端のAI技術で、構想から実装まで、前人未到のビジネス価値を創造する旅路に並走します。'
    },
    {
      id: 'saas',
      symbol: '',  // 3Dキューブで置き換え
      title: 'SaaS',
      subtitle: '感性理解を、組織のDNAへ',
      description: '「KANSEI Agents」を貴社専用にカスタマイズし提供。マーケティングの内製化と、組織全体の"感性リテラシー"向上を実現します。'
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
            BUSINESS DOMAIN
          </h2>
          <p className={styles.subtitle}>
            事業領域
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

        {/* サービスカードグリッド */}
        <div className={`${styles.servicesGrid} ${isVisible ? styles.gridVisible : ''}`}>
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={styles.serviceCard}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
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