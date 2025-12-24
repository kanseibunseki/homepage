import styles from '../ScrollAnimationSection.module.css'

interface Frame1TitleProps {
    opacity: number
    transformY: number
}

export const Frame1Title = ({ opacity, transformY }: Frame1TitleProps) => {
    return (
        <div className={styles.frame1} style={{ opacity }}>
            <h2
                className={styles.mainTitle}
                style={{ transform: `translateY(${transformY}px)` }}
            >
                スクロールで変わる体験
            </h2>
            <p className={styles.subtitle}>
                Canvasを使わない、純粋なCSSアニメーション
            </p>
        </div>
    )
}
