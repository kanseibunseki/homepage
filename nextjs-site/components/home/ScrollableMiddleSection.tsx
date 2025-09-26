'use client'

import { useEffect, useRef } from 'react'
import styles from './ScrollableMiddleSection.module.css'
import VisionSection from './VisionSection'
import ProblemSection from './ProblemSection'
import SolutionSection from './SolutionSection'
import LectureSection from './LectureSection'
import DifferenceSection from './DifferenceSection'
import IntroductionSection from './IntroductionSection'
import PriceSection from './PriceSection'

export default function ScrollableMiddleSection() {
  const sectionRefs = {
    vision: useRef<HTMLDivElement>(null),
    problem: useRef<HTMLDivElement>(null),
    solution: useRef<HTMLDivElement>(null),
    lecture: useRef<HTMLDivElement>(null),
    difference: useRef<HTMLDivElement>(null),
    introduction: useRef<HTMLDivElement>(null),
    price: useRef<HTMLDivElement>(null)
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
          // スクロールに入った時のアニメーション
          const ratio = entry.intersectionRatio
          // 0.3以上の表示で完全に不透明にする
          if (ratio >= 0.3) {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0)'
          } else {
            element.style.opacity = `${ratio * 3.33}`
            element.style.transform = `translateY(${Math.max(0, (1 - ratio * 3.33) * 30)}px)`
          }
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
      
      {/* Problem Section */}
      <div ref={sectionRefs.problem} className={styles.section}>
        <ProblemSection />
      </div>
      
      {/* Solution Section */}
      <div ref={sectionRefs.solution} className={styles.section}>
        <SolutionSection />
      </div>
      
      {/* Lecture Section */}
      <div ref={sectionRefs.lecture} className={styles.section}>
        <LectureSection />
      </div>
      
      {/* Difference Section */}
      <div ref={sectionRefs.difference} className={styles.section}>
        <DifferenceSection />
      </div>
      
      {/* Introduction Section */}
      <div ref={sectionRefs.introduction} className={styles.section}>
        <IntroductionSection />
      </div>
      
      {/* Price Section */}
      <div ref={sectionRefs.price} className={styles.section}>
        <PriceSection />
      </div>
    </div>
  )
}