'use client'

import styles from './ScrollAnimationSection.module.css'
import { useSectionScroll } from './scroll-animation/useSectionScroll'
import { useScrollAnimation } from './scroll-animation/useScrollAnimation'
import { Frame1Title } from './scroll-animation/Frame1Title'
import { Frame2Cards } from './scroll-animation/Frame2Cards'
import { Frame3Images } from './scroll-animation/Frame3Images'
import { Frame4Message } from './scroll-animation/Frame4Message'

export default function ScrollAnimationSection() {
  const { sectionRef, scrollProgress, isInView } = useSectionScroll()
  const animationState = useScrollAnimation(scrollProgress, isInView)

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
        <Frame1Title
          opacity={animationState.frame1Opacity}
          transformY={animationState.frame1Y}
        />

        {/* フレーム2: カード */}
        <Frame2Cards
          card1X={animationState.card1X}
          card2X={animationState.card2X}
          card3Scale={animationState.card3Scale}
        />

        {/* フレーム3: 画像とテキスト */}
        <Frame3Images
          image1Opacity={animationState.image1Opacity}
          image2Opacity={animationState.image2Opacity}
          text1Y={animationState.text1Y}
          text2Y={animationState.text2Y}
        />

        {/* フレーム4: 最終メッセージ */}
        <Frame4Message
          opacity={animationState.finalMessageOpacity}
          scale={animationState.finalMessageScale}
          particlesOpacity={animationState.particlesOpacity}
        />

      </div>
    </section>
  )
}