'use client'

import { useEffect, useState } from 'react'
import styles from './ScrollDebugger.module.css'

const ScrollDebugger = () => {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollPercent: 0,
    viewportHeight: 0,
    documentHeight: 0,
    currentSection: '',
  })

  useEffect(() => {
    const updateScrollData = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - viewportHeight
      const scrollPercent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0

      // 現在のセクションを判定
      let currentSection = 'Top'
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
          // セクションのクラス名やテキストから名前を取得
          const className = section.className
          const text = section.textContent?.substring(0, 50) || ''
          
          if (className.includes('hero')) {
            currentSection = 'Hero Section'
          } else if (text.includes('OUR VISION')) {
            currentSection = 'Vision Section'
          } else if (text.includes('Problem')) {
            currentSection = 'Problem Section'
          } else if (text.includes('Solution')) {
            currentSection = 'Solution Section'
          } else if (text.includes('Lecture')) {
            currentSection = 'Lecture Section'
          } else if (text.includes('Difference')) {
            currentSection = 'Difference Section'
          } else if (text.includes('Introduction')) {
            currentSection = 'Introduction Section'
          } else if (text.includes('Price')) {
            currentSection = 'Price Section'
          } else if (text.includes('CV')) {
            currentSection = 'CV Section'
          }
        }
      })

      setScrollData({
        scrollY: Math.round(scrollY),
        scrollPercent: Math.round(scrollPercent),
        viewportHeight: Math.round(viewportHeight),
        documentHeight: Math.round(documentHeight),
        currentSection,
      })
    }

    // 初期値を設定
    updateScrollData()

    // スクロールイベントリスナー
    window.addEventListener('scroll', updateScrollData)
    window.addEventListener('resize', updateScrollData)

    return () => {
      window.removeEventListener('scroll', updateScrollData)
      window.removeEventListener('resize', updateScrollData)
    }
  }, [])

  // 開発環境でのみ表示
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className={styles.debugger}>
      <div className={styles.title}>📍 Scroll Debug</div>
      <div className={styles.data}>
        <div className={styles.item}>
          <span className={styles.label}>Scroll Y:</span>
          <span className={styles.value}>{scrollData.scrollY}px</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Progress:</span>
          <span className={styles.value}>{scrollData.scrollPercent}%</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Viewport:</span>
          <span className={styles.value}>{scrollData.viewportHeight}px</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Document:</span>
          <span className={styles.value}>{scrollData.documentHeight}px</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Section:</span>
          <span className={styles.value}>{scrollData.currentSection}</span>
        </div>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${scrollData.scrollPercent}%` }}
        />
      </div>
    </div>
  )
}

export default ScrollDebugger