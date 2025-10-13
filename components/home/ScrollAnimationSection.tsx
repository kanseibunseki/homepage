'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ScrollAnimationSection.module.css'

export default function ScrollAnimationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  
  // フレーム1の状態
  const [frame1Opacity, setFrame1Opacity] = useState(0)
  const [frame1Y, setFrame1Y] = useState(100)
  
  // フレーム2の状態
  const [card1X, setCard1X] = useState(-100)
  const [card2X, setCard2X] = useState(100)
  const [card3Scale, setCard3Scale] = useState(0)
  
  // フレーム3の状態
  const [image1Opacity, setImage1Opacity] = useState(0)
  const [image2Opacity, setImage2Opacity] = useState(0)
  const [text1Y, setText1Y] = useState(50)
  const [text2Y, setText2Y] = useState(50)
  
  // フレーム4の状態
  const [finalMessageOpacity, setFinalMessageOpacity] = useState(0)
  const [finalMessageScale, setFinalMessageScale] = useState(0.5)
  const [particlesOpacity, setParticlesOpacity] = useState(0)
  
  // 粒子の位置を管理（Hydrationエラー対策）
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number}>>([])
  
  // クライアントサイドでのみ粒子の位置を生成
  useEffect(() => {
    const particleData = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }))
    setParticles(particleData)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      
      // セクションが画面に入っているかチェック
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      
      // セクションが画面内にある場合のみ固定ビューポートを表示
      if (sectionTop < windowHeight && sectionBottom > 0) {
        setIsInView(true)
        // セクションが画面に入ってからの進行度を計算（0-1）
        const scrollIntoView = Math.max(0, -rect.top)
        const scrollThroughSection = Math.min(scrollIntoView / (sectionHeight - windowHeight), 1)
        setScrollProgress(scrollThroughSection)
      } else {
        setIsInView(false)
        setScrollProgress(0)
      }
      
      // アニメーション制御（isInViewがtrueの場合のみ）
      if (!isInView) return
      
      // フレーム1（0-25%）
      if (scrollProgress <= 0.25) {
        const progress = scrollProgress * 4 // 0-1に正規化
        setFrame1Opacity(progress)
        setFrame1Y(100 - progress * 100)
        
        // 他のフレームをリセット
        setCard1X(-100)
        setCard2X(100)
        setCard3Scale(0)
      }
      
      // フレーム2（25-50%）
      if (scrollProgress > 0.25 && scrollProgress <= 0.5) {
        const progress = (scrollProgress - 0.25) * 4
        setFrame1Opacity(1 - progress) // フレーム1をフェードアウト
        
        setCard1X(-100 + progress * 100)
        setCard2X(100 - progress * 100)
        setCard3Scale(progress)
        
        // フレーム3をリセット
        setImage1Opacity(0)
        setImage2Opacity(0)
      }
      
      // フレーム3（50-75%）
      if (scrollProgress > 0.5 && scrollProgress <= 0.75) {
        const progress = (scrollProgress - 0.5) * 4
        
        // フレーム2をフェードアウト
        setCard3Scale(1 - progress * 0.5)
        
        // パララックス効果で画像とテキストを表示
        setImage1Opacity(Math.min(progress * 2, 1))
        setImage2Opacity(Math.max(0, (progress - 0.3) * 2))
        setText1Y(50 - progress * 50)
        setText2Y(50 - (progress - 0.3) * 50)
        
        // フレーム4をリセット
        setFinalMessageOpacity(0)
        setFinalMessageScale(0.5)
      }
      
      // フレーム4（75-100%）
      if (scrollProgress > 0.75) {
        const progress = (scrollProgress - 0.75) * 4
        
        // フレーム3をフェードアウト
        setImage1Opacity(1 - progress)
        setImage2Opacity(1 - progress)
        
        // 最終メッセージを表示
        setFinalMessageOpacity(progress)
        setFinalMessageScale(0.5 + progress * 0.5)
        setParticlesOpacity(progress * 0.5)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初期状態を設定
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* スクロール領域の高さを確保 */}
      <div className={styles.scrollArea} />
      
      {/* 固定ビューポート（セクションが画面内にある場合のみ表示） */}
      <div 
        className={styles.fixedViewport}
        style={{ display: isInView ? 'block' : 'none' }}
      >
        
        {/* プログレスインジケーター */}
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${scrollProgress * 100}%` }} 
          />
        </div>
        
        {/* フレーム1: タイトル */}
        <div className={styles.frame1} style={{ opacity: frame1Opacity }}>
          <h2 
            className={styles.mainTitle}
            style={{ transform: `translateY(${frame1Y}px)` }}
          >
            スクロールで変わる体験
          </h2>
          <p className={styles.subtitle}>
            Canvasを使わない、純粋なCSSアニメーション
          </p>
        </div>
        
        {/* フレーム2: カード */}
        <div className={styles.frame2}>
          <div 
            className={styles.card1}
            style={{ transform: `translateX(${card1X}px)` }}
          >
            <div className={styles.cardContent}>
              <h3>Performance</h3>
              <p>軽量で高速な実装</p>
            </div>
          </div>
          
          <div 
            className={styles.card2}
            style={{ transform: `translateX(${card2X}px)` }}
          >
            <div className={styles.cardContent}>
              <h3>Accessibility</h3>
              <p>アクセシブルなHTML</p>
            </div>
          </div>
          
          <div 
            className={styles.card3}
            style={{ transform: `scale(${card3Scale})` }}
          >
            <div className={styles.cardContent}>
              <h3>Simplicity</h3>
              <p>シンプルな実装</p>
            </div>
          </div>
        </div>
        
        {/* フレーム3: 画像とテキスト */}
        <div className={styles.frame3}>
          <div className={styles.imageTextPair}>
            <div 
              className={styles.imageBox}
              style={{ opacity: image1Opacity }}
            >
              <div className={styles.imagePlaceholder}>
                <span>IMAGE 1</span>
              </div>
            </div>
            <div 
              className={styles.textBox}
              style={{ 
                opacity: image1Opacity,
                transform: `translateY(${text1Y}px)`
              }}
            >
              <h3>スムーズな遷移</h3>
              <p>スクロールに合わせて要素が自然に変化します。</p>
            </div>
          </div>
          
          <div className={styles.imageTextPair}>
            <div 
              className={styles.textBox}
              style={{ 
                opacity: image2Opacity,
                transform: `translateY(${text2Y}px)`
              }}
            >
              <h3>パララックス効果</h3>
              <p>異なる速度で動く要素が奥行きを演出します。</p>
            </div>
            <div 
              className={styles.imageBox}
              style={{ opacity: image2Opacity }}
            >
              <div className={styles.imagePlaceholder}>
                <span>IMAGE 2</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* フレーム4: 最終メッセージ */}
        <div 
          className={styles.frame4}
          style={{ opacity: finalMessageOpacity }}
        >
          {/* 装飾的な粒子 */}
          <div className={styles.particles} style={{ opacity: particlesOpacity }}>
            {particles.map((particle, i) => (
              <div 
                key={i}
                className={styles.particle}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`
                }}
              />
            ))}
          </div>
          
          <div 
            className={styles.finalMessage}
            style={{ transform: `scale(${finalMessageScale})` }}
          >
            <h2>完成！</h2>
            <p>これがCanvasを使わないスクロールアニメーションです</p>
            <div className={styles.ctaButton}>
              もっと見る
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}