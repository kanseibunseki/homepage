'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ScrollableMiddleSection.module.css'
import VisionSection from './VisionSection'
import ProblemSection from './ProblemSection'
import SolutionSection from './SolutionSection'
import LectureSection from './LectureSection'
import DifferenceSection from './DifferenceSection'
import IntroductionSection from './IntroductionSection'
import PriceSection from './PriceSection'

export default function ScrollableMiddleSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  
  // 各セクションのアニメーション状態
  const [sectionStates, setSectionStates] = useState({
    vision: { opacity: 0, translateY: 50, scale: 0.95 },
    problem: { opacity: 0, translateY: 50, scale: 0.95 },
    solution: { opacity: 0, translateY: 50, scale: 0.95 },
    lecture: { opacity: 0, translateY: 50, scale: 0.95 },
    difference: { opacity: 0, translateY: 50, scale: 0.95 },
    introduction: { opacity: 0, translateY: 50, scale: 0.95 },
    price: { opacity: 0, translateY: 50, scale: 0.95 }
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight
      
      // コンテナが画面に入っているかチェック
      const containerTop = rect.top
      const containerBottom = rect.bottom
      
      if (containerTop < windowHeight && containerBottom > 0) {
        setIsInView(true)
        
        // スクロール進行度を計算（0-1）
        const scrollIntoView = Math.max(0, -rect.top)
        const scrollThroughContainer = Math.min(scrollIntoView / (containerHeight - windowHeight), 1)
        setScrollProgress(scrollThroughContainer)
        
        // 各セクションのアニメーションを計算
        const sections = ['vision', 'problem', 'solution', 'lecture', 'difference', 'introduction', 'price']
        const newStates = { ...sectionStates }
        
        sections.forEach((section, index) => {
          // 各セクションが順番に表示される
          const sectionStart = index / sections.length
          const sectionEnd = (index + 1) / sections.length
          const sectionMiddle = (sectionStart + sectionEnd) / 2
          
          // セクションの表示進行度
          let sectionProgress = 0
          
          if (scrollThroughContainer >= sectionStart && scrollThroughContainer <= sectionEnd) {
            // 現在のセクション
            sectionProgress = (scrollThroughContainer - sectionStart) / (sectionEnd - sectionStart)
            
            newStates[section] = {
              opacity: Math.min(1, sectionProgress * 2),
              translateY: 50 - (sectionProgress * 50),
              scale: 0.95 + (sectionProgress * 0.05)
            }
          } else if (scrollThroughContainer > sectionEnd) {
            // 通過済みのセクション
            const fadeOutStart = sectionEnd
            const fadeOutEnd = Math.min(sectionEnd + 0.1, 1)
            
            if (scrollThroughContainer <= fadeOutEnd) {
              const fadeOutProgress = (scrollThroughContainer - fadeOutStart) / (fadeOutEnd - fadeOutStart)
              newStates[section] = {
                opacity: 1 - (fadeOutProgress * 0.5),
                translateY: -(fadeOutProgress * 30),
                scale: 1 - (fadeOutProgress * 0.05)
              }
            } else {
              newStates[section] = {
                opacity: 0.5,
                translateY: -30,
                scale: 0.95
              }
            }
          } else {
            // まだ表示されていないセクション
            newStates[section] = {
              opacity: 0,
              translateY: 50,
              scale: 0.95
            }
          }
        })
        
        setSectionStates(newStates)
      } else {
        setIsInView(false)
        setScrollProgress(0)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      {/* スクロール領域（7セクション分） */}
      <div className={styles.scrollArea} />
      
      {/* 固定ビューポート */}
      <div 
        className={styles.fixedViewport}
        style={{ display: isInView ? 'block' : 'none' }}
      >
        {/* プログレスバー */}
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        
        {/* Vision Section */}
        <div 
          className={styles.sectionWrapper}
          style={{
            opacity: sectionStates.vision.opacity,
            transform: `translateY(${sectionStates.vision.translateY}px) scale(${sectionStates.vision.scale})`
          }}
        >
          <VisionSection />
        </div>
        
        {/* Problem Section */}
        <div 
          className={styles.sectionWrapper}
          style={{
            opacity: sectionStates.problem.opacity,
            transform: `translateY(${sectionStates.problem.translateY}px) scale(${sectionStates.problem.scale})`
          }}
        >
          <ProblemSection />
        </div>
        
        {/* Solution Section */}
        <div 
          className={styles.sectionWrapper}
          style={{
            opacity: sectionStates.solution.opacity,
            transform: `translateY(${sectionStates.solution.translateY}px) scale(${sectionStates.solution.scale})`
          }}
        >
          <SolutionSection />
        </div>
        
        {/* Lecture Section */}
        <div 
          className={styles.sectionWrapper}
          style={{
            opacity: sectionStates.lecture.opacity,
            transform: `translateY(${sectionStates.lecture.translateY}px) scale(${sectionStates.lecture.scale})`
          }}
        >
          <LectureSection />
        </div>
        
        {/* Difference Section */}
        <div 
          className={styles.sectionWrapper}
          style={{
            opacity: sectionStates.difference.opacity,
            transform: `translateY(${sectionStates.difference.translateY}px) scale(${sectionStates.difference.scale})`
          }}
        >
          <DifferenceSection />
        </div>
        
        {/* Introduction Section */}
        <div 
          className={styles.sectionWrapper}
          style={{
            opacity: sectionStates.introduction.opacity,
            transform: `translateY(${sectionStates.introduction.translateY}px) scale(${sectionStates.introduction.scale})`
          }}
        >
          <IntroductionSection />
        </div>
        
        {/* Price Section */}
        <div 
          className={styles.sectionWrapper}
          style={{
            opacity: sectionStates.price.opacity,
            transform: `translateY(${sectionStates.price.translateY}px) scale(${sectionStates.price.scale})`
          }}
        >
          <PriceSection />
        </div>
      </div>
    </div>
  )
}