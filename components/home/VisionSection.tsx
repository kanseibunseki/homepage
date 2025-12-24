'use client'

import { useState, useEffect } from 'react'

import styles from './VisionSection.module.css'
import { useVisionParticles } from './vision/useVisionParticles'
import { useVisionScroll } from './vision/useVisionScroll'
import { VisionBackground } from './vision/VisionBackground'
import { VisionContent } from './vision/VisionContent'
import { VisionVisuals } from './vision/VisionVisuals'


const VisionSection = () => {
  const { particles, mounted } = useVisionParticles()
  const { sectionRef, isVisible } = useVisionScroll()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkMobile()

    // Resize listener
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section ref={sectionRef} className={styles.visionSection}>
      {/* モバイル判定をプロップスとして渡す */}
      <VisionBackground particles={particles} mounted={mounted} isMobile={isMobile} />



      {/* メインコンテンツ */}
      <div className={styles.container}>
        <VisionContent isVisible={isVisible} />
        <VisionVisuals isVisible={isVisible} />
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