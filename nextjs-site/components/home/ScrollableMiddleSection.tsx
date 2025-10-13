'use client'

import { useEffect, useRef } from 'react'
import styles from './ScrollableMiddleSection.module.css'
import VisionSection from './VisionSection'
import ChaosSection from './ChaosSection'
import CoreTechSection from './CoreTechSection'
import BusinessDomainSection from './BusinessDomainSection'

export default function ScrollableMiddleSection() {
  const sectionRefs = {
    vision: useRef<HTMLDivElement>(null),
    chaos: useRef<HTMLDivElement>(null),
    coreTech: useRef<HTMLDivElement>(null),
    businessDomain: useRef<HTMLDivElement>(null)
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1]
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement
        if (entry.isIntersecting) {
          // 画面に少しでも入ったら完全に不透明
          element.style.opacity = '1'
          element.style.transform = 'translateY(0)'
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // 各セクションを監視
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className={styles.container}>
      {/* Vision Section */}
      <div ref={sectionRefs.vision} className={styles.section}>
        <VisionSection />
      </div>
      
      {/* Chaos Section - 混沌から、答えを。 */}
      <div ref={sectionRefs.chaos} className={styles.section}>
        <ChaosSection />
      </div>
      
      {/* Core Technology Section - テクノロジーの核心 */}
      <div ref={sectionRefs.coreTech} className={styles.section}>
        <CoreTechSection />
      </div>
      
      {/* Business Domain Section - 事業領域 */}
      <div ref={sectionRefs.businessDomain} className={styles.section}>
        <BusinessDomainSection />
      </div>
    </div>
  )
}